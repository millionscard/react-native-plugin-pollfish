import { NativeEventEmitter, NativeModules } from 'react-native';

const { RNPollfish } = NativeModules;
const PollfishEventEmitter = new NativeEventEmitter(RNPollfish);

const PollfishClosedListener = "onPollfishClosed";
const PollfishOpenedListener = "onPollfishOpened";
const PollfishSurveyNotAvailableListener = "onPollfishSurveyNotAvailable";
const PollfishUserRejectedSurveyListener = "onUserRejectedSurvey";
const PollfishSurveyReceivedListener = "onPollfishSurveyReceived";
const PollfishSurveyCompletedListener = "onPollfishSurveyCompleted";
const PollfishUserNotEligibleListener = "onUserNotEligible";
const PollfishInitFailedWithNullKeyListener = "onInitFailedWithNullKey";
const PollfishInitiatedWithParamsListener = "onInitiatedWithParams";
const PollfishInitiatedWithParamsErrorListener = "onInitiatedWithParamsError";

const eventHandlers = {
    onPollfishClosed: new Map(),
    onPollfishOpened: new Map(),
    onPollfishSurveyNotAvailable: new Map(),
    onUserRejectedSurvey: new Map(),
    onUserNotEligible: new Map(),
    onPollfishSurveyReceived: new Map(),
    onPollfishSurveyCompleted: new Map(),
    onInitFailedWithNullKey: new Map(),
    onInitiatedWithParams: new Map(),
    onInitiatedWithParamsError: new Map()
};

const removeAllListeners = () => {
    PollfishEventEmitter.removeAllListeners(PollfishClosedListener);
    PollfishEventEmitter.removeAllListeners(PollfishOpenedListener);
    PollfishEventEmitter.removeAllListeners(PollfishSurveyNotAvailableListener);
    PollfishEventEmitter.removeAllListeners(PollfishUserRejectedSurveyListener);
    PollfishEventEmitter.removeAllListeners(PollfishUserNotEligibleListener);
    PollfishEventEmitter.removeAllListeners(PollfishSurveyReceivedListener);
    PollfishEventEmitter.removeAllListeners(PollfishSurveyCompletedListener);
    PollfishEventEmitter.removeAllListeners(PollfishInitiatedWithParamsListener);
    PollfishEventEmitter.removeAllListeners(PollfishInitFailedWithNullKeyListener);
    PollfishEventEmitter.removeAllListeners(PollfishInitiatedWithParamsErrorListener);
};

const addEventListener = (type, handler) => {
    switch (type) {
        case PollfishClosedListener:
        case PollfishOpenedListener:
        case PollfishSurveyNotAvailableListener:
        case PollfishUserRejectedSurveyListener:
        case PollfishUserNotEligibleListener:
        case PollfishSurveyReceivedListener:
        case PollfishSurveyCompletedListener:
        case PollfishInitiatedWithParamsErrorListener:
        case PollfishInitFailedWithNullKeyListener:
        case PollfishInitiatedWithParamsListener:
            eventHandlers[type].set(handler, PollfishEventEmitter.addListener(type, handler));
            break;
        default:
          console.log(`Event with type ${type} does not exist.`);
    }
}

const removeEventListener = (type, handler) => {
    if (!eventHandlers[type].has(handler)) {
      return;
    }

    eventHandlers[type].get(handler).remove();
    eventHandlers[type].delete(handler);
};

const Position = {
    topLeft: 0,
    topRight: 1,
    middleLeft: 2,
    middleRight: 3,
    bottomLeft: 4,
    bottomRight: 5
}

let Params = function(
    androidApiKey,
    iOSApiKey,
    indicatorPosition,
    indicatorPadding,
    offerwallMode,
    releaseMode,
    rewardMode,
    requestUUID,
    userProperties,
    clickId,
    rewardInfo,
    signature) {
        this.androidApiKey = androidApiKey;
        this.iOSApiKey = iOSApiKey;
        this.indicatorPosition = indicatorPosition;
        this.indicatorPadding = indicatorPadding;
        this.offerwallMode = offerwallMode;
        this.releaseMode = releaseMode;
        this.rewardMode = rewardMode;
        this.requestUUID = requestUUID;
        this.userProperties = userProperties;
        this.clickId = clickId;
        this.rewardInfo = rewardInfo;
        this.signature = signature;
    };

let Builder = function(androidApiKey, iOSApiKey) {
    this._androidApiKey = androidApiKey;
    this._iOSApiKey = iOSApiKey;
    this._indicatorPosition = Position.topLeft;
    this._indicatorPadding = 8;
    this._offerwallMode = false;
    this._releaseMode = false;
    this._rewardMode = false;
    this._requestUUID = null;
    this._userProperties = {};
    this._clickId = null;
    this._rewardInfo = null;
    this._signature = null;
};

