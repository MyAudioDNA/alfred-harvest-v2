import { alfredError } from './utils/errors';
import { apiCall } from './utils/helpers';
const alfy = require('alfy');

const vars = process.env;
const { projectId, projectTasks } = vars;

const url = `https://api.harvestapp.com/v2/projects/${projectId}/task_assignments`;


const items = alfy
    .inputMatches( JSON.parse( projectTasks ), 'task.name')
    .filter(element => element.is_active)
    .map(element => ({
        uid: element.id,
        title: element.task.name,
        subtitle: 'Start this task',
        variables: {
            taskId: element.task.id,
            taskName: element.task.name
        },
        icon: {
            path: 'src/icons/start.png'
        }
    }));

alfy.output(items);