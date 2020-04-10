import wallet, {WALLET_MODE} from '../wallet/wallet';
import network from '../../net/network';
import server from '../../api/server';
import peer from '../../net/peer';
import jobEngine from '../../job/job-engine';
import console from '../console';
import logManager from '../log-manager';


class Service {
    constructor() {
        this.mode        = WALLET_MODE.CONSOLE;
        this.initialized = false;
    }

    initialize(mode) {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        if (mode) {
            this.mode = mode;
        }
        return wallet.setMode(this.mode).initialize()
                     .then(() => network.initialize())
                     .then(() => server.initialize())
                     .then(() => peer.initialize())
                     .then(() => jobEngine.initialize())
                     .catch(e => {
                         console.log(e);
                     });
    }

    stop() {
        if (!this.initialized) {
            return;
        }
        this.initialized = false;
        wallet.stopTasks();
        network.stopTasks();
        peer.stopTasks();
        logManager.stop();
    }
}


export default new Service();