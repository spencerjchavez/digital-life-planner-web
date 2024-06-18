
const desiresJson = '{"desires":[{"desire_id":"1","name":"Get a job","user_id":"2","date_created":"2024-04-07","deadline":null,"date_retired":null},{"desire_id":"2","name":"Be spiritually strong","user_id":"2","date_created":"2024-04-07","deadline":null,"date_retired":null}]}';

export function fetchDesiresOfUser() {
    const obj = JSON.parse(desiresJson);
    return obj.desires.map(desire => {
        const { desire_id, name, user_id, deadline, date_retired } = desire;
        return {
            desireId: desire_id,
            name: name,
            userId: user_id,
            deadline: deadline,
            dateRetired: date_retired
        };
    });
}