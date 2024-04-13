
const goalsJson = '{"goals":{"2024-04-04":[{"goal_id":"1","desire_id":"1","user_id":"2","name":"Apply to 5 jobs","how_much":"5","measuring_units":null,"start_date":"2024-04-05","deadline_date":null,"priority_level":null,"recurrence_id":null,"recurrence_date":null},{"goal_id":"3","desire_id":"2","user_id":"2","name":"Read the scriptures daily","how_much":"5","measuring_units":null,"start_date":"2024-04-05","deadline_date":null,"priority_level":null,"recurrence_id":null,"recurrence_date":null},{"goal_id":"4","desire_id":"2","user_id":"2","name":"Go to temple weekly","how_much":"1","measuring_units":null,"start_date":"2024-04-05","deadline_date":null,"priority_level":null,"recurrence_id":null,"recurrence_date":null}]}}';

function parseGoalFromServerObject(obj) {
    const { goal_id, desire_id, user_id, name, how_much, measuring_units, start_date, deadline_date, priority_level, recurrence_id, recurrence_date } = obj;
    return {
        goalId: goal_id,
        desireId: desire_id,
        userId: user_id,
        name: name, 
        howMuch: how_much,
        measuringUnits: measuring_units,
        startDate: Date.parse(start_date),
        deadlineDate: deadline_date ? Date.parse(deadline_date) : null,
        priorityLevel: priority_level,
        recurrenceId: recurrence_id,
        recurrenceDate: recurrence_date ? Date.parse(recurrence_date) : null
    };
}

export function fetchGoalsByDate() {
    const obj = JSON.parse(goalsJson);
    console.log(obj);
    return obj.goals['2024-04-04'].map(goal => {
        return parseGoalFromServerObject(goal)
    });
}