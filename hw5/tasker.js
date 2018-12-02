let tasker = (function () {
    let verbs = [
        "make",
        "install",
        "update",
        "generate data for",
        "talk to",
        "schedule a time for",
        "develop a plan for",
        "knit",
        "create",
        "build",
        "write",
        "get",
        "finish",
        "call",
        "arrange",
        "submit",
        "talk to",
        "do",
        "protest",
        "collect",
        "shop for"
    ];

    let nouns = [
        "a cake",
        "the boat",
        "our wedding",
        "the garage",
        "the tow truck",
        "our shed",
        "1090 tax form",
        "the IRS agent",
        "milk",
        "some LED lights",
        "monthly budget",
        "marketing plan",
        "the flowers",
        "an albatross"
    ];

    let userNames = [
        "frodo baggins",
        "gandalf gray",
        "smaug dragon"
    ];

    let Task = function (id, ownerId, desc, due, color, complete) {
        this.ownerId = ownerId;
        this.desc = desc;
        this.due = due;
        this.color = color;
        this.complete = complete;
        this.id = id || randomId();
    };

    let randomId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    let randomColor = function () {
        let pad = function (v) {
            return v.length == 1 ? '0' + v : v;
        }
        r = Math.floor(Math.random() * 256).toString(16);
        g = Math.floor(Math.random() * 256).toString(16);
        b = Math.floor(Math.random() * 256).toString(16);
        return '#' + pad(r) + pad(g) + pad(b);
    }

    let randomDate = function () {
        year = Math.floor(Math.random() * 14 + 2010);
        month = Math.floor(Math.random() * 12);
        day = Math.floor(Math.random() * 31);
        return new Date(year, month, day);
    };

    let choose = function (things) {
        let i = Math.floor(Math.random() * things.length);
        return things[i];
    }

    let randomDescription = function () {
        return choose(verbs) + ' ' + choose(nouns);
    };

    let makeList = function (ownerId, n) {
        result = [];
        for (i = 0; i < n; i += 1) {
            result.push(new Task(null,
                ownerId,
                randomDescription(),
                randomDate(),
                randomColor(),
                choose([true, false])));
        }
        return result;
    }

    let updateTask = function( oldTask, editedTask ) {
        let propertiesToCopy = ['desc', 'due', 'color', 'complete' ];
        propertiesToCopy.forEach( prop => {
            if( editedTask.hasOwnProperty( prop ) ) {
                oldTask[prop] = editedTask[prop];
            }
        });
    }

    let state = {
        users: userNames.reduce(function (acc, cv) {
            let parts = cv.split(' '); //
            let name = parts[0];
            let email = parts[0][0] + parts[1] + '@uwlaxer.edu';
            let id = randomId();
            let password = parts[1];
            let tasks = makeList(id, Math.random() * 50 + 20).reduce((acc, t) => { acc[t.id] = t; return acc; }, {});
            acc[id] = {
                name: name,
                email: email,
                id: id,
                password: password,
                tasks: tasks
            };
            return acc;
        }, {}),
        user: null
    };

    let getTask = function (ownerId, id) {
        try {
            return state.users[ownerId].tasks[id];
        } catch (e) {
            return null;
        }
    }

    let getUserByName = function (name) {
        for (id in state.users) {
            if (state.users[id] && state.users[id].name === name) {
                return state.users[id];
            }
        }
        return null;
    }

    let taskList = function (ownerId) {
        let result = [];
        for (let tid in state.user.tasks) {
            result.push(state.user.tasks[tid]);
        }
        return result.sort((a, b) => b.due.getTime() - a.due.getTime());
    }

    let respond = function (error, value, cb) {
        window.setTimeout(() => cb(error, value), Math.random() * 1500);
    }

    let copyTask = function( task ) {
        return new Task(task.id, task.ownerId, task.desc, task.due, task.color, task.complete);
    }

    return {
        login: function ( username, passwd, cb) {
            let user = getUserByName( username );
            if (user && user.password === passwd) {
                state.user = user;
                let cleansedUser = { name: user.name, email: user.email, id: user.id };
                respond(null, cleansedUser, cb);
            } else {
                respond('forbidden', null, cb);
            }
        },

        logout: function (cb) {
            state.user = null;
            respond(null, true, cb);
        },

        tasks: function (ownerId, cb) {
            if (ownerId === state.user.id) {
                let tasks = taskList(ownerId).map(u => new Task(u.id, u.ownerId, u.desc, u.due, u.color, u.complete));
                respond(null, tasks, cb);
            } else {
                respond('forbidden', null, cb);
            }
        },

        add: function (ownerId, task, cb) {
            if (state.user.id == ownerId) {
                if (task.desc && task.due && task.color) {
                    let due = new Date(task.due);
                    let task = new Task(task.id, ownerId, task.desc, due, task.color, Boolean(task.complete));
                    state.users[ownerId].tasks[task.id] = task;
                    respond(null, task, cb);
                } else {
                    respond('invalid task', null, cb);
                }
            } else {
                respond('forbidden', null, cb);
            }
        },

        delete: function (ownerId, taskId, cb) {
            if (state.user.id === ownerId) {
                let task = state.users[ownerId].tasks[taskId];
                delete state.users[ownerId].tasks[taskId];

                if (task) {
                    respond(null, task, cb);
                } else {
                    respond('no such task', null, cb);
                }
            } else {
                respond('forbidden', null, cb);
            }
        },

        edit: function (ownerId, taskId, task, cb) {
            if (state.user.id == ownerId) {
                if (taskId) {
                    let oldTask = getTask(ownerId, taskId);
                    if( oldTask) {
                        updateTask( oldTask, task );                        
                        respond( null, copyTask( oldTask ), cb );
                    } else {
                        respond( 'no such task', null, cb );
                    }                    
                } else {
                    respond( 'no such task', null, cb );
                }
            } else {
                respond( 'forbidden', null, cb );
            }
        }
    }

})();
