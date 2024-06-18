
export function buildReport(startDate, endDate, desires, goals, todosByGoalId, eventsByGoalId) {
    let report = {
        startDate: startDate,
        endDate: endDate,
        desires: desires.sort((d1, d2) => d1.desireId - d2.desireId),
        goals: goals,
        todosByGoalId: todosByGoalId,
        eventsByGoalId: eventsByGoalId,
        totalProgress: 0.0,
        desiresProgress: {},
        fulfilledDesires: 0,
        partiallyFulfilledDesires: 0,
        unfulfilledDesires: 0,
        goalsByDesireId: {},
        goalsHowMuchPlanned: {},
        goalsHowMuchAccomplished: {},
        completedGoals: 0,
        partiallyCompletedGoals: 0,
        uncompletedGoals: 0,
        futureGoals: [],
        futureGoalshowMuchPlanned: {},
        futureGoalsHowMuchAccomplished: {}
    }
    // populate data fields
    for (const goal of goals) {
        // if goal's deadline is after the end of this report, add to futureGoals
        if (goal.deadlineDate ? goal.deadlineDate > endDate : false) {
            report.futureGoals.push(goal);
            continue;
        }
        // populate goalsByDesireId
        if (!report.goalsByDesireId[goal.desireId]) {
            report.goalsByDesireId[goal.desireId] = [];
        }
        report.goalsByDesireId[goal.desireId].push(goal);
    }

    for (const desire of desires) {
        const goals = report.goalsByDesireId[desire.desireId] || [];
        let desireProgress = 0.0;
        let isDesireFulfilled = true;
        let isDesireUnfulfilled = true;
        for (const goal of goals) {
            report.goalsHowMuchPlanned[goal.goalId] = goal.howMuch;
            const goalEvents = report.eventsByGoalId[goal.goalId] || [];
            let goalHowMuchAccomplished = 0.0;
            for (const goalEvent of goalEvents) {
                goalHowMuchAccomplished += goalEvent.howMuchAccomplished || 0;
            }
            report.goalsHowMuchAccomplished[goal.goalId] = goalHowMuchAccomplished;

            const howMuchCompleted = report.goalsHowMuchAccomplished[goal.goalId];
            if (howMuchCompleted !== undefined) {
                if (howMuchCompleted >= goal.howMuch) {
                    isDesireUnfulfilled = false;
                    report.completedGoals += 1;
                } else if (howMuchCompleted === 0) {
                    isDesireFulfilled = false;
                    report.uncompletedGoals += 1;
                } else {
                    isDesireFulfilled = false;
                    isDesireUnfulfilled = false;
                    report.partiallyCompletedGoals += 1;
                }
                desireProgress += howMuchCompleted / goal.howMuch / goals.length;
            }
        }
        report.desiresProgress[desire.desireId] = Math.round(desireProgress * 100) / 100;
        report.totalProgress += (report.desiresProgress[desire.desireId] || 0) / desires.length;
        if (desireProgress < 1.0 && desireProgress > 0.0) {
            report.partiallyFulfilledDesires += 1;
        } else if (isDesireFulfilled) {
            report.fulfilledDesires += 1;
        } else if (isDesireUnfulfilled) {
            report.unfulfilledDesires += 1;
        }

        for (const futureGoal of report.futureGoals) {
            let howMuchPlanned = 0.0;
            for (const todo of todosByGoalId[futureGoal.goalId] || []) {
                howMuchPlanned += todo.howMuchPlanned;
            }
            report.futureGoalshowMuchPlanned[futureGoal.goalId] = howMuchPlanned;

            let howMuchAccomplished = 0.0;
            for (const event of eventsByGoalId[futureGoal.goalId] || []) {
                howMuchAccomplished += event.howMuchAccomplished || 0;
            }
            report.futureGoalsHowMuchAccomplished[futureGoal.goalId] = howMuchAccomplished;
        }
    }
    console.log("built report");
    console.log(report);
    return report;
}