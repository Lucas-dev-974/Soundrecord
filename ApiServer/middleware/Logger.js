// https://tutorialedge.net/nodejs/writing-your-own-logging-system-nodejs/

const fs = require('fs');
const path = require('path')

class Logger{
    constructor(){
        this.events_logs_config = [
            { path: './logs/infos.txt',  name: 'info',  infos: 'Log for information about request asked \n\n'  },
            { path: './logs/errors.txt', name: 'error', infos: 'Log for error appened \n\n' },
            { path: './logs/debugs.txt', name: 'debug', infos: 'log for debug some events appened \n\n' },
        ];

        this.initStream()
        this.errorLog('test')
    }

    /**
     * @summary Create logs folders if not exist
     *          Create log files if not exist
     *          Instantiate fs stream writer on files
     */
    initStream(){
        if(!fs.existsSync('./logs/'))
            fs.mkdir('./logs/', { recursive: true }, (err) => { if (err) throw err; })

        this.events_logs_config.forEach(log_config => {
            if(!fs.existsSync(path.resolve(log_config.path))) fs.writeFile(path.resolve(log_config.path), log_config.infos, function (err) { if (err) throw err; })
            log_config.stream = fs.createWriteStream(log_config.path)
            
        });
    }

    /**
     * @summary Check message is not empty
     *          Search the log config where log_type == name
     *          Write log with config.stream
     * @param {string} msg 
     * @param {string} log_type 
     * @param {integer} user_id 
     * @param {string} type_event 
     */
    Log(msg, log_type, user_id = 0, type_event = null, ){
        if(!msg) throw new Error('fields msg is required')
        let config = this.events_logs_config.find((config) => config.name == log_type)

        const date_now = Date.now();
        const today = new Date(date_now);
        fs.appendFileSync(config.path, today.toISOString() + ' : ' + msg + ' | userid: ' + user_id + ' | event_type: ' + type_event, 'utf8')
    }

    errorLog(msg, user_id = 0, type_event = null){
        this.Log(msg, 'error', user_id, type_event)
    }

    debugLog(msg, user_id = 0, type_event = null){
        this.Log(msg, 'debug', user_id, type_event)
    }

    infoLog(msg, user_id, type_event){
        this.Log(msg, 'info', user_id, type_event)
    }

    addLogEventsType(log_name, log_infos, log_file_path){
        this.events_logs_config.push({name: log_name, infos: log_infos, path: log_file_path})
        this.initStream()
    }
}

exports.logger = new Logger()