/**
 * Sets the Position where you wish to place the Pollfish indicator
 *
 * @param {number} indicatorPosition
 * @returns {Builder} itself
 */
Builder.prototype.indicatorPosition = function(indicatorPosition) {
    this._indicatorPosition = indicatorPosition;
    return this;
};

/**
 * Sets the padding from the top or the bottom of the view, according to the Position of Pollfish indicator
 *
 * @param {number} indicatorPadding
 * @returns {Builder} itself
 */
Builder.prototype.indicatorPadding = function(indicatorPadding) {
    this._indicatorPadding = indicatorPadding;
    return this;
};

/**
 * Sets Pollfish to offerwall mode
 *
 * @param {Boolean} offerwallMode
 * @returns {Builder} itself
 */
Builder.prototype.offerwallMode = function(offerwallMode) {
    this._offerwallMode = offerwallMode;
    return this;
};

/**
 * Sets Pollfish SDK to Developer or Release mode
 *
 * @param {Boolean} releaseMode
 * @returns {Builder} itself
 */
Builder.prototype.releaseMode = function(releaseMode) {
    this._releaseMode = releaseMode;
    return this;
};

/**
 * Initializes Pollfish in reward mode
 *
 * @param {Boolean} rewardMode
 * @returns {Builder} itself
 */
Builder.prototype.rewardMode = function(rewardMode) {
    this._rewardMode = rewardMode;
    return this;
};

/**
 * Sets a unique id to identify a user and be passed through server-to-server callbacks
 *
 * @param {String} requestUUID
 * @returns {Builder} itself
 */
Builder.prototype.requestUUID = function(requestUUID) {
    this._requestUUID = requestUUID;
    return this;
};

/**
 * Provides user attributes upfront during initialization
 *
 * @param {Object} userProperties
 * @returns {Builder} itself
 */
Builder.prototype.userProperties = function(userProperties) {
    this._userProperties = userProperties;
    return this;
};

/**
 * A pass throught param that will be passed back through server-to-server callback
 *
 * @param {String} clickId
 * @returns {Builder} itself
 */
Builder.prototype.clickId = function(clickId) {
    this._clickId = clickId;
    return this;
};

/**
 * An optional parameter used to secure the rewardConversion and rewardName parameters passed on RewardInfo object
 *
 * @param {String} signature
 * @returns {Builder} itself
 */
Builder.prototype.signature = function(signature) {
    this._signature = signature;
    return this;
};

/**
 * An object holding information regarding the survey completion reward
 *
 * @param {Object} rewardInfo
 * @returns {Builder} itself
 */
Builder.prototype.rewardInfo = function(rewardInfo) {
    this._rewardInfo = rewardInfo;
    return this;
};

/**
 * Creates the initialization params object passed in pollfishpugin.init function
 *
 * @returns {Params} object which is used to initialize Pollfish
 */
Builder.prototype.build = function() {
    return new Params(
        this._androidApiKey,
        this._iOSApiKey,
        this._indicatorPosition,
        this._indicatorPadding,
        this._offerwallMode,
        this._releaseMode,
        this._rewardMode,
        this._requestUUID,
        this._userProperties,
        this._clickId,
        this._rewardInfo,
        this._signature
    );
}

module.exports = {
    ...RNPollfish,
    Position,
    Builder,
    Params,
    PollfishClosedListener,
    PollfishOpenedListener,
    PollfishSurveyReceivedListener,
    PollfishSurveyCompletedListener,
    PollfishSurveyNotAvailableListener,
    PollfishUserNotEligibleListener,
    PollfishUserRejectedSurveyListener,
    PollfishInitFailedWithNullKeyListener,
    PollfishInitiatedWithParamsListener,
    PollfishInitiatedWithParamsErrorListener,
    init: (params) => RNPollfish.init(params.androidApiKey, params.iOSApiKey, params.indicatorPosition, params.indicatorPadding, params.offerwallMode, params.releaseMode, params.rewardMode, params.requestUUID, params.userProperties, params.rewardInfo, params.clickId, params.signature),
    show: () => RNPollfish.show(),
    hide: () => RNPollfish.hide(),
    isPollfishPanelOpen: (func) => RNPollfish.isPollfishPanelOpen(func),
    isPollfishPresent: (func) => RNPollfish.isPollfishPresent(func),
    removeAllListeners,
    removeEventListener,
    addEventListener
};


