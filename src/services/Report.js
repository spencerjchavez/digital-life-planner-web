import { fetchDesiresOfUser } from './Desires';
import { fetchGoalsByDate } from './Goals';
import { fetchTodosByGoalId } from './Todos';
import { fetchEventsByGoalId } from './CalendarEvents';
import { buildReport } from '../utils/BuildReport'

export default function fetchReport() {
    const desires = fetchDesiresOfUser();
    const goals = fetchGoalsByDate();
    const todosByGoalId = fetchTodosByGoalId();
    const eventsByGoalId = fetchEventsByGoalId();
    const report = buildReport(Date.parse("2024-02-01"), Date.parse("2024-04-30"),desires, goals, todosByGoalId, eventsByGoalId)

    return report;
}