import { exit } from 'process';
import { rrulestr } from 'rrule';
import createPostgresConnection from './utils/createPostgresConnection';
import DBService from './db/db.service';
import NotificationService from './services/notification.service';

createPostgresConnection().then(async (connection) => {
  const dbService = new DBService();
  const notificationService = new NotificationService();

  const flowers = await dbService.getFlowers();

  const flowerRules = flowers.reduce((acc, flower) => {
    Object.entries(flower.rrules).forEach(([action, rrule]) => {
      if (rrule) {
        acc.push({
          id: flower.id,
          name: flower.name,
          shelf: flower.shelf,
          action,
          rrule,
        });
      }
    });
    return acc
  }, []);

  const flowerRulesUniqueIds = [ ...new Set(flowerRules.map(f => f.id)) ];

  const flowerUsers = await Promise.all(
    flowerRulesUniqueIds.map(id =>
      dbService.getUsersByFlowerId(id)
        .then(users => ({ flowerId: id, users }))
    )
  );
  const usersByFlowerId = flowerUsers
    .filter(({ users }) => users.length)
    .reduce(
      (acc, { flowerId, users }) => ({ ...acc, [flowerId]: users }),
      {},
    );

  await Promise.all(flowerRules.map(async flowerRule => {
    const { id, name, shelf, action, rrule } = flowerRule;
    const rule = rrulestr(rrule);

    const lastNotification = await dbService.getLastNotification(id, action);
    if (lastNotification) {
      const notificationTimeoutHours = 24;
      const millisSinceLastNotification = Date.now() - lastNotification.timestamp * 1000;
      const hoursSinceLastNotification = millisSinceLastNotification / (1000 * 60 * 60);
      if (hoursSinceLastNotification < notificationTimeoutHours) return;
    }

    const lastAction = await dbService.getLastAction(id, action);
    let message = `It's ${action} time for the ${name} flower on the ${shelf.name} shelf`;
    if (lastAction) {
      const missedRecurrences = rule.between(
        new Date(lastAction.timestamp * 1000),
        new Date(Date.now()),
      );
      if (!missedRecurrences.length) return;
      message += `. Times missed: ${missedRecurrences.length}`;
    } else { // action was never performed yet
      const lastMissedRecurrence = rule.before(new Date(Date.now()));
      if (!lastMissedRecurrence) return;
    }
    usersByFlowerId[id].map(async (user) => {
      const notificationTokens = Array.from(await dbService.findRegisterTokens(user))
        .flat()
        .map(({ registrationToken }) => registrationToken);
      await notificationService.sendNotificationWithOptions(
        notificationTokens,
        message,
        `Croton ${action} notification`,
        {}
      );
    });
    const timestamp = Math.ceil(Date.now() / 1000); // unix timestamp, seconds, utc
    if (lastNotification) {
      await dbService.updateNotification(lastNotification.notificationId, timestamp);
    } else {
      await dbService.saveNotification(id, action, timestamp)
    }
  }));

  await connection.close();
  exit();
});
