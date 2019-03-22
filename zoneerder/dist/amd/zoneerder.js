define('zoneerder', ['exports'], function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var aureliaPal = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AggregateError = AggregateError;
    exports.initializePAL = initializePAL;
    exports.reset = reset;
    function AggregateError(message, innerError, skipIfAlreadyAggregate) {
      if (innerError) {
        if (innerError.innerError && skipIfAlreadyAggregate) {
          return innerError;
        }

        var separator = '\n------------------------------------------------\n';

        message += separator + 'Inner Error:\n';

        if (typeof innerError === 'string') {
          message += 'Message: ' + innerError;
        } else {
          if (innerError.message) {
            message += 'Message: ' + innerError.message;
          } else {
            message += 'Unknown Inner Error Type. Displaying Inner Error as JSON:\n ' + JSON.stringify(innerError, null, '  ');
          }

          if (innerError.stack) {
            message += '\nInner Error Stack:\n' + innerError.stack;
            message += '\nEnd Inner Error Stack';
          }
        }

        message += separator;
      }

      var e = new Error(message);
      if (innerError) {
        e.innerError = innerError;
      }

      return e;
    }

    var FEATURE = exports.FEATURE = {};

    var PLATFORM = exports.PLATFORM = {
      noop: function noop() {},
      eachModule: function eachModule() {},
      moduleName: function (_moduleName) {
        function moduleName(_x) {
          return _moduleName.apply(this, arguments);
        }

        moduleName.toString = function () {
          return _moduleName.toString();
        };

        return moduleName;
      }(function (moduleName) {
        return moduleName;
      })
    };

    PLATFORM.global = function () {
      if (typeof self !== 'undefined') {
        return self;
      }

      if (typeof commonjsGlobal !== 'undefined') {
        return commonjsGlobal;
      }

      return new Function('return this')();
    }();

    var DOM = exports.DOM = {};
    var isInitialized = exports.isInitialized = false;
    function initializePAL(callback) {
      if (isInitialized) {
        return;
      }
      exports.isInitialized = isInitialized = true;
      if (typeof Object.getPropertyDescriptor !== 'function') {
        Object.getPropertyDescriptor = function (subject, name) {
          var pd = Object.getOwnPropertyDescriptor(subject, name);
          var proto = Object.getPrototypeOf(subject);
          while (typeof pd === 'undefined' && proto !== null) {
            pd = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
          }
          return pd;
        };
      }

      callback(PLATFORM, FEATURE, DOM);
    }
    function reset() {
      exports.isInitialized = isInitialized = false;
    }
    });

    unwrapExports(aureliaPal);
    var aureliaPal_1 = aureliaPal.AggregateError;
    var aureliaPal_2 = aureliaPal.initializePAL;
    var aureliaPal_3 = aureliaPal.reset;
    var aureliaPal_4 = aureliaPal.FEATURE;
    var aureliaPal_5 = aureliaPal.PLATFORM;
    var aureliaPal_6 = aureliaPal.DOM;
    var aureliaPal_7 = aureliaPal.isInitialized;

    var aureliaMetadata = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Origin = exports.metadata = undefined;

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

    exports.decorators = decorators;
    exports.deprecated = deprecated;
    exports.mixin = mixin;
    exports.protocol = protocol;





    function isObject(val) {
      return val && (typeof val === 'function' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object');
    }

    var metadata = exports.metadata = {
      resource: 'aurelia:resource',
      paramTypes: 'design:paramtypes',
      propertyType: 'design:type',
      properties: 'design:properties',
      get: function get(metadataKey, target, targetKey) {
        if (!isObject(target)) {
          return undefined;
        }
        var result = metadata.getOwn(metadataKey, target, targetKey);
        return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
      },
      getOwn: function getOwn(metadataKey, target, targetKey) {
        if (!isObject(target)) {
          return undefined;
        }
        return Reflect.getOwnMetadata(metadataKey, target, targetKey);
      },
      define: function define(metadataKey, metadataValue, target, targetKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
      },
      getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
        var result = metadata.getOwn(metadataKey, target, targetKey);

        if (result === undefined) {
          result = new Type();
          Reflect.defineMetadata(metadataKey, result, target, targetKey);
        }

        return result;
      }
    };

    var originStorage = new Map();
    var unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });

    var Origin = exports.Origin = function () {
      function Origin(moduleId, moduleMember) {
        

        this.moduleId = moduleId;
        this.moduleMember = moduleMember;
      }

      Origin.get = function get(fn) {
        var origin = originStorage.get(fn);

        if (origin === undefined) {
          aureliaPal.PLATFORM.eachModule(function (key, value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
              for (var name in value) {
                var exp = value[name];
                if (exp === fn) {
                  originStorage.set(fn, origin = new Origin(key, name));
                  return true;
                }
              }
            }

            if (value === fn) {
              originStorage.set(fn, origin = new Origin(key, 'default'));
              return true;
            }

            return false;
          });
        }

        return origin || unknownOrigin;
      };

      Origin.set = function set(fn, origin) {
        originStorage.set(fn, origin);
      };

      return Origin;
    }();

    function decorators() {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      var applicator = function applicator(target, key, descriptor) {
        var i = rest.length;

        if (key) {
          descriptor = descriptor || {
            value: target[key],
            writable: true,
            configurable: true,
            enumerable: true
          };

          while (i--) {
            descriptor = rest[i](target, key, descriptor) || descriptor;
          }

          Object.defineProperty(target, key, descriptor);
        } else {
          while (i--) {
            target = rest[i](target) || target;
          }
        }

        return target;
      };

      applicator.on = applicator;
      return applicator;
    }

    function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
      function decorator(target, key, descriptor) {
        var methodSignature = target.constructor.name + '#' + key;
        var options = maybeKey ? {} : optionsOrTarget || {};
        var message = 'DEPRECATION - ' + methodSignature;

        if (typeof descriptor.value !== 'function') {
          throw new SyntaxError('Only methods can be marked as deprecated.');
        }

        if (options.message) {
          message += ' - ' + options.message;
        }

        return _extends({}, descriptor, {
          value: function deprecationWrapper() {
            if (options.error) {
              throw new Error(message);
            } else {
              console.warn(message);
            }

            return descriptor.value.apply(this, arguments);
          }
        });
      }

      return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
    }

    function mixin(behavior) {
      var instanceKeys = Object.keys(behavior);

      function _mixin(possible) {
        var decorator = function decorator(target) {
          var resolvedTarget = typeof target === 'function' ? target.prototype : target;

          var i = instanceKeys.length;
          while (i--) {
            var property = instanceKeys[i];
            Object.defineProperty(resolvedTarget, property, {
              value: behavior[property],
              writable: true
            });
          }
        };

        return possible ? decorator(possible) : decorator;
      }

      return _mixin;
    }

    function alwaysValid() {
      return true;
    }
    function noCompose() {}

    function ensureProtocolOptions(options) {
      if (options === undefined) {
        options = {};
      } else if (typeof options === 'function') {
        options = {
          validate: options
        };
      }

      if (!options.validate) {
        options.validate = alwaysValid;
      }

      if (!options.compose) {
        options.compose = noCompose;
      }

      return options;
    }

    function createProtocolValidator(validate) {
      return function (target) {
        var result = validate(target);
        return result === true;
      };
    }

    function createProtocolAsserter(name, validate) {
      return function (target) {
        var result = validate(target);
        if (result !== true) {
          throw new Error(result || name + ' was not correctly implemented.');
        }
      };
    }

    function protocol(name, options) {
      options = ensureProtocolOptions(options);

      var result = function result(target) {
        var resolvedTarget = typeof target === 'function' ? target.prototype : target;

        options.compose(resolvedTarget);
        result.assert(resolvedTarget);

        Object.defineProperty(resolvedTarget, 'protocol:' + name, {
          enumerable: false,
          configurable: false,
          writable: false,
          value: true
        });
      };

      result.validate = createProtocolValidator(options.validate);
      result.assert = createProtocolAsserter(name, options.validate);

      return result;
    }

    protocol.create = function (name, options) {
      options = ensureProtocolOptions(options);
      var hidden = 'protocol:' + name;
      var result = function result(target) {
        var decorator = protocol(name, options);
        return target ? decorator(target) : decorator;
      };

      result.decorates = function (obj) {
        return obj[hidden] === true;
      };
      result.validate = createProtocolValidator(options.validate);
      result.assert = createProtocolAsserter(name, options.validate);

      return result;
    };
    });

    unwrapExports(aureliaMetadata);
    var aureliaMetadata_1 = aureliaMetadata.Origin;
    var aureliaMetadata_2 = aureliaMetadata.metadata;
    var aureliaMetadata_3 = aureliaMetadata.decorators;
    var aureliaMetadata_4 = aureliaMetadata.deprecated;
    var aureliaMetadata_5 = aureliaMetadata.mixin;
    var aureliaMetadata_6 = aureliaMetadata.protocol;

    var aureliaDependencyInjection = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Container = exports.InvocationHandler = exports._emptyParameters = exports.SingletonRegistration = exports.TransientRegistration = exports.FactoryInvoker = exports.NewInstance = exports.Factory = exports.StrategyResolver = exports.Parent = exports.Optional = exports.All = exports.Lazy = exports.resolver = undefined;

    var _dec, _class, _dec2, _class3, _dec3, _class5, _dec4, _class7, _dec5, _class9, _dec6, _class11, _dec7, _class13, _classInvokers;

    exports.getDecoratorDependencies = getDecoratorDependencies;
    exports.lazy = lazy;
    exports.all = all;
    exports.optional = optional;
    exports.parent = parent;
    exports.factory = factory;
    exports.newInstance = newInstance;
    exports.invoker = invoker;
    exports.invokeAsFactory = invokeAsFactory;
    exports.registration = registration;
    exports.transient = transient;
    exports.singleton = singleton;
    exports.autoinject = autoinject;
    exports.inject = inject;







    var resolver = exports.resolver = aureliaMetadata.protocol.create('aurelia:resolver', function (target) {
      if (!(typeof target.get === 'function')) {
        return 'Resolvers must implement: get(container: Container, key: any): any';
      }

      return true;
    });

    var Lazy = exports.Lazy = (_dec = resolver(), _dec(_class = function () {
      function Lazy(key) {
        

        this._key = key;
      }

      Lazy.prototype.get = function get(container) {
        var _this = this;

        return function () {
          return container.get(_this._key);
        };
      };

      Lazy.of = function of(key) {
        return new Lazy(key);
      };

      return Lazy;
    }()) || _class);
    var All = exports.All = (_dec2 = resolver(), _dec2(_class3 = function () {
      function All(key) {
        

        this._key = key;
      }

      All.prototype.get = function get(container) {
        return container.getAll(this._key);
      };

      All.of = function of(key) {
        return new All(key);
      };

      return All;
    }()) || _class3);
    var Optional = exports.Optional = (_dec3 = resolver(), _dec3(_class5 = function () {
      function Optional(key) {
        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        

        this._key = key;
        this._checkParent = checkParent;
      }

      Optional.prototype.get = function get(container) {
        if (container.hasResolver(this._key, this._checkParent)) {
          return container.get(this._key);
        }

        return null;
      };

      Optional.of = function of(key) {
        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        return new Optional(key, checkParent);
      };

      return Optional;
    }()) || _class5);
    var Parent = exports.Parent = (_dec4 = resolver(), _dec4(_class7 = function () {
      function Parent(key) {
        

        this._key = key;
      }

      Parent.prototype.get = function get(container) {
        return container.parent ? container.parent.get(this._key) : null;
      };

      Parent.of = function of(key) {
        return new Parent(key);
      };

      return Parent;
    }()) || _class7);
    var StrategyResolver = exports.StrategyResolver = (_dec5 = resolver(), _dec5(_class9 = function () {
      function StrategyResolver(strategy, state) {
        

        this.strategy = strategy;
        this.state = state;
      }

      StrategyResolver.prototype.get = function get(container, key) {
        switch (this.strategy) {
          case 0:
            return this.state;
          case 1:
            var singleton = container.invoke(this.state);
            this.state = singleton;
            this.strategy = 0;
            return singleton;
          case 2:
            return container.invoke(this.state);
          case 3:
            return this.state(container, key, this);
          case 4:
            return this.state[0].get(container, key);
          case 5:
            return container.get(this.state);
          default:
            throw new Error('Invalid strategy: ' + this.strategy);
        }
      };

      return StrategyResolver;
    }()) || _class9);
    var Factory = exports.Factory = (_dec6 = resolver(), _dec6(_class11 = function () {
      function Factory(key) {
        

        this._key = key;
      }

      Factory.prototype.get = function get(container) {
        var _this2 = this;

        return function () {
          for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }

          return container.invoke(_this2._key, rest);
        };
      };

      Factory.of = function of(key) {
        return new Factory(key);
      };

      return Factory;
    }()) || _class11);
    var NewInstance = exports.NewInstance = (_dec7 = resolver(), _dec7(_class13 = function () {
      function NewInstance(key) {
        

        this.key = key;
        this.asKey = key;

        for (var _len2 = arguments.length, dynamicDependencies = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          dynamicDependencies[_key2 - 1] = arguments[_key2];
        }

        this.dynamicDependencies = dynamicDependencies;
      }

      NewInstance.prototype.get = function get(container) {
        var dynamicDependencies = this.dynamicDependencies.length > 0 ? this.dynamicDependencies.map(function (dependency) {
          return dependency['protocol:aurelia:resolver'] ? dependency.get(container) : container.get(dependency);
        }) : undefined;
        var instance = container.invoke(this.key, dynamicDependencies);
        container.registerInstance(this.asKey, instance);
        return instance;
      };

      NewInstance.prototype.as = function as(key) {
        this.asKey = key;
        return this;
      };

      NewInstance.of = function of(key) {
        for (var _len3 = arguments.length, dynamicDependencies = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          dynamicDependencies[_key3 - 1] = arguments[_key3];
        }

        return new (Function.prototype.bind.apply(NewInstance, [null].concat([key], dynamicDependencies)))();
      };

      return NewInstance;
    }()) || _class13);
    function getDecoratorDependencies(target, name) {
      var dependencies = target.inject;
      if (typeof dependencies === 'function') {
        throw new Error('Decorator ' + name + ' cannot be used with "inject()".  Please use an array instead.');
      }
      if (!dependencies) {
        dependencies = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, target).slice();
        target.inject = dependencies;
      }

      return dependencies;
    }

    function lazy(keyValue) {
      return function (target, key, index) {
        var params = getDecoratorDependencies(target, 'lazy');
        params[index] = Lazy.of(keyValue);
      };
    }

    function all(keyValue) {
      return function (target, key, index) {
        var params = getDecoratorDependencies(target, 'all');
        params[index] = All.of(keyValue);
      };
    }

    function optional() {
      var checkParentOrTarget = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      var deco = function deco(checkParent) {
        return function (target, key, index) {
          var params = getDecoratorDependencies(target, 'optional');
          params[index] = Optional.of(params[index], checkParent);
        };
      };
      if (typeof checkParentOrTarget === 'boolean') {
        return deco(checkParentOrTarget);
      }
      return deco(true);
    }

    function parent(target, key, index) {
      var params = getDecoratorDependencies(target, 'parent');
      params[index] = Parent.of(params[index]);
    }

    function factory(keyValue, asValue) {
      return function (target, key, index) {
        var params = getDecoratorDependencies(target, 'factory');
        var factory = Factory.of(keyValue);
        params[index] = asValue ? factory.as(asValue) : factory;
      };
    }

    function newInstance(asKeyOrTarget) {
      for (var _len4 = arguments.length, dynamicDependencies = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        dynamicDependencies[_key4 - 1] = arguments[_key4];
      }

      var deco = function deco(asKey) {
        return function (target, key, index) {
          var params = getDecoratorDependencies(target, 'newInstance');
          params[index] = NewInstance.of.apply(NewInstance, [params[index]].concat(dynamicDependencies));
          if (!!asKey) {
            params[index].as(asKey);
          }
        };
      };
      if (arguments.length >= 1) {
        return deco(asKeyOrTarget);
      }
      return deco();
    }

    function invoker(value) {
      return function (target) {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.invoker, value, target);
      };
    }

    function invokeAsFactory(potentialTarget) {
      var deco = function deco(target) {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.invoker, FactoryInvoker.instance, target);
      };

      return potentialTarget ? deco(potentialTarget) : deco;
    }

    var FactoryInvoker = exports.FactoryInvoker = function () {
      function FactoryInvoker() {
        
      }

      FactoryInvoker.prototype.invoke = function invoke(container, fn, dependencies) {
        var i = dependencies.length;
        var args = new Array(i);

        while (i--) {
          args[i] = container.get(dependencies[i]);
        }

        return fn.apply(undefined, args);
      };

      FactoryInvoker.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
        var i = staticDependencies.length;
        var args = new Array(i);

        while (i--) {
          args[i] = container.get(staticDependencies[i]);
        }

        if (dynamicDependencies !== undefined) {
          args = args.concat(dynamicDependencies);
        }

        return fn.apply(undefined, args);
      };

      return FactoryInvoker;
    }();

    FactoryInvoker.instance = new FactoryInvoker();

    function registration(value) {
      return function (target) {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.registration, value, target);
      };
    }

    function transient(key) {
      return registration(new TransientRegistration(key));
    }

    function singleton(keyOrRegisterInChild) {
      var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
    }

    var TransientRegistration = exports.TransientRegistration = function () {
      function TransientRegistration(key) {
        

        this._key = key;
      }

      TransientRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
        var existingResolver = container.getResolver(this._key || key);
        return existingResolver === undefined ? container.registerTransient(this._key || key, fn) : existingResolver;
      };

      return TransientRegistration;
    }();

    var SingletonRegistration = exports.SingletonRegistration = function () {
      function SingletonRegistration(keyOrRegisterInChild) {
        var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        

        if (typeof keyOrRegisterInChild === 'boolean') {
          this._registerInChild = keyOrRegisterInChild;
        } else {
          this._key = keyOrRegisterInChild;
          this._registerInChild = registerInChild;
        }
      }

      SingletonRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
        var targetContainer = this._registerInChild ? container : container.root;
        var existingResolver = targetContainer.getResolver(this._key || key);
        return existingResolver === undefined ? targetContainer.registerSingleton(this._key || key, fn) : existingResolver;
      };

      return SingletonRegistration;
    }();

    function validateKey(key) {
      if (key === null || key === undefined) {
        throw new Error('key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
      }
    }
    var _emptyParameters = exports._emptyParameters = Object.freeze([]);

    aureliaMetadata.metadata.registration = 'aurelia:registration';
    aureliaMetadata.metadata.invoker = 'aurelia:invoker';

    var resolverDecorates = resolver.decorates;

    var InvocationHandler = exports.InvocationHandler = function () {
      function InvocationHandler(fn, invoker, dependencies) {
        

        this.fn = fn;
        this.invoker = invoker;
        this.dependencies = dependencies;
      }

      InvocationHandler.prototype.invoke = function invoke(container, dynamicDependencies) {
        return dynamicDependencies !== undefined ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies) : this.invoker.invoke(container, this.fn, this.dependencies);
      };

      return InvocationHandler;
    }();

    function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
      var i = staticDependencies.length;
      var args = new Array(i);
      var lookup = void 0;

      while (i--) {
        lookup = staticDependencies[i];

        if (lookup === null || lookup === undefined) {
          throw new Error('Constructor Parameter with index ' + i + ' cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
        } else {
          args[i] = container.get(lookup);
        }
      }

      if (dynamicDependencies !== undefined) {
        args = args.concat(dynamicDependencies);
      }

      return Reflect.construct(fn, args);
    }

    var classInvokers = (_classInvokers = {}, _classInvokers[0] = {
      invoke: function invoke(container, Type) {
        return new Type();
      },

      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classInvokers[1] = {
      invoke: function invoke(container, Type, deps) {
        return new Type(container.get(deps[0]));
      },

      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classInvokers[2] = {
      invoke: function invoke(container, Type, deps) {
        return new Type(container.get(deps[0]), container.get(deps[1]));
      },

      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classInvokers[3] = {
      invoke: function invoke(container, Type, deps) {
        return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]));
      },

      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classInvokers[4] = {
      invoke: function invoke(container, Type, deps) {
        return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]));
      },

      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classInvokers[5] = {
      invoke: function invoke(container, Type, deps) {
        return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]), container.get(deps[4]));
      },

      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classInvokers.fallback = {
      invoke: invokeWithDynamicDependencies,
      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classInvokers);

    function getDependencies(f) {
      if (!f.hasOwnProperty('inject')) {
        return [];
      }

      if (typeof f.inject === 'function') {
        return f.inject();
      }

      return f.inject;
    }

    var Container = exports.Container = function () {
      function Container(configuration) {
        

        if (configuration === undefined) {
          configuration = {};
        }

        this._configuration = configuration;
        this._onHandlerCreated = configuration.onHandlerCreated;
        this._handlers = configuration.handlers || (configuration.handlers = new Map());
        this._resolvers = new Map();
        this.root = this;
        this.parent = null;
      }

      Container.prototype.makeGlobal = function makeGlobal() {
        Container.instance = this;
        return this;
      };

      Container.prototype.setHandlerCreatedCallback = function setHandlerCreatedCallback(onHandlerCreated) {
        this._onHandlerCreated = onHandlerCreated;
        this._configuration.onHandlerCreated = onHandlerCreated;
      };

      Container.prototype.registerInstance = function registerInstance(key, instance) {
        return this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
      };

      Container.prototype.registerSingleton = function registerSingleton(key, fn) {
        return this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
      };

      Container.prototype.registerTransient = function registerTransient(key, fn) {
        return this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
      };

      Container.prototype.registerHandler = function registerHandler(key, handler) {
        return this.registerResolver(key, new StrategyResolver(3, handler));
      };

      Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
        return this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
      };

      Container.prototype.registerResolver = function registerResolver(key, resolver) {
        validateKey(key);

        var allResolvers = this._resolvers;
        var result = allResolvers.get(key);

        if (result === undefined) {
          allResolvers.set(key, resolver);
        } else if (result.strategy === 4) {
          result.state.push(resolver);
        } else {
          allResolvers.set(key, new StrategyResolver(4, [result, resolver]));
        }

        return resolver;
      };

      Container.prototype.autoRegister = function autoRegister(key, fn) {
        fn = fn === undefined ? key : fn;

        if (typeof fn === 'function') {
          var _registration = aureliaMetadata.metadata.get(aureliaMetadata.metadata.registration, fn);

          if (_registration === undefined) {
            return this.registerResolver(key, new StrategyResolver(1, fn));
          }

          return _registration.registerResolver(this, key, fn);
        }

        return this.registerResolver(key, new StrategyResolver(0, fn));
      };

      Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
        var i = fns.length;
        while (i--) {
          this.autoRegister(fns[i]);
        }
      };

      Container.prototype.unregister = function unregister(key) {
        this._resolvers.delete(key);
      };

      Container.prototype.hasResolver = function hasResolver(key) {
        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        validateKey(key);

        return this._resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
      };

      Container.prototype.getResolver = function getResolver(key) {
        return this._resolvers.get(key);
      };

      Container.prototype.get = function get(key) {
        validateKey(key);

        if (key === Container) {
          return this;
        }

        if (resolverDecorates(key)) {
          return key.get(this, key);
        }

        var resolver = this._resolvers.get(key);

        if (resolver === undefined) {
          if (this.parent === null) {
            return this.autoRegister(key).get(this, key);
          }

          var _registration2 = aureliaMetadata.metadata.get(aureliaMetadata.metadata.registration, key);

          if (_registration2 === undefined) {
            return this.parent._get(key);
          }

          return _registration2.registerResolver(this, key, key).get(this, key);
        }

        return resolver.get(this, key);
      };

      Container.prototype._get = function _get(key) {
        var resolver = this._resolvers.get(key);

        if (resolver === undefined) {
          if (this.parent === null) {
            return this.autoRegister(key).get(this, key);
          }

          return this.parent._get(key);
        }

        return resolver.get(this, key);
      };

      Container.prototype.getAll = function getAll(key) {
        validateKey(key);

        var resolver = this._resolvers.get(key);

        if (resolver === undefined) {
          if (this.parent === null) {
            return _emptyParameters;
          }

          return this.parent.getAll(key);
        }

        if (resolver.strategy === 4) {
          var state = resolver.state;
          var i = state.length;
          var results = new Array(i);

          while (i--) {
            results[i] = state[i].get(this, key);
          }

          return results;
        }

        return [resolver.get(this, key)];
      };

      Container.prototype.createChild = function createChild() {
        var child = new Container(this._configuration);
        child.root = this.root;
        child.parent = this;
        return child;
      };

      Container.prototype.invoke = function invoke(fn, dynamicDependencies) {
        try {
          var _handler = this._handlers.get(fn);

          if (_handler === undefined) {
            _handler = this._createInvocationHandler(fn);
            this._handlers.set(fn, _handler);
          }

          return _handler.invoke(this, dynamicDependencies);
        } catch (e) {
          throw new aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
        }
      };

      Container.prototype._createInvocationHandler = function _createInvocationHandler(fn) {
        var dependencies = void 0;

        if (fn.inject === undefined) {
          dependencies = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
        } else {
          dependencies = [];
          var ctor = fn;
          while (typeof ctor === 'function') {
            var _dependencies;

            (_dependencies = dependencies).push.apply(_dependencies, getDependencies(ctor));
            ctor = Object.getPrototypeOf(ctor);
          }
        }

        var invoker = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.invoker, fn) || classInvokers[dependencies.length] || classInvokers.fallback;

        var handler = new InvocationHandler(fn, invoker, dependencies);
        return this._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
      };

      return Container;
    }();

    function autoinject(potentialTarget) {
      var deco = function deco(target) {
        var previousInject = target.inject ? target.inject.slice() : null;
        var autoInject = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, target) || _emptyParameters;
        if (!previousInject) {
          target.inject = autoInject;
        } else {
          for (var i = 0; i < autoInject.length; i++) {
            if (previousInject[i] && previousInject[i] !== autoInject[i]) {
              var prevIndex = previousInject.indexOf(autoInject[i]);
              if (prevIndex > -1) {
                previousInject.splice(prevIndex, 1);
              }
              previousInject.splice(prevIndex > -1 && prevIndex < i ? i - 1 : i, 0, autoInject[i]);
            } else if (!previousInject[i]) {
              previousInject[i] = autoInject[i];
            }
          }
          target.inject = previousInject;
        }
      };

      return potentialTarget ? deco(potentialTarget) : deco;
    }

    function inject() {
      for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        rest[_key5] = arguments[_key5];
      }

      return function (target, key, descriptor) {
        if (typeof descriptor === 'number' && rest.length === 1) {
          var params = target.inject;
          if (typeof params === 'function') {
            throw new Error('Decorator inject cannot be used with "inject()".  Please use an array instead.');
          }
          if (!params) {
            params = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, target).slice();
            target.inject = params;
          }
          params[descriptor] = rest[0];
          return;
        }

        if (descriptor) {
          var _fn = descriptor.value;
          _fn.inject = rest;
        } else {
          target.inject = rest;
        }
      };
    }
    });

    unwrapExports(aureliaDependencyInjection);
    var aureliaDependencyInjection_1 = aureliaDependencyInjection.Container;
    var aureliaDependencyInjection_2 = aureliaDependencyInjection.InvocationHandler;
    var aureliaDependencyInjection_3 = aureliaDependencyInjection._emptyParameters;
    var aureliaDependencyInjection_4 = aureliaDependencyInjection.SingletonRegistration;
    var aureliaDependencyInjection_5 = aureliaDependencyInjection.TransientRegistration;
    var aureliaDependencyInjection_6 = aureliaDependencyInjection.FactoryInvoker;
    var aureliaDependencyInjection_7 = aureliaDependencyInjection.NewInstance;
    var aureliaDependencyInjection_8 = aureliaDependencyInjection.Factory;
    var aureliaDependencyInjection_9 = aureliaDependencyInjection.StrategyResolver;
    var aureliaDependencyInjection_10 = aureliaDependencyInjection.Parent;
    var aureliaDependencyInjection_11 = aureliaDependencyInjection.Optional;
    var aureliaDependencyInjection_12 = aureliaDependencyInjection.All;
    var aureliaDependencyInjection_13 = aureliaDependencyInjection.Lazy;
    var aureliaDependencyInjection_14 = aureliaDependencyInjection.resolver;
    var aureliaDependencyInjection_15 = aureliaDependencyInjection.getDecoratorDependencies;
    var aureliaDependencyInjection_16 = aureliaDependencyInjection.lazy;
    var aureliaDependencyInjection_17 = aureliaDependencyInjection.all;
    var aureliaDependencyInjection_18 = aureliaDependencyInjection.optional;
    var aureliaDependencyInjection_19 = aureliaDependencyInjection.parent;
    var aureliaDependencyInjection_20 = aureliaDependencyInjection.factory;
    var aureliaDependencyInjection_21 = aureliaDependencyInjection.newInstance;
    var aureliaDependencyInjection_22 = aureliaDependencyInjection.invoker;
    var aureliaDependencyInjection_23 = aureliaDependencyInjection.invokeAsFactory;
    var aureliaDependencyInjection_24 = aureliaDependencyInjection.registration;
    var aureliaDependencyInjection_25 = aureliaDependencyInjection.singleton;
    var aureliaDependencyInjection_26 = aureliaDependencyInjection.autoinject;
    var aureliaDependencyInjection_27 = aureliaDependencyInjection.inject;

    var aureliaLogging = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getLogger = getLogger;
    exports.addAppender = addAppender;
    exports.removeAppender = removeAppender;
    exports.getAppenders = getAppenders;
    exports.clearAppenders = clearAppenders;
    exports.addCustomLevel = addCustomLevel;
    exports.removeCustomLevel = removeCustomLevel;
    exports.setLevel = setLevel;
    exports.getLevel = getLevel;



    var logLevel = exports.logLevel = {
      none: 0,
      error: 10,
      warn: 20,
      info: 30,
      debug: 40
    };

    var loggers = {};
    var appenders = [];
    var globalDefaultLevel = logLevel.none;

    var standardLevels = ['none', 'error', 'warn', 'info', 'debug'];
    function isStandardLevel(level) {
      return standardLevels.filter(function (l) {
        return l === level;
      }).length > 0;
    }

    function appendArgs() {
      return [this].concat(Array.prototype.slice.call(arguments));
    }

    function logFactory(level) {
      var threshold = logLevel[level];
      return function () {
        if (this.level < threshold) {
          return;
        }

        var args = appendArgs.apply(this, arguments);
        var i = appenders.length;
        while (i--) {
          var _appenders$i;

          (_appenders$i = appenders[i])[level].apply(_appenders$i, args);
        }
      };
    }

    function logFactoryCustom(level) {
      var threshold = logLevel[level];
      return function () {
        if (this.level < threshold) {
          return;
        }

        var args = appendArgs.apply(this, arguments);
        var i = appenders.length;
        while (i--) {
          var appender = appenders[i];
          if (appender[level] !== undefined) {
            appender[level].apply(appender, args);
          }
        }
      };
    }

    function connectLoggers() {
      var proto = Logger.prototype;
      for (var _level in logLevel) {
        if (isStandardLevel(_level)) {
          if (_level !== 'none') {
            proto[_level] = logFactory(_level);
          }
        } else {
          proto[_level] = logFactoryCustom(_level);
        }
      }
    }

    function disconnectLoggers() {
      var proto = Logger.prototype;
      for (var _level2 in logLevel) {
        if (_level2 !== 'none') {
          proto[_level2] = function () {};
        }
      }
    }

    function getLogger(id) {
      return loggers[id] || new Logger(id);
    }

    function addAppender(appender) {
      if (appenders.push(appender) === 1) {
        connectLoggers();
      }
    }

    function removeAppender(appender) {
      appenders = appenders.filter(function (a) {
        return a !== appender;
      });
    }

    function getAppenders() {
      return [].concat(appenders);
    }

    function clearAppenders() {
      appenders = [];
      disconnectLoggers();
    }

    function addCustomLevel(name, value) {
      if (logLevel[name] !== undefined) {
        throw Error('Log level "' + name + '" already exists.');
      }

      if (isNaN(value)) {
        throw Error('Value must be a number.');
      }

      logLevel[name] = value;

      if (appenders.length > 0) {
        connectLoggers();
      } else {
        Logger.prototype[name] = function () {};
      }
    }

    function removeCustomLevel(name) {
      if (logLevel[name] === undefined) {
        return;
      }

      if (isStandardLevel(name)) {
        throw Error('Built-in log level "' + name + '" cannot be removed.');
      }

      delete logLevel[name];
      delete Logger.prototype[name];
    }

    function setLevel(level) {
      globalDefaultLevel = level;
      for (var key in loggers) {
        loggers[key].setLevel(level);
      }
    }

    function getLevel() {
      return globalDefaultLevel;
    }

    var Logger = exports.Logger = function () {
      function Logger(id) {
        

        var cached = loggers[id];
        if (cached) {
          return cached;
        }

        loggers[id] = this;
        this.id = id;
        this.level = globalDefaultLevel;
      }

      Logger.prototype.debug = function debug(message) {};

      Logger.prototype.info = function info(message) {};

      Logger.prototype.warn = function warn(message) {};

      Logger.prototype.error = function error(message) {};

      Logger.prototype.setLevel = function setLevel(level) {
        this.level = level;
      };

      return Logger;
    }();
    });

    unwrapExports(aureliaLogging);
    var aureliaLogging_1 = aureliaLogging.getLogger;
    var aureliaLogging_2 = aureliaLogging.addAppender;
    var aureliaLogging_3 = aureliaLogging.removeAppender;
    var aureliaLogging_4 = aureliaLogging.getAppenders;
    var aureliaLogging_5 = aureliaLogging.clearAppenders;
    var aureliaLogging_6 = aureliaLogging.addCustomLevel;
    var aureliaLogging_7 = aureliaLogging.removeCustomLevel;
    var aureliaLogging_8 = aureliaLogging.setLevel;
    var aureliaLogging_9 = aureliaLogging.getLevel;
    var aureliaLogging_10 = aureliaLogging.logLevel;
    var aureliaLogging_11 = aureliaLogging.Logger;

    var aureliaTaskQueue = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TaskQueue = undefined;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





    var stackSeparator = '\nEnqueued in TaskQueue by:\n';
    var microStackSeparator = '\nEnqueued in MicroTaskQueue by:\n';

    function makeRequestFlushFromMutationObserver(flush) {
      var toggle = 1;
      var observer = aureliaPal.DOM.createMutationObserver(flush);
      var node = aureliaPal.DOM.createTextNode('');
      observer.observe(node, { characterData: true });
      return function requestFlush() {
        toggle = -toggle;
        node.data = toggle;
      };
    }

    function makeRequestFlushFromTimer(flush) {
      return function requestFlush() {
        var timeoutHandle = setTimeout(handleFlushTimer, 0);

        var intervalHandle = setInterval(handleFlushTimer, 50);
        function handleFlushTimer() {
          clearTimeout(timeoutHandle);
          clearInterval(intervalHandle);
          flush();
        }
      };
    }

    function onError(error, task, longStacks) {
      if (longStacks && task.stack && (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error !== null) {
        error.stack = filterFlushStack(error.stack) + task.stack;
      }

      if ('onError' in task) {
        task.onError(error);
      } else {
        setTimeout(function () {
          throw error;
        }, 0);
      }
    }

    var TaskQueue = exports.TaskQueue = function () {
      function TaskQueue() {
        var _this = this;

        

        this.flushing = false;
        this.longStacks = false;

        this.microTaskQueue = [];
        this.microTaskQueueCapacity = 1024;
        this.taskQueue = [];

        if (aureliaPal.FEATURE.mutationObserver) {
          this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function () {
            return _this.flushMicroTaskQueue();
          });
        } else {
          this.requestFlushMicroTaskQueue = makeRequestFlushFromTimer(function () {
            return _this.flushMicroTaskQueue();
          });
        }

        this.requestFlushTaskQueue = makeRequestFlushFromTimer(function () {
          return _this.flushTaskQueue();
        });
      }

      TaskQueue.prototype._flushQueue = function _flushQueue(queue, capacity) {
        var index = 0;
        var task = void 0;

        try {
          this.flushing = true;
          while (index < queue.length) {
            task = queue[index];
            if (this.longStacks) {
              this.stack = typeof task.stack === 'string' ? task.stack : undefined;
            }
            task.call();
            index++;

            if (index > capacity) {
              for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
              }

              queue.length -= index;
              index = 0;
            }
          }
        } catch (error) {
          onError(error, task, this.longStacks);
        } finally {
          this.flushing = false;
        }
      };

      TaskQueue.prototype.queueMicroTask = function queueMicroTask(task) {
        if (this.microTaskQueue.length < 1) {
          this.requestFlushMicroTaskQueue();
        }

        if (this.longStacks) {
          task.stack = this.prepareQueueStack(microStackSeparator);
        }

        this.microTaskQueue.push(task);
      };

      TaskQueue.prototype.queueTask = function queueTask(task) {
        if (this.taskQueue.length < 1) {
          this.requestFlushTaskQueue();
        }

        if (this.longStacks) {
          task.stack = this.prepareQueueStack(stackSeparator);
        }

        this.taskQueue.push(task);
      };

      TaskQueue.prototype.flushTaskQueue = function flushTaskQueue() {
        var queue = this.taskQueue;
        this.taskQueue = [];
        this._flushQueue(queue, Number.MAX_VALUE);
      };

      TaskQueue.prototype.flushMicroTaskQueue = function flushMicroTaskQueue() {
        var queue = this.microTaskQueue;
        this._flushQueue(queue, this.microTaskQueueCapacity);
        queue.length = 0;
      };

      TaskQueue.prototype.prepareQueueStack = function prepareQueueStack(separator) {
        var stack = separator + filterQueueStack(captureStack());

        if (typeof this.stack === 'string') {
          stack = filterFlushStack(stack) + this.stack;
        }

        return stack;
      };

      return TaskQueue;
    }();

    function captureStack() {
      var error = new Error();

      if (error.stack) {
        return error.stack;
      }

      try {
        throw error;
      } catch (e) {
        return e.stack;
      }
    }

    function filterQueueStack(stack) {
      return stack.replace(/^[\s\S]*?\bqueue(Micro)?Task\b[^\n]*\n/, '');
    }

    function filterFlushStack(stack) {
      var index = stack.lastIndexOf('flushMicroTaskQueue');

      if (index < 0) {
        index = stack.lastIndexOf('flushTaskQueue');
        if (index < 0) {
          return stack;
        }
      }

      index = stack.lastIndexOf('\n', index);

      return index < 0 ? stack : stack.substr(0, index);
    }
    });

    unwrapExports(aureliaTaskQueue);
    var aureliaTaskQueue_1 = aureliaTaskQueue.TaskQueue;

    var aureliaBinding = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getSetObserver = exports.BindingEngine = exports.NameExpression = exports.Listener = exports.ListenerExpression = exports.BindingBehaviorResource = exports.ValueConverterResource = exports.Call = exports.CallExpression = exports.Binding = exports.BindingExpression = exports.ObjectObservationAdapter = exports.ObserverLocator = exports.SVGAnalyzer = exports.presentationAttributes = exports.presentationElements = exports.elements = exports.ComputedExpression = exports.ClassObserver = exports.SelectValueObserver = exports.CheckedObserver = exports.ValueAttributeObserver = exports.StyleObserver = exports.DataAttributeObserver = exports.dataAttributeAccessor = exports.XLinkAttributeObserver = exports.SetterObserver = exports.PrimitiveObserver = exports.propertyAccessor = exports.DirtyCheckProperty = exports.DirtyChecker = exports.EventSubscriber = exports.EventManager = exports.delegationStrategy = exports.getMapObserver = exports.ParserImplementation = exports.Parser = exports.Scanner = exports.Lexer = exports.Token = exports.bindingMode = exports.ExpressionCloner = exports.Unparser = exports.LiteralObject = exports.LiteralArray = exports.LiteralString = exports.LiteralPrimitive = exports.PrefixNot = exports.Binary = exports.CallFunction = exports.CallMember = exports.CallScope = exports.AccessKeyed = exports.AccessMember = exports.AccessScope = exports.AccessThis = exports.Conditional = exports.Assign = exports.ValueConverter = exports.BindingBehavior = exports.Chain = exports.Expression = exports.getArrayObserver = exports.CollectionLengthObserver = exports.ModifyCollectionObserver = exports.ExpressionObserver = exports.sourceContext = exports.targetContext = undefined;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _dec, _dec2, _class, _dec3, _class2, _dec4, _class3, _dec5, _class5, _dec6, _class7, _dec7, _class8, _dec8, _class9, _dec9, _class10, _class12, _temp, _dec10, _class13, _class14, _temp2;

    exports.camelCase = camelCase;
    exports.createOverrideContext = createOverrideContext;
    exports.getContextFor = getContextFor;
    exports.createScopeForTest = createScopeForTest;
    exports.connectable = connectable;
    exports.enqueueBindingConnect = enqueueBindingConnect;
    exports.subscriberCollection = subscriberCollection;
    exports.calcSplices = calcSplices;
    exports.mergeSplice = mergeSplice;
    exports.projectArraySplices = projectArraySplices;
    exports.getChangeRecords = getChangeRecords;
    exports.cloneExpression = cloneExpression;
    exports.hasDeclaredDependencies = hasDeclaredDependencies;
    exports.declarePropertyDependencies = declarePropertyDependencies;
    exports.computedFrom = computedFrom;
    exports.createComputedObserver = createComputedObserver;
    exports.valueConverter = valueConverter;
    exports.bindingBehavior = bindingBehavior;
    exports.observable = observable;
    exports.connectBindingToSignal = connectBindingToSignal;
    exports.signalBindings = signalBindings;



    var LogManager = _interopRequireWildcard(aureliaLogging);







    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



    var targetContext = exports.targetContext = 'Binding:target';
    var sourceContext = exports.sourceContext = 'Binding:source';

    var map = Object.create(null);

    function camelCase(name) {
      if (name in map) {
        return map[name];
      }
      var result = name.charAt(0).toLowerCase() + name.slice(1).replace(/[_.-](\w|$)/g, function (_, x) {
        return x.toUpperCase();
      });
      map[name] = result;
      return result;
    }

    function createOverrideContext(bindingContext, parentOverrideContext) {
      return {
        bindingContext: bindingContext,
        parentOverrideContext: parentOverrideContext || null
      };
    }

    function getContextFor(name, scope, ancestor) {
      var oc = scope.overrideContext;

      if (ancestor) {
        while (ancestor && oc) {
          ancestor--;
          oc = oc.parentOverrideContext;
        }
        if (ancestor || !oc) {
          return undefined;
        }
        return name in oc ? oc : oc.bindingContext;
      }

      while (oc && !(name in oc) && !(oc.bindingContext && name in oc.bindingContext)) {
        oc = oc.parentOverrideContext;
      }
      if (oc) {
        return name in oc ? oc : oc.bindingContext;
      }

      return scope.bindingContext || scope.overrideContext;
    }

    function createScopeForTest(bindingContext, parentBindingContext) {
      if (parentBindingContext) {
        return {
          bindingContext: bindingContext,
          overrideContext: createOverrideContext(bindingContext, createOverrideContext(parentBindingContext))
        };
      }
      return {
        bindingContext: bindingContext,
        overrideContext: createOverrideContext(bindingContext)
      };
    }

    var slotNames = [];
    var versionSlotNames = [];

    for (var i = 0; i < 100; i++) {
      slotNames.push('_observer' + i);
      versionSlotNames.push('_observerVersion' + i);
    }

    function addObserver(observer) {
      var observerSlots = this._observerSlots === undefined ? 0 : this._observerSlots;
      var i = observerSlots;
      while (i-- && this[slotNames[i]] !== observer) {}

      if (i === -1) {
        i = 0;
        while (this[slotNames[i]]) {
          i++;
        }
        this[slotNames[i]] = observer;
        observer.subscribe(sourceContext, this);

        if (i === observerSlots) {
          this._observerSlots = i + 1;
        }
      }

      if (this._version === undefined) {
        this._version = 0;
      }
      this[versionSlotNames[i]] = this._version;
    }

    function observeProperty(obj, propertyName) {
      var observer = this.observerLocator.getObserver(obj, propertyName);
      addObserver.call(this, observer);
    }

    function observeArray(array) {
      var observer = this.observerLocator.getArrayObserver(array);
      addObserver.call(this, observer);
    }

    function unobserve(all) {
      var i = this._observerSlots;
      while (i--) {
        if (all || this[versionSlotNames[i]] !== this._version) {
          var observer = this[slotNames[i]];
          this[slotNames[i]] = null;
          if (observer) {
            observer.unsubscribe(sourceContext, this);
          }
        }
      }
    }

    function connectable() {
      return function (target) {
        target.prototype.observeProperty = observeProperty;
        target.prototype.observeArray = observeArray;
        target.prototype.unobserve = unobserve;
        target.prototype.addObserver = addObserver;
      };
    }

    var queue = [];
    var queued = {};
    var nextId = 0;
    var minimumImmediate = 100;
    var frameBudget = 15;

    var isFlushRequested = false;
    var immediate = 0;

    function flush(animationFrameStart) {
      var length = queue.length;
      var i = 0;
      while (i < length) {
        var binding = queue[i];
        queued[binding.__connectQueueId] = false;
        binding.connect(true);
        i++;

        if (i % 100 === 0 && aureliaPal.PLATFORM.performance.now() - animationFrameStart > frameBudget) {
          break;
        }
      }
      queue.splice(0, i);

      if (queue.length) {
        aureliaPal.PLATFORM.requestAnimationFrame(flush);
      } else {
        isFlushRequested = false;
        immediate = 0;
      }
    }

    function enqueueBindingConnect(binding) {
      if (immediate < minimumImmediate) {
        immediate++;
        binding.connect(false);
      } else {
        var id = binding.__connectQueueId;
        if (id === undefined) {
          id = nextId;
          nextId++;
          binding.__connectQueueId = id;
        }

        if (!queued[id]) {
          queue.push(binding);
          queued[id] = true;
        }
      }
      if (!isFlushRequested) {
        isFlushRequested = true;
        aureliaPal.PLATFORM.requestAnimationFrame(flush);
      }
    }

    function addSubscriber(context, callable) {
      if (this.hasSubscriber(context, callable)) {
        return false;
      }
      if (!this._context0) {
        this._context0 = context;
        this._callable0 = callable;
        return true;
      }
      if (!this._context1) {
        this._context1 = context;
        this._callable1 = callable;
        return true;
      }
      if (!this._context2) {
        this._context2 = context;
        this._callable2 = callable;
        return true;
      }
      if (!this._contextsRest) {
        this._contextsRest = [context];
        this._callablesRest = [callable];
        return true;
      }
      this._contextsRest.push(context);
      this._callablesRest.push(callable);
      return true;
    }

    function removeSubscriber(context, callable) {
      if (this._context0 === context && this._callable0 === callable) {
        this._context0 = null;
        this._callable0 = null;
        return true;
      }
      if (this._context1 === context && this._callable1 === callable) {
        this._context1 = null;
        this._callable1 = null;
        return true;
      }
      if (this._context2 === context && this._callable2 === callable) {
        this._context2 = null;
        this._callable2 = null;
        return true;
      }
      var callables = this._callablesRest;
      if (callables === undefined || callables.length === 0) {
        return false;
      }
      var contexts = this._contextsRest;
      var i = 0;
      while (!(callables[i] === callable && contexts[i] === context) && callables.length > i) {
        i++;
      }
      if (i >= callables.length) {
        return false;
      }
      contexts.splice(i, 1);
      callables.splice(i, 1);
      return true;
    }

    var arrayPool1 = [];
    var arrayPool2 = [];
    var poolUtilization = [];

    function callSubscribers(newValue, oldValue) {
      var context0 = this._context0;
      var callable0 = this._callable0;
      var context1 = this._context1;
      var callable1 = this._callable1;
      var context2 = this._context2;
      var callable2 = this._callable2;
      var length = this._contextsRest ? this._contextsRest.length : 0;
      var contextsRest = void 0;
      var callablesRest = void 0;
      var poolIndex = void 0;
      var i = void 0;
      if (length) {
        poolIndex = poolUtilization.length;
        while (poolIndex-- && poolUtilization[poolIndex]) {}
        if (poolIndex < 0) {
          poolIndex = poolUtilization.length;
          contextsRest = [];
          callablesRest = [];
          poolUtilization.push(true);
          arrayPool1.push(contextsRest);
          arrayPool2.push(callablesRest);
        } else {
          poolUtilization[poolIndex] = true;
          contextsRest = arrayPool1[poolIndex];
          callablesRest = arrayPool2[poolIndex];
        }

        i = length;
        while (i--) {
          contextsRest[i] = this._contextsRest[i];
          callablesRest[i] = this._callablesRest[i];
        }
      }

      if (context0) {
        if (callable0) {
          callable0.call(context0, newValue, oldValue);
        } else {
          context0(newValue, oldValue);
        }
      }
      if (context1) {
        if (callable1) {
          callable1.call(context1, newValue, oldValue);
        } else {
          context1(newValue, oldValue);
        }
      }
      if (context2) {
        if (callable2) {
          callable2.call(context2, newValue, oldValue);
        } else {
          context2(newValue, oldValue);
        }
      }
      if (length) {
        for (i = 0; i < length; i++) {
          var callable = callablesRest[i];
          var context = contextsRest[i];
          if (callable) {
            callable.call(context, newValue, oldValue);
          } else {
            context(newValue, oldValue);
          }
          contextsRest[i] = null;
          callablesRest[i] = null;
        }
        poolUtilization[poolIndex] = false;
      }
    }

    function hasSubscribers() {
      return !!(this._context0 || this._context1 || this._context2 || this._contextsRest && this._contextsRest.length);
    }

    function hasSubscriber(context, callable) {
      var has = this._context0 === context && this._callable0 === callable || this._context1 === context && this._callable1 === callable || this._context2 === context && this._callable2 === callable;
      if (has) {
        return true;
      }
      var index = void 0;
      var contexts = this._contextsRest;
      if (!contexts || (index = contexts.length) === 0) {
        return false;
      }
      var callables = this._callablesRest;
      while (index--) {
        if (contexts[index] === context && callables[index] === callable) {
          return true;
        }
      }
      return false;
    }

    function subscriberCollection() {
      return function (target) {
        target.prototype.addSubscriber = addSubscriber;
        target.prototype.removeSubscriber = removeSubscriber;
        target.prototype.callSubscribers = callSubscribers;
        target.prototype.hasSubscribers = hasSubscribers;
        target.prototype.hasSubscriber = hasSubscriber;
      };
    }

    var ExpressionObserver = exports.ExpressionObserver = (_dec = connectable(), _dec2 = subscriberCollection(), _dec(_class = _dec2(_class = function () {
      function ExpressionObserver(scope, expression, observerLocator, lookupFunctions) {
        

        this.scope = scope;
        this.expression = expression;
        this.observerLocator = observerLocator;
        this.lookupFunctions = lookupFunctions;
      }

      ExpressionObserver.prototype.getValue = function getValue() {
        return this.expression.evaluate(this.scope, this.lookupFunctions);
      };

      ExpressionObserver.prototype.setValue = function setValue(newValue) {
        this.expression.assign(this.scope, newValue);
      };

      ExpressionObserver.prototype.subscribe = function subscribe(context, callable) {
        var _this = this;

        if (!this.hasSubscribers()) {
          this.oldValue = this.expression.evaluate(this.scope, this.lookupFunctions);
          this.expression.connect(this, this.scope);
        }
        this.addSubscriber(context, callable);
        if (arguments.length === 1 && context instanceof Function) {
          return {
            dispose: function dispose() {
              _this.unsubscribe(context, callable);
            }
          };
        }
      };

      ExpressionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.unobserve(true);
          this.oldValue = undefined;
        }
      };

      ExpressionObserver.prototype.call = function call() {
        var newValue = this.expression.evaluate(this.scope, this.lookupFunctions);
        var oldValue = this.oldValue;
        if (newValue !== oldValue) {
          this.oldValue = newValue;
          this.callSubscribers(newValue, oldValue);
        }
        this._version++;
        this.expression.connect(this, this.scope);
        this.unobserve(false);
      };

      return ExpressionObserver;
    }()) || _class) || _class);


    function isIndex(s) {
      return +s === s >>> 0;
    }

    function toNumber(s) {
      return +s;
    }

    function newSplice(index, removed, addedCount) {
      return {
        index: index,
        removed: removed,
        addedCount: addedCount
      };
    }

    var EDIT_LEAVE = 0;
    var EDIT_UPDATE = 1;
    var EDIT_ADD = 2;
    var EDIT_DELETE = 3;

    function ArraySplice() {}

    ArraySplice.prototype = {
      calcEditDistances: function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
        var rowCount = oldEnd - oldStart + 1;
        var columnCount = currentEnd - currentStart + 1;
        var distances = new Array(rowCount);
        var north = void 0;
        var west = void 0;

        for (var _i = 0; _i < rowCount; ++_i) {
          distances[_i] = new Array(columnCount);
          distances[_i][0] = _i;
        }

        for (var j = 0; j < columnCount; ++j) {
          distances[0][j] = j;
        }

        for (var _i2 = 1; _i2 < rowCount; ++_i2) {
          for (var _j = 1; _j < columnCount; ++_j) {
            if (this.equals(current[currentStart + _j - 1], old[oldStart + _i2 - 1])) {
              distances[_i2][_j] = distances[_i2 - 1][_j - 1];
            } else {
              north = distances[_i2 - 1][_j] + 1;
              west = distances[_i2][_j - 1] + 1;
              distances[_i2][_j] = north < west ? north : west;
            }
          }
        }

        return distances;
      },

      spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
        var i = distances.length - 1;
        var j = distances[0].length - 1;
        var current = distances[i][j];
        var edits = [];
        while (i > 0 || j > 0) {
          if (i === 0) {
            edits.push(EDIT_ADD);
            j--;
            continue;
          }
          if (j === 0) {
            edits.push(EDIT_DELETE);
            i--;
            continue;
          }
          var northWest = distances[i - 1][j - 1];
          var west = distances[i - 1][j];
          var north = distances[i][j - 1];

          var min = void 0;
          if (west < north) {
            min = west < northWest ? west : northWest;
          } else {
            min = north < northWest ? north : northWest;
          }

          if (min === northWest) {
            if (northWest === current) {
              edits.push(EDIT_LEAVE);
            } else {
              edits.push(EDIT_UPDATE);
              current = northWest;
            }
            i--;
            j--;
          } else if (min === west) {
            edits.push(EDIT_DELETE);
            i--;
            current = west;
          } else {
            edits.push(EDIT_ADD);
            j--;
            current = north;
          }
        }

        edits.reverse();
        return edits;
      },

      calcSplices: function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
        var prefixCount = 0;
        var suffixCount = 0;

        var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
        if (currentStart === 0 && oldStart === 0) {
          prefixCount = this.sharedPrefix(current, old, minLength);
        }

        if (currentEnd === current.length && oldEnd === old.length) {
          suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
        }

        currentStart += prefixCount;
        oldStart += prefixCount;
        currentEnd -= suffixCount;
        oldEnd -= suffixCount;

        if (currentEnd - currentStart === 0 && oldEnd - oldStart === 0) {
          return [];
        }

        if (currentStart === currentEnd) {
          var _splice = newSplice(currentStart, [], 0);
          while (oldStart < oldEnd) {
            _splice.removed.push(old[oldStart++]);
          }

          return [_splice];
        } else if (oldStart === oldEnd) {
          return [newSplice(currentStart, [], currentEnd - currentStart)];
        }

        var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));

        var splice = undefined;
        var splices = [];
        var index = currentStart;
        var oldIndex = oldStart;
        for (var _i3 = 0; _i3 < ops.length; ++_i3) {
          switch (ops[_i3]) {
            case EDIT_LEAVE:
              if (splice) {
                splices.push(splice);
                splice = undefined;
              }

              index++;
              oldIndex++;
              break;
            case EDIT_UPDATE:
              if (!splice) {
                splice = newSplice(index, [], 0);
              }

              splice.addedCount++;
              index++;

              splice.removed.push(old[oldIndex]);
              oldIndex++;
              break;
            case EDIT_ADD:
              if (!splice) {
                splice = newSplice(index, [], 0);
              }

              splice.addedCount++;
              index++;
              break;
            case EDIT_DELETE:
              if (!splice) {
                splice = newSplice(index, [], 0);
              }

              splice.removed.push(old[oldIndex]);
              oldIndex++;
              break;
          }
        }

        if (splice) {
          splices.push(splice);
        }
        return splices;
      },

      sharedPrefix: function sharedPrefix(current, old, searchLength) {
        for (var _i4 = 0; _i4 < searchLength; ++_i4) {
          if (!this.equals(current[_i4], old[_i4])) {
            return _i4;
          }
        }

        return searchLength;
      },

      sharedSuffix: function sharedSuffix(current, old, searchLength) {
        var index1 = current.length;
        var index2 = old.length;
        var count = 0;
        while (count < searchLength && this.equals(current[--index1], old[--index2])) {
          count++;
        }

        return count;
      },

      calculateSplices: function calculateSplices(current, previous) {
        return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
      },

      equals: function equals(currentValue, previousValue) {
        return currentValue === previousValue;
      }
    };

    var arraySplice = new ArraySplice();

    function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
      return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
    }

    function intersect(start1, end1, start2, end2) {
      if (end1 < start2 || end2 < start1) {
        return -1;
      }

      if (end1 === start2 || end2 === start1) {
        return 0;
      }

      if (start1 < start2) {
        if (end1 < end2) {
          return end1 - start2;
        }

        return end2 - start2;
      }

      if (end2 < end1) {
        return end2 - start1;
      }

      return end1 - start1;
    }

    function mergeSplice(splices, index, removed, addedCount) {
      var splice = newSplice(index, removed, addedCount);

      var inserted = false;
      var insertionOffset = 0;

      for (var _i5 = 0; _i5 < splices.length; _i5++) {
        var current = splices[_i5];
        current.index += insertionOffset;

        if (inserted) {
          continue;
        }

        var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);

        if (intersectCount >= 0) {

          splices.splice(_i5, 1);
          _i5--;

          insertionOffset -= current.addedCount - current.removed.length;

          splice.addedCount += current.addedCount - intersectCount;
          var deleteCount = splice.removed.length + current.removed.length - intersectCount;

          if (!splice.addedCount && !deleteCount) {
            inserted = true;
          } else {
            var currentRemoved = current.removed;

            if (splice.index < current.index) {
              var prepend = splice.removed.slice(0, current.index - splice.index);
              Array.prototype.push.apply(prepend, currentRemoved);
              currentRemoved = prepend;
            }

            if (splice.index + splice.removed.length > current.index + current.addedCount) {
              var append = splice.removed.slice(current.index + current.addedCount - splice.index);
              Array.prototype.push.apply(currentRemoved, append);
            }

            splice.removed = currentRemoved;
            if (current.index < splice.index) {
              splice.index = current.index;
            }
          }
        } else if (splice.index < current.index) {

          inserted = true;

          splices.splice(_i5, 0, splice);
          _i5++;

          var offset = splice.addedCount - splice.removed.length;
          current.index += offset;
          insertionOffset += offset;
        }
      }

      if (!inserted) {
        splices.push(splice);
      }
    }

    function createInitialSplices(array, changeRecords) {
      var splices = [];

      for (var _i6 = 0; _i6 < changeRecords.length; _i6++) {
        var record = changeRecords[_i6];
        switch (record.type) {
          case 'splice':
            mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
            break;
          case 'add':
          case 'update':
          case 'delete':
            if (!isIndex(record.name)) {
              continue;
            }

            var index = toNumber(record.name);
            if (index < 0) {
              continue;
            }

            mergeSplice(splices, index, [record.oldValue], record.type === 'delete' ? 0 : 1);
            break;
          default:
            console.error('Unexpected record type: ' + JSON.stringify(record));
            break;
        }
      }

      return splices;
    }

    function projectArraySplices(array, changeRecords) {
      var splices = [];

      createInitialSplices(array, changeRecords).forEach(function (splice) {
        if (splice.addedCount === 1 && splice.removed.length === 1) {
          if (splice.removed[0] !== array[splice.index]) {
            splices.push(splice);
          }

          return;
        }

        splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
      });

      return splices;
    }

    function newRecord(type, object, key, oldValue) {
      return {
        type: type,
        object: object,
        key: key,
        oldValue: oldValue
      };
    }

    function getChangeRecords(map) {
      var entries = new Array(map.size);
      var keys = map.keys();
      var i = 0;
      var item = void 0;

      while (item = keys.next()) {
        if (item.done) {
          break;
        }

        entries[i] = newRecord('added', map, item.value);
        i++;
      }

      return entries;
    }

    var ModifyCollectionObserver = exports.ModifyCollectionObserver = (_dec3 = subscriberCollection(), _dec3(_class2 = function () {
      function ModifyCollectionObserver(taskQueue, collection) {
        

        this.taskQueue = taskQueue;
        this.queued = false;
        this.changeRecords = null;
        this.oldCollection = null;
        this.collection = collection;
        this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
      }

      ModifyCollectionObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };

      ModifyCollectionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };

      ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
        if (!this.hasSubscribers() && !this.lengthObserver) {
          return;
        }

        if (changeRecord.type === 'splice') {
          var index = changeRecord.index;
          var arrayLength = changeRecord.object.length;
          if (index > arrayLength) {
            index = arrayLength - changeRecord.addedCount;
          } else if (index < 0) {
            index = arrayLength + changeRecord.removed.length + index - changeRecord.addedCount;
          }
          if (index < 0) {
            index = 0;
          }
          changeRecord.index = index;
        }

        if (this.changeRecords === null) {
          this.changeRecords = [changeRecord];
        } else {
          this.changeRecords.push(changeRecord);
        }

        if (!this.queued) {
          this.queued = true;
          this.taskQueue.queueMicroTask(this);
        }
      };

      ModifyCollectionObserver.prototype.flushChangeRecords = function flushChangeRecords() {
        if (this.changeRecords && this.changeRecords.length || this.oldCollection) {
          this.call();
        }
      };

      ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
        this.oldCollection = oldCollection;

        if (this.hasSubscribers() && !this.queued) {
          this.queued = true;
          this.taskQueue.queueMicroTask(this);
        }
      };

      ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
        return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
      };

      ModifyCollectionObserver.prototype.call = function call() {
        var changeRecords = this.changeRecords;
        var oldCollection = this.oldCollection;
        var records = void 0;

        this.queued = false;
        this.changeRecords = [];
        this.oldCollection = null;

        if (this.hasSubscribers()) {
          if (oldCollection) {
            if (this.collection instanceof Map || this.collection instanceof Set) {
              records = getChangeRecords(oldCollection);
            } else {
              records = calcSplices(this.collection, 0, this.collection.length, oldCollection, 0, oldCollection.length);
            }
          } else {
            if (this.collection instanceof Map || this.collection instanceof Set) {
              records = changeRecords;
            } else {
              records = projectArraySplices(this.collection, changeRecords);
            }
          }

          this.callSubscribers(records);
        }

        if (this.lengthObserver) {
          this.lengthObserver.call(this.collection[this.lengthPropertyName]);
        }
      };

      return ModifyCollectionObserver;
    }()) || _class2);
    var CollectionLengthObserver = exports.CollectionLengthObserver = (_dec4 = subscriberCollection(), _dec4(_class3 = function () {
      function CollectionLengthObserver(collection) {
        

        this.collection = collection;
        this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
        this.currentValue = collection[this.lengthPropertyName];
      }

      CollectionLengthObserver.prototype.getValue = function getValue() {
        return this.collection[this.lengthPropertyName];
      };

      CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
        this.collection[this.lengthPropertyName] = newValue;
      };

      CollectionLengthObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };

      CollectionLengthObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };

      CollectionLengthObserver.prototype.call = function call(newValue) {
        var oldValue = this.currentValue;
        this.callSubscribers(newValue, oldValue);
        this.currentValue = newValue;
      };

      return CollectionLengthObserver;
    }()) || _class3);

    var pop = Array.prototype.pop;
    var push = Array.prototype.push;
    var reverse = Array.prototype.reverse;
    var shift = Array.prototype.shift;
    var sort = Array.prototype.sort;
    var splice = Array.prototype.splice;
    var unshift = Array.prototype.unshift;

    Array.prototype.pop = function () {
      var notEmpty = this.length > 0;
      var methodCallResult = pop.apply(this, arguments);
      if (notEmpty && this.__array_observer__ !== undefined) {
        this.__array_observer__.addChangeRecord({
          type: 'delete',
          object: this,
          name: this.length,
          oldValue: methodCallResult
        });
      }
      return methodCallResult;
    };

    Array.prototype.push = function () {
      var methodCallResult = push.apply(this, arguments);
      if (this.__array_observer__ !== undefined) {
        this.__array_observer__.addChangeRecord({
          type: 'splice',
          object: this,
          index: this.length - arguments.length,
          removed: [],
          addedCount: arguments.length
        });
      }
      return methodCallResult;
    };

    Array.prototype.reverse = function () {
      var oldArray = void 0;
      if (this.__array_observer__ !== undefined) {
        this.__array_observer__.flushChangeRecords();
        oldArray = this.slice();
      }
      var methodCallResult = reverse.apply(this, arguments);
      if (this.__array_observer__ !== undefined) {
        this.__array_observer__.reset(oldArray);
      }
      return methodCallResult;
    };

    Array.prototype.shift = function () {
      var notEmpty = this.length > 0;
      var methodCallResult = shift.apply(this, arguments);
      if (notEmpty && this.__array_observer__ !== undefined) {
        this.__array_observer__.addChangeRecord({
          type: 'delete',
          object: this,
          name: 0,
          oldValue: methodCallResult
        });
      }
      return methodCallResult;
    };

    Array.prototype.sort = function () {
      var oldArray = void 0;
      if (this.__array_observer__ !== undefined) {
        this.__array_observer__.flushChangeRecords();
        oldArray = this.slice();
      }
      var methodCallResult = sort.apply(this, arguments);
      if (this.__array_observer__ !== undefined) {
        this.__array_observer__.reset(oldArray);
      }
      return methodCallResult;
    };

    Array.prototype.splice = function () {
      var methodCallResult = splice.apply(this, arguments);
      if (this.__array_observer__ !== undefined) {
        this.__array_observer__.addChangeRecord({
          type: 'splice',
          object: this,
          index: +arguments[0],
          removed: methodCallResult,
          addedCount: arguments.length > 2 ? arguments.length - 2 : 0
        });
      }
      return methodCallResult;
    };

    Array.prototype.unshift = function () {
      var methodCallResult = unshift.apply(this, arguments);
      if (this.__array_observer__ !== undefined) {
        this.__array_observer__.addChangeRecord({
          type: 'splice',
          object: this,
          index: 0,
          removed: [],
          addedCount: arguments.length
        });
      }
      return methodCallResult;
    };

    function _getArrayObserver(taskQueue, array) {
      return ModifyArrayObserver.for(taskQueue, array);
    }

    exports.getArrayObserver = _getArrayObserver;

    var ModifyArrayObserver = function (_ModifyCollectionObse) {
      _inherits(ModifyArrayObserver, _ModifyCollectionObse);

      function ModifyArrayObserver(taskQueue, array) {
        

        return _possibleConstructorReturn(this, _ModifyCollectionObse.call(this, taskQueue, array));
      }

      ModifyArrayObserver.for = function _for(taskQueue, array) {
        if (!('__array_observer__' in array)) {
          Reflect.defineProperty(array, '__array_observer__', {
            value: ModifyArrayObserver.create(taskQueue, array),
            enumerable: false, configurable: false
          });
        }
        return array.__array_observer__;
      };

      ModifyArrayObserver.create = function create(taskQueue, array) {
        return new ModifyArrayObserver(taskQueue, array);
      };

      return ModifyArrayObserver;
    }(ModifyCollectionObserver);

    var Expression = exports.Expression = function () {
      function Expression() {
        

        this.isChain = false;
        this.isAssignable = false;
      }

      Expression.prototype.evaluate = function evaluate(scope, lookupFunctions, args) {
        throw new Error('Binding expression "' + this + '" cannot be evaluated.');
      };

      Expression.prototype.assign = function assign(scope, value, lookupFunctions) {
        throw new Error('Binding expression "' + this + '" cannot be assigned to.');
      };

      Expression.prototype.toString = function toString() {
        return typeof FEATURE_NO_UNPARSER === 'undefined' ? _Unparser.unparse(this) : Function.prototype.toString.call(this);
      };

      return Expression;
    }();

    var Chain = exports.Chain = function (_Expression) {
      _inherits(Chain, _Expression);

      function Chain(expressions) {
        

        var _this3 = _possibleConstructorReturn(this, _Expression.call(this));

        _this3.expressions = expressions;
        _this3.isChain = true;
        return _this3;
      }

      Chain.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var result = void 0;
        var expressions = this.expressions;
        var last = void 0;

        for (var _i7 = 0, length = expressions.length; _i7 < length; ++_i7) {
          last = expressions[_i7].evaluate(scope, lookupFunctions);

          if (last !== null) {
            result = last;
          }
        }

        return result;
      };

      Chain.prototype.accept = function accept(visitor) {
        return visitor.visitChain(this);
      };

      return Chain;
    }(Expression);

    var BindingBehavior = exports.BindingBehavior = function (_Expression2) {
      _inherits(BindingBehavior, _Expression2);

      function BindingBehavior(expression, name, args) {
        

        var _this4 = _possibleConstructorReturn(this, _Expression2.call(this));

        _this4.expression = expression;
        _this4.name = name;
        _this4.args = args;
        return _this4;
      }

      BindingBehavior.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return this.expression.evaluate(scope, lookupFunctions);
      };

      BindingBehavior.prototype.assign = function assign(scope, value, lookupFunctions) {
        return this.expression.assign(scope, value, lookupFunctions);
      };

      BindingBehavior.prototype.accept = function accept(visitor) {
        return visitor.visitBindingBehavior(this);
      };

      BindingBehavior.prototype.connect = function connect(binding, scope) {
        this.expression.connect(binding, scope);
      };

      BindingBehavior.prototype.bind = function bind(binding, scope, lookupFunctions) {
        if (this.expression.expression && this.expression.bind) {
          this.expression.bind(binding, scope, lookupFunctions);
        }
        var behavior = lookupFunctions.bindingBehaviors(this.name);
        if (!behavior) {
          throw new Error('No BindingBehavior named "' + this.name + '" was found!');
        }
        var behaviorKey = 'behavior-' + this.name;
        if (binding[behaviorKey]) {
          throw new Error('A binding behavior named "' + this.name + '" has already been applied to "' + this.expression + '"');
        }
        binding[behaviorKey] = behavior;
        behavior.bind.apply(behavior, [binding, scope].concat(evalList(scope, this.args, binding.lookupFunctions)));
      };

      BindingBehavior.prototype.unbind = function unbind(binding, scope) {
        var behaviorKey = 'behavior-' + this.name;
        binding[behaviorKey].unbind(binding, scope);
        binding[behaviorKey] = null;
        if (this.expression.expression && this.expression.unbind) {
          this.expression.unbind(binding, scope);
        }
      };

      return BindingBehavior;
    }(Expression);

    var ValueConverter = exports.ValueConverter = function (_Expression3) {
      _inherits(ValueConverter, _Expression3);

      function ValueConverter(expression, name, args, allArgs) {
        

        var _this5 = _possibleConstructorReturn(this, _Expression3.call(this));

        _this5.expression = expression;
        _this5.name = name;
        _this5.args = args;
        _this5.allArgs = allArgs;
        return _this5;
      }

      ValueConverter.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var converter = lookupFunctions.valueConverters(this.name);
        if (!converter) {
          throw new Error('No ValueConverter named "' + this.name + '" was found!');
        }

        if ('toView' in converter) {
          return converter.toView.apply(converter, evalList(scope, this.allArgs, lookupFunctions));
        }

        return this.allArgs[0].evaluate(scope, lookupFunctions);
      };

      ValueConverter.prototype.assign = function assign(scope, value, lookupFunctions) {
        var converter = lookupFunctions.valueConverters(this.name);
        if (!converter) {
          throw new Error('No ValueConverter named "' + this.name + '" was found!');
        }

        if ('fromView' in converter) {
          value = converter.fromView.apply(converter, [value].concat(evalList(scope, this.args, lookupFunctions)));
        }

        return this.allArgs[0].assign(scope, value, lookupFunctions);
      };

      ValueConverter.prototype.accept = function accept(visitor) {
        return visitor.visitValueConverter(this);
      };

      ValueConverter.prototype.connect = function connect(binding, scope) {
        var expressions = this.allArgs;
        var i = expressions.length;
        while (i--) {
          expressions[i].connect(binding, scope);
        }
        var converter = binding.lookupFunctions.valueConverters(this.name);
        if (!converter) {
          throw new Error('No ValueConverter named "' + this.name + '" was found!');
        }
        var signals = converter.signals;
        if (signals === undefined) {
          return;
        }
        i = signals.length;
        while (i--) {
          connectBindingToSignal(binding, signals[i]);
        }
      };

      return ValueConverter;
    }(Expression);

    var Assign = exports.Assign = function (_Expression4) {
      _inherits(Assign, _Expression4);

      function Assign(target, value) {
        

        var _this6 = _possibleConstructorReturn(this, _Expression4.call(this));

        _this6.target = target;
        _this6.value = value;
        _this6.isAssignable = true;
        return _this6;
      }

      Assign.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return this.target.assign(scope, this.value.evaluate(scope, lookupFunctions));
      };

      Assign.prototype.accept = function accept(vistor) {
        vistor.visitAssign(this);
      };

      Assign.prototype.connect = function connect(binding, scope) {};

      Assign.prototype.assign = function assign(scope, value) {
        this.value.assign(scope, value);
        this.target.assign(scope, value);
      };

      return Assign;
    }(Expression);

    var Conditional = exports.Conditional = function (_Expression5) {
      _inherits(Conditional, _Expression5);

      function Conditional(condition, yes, no) {
        

        var _this7 = _possibleConstructorReturn(this, _Expression5.call(this));

        _this7.condition = condition;
        _this7.yes = yes;
        _this7.no = no;
        return _this7;
      }

      Conditional.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return !!this.condition.evaluate(scope, lookupFunctions) ? this.yes.evaluate(scope, lookupFunctions) : this.no.evaluate(scope, lookupFunctions);
      };

      Conditional.prototype.accept = function accept(visitor) {
        return visitor.visitConditional(this);
      };

      Conditional.prototype.connect = function connect(binding, scope) {
        this.condition.connect(binding, scope);
        if (this.condition.evaluate(scope)) {
          this.yes.connect(binding, scope);
        } else {
          this.no.connect(binding, scope);
        }
      };

      return Conditional;
    }(Expression);

    var AccessThis = exports.AccessThis = function (_Expression6) {
      _inherits(AccessThis, _Expression6);

      function AccessThis(ancestor) {
        

        var _this8 = _possibleConstructorReturn(this, _Expression6.call(this));

        _this8.ancestor = ancestor;
        return _this8;
      }

      AccessThis.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var oc = scope.overrideContext;
        var i = this.ancestor;
        while (i-- && oc) {
          oc = oc.parentOverrideContext;
        }
        return i < 1 && oc ? oc.bindingContext : undefined;
      };

      AccessThis.prototype.accept = function accept(visitor) {
        return visitor.visitAccessThis(this);
      };

      AccessThis.prototype.connect = function connect(binding, scope) {};

      return AccessThis;
    }(Expression);

    var AccessScope = exports.AccessScope = function (_Expression7) {
      _inherits(AccessScope, _Expression7);

      function AccessScope(name, ancestor) {
        

        var _this9 = _possibleConstructorReturn(this, _Expression7.call(this));

        _this9.name = name;
        _this9.ancestor = ancestor;
        _this9.isAssignable = true;
        return _this9;
      }

      AccessScope.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var context = getContextFor(this.name, scope, this.ancestor);
        return context[this.name];
      };

      AccessScope.prototype.assign = function assign(scope, value) {
        var context = getContextFor(this.name, scope, this.ancestor);
        return context ? context[this.name] = value : undefined;
      };

      AccessScope.prototype.accept = function accept(visitor) {
        return visitor.visitAccessScope(this);
      };

      AccessScope.prototype.connect = function connect(binding, scope) {
        var context = getContextFor(this.name, scope, this.ancestor);
        binding.observeProperty(context, this.name);
      };

      return AccessScope;
    }(Expression);

    var AccessMember = exports.AccessMember = function (_Expression8) {
      _inherits(AccessMember, _Expression8);

      function AccessMember(object, name) {
        

        var _this10 = _possibleConstructorReturn(this, _Expression8.call(this));

        _this10.object = object;
        _this10.name = name;
        _this10.isAssignable = true;
        return _this10;
      }

      AccessMember.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var instance = this.object.evaluate(scope, lookupFunctions);
        return instance === null || instance === undefined ? instance : instance[this.name];
      };

      AccessMember.prototype.assign = function assign(scope, value) {
        var instance = this.object.evaluate(scope);

        if (instance === null || instance === undefined) {
          instance = {};
          this.object.assign(scope, instance);
        }

        instance[this.name] = value;
        return value;
      };

      AccessMember.prototype.accept = function accept(visitor) {
        return visitor.visitAccessMember(this);
      };

      AccessMember.prototype.connect = function connect(binding, scope) {
        this.object.connect(binding, scope);
        var obj = this.object.evaluate(scope);
        if (obj) {
          binding.observeProperty(obj, this.name);
        }
      };

      return AccessMember;
    }(Expression);

    var AccessKeyed = exports.AccessKeyed = function (_Expression9) {
      _inherits(AccessKeyed, _Expression9);

      function AccessKeyed(object, key) {
        

        var _this11 = _possibleConstructorReturn(this, _Expression9.call(this));

        _this11.object = object;
        _this11.key = key;
        _this11.isAssignable = true;
        return _this11;
      }

      AccessKeyed.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var instance = this.object.evaluate(scope, lookupFunctions);
        var lookup = this.key.evaluate(scope, lookupFunctions);
        return getKeyed(instance, lookup);
      };

      AccessKeyed.prototype.assign = function assign(scope, value) {
        var instance = this.object.evaluate(scope);
        var lookup = this.key.evaluate(scope);
        return setKeyed(instance, lookup, value);
      };

      AccessKeyed.prototype.accept = function accept(visitor) {
        return visitor.visitAccessKeyed(this);
      };

      AccessKeyed.prototype.connect = function connect(binding, scope) {
        this.object.connect(binding, scope);
        var obj = this.object.evaluate(scope);
        if (obj instanceof Object) {
          this.key.connect(binding, scope);
          var key = this.key.evaluate(scope);

          if (key !== null && key !== undefined && !(Array.isArray(obj) && typeof key === 'number')) {
            binding.observeProperty(obj, key);
          }
        }
      };

      return AccessKeyed;
    }(Expression);

    var CallScope = exports.CallScope = function (_Expression10) {
      _inherits(CallScope, _Expression10);

      function CallScope(name, args, ancestor) {
        

        var _this12 = _possibleConstructorReturn(this, _Expression10.call(this));

        _this12.name = name;
        _this12.args = args;
        _this12.ancestor = ancestor;
        return _this12;
      }

      CallScope.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
        var args = evalList(scope, this.args, lookupFunctions);
        var context = getContextFor(this.name, scope, this.ancestor);
        var func = getFunction(context, this.name, mustEvaluate);
        if (func) {
          return func.apply(context, args);
        }
        return undefined;
      };

      CallScope.prototype.accept = function accept(visitor) {
        return visitor.visitCallScope(this);
      };

      CallScope.prototype.connect = function connect(binding, scope) {
        var args = this.args;
        var i = args.length;
        while (i--) {
          args[i].connect(binding, scope);
        }
      };

      return CallScope;
    }(Expression);

    var CallMember = exports.CallMember = function (_Expression11) {
      _inherits(CallMember, _Expression11);

      function CallMember(object, name, args) {
        

        var _this13 = _possibleConstructorReturn(this, _Expression11.call(this));

        _this13.object = object;
        _this13.name = name;
        _this13.args = args;
        return _this13;
      }

      CallMember.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
        var instance = this.object.evaluate(scope, lookupFunctions);
        var args = evalList(scope, this.args, lookupFunctions);
        var func = getFunction(instance, this.name, mustEvaluate);
        if (func) {
          return func.apply(instance, args);
        }
        return undefined;
      };

      CallMember.prototype.accept = function accept(visitor) {
        return visitor.visitCallMember(this);
      };

      CallMember.prototype.connect = function connect(binding, scope) {
        this.object.connect(binding, scope);
        var obj = this.object.evaluate(scope);
        if (getFunction(obj, this.name, false)) {
          var args = this.args;
          var _i8 = args.length;
          while (_i8--) {
            args[_i8].connect(binding, scope);
          }
        }
      };

      return CallMember;
    }(Expression);

    var CallFunction = exports.CallFunction = function (_Expression12) {
      _inherits(CallFunction, _Expression12);

      function CallFunction(func, args) {
        

        var _this14 = _possibleConstructorReturn(this, _Expression12.call(this));

        _this14.func = func;
        _this14.args = args;
        return _this14;
      }

      CallFunction.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
        var func = this.func.evaluate(scope, lookupFunctions);
        if (typeof func === 'function') {
          return func.apply(null, evalList(scope, this.args, lookupFunctions));
        }
        if (!mustEvaluate && (func === null || func === undefined)) {
          return undefined;
        }
        throw new Error(this.func + ' is not a function');
      };

      CallFunction.prototype.accept = function accept(visitor) {
        return visitor.visitCallFunction(this);
      };

      CallFunction.prototype.connect = function connect(binding, scope) {
        this.func.connect(binding, scope);
        var func = this.func.evaluate(scope);
        if (typeof func === 'function') {
          var args = this.args;
          var _i9 = args.length;
          while (_i9--) {
            args[_i9].connect(binding, scope);
          }
        }
      };

      return CallFunction;
    }(Expression);

    var Binary = exports.Binary = function (_Expression13) {
      _inherits(Binary, _Expression13);

      function Binary(operation, left, right) {
        

        var _this15 = _possibleConstructorReturn(this, _Expression13.call(this));

        _this15.operation = operation;
        _this15.left = left;
        _this15.right = right;
        return _this15;
      }

      Binary.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var left = this.left.evaluate(scope, lookupFunctions);

        switch (this.operation) {
          case '&&':
            return left && this.right.evaluate(scope, lookupFunctions);
          case '||':
            return left || this.right.evaluate(scope, lookupFunctions);
        }

        var right = this.right.evaluate(scope, lookupFunctions);

        switch (this.operation) {
          case '==':
            return left == right;
          case '===':
            return left === right;
          case '!=':
            return left != right;
          case '!==':
            return left !== right;
        }

        if (left === null || right === null || left === undefined || right === undefined) {
          switch (this.operation) {
            case '+':
              if (left !== null && left !== undefined) return left;
              if (right !== null && right !== undefined) return right;
              return 0;
            case '-':
              if (left !== null && left !== undefined) return left;
              if (right !== null && right !== undefined) return 0 - right;
              return 0;
          }

          return null;
        }

        switch (this.operation) {
          case '+':
            return autoConvertAdd(left, right);
          case '-':
            return left - right;
          case '*':
            return left * right;
          case '/':
            return left / right;
          case '%':
            return left % right;
          case '<':
            return left < right;
          case '>':
            return left > right;
          case '<=':
            return left <= right;
          case '>=':
            return left >= right;
          case '^':
            return left ^ right;
        }

        throw new Error('Internal error [' + this.operation + '] not handled');
      };

      Binary.prototype.accept = function accept(visitor) {
        return visitor.visitBinary(this);
      };

      Binary.prototype.connect = function connect(binding, scope) {
        this.left.connect(binding, scope);
        var left = this.left.evaluate(scope);
        if (this.operation === '&&' && !left || this.operation === '||' && left) {
          return;
        }
        this.right.connect(binding, scope);
      };

      return Binary;
    }(Expression);

    var PrefixNot = exports.PrefixNot = function (_Expression14) {
      _inherits(PrefixNot, _Expression14);

      function PrefixNot(operation, expression) {
        

        var _this16 = _possibleConstructorReturn(this, _Expression14.call(this));

        _this16.operation = operation;
        _this16.expression = expression;
        return _this16;
      }

      PrefixNot.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return !this.expression.evaluate(scope, lookupFunctions);
      };

      PrefixNot.prototype.accept = function accept(visitor) {
        return visitor.visitPrefix(this);
      };

      PrefixNot.prototype.connect = function connect(binding, scope) {
        this.expression.connect(binding, scope);
      };

      return PrefixNot;
    }(Expression);

    var LiteralPrimitive = exports.LiteralPrimitive = function (_Expression15) {
      _inherits(LiteralPrimitive, _Expression15);

      function LiteralPrimitive(value) {
        

        var _this17 = _possibleConstructorReturn(this, _Expression15.call(this));

        _this17.value = value;
        return _this17;
      }

      LiteralPrimitive.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return this.value;
      };

      LiteralPrimitive.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralPrimitive(this);
      };

      LiteralPrimitive.prototype.connect = function connect(binding, scope) {};

      return LiteralPrimitive;
    }(Expression);

    var LiteralString = exports.LiteralString = function (_Expression16) {
      _inherits(LiteralString, _Expression16);

      function LiteralString(value) {
        

        var _this18 = _possibleConstructorReturn(this, _Expression16.call(this));

        _this18.value = value;
        return _this18;
      }

      LiteralString.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return this.value;
      };

      LiteralString.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralString(this);
      };

      LiteralString.prototype.connect = function connect(binding, scope) {};

      return LiteralString;
    }(Expression);

    var LiteralArray = exports.LiteralArray = function (_Expression17) {
      _inherits(LiteralArray, _Expression17);

      function LiteralArray(elements) {
        

        var _this19 = _possibleConstructorReturn(this, _Expression17.call(this));

        _this19.elements = elements;
        return _this19;
      }

      LiteralArray.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var elements = this.elements;
        var result = [];

        for (var _i10 = 0, length = elements.length; _i10 < length; ++_i10) {
          result[_i10] = elements[_i10].evaluate(scope, lookupFunctions);
        }

        return result;
      };

      LiteralArray.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralArray(this);
      };

      LiteralArray.prototype.connect = function connect(binding, scope) {
        var length = this.elements.length;
        for (var _i11 = 0; _i11 < length; _i11++) {
          this.elements[_i11].connect(binding, scope);
        }
      };

      return LiteralArray;
    }(Expression);

    var LiteralObject = exports.LiteralObject = function (_Expression18) {
      _inherits(LiteralObject, _Expression18);

      function LiteralObject(keys, values) {
        

        var _this20 = _possibleConstructorReturn(this, _Expression18.call(this));

        _this20.keys = keys;
        _this20.values = values;
        return _this20;
      }

      LiteralObject.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var instance = {};
        var keys = this.keys;
        var values = this.values;

        for (var _i12 = 0, length = keys.length; _i12 < length; ++_i12) {
          instance[keys[_i12]] = values[_i12].evaluate(scope, lookupFunctions);
        }

        return instance;
      };

      LiteralObject.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralObject(this);
      };

      LiteralObject.prototype.connect = function connect(binding, scope) {
        var length = this.keys.length;
        for (var _i13 = 0; _i13 < length; _i13++) {
          this.values[_i13].connect(binding, scope);
        }
      };

      return LiteralObject;
    }(Expression);

    function evalList(scope, list, lookupFunctions) {
      var length = list.length;
      var result = [];
      for (var _i14 = 0; _i14 < length; _i14++) {
        result[_i14] = list[_i14].evaluate(scope, lookupFunctions);
      }
      return result;
    }

    function autoConvertAdd(a, b) {
      if (a !== null && b !== null) {
        if (typeof a === 'string' && typeof b !== 'string') {
          return a + b.toString();
        }

        if (typeof a !== 'string' && typeof b === 'string') {
          return a.toString() + b;
        }

        return a + b;
      }

      if (a !== null) {
        return a;
      }

      if (b !== null) {
        return b;
      }

      return 0;
    }

    function getFunction(obj, name, mustExist) {
      var func = obj === null || obj === undefined ? null : obj[name];
      if (typeof func === 'function') {
        return func;
      }
      if (!mustExist && (func === null || func === undefined)) {
        return null;
      }
      throw new Error(name + ' is not a function');
    }

    function getKeyed(obj, key) {
      if (Array.isArray(obj)) {
        return obj[parseInt(key, 10)];
      } else if (obj) {
        return obj[key];
      } else if (obj === null || obj === undefined) {
        return undefined;
      }

      return obj[key];
    }

    function setKeyed(obj, key, value) {
      if (Array.isArray(obj)) {
        var index = parseInt(key, 10);

        if (obj.length <= index) {
          obj.length = index + 1;
        }

        obj[index] = value;
      } else {
        obj[key] = value;
      }

      return value;
    }

    var _Unparser = null;

    exports.Unparser = _Unparser;
    if (typeof FEATURE_NO_UNPARSER === 'undefined') {
      exports.Unparser = _Unparser = function () {
        function Unparser(buffer) {
          

          this.buffer = buffer;
        }

        Unparser.unparse = function unparse(expression) {
          var buffer = [];
          var visitor = new _Unparser(buffer);

          expression.accept(visitor);

          return buffer.join('');
        };

        Unparser.prototype.write = function write(text) {
          this.buffer.push(text);
        };

        Unparser.prototype.writeArgs = function writeArgs(args) {
          this.write('(');

          for (var _i15 = 0, length = args.length; _i15 < length; ++_i15) {
            if (_i15 !== 0) {
              this.write(',');
            }

            args[_i15].accept(this);
          }

          this.write(')');
        };

        Unparser.prototype.visitChain = function visitChain(chain) {
          var expressions = chain.expressions;

          for (var _i16 = 0, length = expressions.length; _i16 < length; ++_i16) {
            if (_i16 !== 0) {
              this.write(';');
            }

            expressions[_i16].accept(this);
          }
        };

        Unparser.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
          var args = behavior.args;

          behavior.expression.accept(this);
          this.write('&' + behavior.name);

          for (var _i17 = 0, length = args.length; _i17 < length; ++_i17) {
            this.write(':');
            args[_i17].accept(this);
          }
        };

        Unparser.prototype.visitValueConverter = function visitValueConverter(converter) {
          var args = converter.args;

          converter.expression.accept(this);
          this.write('|' + converter.name);

          for (var _i18 = 0, length = args.length; _i18 < length; ++_i18) {
            this.write(':');
            args[_i18].accept(this);
          }
        };

        Unparser.prototype.visitAssign = function visitAssign(assign) {
          assign.target.accept(this);
          this.write('=');
          assign.value.accept(this);
        };

        Unparser.prototype.visitConditional = function visitConditional(conditional) {
          conditional.condition.accept(this);
          this.write('?');
          conditional.yes.accept(this);
          this.write(':');
          conditional.no.accept(this);
        };

        Unparser.prototype.visitAccessThis = function visitAccessThis(access) {
          if (access.ancestor === 0) {
            this.write('$this');
            return;
          }
          this.write('$parent');
          var i = access.ancestor - 1;
          while (i--) {
            this.write('.$parent');
          }
        };

        Unparser.prototype.visitAccessScope = function visitAccessScope(access) {
          var i = access.ancestor;
          while (i--) {
            this.write('$parent.');
          }
          this.write(access.name);
        };

        Unparser.prototype.visitAccessMember = function visitAccessMember(access) {
          access.object.accept(this);
          this.write('.' + access.name);
        };

        Unparser.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
          access.object.accept(this);
          this.write('[');
          access.key.accept(this);
          this.write(']');
        };

        Unparser.prototype.visitCallScope = function visitCallScope(call) {
          var i = call.ancestor;
          while (i--) {
            this.write('$parent.');
          }
          this.write(call.name);
          this.writeArgs(call.args);
        };

        Unparser.prototype.visitCallFunction = function visitCallFunction(call) {
          call.func.accept(this);
          this.writeArgs(call.args);
        };

        Unparser.prototype.visitCallMember = function visitCallMember(call) {
          call.object.accept(this);
          this.write('.' + call.name);
          this.writeArgs(call.args);
        };

        Unparser.prototype.visitPrefix = function visitPrefix(prefix) {
          this.write('(' + prefix.operation);
          prefix.expression.accept(this);
          this.write(')');
        };

        Unparser.prototype.visitBinary = function visitBinary(binary) {
          binary.left.accept(this);
          this.write(binary.operation);
          binary.right.accept(this);
        };

        Unparser.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
          this.write('' + literal.value);
        };

        Unparser.prototype.visitLiteralArray = function visitLiteralArray(literal) {
          var elements = literal.elements;

          this.write('[');

          for (var _i19 = 0, length = elements.length; _i19 < length; ++_i19) {
            if (_i19 !== 0) {
              this.write(',');
            }

            elements[_i19].accept(this);
          }

          this.write(']');
        };

        Unparser.prototype.visitLiteralObject = function visitLiteralObject(literal) {
          var keys = literal.keys;
          var values = literal.values;

          this.write('{');

          for (var _i20 = 0, length = keys.length; _i20 < length; ++_i20) {
            if (_i20 !== 0) {
              this.write(',');
            }

            this.write('\'' + keys[_i20] + '\':');
            values[_i20].accept(this);
          }

          this.write('}');
        };

        Unparser.prototype.visitLiteralString = function visitLiteralString(literal) {
          var escaped = literal.value.replace(/'/g, "\'");
          this.write('\'' + escaped + '\'');
        };

        return Unparser;
      }();
    }

    var ExpressionCloner = exports.ExpressionCloner = function () {
      function ExpressionCloner() {
        
      }

      ExpressionCloner.prototype.cloneExpressionArray = function cloneExpressionArray(array) {
        var clonedArray = [];
        var i = array.length;
        while (i--) {
          clonedArray[i] = array[i].accept(this);
        }
        return clonedArray;
      };

      ExpressionCloner.prototype.visitChain = function visitChain(chain) {
        return new Chain(this.cloneExpressionArray(chain.expressions));
      };

      ExpressionCloner.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
        return new BindingBehavior(behavior.expression.accept(this), behavior.name, this.cloneExpressionArray(behavior.args));
      };

      ExpressionCloner.prototype.visitValueConverter = function visitValueConverter(converter) {
        return new ValueConverter(converter.expression.accept(this), converter.name, this.cloneExpressionArray(converter.args));
      };

      ExpressionCloner.prototype.visitAssign = function visitAssign(assign) {
        return new Assign(assign.target.accept(this), assign.value.accept(this));
      };

      ExpressionCloner.prototype.visitConditional = function visitConditional(conditional) {
        return new Conditional(conditional.condition.accept(this), conditional.yes.accept(this), conditional.no.accept(this));
      };

      ExpressionCloner.prototype.visitAccessThis = function visitAccessThis(access) {
        return new AccessThis(access.ancestor);
      };

      ExpressionCloner.prototype.visitAccessScope = function visitAccessScope(access) {
        return new AccessScope(access.name, access.ancestor);
      };

      ExpressionCloner.prototype.visitAccessMember = function visitAccessMember(access) {
        return new AccessMember(access.object.accept(this), access.name);
      };

      ExpressionCloner.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
        return new AccessKeyed(access.object.accept(this), access.key.accept(this));
      };

      ExpressionCloner.prototype.visitCallScope = function visitCallScope(call) {
        return new CallScope(call.name, this.cloneExpressionArray(call.args), call.ancestor);
      };

      ExpressionCloner.prototype.visitCallFunction = function visitCallFunction(call) {
        return new CallFunction(call.func.accept(this), this.cloneExpressionArray(call.args));
      };

      ExpressionCloner.prototype.visitCallMember = function visitCallMember(call) {
        return new CallMember(call.object.accept(this), call.name, this.cloneExpressionArray(call.args));
      };

      ExpressionCloner.prototype.visitPrefix = function visitPrefix(prefix) {
        return new PrefixNot(prefix.operation, prefix.expression.accept(this));
      };

      ExpressionCloner.prototype.visitBinary = function visitBinary(binary) {
        return new Binary(binary.operation, binary.left.accept(this), binary.right.accept(this));
      };

      ExpressionCloner.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
        return new LiteralPrimitive(literal);
      };

      ExpressionCloner.prototype.visitLiteralArray = function visitLiteralArray(literal) {
        return new LiteralArray(this.cloneExpressionArray(literal.elements));
      };

      ExpressionCloner.prototype.visitLiteralObject = function visitLiteralObject(literal) {
        return new LiteralObject(literal.keys, this.cloneExpressionArray(literal.values));
      };

      ExpressionCloner.prototype.visitLiteralString = function visitLiteralString(literal) {
        return new LiteralString(literal.value);
      };

      return ExpressionCloner;
    }();

    function cloneExpression(expression) {
      var visitor = new ExpressionCloner();
      return expression.accept(visitor);
    }

    var bindingMode = exports.bindingMode = {
      oneTime: 0,
      toView: 1,
      oneWay: 1,
      twoWay: 2,
      fromView: 3
    };

    var Token = exports.Token = function () {
      function Token(index, text) {
        

        this.index = index;
        this.text = text;
      }

      Token.prototype.withOp = function withOp(op) {
        this.opKey = op;
        return this;
      };

      Token.prototype.withGetterSetter = function withGetterSetter(key) {
        this.key = key;
        return this;
      };

      Token.prototype.withValue = function withValue(value) {
        this.value = value;
        return this;
      };

      Token.prototype.toString = function toString() {
        return 'Token(' + this.text + ')';
      };

      return Token;
    }();

    var Lexer = exports.Lexer = function () {
      function Lexer() {
        
      }

      Lexer.prototype.lex = function lex(text) {
        var scanner = new Scanner(text);
        var tokens = [];
        var token = scanner.scanToken();

        while (token) {
          tokens.push(token);
          token = scanner.scanToken();
        }

        return tokens;
      };

      return Lexer;
    }();

    var Scanner = exports.Scanner = function () {
      function Scanner(input) {
        

        this.input = input;
        this.length = input.length;
        this.peek = 0;
        this.index = -1;

        this.advance();
      }

      Scanner.prototype.scanToken = function scanToken() {
        while (this.peek <= $SPACE) {
          if (++this.index >= this.length) {
            this.peek = $EOF;
            return null;
          }

          this.peek = this.input.charCodeAt(this.index);
        }

        if (isIdentifierStart(this.peek)) {
          return this.scanIdentifier();
        }

        if (isDigit(this.peek)) {
          return this.scanNumber(this.index);
        }

        var start = this.index;

        switch (this.peek) {
          case $PERIOD:
            this.advance();
            return isDigit(this.peek) ? this.scanNumber(start) : new Token(start, '.');
          case $LPAREN:
          case $RPAREN:
          case $LBRACE:
          case $RBRACE:
          case $LBRACKET:
          case $RBRACKET:
          case $COMMA:
          case $COLON:
          case $SEMICOLON:
            return this.scanCharacter(start, String.fromCharCode(this.peek));
          case $SQ:
          case $DQ:
            return this.scanString();
          case $PLUS:
          case $MINUS:
          case $STAR:
          case $SLASH:
          case $PERCENT:
          case $CARET:
          case $QUESTION:
            return this.scanOperator(start, String.fromCharCode(this.peek));
          case $LT:
          case $GT:
          case $BANG:
          case $EQ:
            return this.scanComplexOperator(start, $EQ, String.fromCharCode(this.peek), '=');
          case $AMPERSAND:
            return this.scanComplexOperator(start, $AMPERSAND, '&', '&');
          case $BAR:
            return this.scanComplexOperator(start, $BAR, '|', '|');
          case $NBSP:
            while (isWhitespace(this.peek)) {
              this.advance();
            }

            return this.scanToken();
        }

        var character = String.fromCharCode(this.peek);
        this.error('Unexpected character [' + character + ']');
        return null;
      };

      Scanner.prototype.scanCharacter = function scanCharacter(start, text) {
        assert(this.peek === text.charCodeAt(0));
        this.advance();
        return new Token(start, text);
      };

      Scanner.prototype.scanOperator = function scanOperator(start, text) {
        assert(this.peek === text.charCodeAt(0));
        assert(OPERATORS[text] === 1);
        this.advance();
        return new Token(start, text).withOp(text);
      };

      Scanner.prototype.scanComplexOperator = function scanComplexOperator(start, code, one, two) {
        assert(this.peek === one.charCodeAt(0));
        this.advance();

        var text = one;

        if (this.peek === code) {
          this.advance();
          text += two;
        }

        if (this.peek === code) {
          this.advance();
          text += two;
        }

        assert(OPERATORS[text] === 1);

        return new Token(start, text).withOp(text);
      };

      Scanner.prototype.scanIdentifier = function scanIdentifier() {
        assert(isIdentifierStart(this.peek));
        var start = this.index;

        this.advance();

        while (isIdentifierPart(this.peek)) {
          this.advance();
        }

        var text = this.input.substring(start, this.index);
        var result = new Token(start, text);

        if (OPERATORS[text] === 1) {
          result.withOp(text);
        } else {
          result.withGetterSetter(text);
        }

        return result;
      };

      Scanner.prototype.scanNumber = function scanNumber(start) {
        assert(isDigit(this.peek));
        var simple = this.index === start;
        this.advance();

        while (true) {
          if (!isDigit(this.peek)) {
            if (this.peek === $PERIOD) {
              simple = false;
            } else if (isExponentStart(this.peek)) {
              this.advance();

              if (isExponentSign(this.peek)) {
                this.advance();
              }

              if (!isDigit(this.peek)) {
                this.error('Invalid exponent', -1);
              }

              simple = false;
            } else {
              break;
            }
          }

          this.advance();
        }

        var text = this.input.substring(start, this.index);
        var value = simple ? parseInt(text, 10) : parseFloat(text);
        return new Token(start, text).withValue(value);
      };

      Scanner.prototype.scanString = function scanString() {
        assert(this.peek === $SQ || this.peek === $DQ);

        var start = this.index;
        var quote = this.peek;

        this.advance();

        var buffer = void 0;
        var marker = this.index;

        while (this.peek !== quote) {
          if (this.peek === $BACKSLASH) {
            if (!buffer) {
              buffer = [];
            }

            buffer.push(this.input.substring(marker, this.index));
            this.advance();

            var _unescaped = void 0;

            if (this.peek === $u) {
              var hex = this.input.substring(this.index + 1, this.index + 5);

              if (!/[A-Z0-9]{4}/.test(hex)) {
                this.error('Invalid unicode escape [\\u' + hex + ']');
              }

              _unescaped = parseInt(hex, 16);

              for (var _i21 = 0; _i21 < 5; ++_i21) {
                this.advance();
              }
            } else {
              _unescaped = unescape(this.peek);
              this.advance();
            }

            buffer.push(String.fromCharCode(_unescaped));
            marker = this.index;
          } else if (this.peek === $EOF) {
            this.error('Unterminated quote');
          } else {
            this.advance();
          }
        }

        var last = this.input.substring(marker, this.index);
        this.advance();
        var text = this.input.substring(start, this.index);

        var unescaped = last;

        if (buffer !== null && buffer !== undefined) {
          buffer.push(last);
          unescaped = buffer.join('');
        }

        return new Token(start, text).withValue(unescaped);
      };

      Scanner.prototype.advance = function advance() {
        if (++this.index >= this.length) {
          this.peek = $EOF;
        } else {
          this.peek = this.input.charCodeAt(this.index);
        }
      };

      Scanner.prototype.error = function error(message) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var position = this.index + offset;
        throw new Error('Lexer Error: ' + message + ' at column ' + position + ' in expression [' + this.input + ']');
      };

      return Scanner;
    }();

    var OPERATORS = {
      'undefined': 1,
      'null': 1,
      'true': 1,
      'false': 1,
      '+': 1,
      '-': 1,
      '*': 1,
      '/': 1,
      '%': 1,
      '^': 1,
      '=': 1,
      '==': 1,
      '===': 1,
      '!=': 1,
      '!==': 1,
      '<': 1,
      '>': 1,
      '<=': 1,
      '>=': 1,
      '&&': 1,
      '||': 1,
      '&': 1,
      '|': 1,
      '!': 1,
      '?': 1
    };

    var $EOF = 0;
    var $TAB = 9;
    var $LF = 10;
    var $VTAB = 11;
    var $FF = 12;
    var $CR = 13;
    var $SPACE = 32;
    var $BANG = 33;
    var $DQ = 34;
    var $$ = 36;
    var $PERCENT = 37;
    var $AMPERSAND = 38;
    var $SQ = 39;
    var $LPAREN = 40;
    var $RPAREN = 41;
    var $STAR = 42;
    var $PLUS = 43;
    var $COMMA = 44;
    var $MINUS = 45;
    var $PERIOD = 46;
    var $SLASH = 47;
    var $COLON = 58;
    var $SEMICOLON = 59;
    var $LT = 60;
    var $EQ = 61;
    var $GT = 62;
    var $QUESTION = 63;

    var $0 = 48;
    var $9 = 57;

    var $A = 65;
    var $E = 69;
    var $Z = 90;

    var $LBRACKET = 91;
    var $BACKSLASH = 92;
    var $RBRACKET = 93;
    var $CARET = 94;
    var $_ = 95;

    var $a = 97;
    var $e = 101;
    var $f = 102;
    var $n = 110;
    var $r = 114;
    var $t = 116;
    var $u = 117;
    var $v = 118;
    var $z = 122;

    var $LBRACE = 123;
    var $BAR = 124;
    var $RBRACE = 125;
    var $NBSP = 160;

    function isWhitespace(code) {
      return code >= $TAB && code <= $SPACE || code === $NBSP;
    }

    function isIdentifierStart(code) {
      return $a <= code && code <= $z || $A <= code && code <= $Z || code === $_ || code === $$;
    }

    function isIdentifierPart(code) {
      return $a <= code && code <= $z || $A <= code && code <= $Z || $0 <= code && code <= $9 || code === $_ || code === $$;
    }

    function isDigit(code) {
      return $0 <= code && code <= $9;
    }

    function isExponentStart(code) {
      return code === $e || code === $E;
    }

    function isExponentSign(code) {
      return code === $MINUS || code === $PLUS;
    }

    function unescape(code) {
      switch (code) {
        case $n:
          return $LF;
        case $f:
          return $FF;
        case $r:
          return $CR;
        case $t:
          return $TAB;
        case $v:
          return $VTAB;
        default:
          return code;
      }
    }

    function assert(condition, message) {
      if (!condition) {
        throw message || 'Assertion failed';
      }
    }

    var EOF = new Token(-1, null);

    var Parser = exports.Parser = function () {
      function Parser() {
        

        this.cache = {};
        this.lexer = new Lexer();
      }

      Parser.prototype.parse = function parse(input) {
        input = input || '';

        return this.cache[input] || (this.cache[input] = new ParserImplementation(this.lexer, input).parseChain());
      };

      return Parser;
    }();

    var ParserImplementation = exports.ParserImplementation = function () {
      function ParserImplementation(lexer, input) {
        

        this.index = 0;
        this.input = input;
        this.tokens = lexer.lex(input);
      }

      ParserImplementation.prototype.parseChain = function parseChain() {
        var isChain = false;
        var expressions = [];

        while (this.optional(';')) {
          isChain = true;
        }

        while (this.index < this.tokens.length) {
          if (this.peek.text === ')' || this.peek.text === '}' || this.peek.text === ']') {
            this.error('Unconsumed token ' + this.peek.text);
          }

          var expr = this.parseBindingBehavior();
          expressions.push(expr);

          while (this.optional(';')) {
            isChain = true;
          }

          if (isChain) {
            this.error('Multiple expressions are not allowed.');
          }
        }

        return expressions.length === 1 ? expressions[0] : new Chain(expressions);
      };

      ParserImplementation.prototype.parseBindingBehavior = function parseBindingBehavior() {
        var result = this.parseValueConverter();

        while (this.optional('&')) {
          var name = this.peek.text;
          var args = [];

          this.advance();

          while (this.optional(':')) {
            args.push(this.parseExpression());
          }

          result = new BindingBehavior(result, name, args);
        }

        return result;
      };

      ParserImplementation.prototype.parseValueConverter = function parseValueConverter() {
        var result = this.parseExpression();

        while (this.optional('|')) {
          var name = this.peek.text;
          var args = [];

          this.advance();

          while (this.optional(':')) {
            args.push(this.parseExpression());
          }

          result = new ValueConverter(result, name, args, [result].concat(args));
        }

        return result;
      };

      ParserImplementation.prototype.parseExpression = function parseExpression() {
        var start = this.peek.index;
        var result = this.parseConditional();

        while (this.peek.text === '=') {
          if (!result.isAssignable) {
            var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
            var expression = this.input.substring(start, end);

            this.error('Expression ' + expression + ' is not assignable');
          }

          this.expect('=');
          result = new Assign(result, this.parseConditional());
        }

        return result;
      };

      ParserImplementation.prototype.parseConditional = function parseConditional() {
        var start = this.peek.index;
        var result = this.parseLogicalOr();

        if (this.optional('?')) {
          var yes = this.parseExpression();

          if (!this.optional(':')) {
            var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
            var expression = this.input.substring(start, end);

            this.error('Conditional expression ' + expression + ' requires all 3 expressions');
          }

          var no = this.parseExpression();
          result = new Conditional(result, yes, no);
        }

        return result;
      };

      ParserImplementation.prototype.parseLogicalOr = function parseLogicalOr() {
        var result = this.parseLogicalAnd();

        while (this.optional('||')) {
          result = new Binary('||', result, this.parseLogicalAnd());
        }

        return result;
      };

      ParserImplementation.prototype.parseLogicalAnd = function parseLogicalAnd() {
        var result = this.parseEquality();

        while (this.optional('&&')) {
          result = new Binary('&&', result, this.parseEquality());
        }

        return result;
      };

      ParserImplementation.prototype.parseEquality = function parseEquality() {
        var result = this.parseRelational();

        while (true) {
          if (this.optional('==')) {
            result = new Binary('==', result, this.parseRelational());
          } else if (this.optional('!=')) {
            result = new Binary('!=', result, this.parseRelational());
          } else if (this.optional('===')) {
            result = new Binary('===', result, this.parseRelational());
          } else if (this.optional('!==')) {
            result = new Binary('!==', result, this.parseRelational());
          } else {
            return result;
          }
        }
      };

      ParserImplementation.prototype.parseRelational = function parseRelational() {
        var result = this.parseAdditive();

        while (true) {
          if (this.optional('<')) {
            result = new Binary('<', result, this.parseAdditive());
          } else if (this.optional('>')) {
            result = new Binary('>', result, this.parseAdditive());
          } else if (this.optional('<=')) {
            result = new Binary('<=', result, this.parseAdditive());
          } else if (this.optional('>=')) {
            result = new Binary('>=', result, this.parseAdditive());
          } else {
            return result;
          }
        }
      };

      ParserImplementation.prototype.parseAdditive = function parseAdditive() {
        var result = this.parseMultiplicative();

        while (true) {
          if (this.optional('+')) {
            result = new Binary('+', result, this.parseMultiplicative());
          } else if (this.optional('-')) {
            result = new Binary('-', result, this.parseMultiplicative());
          } else {
            return result;
          }
        }
      };

      ParserImplementation.prototype.parseMultiplicative = function parseMultiplicative() {
        var result = this.parsePrefix();

        while (true) {
          if (this.optional('*')) {
            result = new Binary('*', result, this.parsePrefix());
          } else if (this.optional('%')) {
            result = new Binary('%', result, this.parsePrefix());
          } else if (this.optional('/')) {
            result = new Binary('/', result, this.parsePrefix());
          } else {
            return result;
          }
        }
      };

      ParserImplementation.prototype.parsePrefix = function parsePrefix() {
        if (this.optional('+')) {
          return this.parsePrefix();
        } else if (this.optional('-')) {
          return new Binary('-', new LiteralPrimitive(0), this.parsePrefix());
        } else if (this.optional('!')) {
          return new PrefixNot('!', this.parsePrefix());
        }

        return this.parseAccessOrCallMember();
      };

      ParserImplementation.prototype.parseAccessOrCallMember = function parseAccessOrCallMember() {
        var result = this.parsePrimary();

        while (true) {
          if (this.optional('.')) {
            var name = this.peek.text;

            this.advance();

            if (this.optional('(')) {
              var args = this.parseExpressionList(')');
              this.expect(')');
              if (result instanceof AccessThis) {
                result = new CallScope(name, args, result.ancestor);
              } else {
                result = new CallMember(result, name, args);
              }
            } else {
              if (result instanceof AccessThis) {
                result = new AccessScope(name, result.ancestor);
              } else {
                result = new AccessMember(result, name);
              }
            }
          } else if (this.optional('[')) {
            var key = this.parseExpression();
            this.expect(']');
            result = new AccessKeyed(result, key);
          } else if (this.optional('(')) {
            var _args = this.parseExpressionList(')');
            this.expect(')');
            result = new CallFunction(result, _args);
          } else {
            return result;
          }
        }
      };

      ParserImplementation.prototype.parsePrimary = function parsePrimary() {
        if (this.optional('(')) {
          var result = this.parseExpression();
          this.expect(')');
          return result;
        } else if (this.optional('null')) {
          return new LiteralPrimitive(null);
        } else if (this.optional('undefined')) {
          return new LiteralPrimitive(undefined);
        } else if (this.optional('true')) {
          return new LiteralPrimitive(true);
        } else if (this.optional('false')) {
          return new LiteralPrimitive(false);
        } else if (this.optional('[')) {
          var _elements = this.parseExpressionList(']');
          this.expect(']');
          return new LiteralArray(_elements);
        } else if (this.peek.text === '{') {
          return this.parseObject();
        } else if (this.peek.key !== null && this.peek.key !== undefined) {
          return this.parseAccessOrCallScope();
        } else if (this.peek.value !== null && this.peek.value !== undefined) {
          var value = this.peek.value;
          this.advance();
          return value instanceof String || typeof value === 'string' ? new LiteralString(value) : new LiteralPrimitive(value);
        } else if (this.index >= this.tokens.length) {
          throw new Error('Unexpected end of expression: ' + this.input);
        } else {
          this.error('Unexpected token ' + this.peek.text);
        }
      };

      ParserImplementation.prototype.parseAccessOrCallScope = function parseAccessOrCallScope() {
        var name = this.peek.key;

        this.advance();

        if (name === '$this') {
          return new AccessThis(0);
        }

        var ancestor = 0;
        while (name === '$parent') {
          ancestor++;
          if (this.optional('.')) {
            name = this.peek.key;
            this.advance();
          } else if (this.peek === EOF || this.peek.text === '(' || this.peek.text === ')' || this.peek.text === '[' || this.peek.text === '}' || this.peek.text === ',' || this.peek.text === '|' || this.peek.text === '&') {
            return new AccessThis(ancestor);
          } else {
            this.error('Unexpected token ' + this.peek.text);
          }
        }

        if (this.optional('(')) {
          var args = this.parseExpressionList(')');
          this.expect(')');
          return new CallScope(name, args, ancestor);
        }

        return new AccessScope(name, ancestor);
      };

      ParserImplementation.prototype.parseObject = function parseObject() {
        var keys = [];
        var values = [];

        this.expect('{');

        if (this.peek.text !== '}') {
          do {
            var peek = this.peek;
            var value = peek.value;
            keys.push(typeof value === 'string' ? value : peek.text);

            this.advance();
            if (peek.key && (this.peek.text === ',' || this.peek.text === '}')) {
              --this.index;
              values.push(this.parseAccessOrCallScope());
            } else {
              this.expect(':');
              values.push(this.parseExpression());
            }
          } while (this.optional(','));
        }

        this.expect('}');

        return new LiteralObject(keys, values);
      };

      ParserImplementation.prototype.parseExpressionList = function parseExpressionList(terminator) {
        var result = [];

        if (this.peek.text !== terminator) {
          do {
            result.push(this.parseExpression());
          } while (this.optional(','));
        }

        return result;
      };

      ParserImplementation.prototype.optional = function optional(text) {
        if (this.peek.text === text) {
          this.advance();
          return true;
        }

        return false;
      };

      ParserImplementation.prototype.expect = function expect(text) {
        if (this.peek.text === text) {
          this.advance();
        } else {
          this.error('Missing expected ' + text);
        }
      };

      ParserImplementation.prototype.advance = function advance() {
        this.index++;
      };

      ParserImplementation.prototype.error = function error(message) {
        var location = this.index < this.tokens.length ? 'at column ' + (this.tokens[this.index].index + 1) + ' in' : 'at the end of the expression';

        throw new Error('Parser Error: ' + message + ' ' + location + ' [' + this.input + ']');
      };

      _createClass(ParserImplementation, [{
        key: 'peek',
        get: function get() {
          return this.index < this.tokens.length ? this.tokens[this.index] : EOF;
        }
      }]);

      return ParserImplementation;
    }();

    var mapProto = Map.prototype;

    function _getMapObserver(taskQueue, map) {
      return ModifyMapObserver.for(taskQueue, map);
    }

    exports.getMapObserver = _getMapObserver;

    var ModifyMapObserver = function (_ModifyCollectionObse2) {
      _inherits(ModifyMapObserver, _ModifyCollectionObse2);

      function ModifyMapObserver(taskQueue, map) {
        

        return _possibleConstructorReturn(this, _ModifyCollectionObse2.call(this, taskQueue, map));
      }

      ModifyMapObserver.for = function _for(taskQueue, map) {
        if (!('__map_observer__' in map)) {
          Reflect.defineProperty(map, '__map_observer__', {
            value: ModifyMapObserver.create(taskQueue, map),
            enumerable: false, configurable: false
          });
        }
        return map.__map_observer__;
      };

      ModifyMapObserver.create = function create(taskQueue, map) {
        var observer = new ModifyMapObserver(taskQueue, map);

        var proto = mapProto;
        if (proto.set !== map.set || proto.delete !== map.delete || proto.clear !== map.clear) {
          proto = {
            set: map.set,
            delete: map.delete,
            clear: map.clear
          };
        }

        map.set = function () {
          var hasValue = map.has(arguments[0]);
          var type = hasValue ? 'update' : 'add';
          var oldValue = map.get(arguments[0]);
          var methodCallResult = proto.set.apply(map, arguments);
          if (!hasValue || oldValue !== map.get(arguments[0])) {
            observer.addChangeRecord({
              type: type,
              object: map,
              key: arguments[0],
              oldValue: oldValue
            });
          }
          return methodCallResult;
        };

        map.delete = function () {
          var hasValue = map.has(arguments[0]);
          var oldValue = map.get(arguments[0]);
          var methodCallResult = proto.delete.apply(map, arguments);
          if (hasValue) {
            observer.addChangeRecord({
              type: 'delete',
              object: map,
              key: arguments[0],
              oldValue: oldValue
            });
          }
          return methodCallResult;
        };

        map.clear = function () {
          var methodCallResult = proto.clear.apply(map, arguments);
          observer.addChangeRecord({
            type: 'clear',
            object: map
          });
          return methodCallResult;
        };

        return observer;
      };

      return ModifyMapObserver;
    }(ModifyCollectionObserver);

    function findOriginalEventTarget(event) {
      return event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target;
    }

    function stopPropagation() {
      this.standardStopPropagation();
      this.propagationStopped = true;
    }

    function handleCapturedEvent(event) {
      event.propagationStopped = false;
      var target = findOriginalEventTarget(event);

      var orderedCallbacks = [];

      while (target) {
        if (target.capturedCallbacks) {
          var callback = target.capturedCallbacks[event.type];
          if (callback) {
            if (event.stopPropagation !== stopPropagation) {
              event.standardStopPropagation = event.stopPropagation;
              event.stopPropagation = stopPropagation;
            }
            orderedCallbacks.push(callback);
          }
        }
        target = target.parentNode;
      }
      for (var _i22 = orderedCallbacks.length - 1; _i22 >= 0 && !event.propagationStopped; _i22--) {
        var orderedCallback = orderedCallbacks[_i22];
        if ('handleEvent' in orderedCallback) {
          orderedCallback.handleEvent(event);
        } else {
          orderedCallback(event);
        }
      }
    }

    var CapturedHandlerEntry = function () {
      function CapturedHandlerEntry(eventName) {
        

        this.eventName = eventName;
        this.count = 0;
      }

      CapturedHandlerEntry.prototype.increment = function increment() {
        this.count++;

        if (this.count === 1) {
          aureliaPal.DOM.addEventListener(this.eventName, handleCapturedEvent, true);
        }
      };

      CapturedHandlerEntry.prototype.decrement = function decrement() {
        this.count--;

        if (this.count === 0) {
          aureliaPal.DOM.removeEventListener(this.eventName, handleCapturedEvent, true);
        }
      };

      return CapturedHandlerEntry;
    }();

    function handleDelegatedEvent(event) {
      event.propagationStopped = false;
      var target = findOriginalEventTarget(event);

      while (target && !event.propagationStopped) {
        if (target.delegatedCallbacks) {
          var callback = target.delegatedCallbacks[event.type];
          if (callback) {
            if (event.stopPropagation !== stopPropagation) {
              event.standardStopPropagation = event.stopPropagation;
              event.stopPropagation = stopPropagation;
            }
            if ('handleEvent' in callback) {
              callback.handleEvent(event);
            } else {
              callback(event);
            }
          }
        }

        target = target.parentNode;
      }
    }

    var DelegateHandlerEntry = function () {
      function DelegateHandlerEntry(eventName) {
        

        this.eventName = eventName;
        this.count = 0;
      }

      DelegateHandlerEntry.prototype.increment = function increment() {
        this.count++;

        if (this.count === 1) {
          aureliaPal.DOM.addEventListener(this.eventName, handleDelegatedEvent, false);
        }
      };

      DelegateHandlerEntry.prototype.decrement = function decrement() {
        this.count--;

        if (this.count === 0) {
          aureliaPal.DOM.removeEventListener(this.eventName, handleDelegatedEvent, false);
        }
      };

      return DelegateHandlerEntry;
    }();

    var DelegationEntryHandler = function () {
      function DelegationEntryHandler(entry, lookup, targetEvent) {
        

        this.entry = entry;
        this.lookup = lookup;
        this.targetEvent = targetEvent;
      }

      DelegationEntryHandler.prototype.dispose = function dispose() {
        this.entry.decrement();
        this.lookup[this.targetEvent] = null;
        this.entry = this.lookup = this.targetEvent = null;
      };

      return DelegationEntryHandler;
    }();

    var EventHandler = function () {
      function EventHandler(target, targetEvent, callback) {
        

        this.target = target;
        this.targetEvent = targetEvent;
        this.callback = callback;
      }

      EventHandler.prototype.dispose = function dispose() {
        this.target.removeEventListener(this.targetEvent, this.callback);
        this.target = this.targetEvent = this.callback = null;
      };

      return EventHandler;
    }();

    var DefaultEventStrategy = function () {
      function DefaultEventStrategy() {
        

        this.delegatedHandlers = {};
        this.capturedHandlers = {};
      }

      DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, strategy, disposable) {
        var delegatedHandlers = void 0;
        var capturedHandlers = void 0;
        var handlerEntry = void 0;

        if (strategy === delegationStrategy.bubbling) {
          delegatedHandlers = this.delegatedHandlers;
          handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent));
          var delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});

          handlerEntry.increment();
          delegatedCallbacks[targetEvent] = callback;

          if (disposable === true) {
            return new DelegationEntryHandler(handlerEntry, delegatedCallbacks, targetEvent);
          }

          return function () {
            handlerEntry.decrement();
            delegatedCallbacks[targetEvent] = null;
          };
        }
        if (strategy === delegationStrategy.capturing) {
          capturedHandlers = this.capturedHandlers;
          handlerEntry = capturedHandlers[targetEvent] || (capturedHandlers[targetEvent] = new CapturedHandlerEntry(targetEvent));
          var capturedCallbacks = target.capturedCallbacks || (target.capturedCallbacks = {});

          handlerEntry.increment();
          capturedCallbacks[targetEvent] = callback;

          if (disposable === true) {
            return new DelegationEntryHandler(handlerEntry, capturedCallbacks, targetEvent);
          }

          return function () {
            handlerEntry.decrement();
            capturedCallbacks[targetEvent] = null;
          };
        }

        target.addEventListener(targetEvent, callback);

        if (disposable === true) {
          return new EventHandler(target, targetEvent, callback);
        }

        return function () {
          target.removeEventListener(targetEvent, callback);
        };
      };

      return DefaultEventStrategy;
    }();

    var delegationStrategy = exports.delegationStrategy = {
      none: 0,
      capturing: 1,
      bubbling: 2
    };

    var EventManager = exports.EventManager = function () {
      function EventManager() {
        

        this.elementHandlerLookup = {};
        this.eventStrategyLookup = {};

        this.registerElementConfig({
          tagName: 'input',
          properties: {
            value: ['change', 'input'],
            checked: ['change', 'input'],
            files: ['change', 'input']
          }
        });

        this.registerElementConfig({
          tagName: 'textarea',
          properties: {
            value: ['change', 'input']
          }
        });

        this.registerElementConfig({
          tagName: 'select',
          properties: {
            value: ['change']
          }
        });

        this.registerElementConfig({
          tagName: 'content editable',
          properties: {
            value: ['change', 'input', 'blur', 'keyup', 'paste']
          }
        });

        this.registerElementConfig({
          tagName: 'scrollable element',
          properties: {
            scrollTop: ['scroll'],
            scrollLeft: ['scroll']
          }
        });

        this.defaultEventStrategy = new DefaultEventStrategy();
      }

      EventManager.prototype.registerElementConfig = function registerElementConfig(config) {
        var tagName = config.tagName.toLowerCase();
        var properties = config.properties;
        var propertyName = void 0;

        var lookup = this.elementHandlerLookup[tagName] = {};

        for (propertyName in properties) {
          if (properties.hasOwnProperty(propertyName)) {
            lookup[propertyName] = properties[propertyName];
          }
        }
      };

      EventManager.prototype.registerEventStrategy = function registerEventStrategy(eventName, strategy) {
        this.eventStrategyLookup[eventName] = strategy;
      };

      EventManager.prototype.getElementHandler = function getElementHandler(target, propertyName) {
        var tagName = void 0;
        var lookup = this.elementHandlerLookup;

        if (target.tagName) {
          tagName = target.tagName.toLowerCase();

          if (lookup[tagName] && lookup[tagName][propertyName]) {
            return new EventSubscriber(lookup[tagName][propertyName]);
          }

          if (propertyName === 'textContent' || propertyName === 'innerHTML') {
            return new EventSubscriber(lookup['content editable'].value);
          }

          if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
            return new EventSubscriber(lookup['scrollable element'][propertyName]);
          }
        }

        return null;
      };

      EventManager.prototype.addEventListener = function addEventListener(target, targetEvent, callbackOrListener, delegate, disposable) {
        return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy).subscribe(target, targetEvent, callbackOrListener, delegate, disposable);
      };

      return EventManager;
    }();

    var EventSubscriber = exports.EventSubscriber = function () {
      function EventSubscriber(events) {
        

        this.events = events;
        this.element = null;
        this.handler = null;
      }

      EventSubscriber.prototype.subscribe = function subscribe(element, callbackOrListener) {
        this.element = element;
        this.handler = callbackOrListener;

        var events = this.events;
        for (var _i23 = 0, ii = events.length; ii > _i23; ++_i23) {
          element.addEventListener(events[_i23], callbackOrListener);
        }
      };

      EventSubscriber.prototype.dispose = function dispose() {
        if (this.element === null) {
          return;
        }
        var element = this.element;
        var callbackOrListener = this.handler;
        var events = this.events;
        for (var _i24 = 0, ii = events.length; ii > _i24; ++_i24) {
          element.removeEventListener(events[_i24], callbackOrListener);
        }
        this.element = this.handler = null;
      };

      return EventSubscriber;
    }();

    var DirtyChecker = exports.DirtyChecker = function () {
      function DirtyChecker() {
        

        this.tracked = [];
        this.checkDelay = 120;
      }

      DirtyChecker.prototype.addProperty = function addProperty(property) {
        var tracked = this.tracked;

        tracked.push(property);

        if (tracked.length === 1) {
          this.scheduleDirtyCheck();
        }
      };

      DirtyChecker.prototype.removeProperty = function removeProperty(property) {
        var tracked = this.tracked;
        tracked.splice(tracked.indexOf(property), 1);
      };

      DirtyChecker.prototype.scheduleDirtyCheck = function scheduleDirtyCheck() {
        var _this22 = this;

        setTimeout(function () {
          return _this22.check();
        }, this.checkDelay);
      };

      DirtyChecker.prototype.check = function check() {
        var tracked = this.tracked;
        var i = tracked.length;

        while (i--) {
          var current = tracked[i];

          if (current.isDirty()) {
            current.call();
          }
        }

        if (tracked.length) {
          this.scheduleDirtyCheck();
        }
      };

      return DirtyChecker;
    }();

    var DirtyCheckProperty = exports.DirtyCheckProperty = (_dec5 = subscriberCollection(), _dec5(_class5 = function () {
      function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
        

        this.dirtyChecker = dirtyChecker;
        this.obj = obj;
        this.propertyName = propertyName;
      }

      DirtyCheckProperty.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };

      DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
        this.obj[this.propertyName] = newValue;
      };

      DirtyCheckProperty.prototype.call = function call() {
        var oldValue = this.oldValue;
        var newValue = this.getValue();

        this.callSubscribers(newValue, oldValue);

        this.oldValue = newValue;
      };

      DirtyCheckProperty.prototype.isDirty = function isDirty() {
        return this.oldValue !== this.obj[this.propertyName];
      };

      DirtyCheckProperty.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.oldValue = this.getValue();
          this.dirtyChecker.addProperty(this);
        }
        this.addSubscriber(context, callable);
      };

      DirtyCheckProperty.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.dirtyChecker.removeProperty(this);
        }
      };

      return DirtyCheckProperty;
    }()) || _class5);


    var logger = LogManager.getLogger('property-observation');

    var propertyAccessor = exports.propertyAccessor = {
      getValue: function getValue(obj, propertyName) {
        return obj[propertyName];
      },
      setValue: function setValue(value, obj, propertyName) {
        obj[propertyName] = value;
      }
    };

    var PrimitiveObserver = exports.PrimitiveObserver = function () {
      function PrimitiveObserver(primitive, propertyName) {
        

        this.doNotCache = true;

        this.primitive = primitive;
        this.propertyName = propertyName;
      }

      PrimitiveObserver.prototype.getValue = function getValue() {
        return this.primitive[this.propertyName];
      };

      PrimitiveObserver.prototype.setValue = function setValue() {
        var type = _typeof(this.primitive);
        throw new Error('The ' + this.propertyName + ' property of a ' + type + ' (' + this.primitive + ') cannot be assigned.');
      };

      PrimitiveObserver.prototype.subscribe = function subscribe() {};

      PrimitiveObserver.prototype.unsubscribe = function unsubscribe() {};

      return PrimitiveObserver;
    }();

    var SetterObserver = exports.SetterObserver = (_dec6 = subscriberCollection(), _dec6(_class7 = function () {
      function SetterObserver(taskQueue, obj, propertyName) {
        

        this.taskQueue = taskQueue;
        this.obj = obj;
        this.propertyName = propertyName;
        this.queued = false;
        this.observing = false;
      }

      SetterObserver.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };

      SetterObserver.prototype.setValue = function setValue(newValue) {
        this.obj[this.propertyName] = newValue;
      };

      SetterObserver.prototype.getterValue = function getterValue() {
        return this.currentValue;
      };

      SetterObserver.prototype.setterValue = function setterValue(newValue) {
        var oldValue = this.currentValue;

        if (oldValue !== newValue) {
          if (!this.queued) {
            this.oldValue = oldValue;
            this.queued = true;
            this.taskQueue.queueMicroTask(this);
          }

          this.currentValue = newValue;
        }
      };

      SetterObserver.prototype.call = function call() {
        var oldValue = this.oldValue;
        var newValue = this.currentValue;

        this.queued = false;

        this.callSubscribers(newValue, oldValue);
      };

      SetterObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.observing) {
          this.convertProperty();
        }
        this.addSubscriber(context, callable);
      };

      SetterObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };

      SetterObserver.prototype.convertProperty = function convertProperty() {
        this.observing = true;
        this.currentValue = this.obj[this.propertyName];
        this.setValue = this.setterValue;
        this.getValue = this.getterValue;

        if (!Reflect.defineProperty(this.obj, this.propertyName, {
          configurable: true,
          enumerable: this.propertyName in this.obj ? this.obj.propertyIsEnumerable(this.propertyName) : true,
          get: this.getValue.bind(this),
          set: this.setValue.bind(this)
        })) {
          logger.warn('Cannot observe property \'' + this.propertyName + '\' of object', this.obj);
        }
      };

      return SetterObserver;
    }()) || _class7);

    var XLinkAttributeObserver = exports.XLinkAttributeObserver = function () {
      function XLinkAttributeObserver(element, propertyName, attributeName) {
        

        this.element = element;
        this.propertyName = propertyName;
        this.attributeName = attributeName;
      }

      XLinkAttributeObserver.prototype.getValue = function getValue() {
        return this.element.getAttributeNS('http://www.w3.org/1999/xlink', this.attributeName);
      };

      XLinkAttributeObserver.prototype.setValue = function setValue(newValue) {
        return this.element.setAttributeNS('http://www.w3.org/1999/xlink', this.attributeName, newValue);
      };

      XLinkAttributeObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
      };

      return XLinkAttributeObserver;
    }();

    var dataAttributeAccessor = exports.dataAttributeAccessor = {
      getValue: function getValue(obj, propertyName) {
        return obj.getAttribute(propertyName);
      },
      setValue: function setValue(value, obj, propertyName) {
        if (value === null || value === undefined) {
          obj.removeAttribute(propertyName);
        } else {
          obj.setAttribute(propertyName, value);
        }
      }
    };

    var DataAttributeObserver = exports.DataAttributeObserver = function () {
      function DataAttributeObserver(element, propertyName) {
        

        this.element = element;
        this.propertyName = propertyName;
      }

      DataAttributeObserver.prototype.getValue = function getValue() {
        return this.element.getAttribute(this.propertyName);
      };

      DataAttributeObserver.prototype.setValue = function setValue(newValue) {
        if (newValue === null || newValue === undefined) {
          return this.element.removeAttribute(this.propertyName);
        }
        return this.element.setAttribute(this.propertyName, newValue);
      };

      DataAttributeObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
      };

      return DataAttributeObserver;
    }();

    var StyleObserver = exports.StyleObserver = function () {
      function StyleObserver(element, propertyName) {
        

        this.element = element;
        this.propertyName = propertyName;

        this.styles = null;
        this.version = 0;
      }

      StyleObserver.prototype.getValue = function getValue() {
        return this.element.style.cssText;
      };

      StyleObserver.prototype._setProperty = function _setProperty(style, value) {
        var priority = '';

        if (value !== null && value !== undefined && typeof value.indexOf === 'function' && value.indexOf('!important') !== -1) {
          priority = 'important';
          value = value.replace('!important', '');
        }
        this.element.style.setProperty(style, value, priority);
      };

      StyleObserver.prototype.setValue = function setValue(newValue) {
        var styles = this.styles || {};
        var style = void 0;
        var version = this.version;

        if (newValue !== null && newValue !== undefined) {
          if (newValue instanceof Object) {
            var value = void 0;
            for (style in newValue) {
              if (newValue.hasOwnProperty(style)) {
                value = newValue[style];
                style = style.replace(/([A-Z])/g, function (m) {
                  return '-' + m.toLowerCase();
                });
                styles[style] = version;
                this._setProperty(style, value);
              }
            }
          } else if (newValue.length) {
            var rx = /\s*([\w\-]+)\s*:\s*((?:(?:[\w\-]+\(\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[\w\-]+\(\s*(?:^"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^\)]*)\),?|[^\)]*)\),?|"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^;]*),?\s*)+);?/g;
            var pair = void 0;
            while ((pair = rx.exec(newValue)) !== null) {
              style = pair[1];
              if (!style) {
                continue;
              }

              styles[style] = version;
              this._setProperty(style, pair[2]);
            }
          }
        }

        this.styles = styles;
        this.version += 1;

        if (version === 0) {
          return;
        }

        version -= 1;
        for (style in styles) {
          if (!styles.hasOwnProperty(style) || styles[style] !== version) {
            continue;
          }

          this.element.style.removeProperty(style);
        }
      };

      StyleObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
      };

      return StyleObserver;
    }();

    var ValueAttributeObserver = exports.ValueAttributeObserver = (_dec7 = subscriberCollection(), _dec7(_class8 = function () {
      function ValueAttributeObserver(element, propertyName, handler) {
        

        this.element = element;
        this.propertyName = propertyName;
        this.handler = handler;
        if (propertyName === 'files') {
          this.setValue = function () {};
        }
      }

      ValueAttributeObserver.prototype.getValue = function getValue() {
        return this.element[this.propertyName];
      };

      ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
        newValue = newValue === undefined || newValue === null ? '' : newValue;
        if (this.element[this.propertyName] !== newValue) {
          this.element[this.propertyName] = newValue;
          this.notify();
        }
      };

      ValueAttributeObserver.prototype.notify = function notify() {
        var oldValue = this.oldValue;
        var newValue = this.getValue();

        this.callSubscribers(newValue, oldValue);

        this.oldValue = newValue;
      };

      ValueAttributeObserver.prototype.handleEvent = function handleEvent() {
        this.notify();
      };

      ValueAttributeObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.oldValue = this.getValue();
          this.handler.subscribe(this.element, this);
        }

        this.addSubscriber(context, callable);
      };

      ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.handler.dispose();
        }
      };

      return ValueAttributeObserver;
    }()) || _class8);


    var checkedArrayContext = 'CheckedObserver:array';
    var checkedValueContext = 'CheckedObserver:value';

    var CheckedObserver = exports.CheckedObserver = (_dec8 = subscriberCollection(), _dec8(_class9 = function () {
      function CheckedObserver(element, handler, observerLocator) {
        

        this.element = element;
        this.handler = handler;
        this.observerLocator = observerLocator;
      }

      CheckedObserver.prototype.getValue = function getValue() {
        return this.value;
      };

      CheckedObserver.prototype.setValue = function setValue(newValue) {
        if (this.initialSync && this.value === newValue) {
          return;
        }

        if (this.arrayObserver) {
          this.arrayObserver.unsubscribe(checkedArrayContext, this);
          this.arrayObserver = null;
        }

        if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
          this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
          this.arrayObserver.subscribe(checkedArrayContext, this);
        }

        this.oldValue = this.value;
        this.value = newValue;
        this.synchronizeElement();
        this.notify();

        if (!this.initialSync) {
          this.initialSync = true;
          this.observerLocator.taskQueue.queueMicroTask(this);
        }
      };

      CheckedObserver.prototype.call = function call(context, splices) {
        this.synchronizeElement();

        if (!this.valueObserver) {
          this.valueObserver = this.element.__observers__.model || this.element.__observers__.value;
          if (this.valueObserver) {
            this.valueObserver.subscribe(checkedValueContext, this);
          }
        }
      };

      CheckedObserver.prototype.synchronizeElement = function synchronizeElement() {
        var value = this.value;
        var element = this.element;
        var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
        var isRadio = element.type === 'radio';
        var matcher = element.matcher || function (a, b) {
          return a === b;
        };

        element.checked = isRadio && !!matcher(value, elementValue) || !isRadio && value === true || !isRadio && Array.isArray(value) && value.findIndex(function (item) {
          return !!matcher(item, elementValue);
        }) !== -1;
      };

      CheckedObserver.prototype.synchronizeValue = function synchronizeValue() {
        var value = this.value;
        var element = this.element;
        var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
        var index = void 0;
        var matcher = element.matcher || function (a, b) {
          return a === b;
        };

        if (element.type === 'checkbox') {
          if (Array.isArray(value)) {
            index = value.findIndex(function (item) {
              return !!matcher(item, elementValue);
            });
            if (element.checked && index === -1) {
              value.push(elementValue);
            } else if (!element.checked && index !== -1) {
              value.splice(index, 1);
            }

            return;
          }

          value = element.checked;
        } else if (element.checked) {
          value = elementValue;
        } else {
          return;
        }

        this.oldValue = this.value;
        this.value = value;
        this.notify();
      };

      CheckedObserver.prototype.notify = function notify() {
        var oldValue = this.oldValue;
        var newValue = this.value;

        if (newValue === oldValue) {
          return;
        }

        this.callSubscribers(newValue, oldValue);
      };

      CheckedObserver.prototype.handleEvent = function handleEvent() {
        this.synchronizeValue();
      };

      CheckedObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.handler.subscribe(this.element, this);
        }
        this.addSubscriber(context, callable);
      };

      CheckedObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.handler.dispose();
        }
      };

      CheckedObserver.prototype.unbind = function unbind() {
        if (this.arrayObserver) {
          this.arrayObserver.unsubscribe(checkedArrayContext, this);
          this.arrayObserver = null;
        }
        if (this.valueObserver) {
          this.valueObserver.unsubscribe(checkedValueContext, this);
        }
      };

      return CheckedObserver;
    }()) || _class9);


    var selectArrayContext = 'SelectValueObserver:array';

    var SelectValueObserver = exports.SelectValueObserver = (_dec9 = subscriberCollection(), _dec9(_class10 = function () {
      function SelectValueObserver(element, handler, observerLocator) {
        

        this.element = element;
        this.handler = handler;
        this.observerLocator = observerLocator;
      }

      SelectValueObserver.prototype.getValue = function getValue() {
        return this.value;
      };

      SelectValueObserver.prototype.setValue = function setValue(newValue) {
        if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
          throw new Error('Only null or Array instances can be bound to a multi-select.');
        }
        if (this.value === newValue) {
          return;
        }

        if (this.arrayObserver) {
          this.arrayObserver.unsubscribe(selectArrayContext, this);
          this.arrayObserver = null;
        }

        if (Array.isArray(newValue)) {
          this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
          this.arrayObserver.subscribe(selectArrayContext, this);
        }

        this.oldValue = this.value;
        this.value = newValue;
        this.synchronizeOptions();
        this.notify();

        if (!this.initialSync) {
          this.initialSync = true;
          this.observerLocator.taskQueue.queueMicroTask(this);
        }
      };

      SelectValueObserver.prototype.call = function call(context, splices) {
        this.synchronizeOptions();
      };

      SelectValueObserver.prototype.synchronizeOptions = function synchronizeOptions() {
        var value = this.value;
        var isArray = void 0;

        if (Array.isArray(value)) {
          isArray = true;
        }

        var options = this.element.options;
        var i = options.length;
        var matcher = this.element.matcher || function (a, b) {
          return a === b;
        };

        var _loop = function _loop() {
          var option = options.item(i);
          var optionValue = option.hasOwnProperty('model') ? option.model : option.value;
          if (isArray) {
            option.selected = value.findIndex(function (item) {
              return !!matcher(optionValue, item);
            }) !== -1;
            return 'continue';
          }
          option.selected = !!matcher(optionValue, value);
        };

        while (i--) {
          var _ret = _loop();

          if (_ret === 'continue') continue;
        }
      };

      SelectValueObserver.prototype.synchronizeValue = function synchronizeValue() {
        var _this23 = this;

        var options = this.element.options;
        var count = 0;
        var value = [];

        for (var _i25 = 0, ii = options.length; _i25 < ii; _i25++) {
          var _option = options.item(_i25);
          if (!_option.selected) {
            continue;
          }
          value.push(_option.hasOwnProperty('model') ? _option.model : _option.value);
          count++;
        }

        if (this.element.multiple) {
          if (Array.isArray(this.value)) {
            var _ret2 = function () {
              var matcher = _this23.element.matcher || function (a, b) {
                return a === b;
              };

              var i = 0;

              var _loop2 = function _loop2() {
                var a = _this23.value[i];
                if (value.findIndex(function (b) {
                  return matcher(a, b);
                }) === -1) {
                  _this23.value.splice(i, 1);
                } else {
                  i++;
                }
              };

              while (i < _this23.value.length) {
                _loop2();
              }

              i = 0;

              var _loop3 = function _loop3() {
                var a = value[i];
                if (_this23.value.findIndex(function (b) {
                  return matcher(a, b);
                }) === -1) {
                  _this23.value.push(a);
                }
                i++;
              };

              while (i < value.length) {
                _loop3();
              }
              return {
                v: void 0
              };
            }();

            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
          }
        } else {
          if (count === 0) {
            value = null;
          } else {
            value = value[0];
          }
        }

        if (value !== this.value) {
          this.oldValue = this.value;
          this.value = value;
          this.notify();
        }
      };

      SelectValueObserver.prototype.notify = function notify() {
        var oldValue = this.oldValue;
        var newValue = this.value;

        this.callSubscribers(newValue, oldValue);
      };

      SelectValueObserver.prototype.handleEvent = function handleEvent() {
        this.synchronizeValue();
      };

      SelectValueObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.handler.subscribe(this.element, this);
        }
        this.addSubscriber(context, callable);
      };

      SelectValueObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.handler.dispose();
        }
      };

      SelectValueObserver.prototype.bind = function bind() {
        var _this24 = this;

        this.domObserver = aureliaPal.DOM.createMutationObserver(function () {
          _this24.synchronizeOptions();
          _this24.synchronizeValue();
        });
        this.domObserver.observe(this.element, { childList: true, subtree: true });
      };

      SelectValueObserver.prototype.unbind = function unbind() {
        this.domObserver.disconnect();
        this.domObserver = null;

        if (this.arrayObserver) {
          this.arrayObserver.unsubscribe(selectArrayContext, this);
          this.arrayObserver = null;
        }
      };

      return SelectValueObserver;
    }()) || _class10);

    var ClassObserver = exports.ClassObserver = function () {
      function ClassObserver(element) {
        

        this.element = element;
        this.doNotCache = true;
        this.value = '';
        this.version = 0;
      }

      ClassObserver.prototype.getValue = function getValue() {
        return this.value;
      };

      ClassObserver.prototype.setValue = function setValue(newValue) {
        var nameIndex = this.nameIndex || {};
        var version = this.version;
        var names = void 0;
        var name = void 0;

        if (newValue !== null && newValue !== undefined && newValue.length) {
          names = newValue.split(/\s+/);
          for (var _i26 = 0, length = names.length; _i26 < length; _i26++) {
            name = names[_i26];
            if (name === '') {
              continue;
            }
            nameIndex[name] = version;
            this.element.classList.add(name);
          }
        }

        this.value = newValue;
        this.nameIndex = nameIndex;
        this.version += 1;

        if (version === 0) {
          return;
        }

        version -= 1;
        for (name in nameIndex) {
          if (!nameIndex.hasOwnProperty(name) || nameIndex[name] !== version) {
            continue;
          }
          this.element.classList.remove(name);
        }
      };

      ClassObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.');
      };

      return ClassObserver;
    }();

    function hasDeclaredDependencies(descriptor) {
      return !!(descriptor && descriptor.get && descriptor.get.dependencies);
    }

    function declarePropertyDependencies(ctor, propertyName, dependencies) {
      var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
      descriptor.get.dependencies = dependencies;
    }

    function computedFrom() {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return function (target, key, descriptor) {
        descriptor.get.dependencies = rest;
        return descriptor;
      };
    }

    var ComputedExpression = exports.ComputedExpression = function (_Expression19) {
      _inherits(ComputedExpression, _Expression19);

      function ComputedExpression(name, dependencies) {
        

        var _this25 = _possibleConstructorReturn(this, _Expression19.call(this));

        _this25.name = name;
        _this25.dependencies = dependencies;
        _this25.isAssignable = true;
        return _this25;
      }

      ComputedExpression.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return scope.bindingContext[this.name];
      };

      ComputedExpression.prototype.assign = function assign(scope, value) {
        scope.bindingContext[this.name] = value;
      };

      ComputedExpression.prototype.accept = function accept(visitor) {
        throw new Error('not implemented');
      };

      ComputedExpression.prototype.connect = function connect(binding, scope) {
        var dependencies = this.dependencies;
        var i = dependencies.length;
        while (i--) {
          dependencies[i].connect(binding, scope);
        }
      };

      return ComputedExpression;
    }(Expression);

    function createComputedObserver(obj, propertyName, descriptor, observerLocator) {
      var dependencies = descriptor.get.dependencies;
      if (!(dependencies instanceof ComputedExpression)) {
        var _i27 = dependencies.length;
        while (_i27--) {
          dependencies[_i27] = observerLocator.parser.parse(dependencies[_i27]);
        }
        dependencies = descriptor.get.dependencies = new ComputedExpression(propertyName, dependencies);
      }

      var scope = { bindingContext: obj, overrideContext: createOverrideContext(obj) };
      return new ExpressionObserver(scope, dependencies, observerLocator);
    }

    var svgElements = void 0;
    var svgPresentationElements = void 0;
    var svgPresentationAttributes = void 0;
    var svgAnalyzer = void 0;

    if (typeof FEATURE_NO_SVG === 'undefined') {
      svgElements = {
        a: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'target', 'transform', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        altGlyph: ['class', 'dx', 'dy', 'externalResourcesRequired', 'format', 'glyphRef', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        altGlyphDef: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        altGlyphItem: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        animate: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateColor: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateMotion: ['accumulate', 'additive', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keyPoints', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'origin', 'path', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'rotate', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateTransform: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'type', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        circle: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'r', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        clipPath: ['class', 'clipPathUnits', 'externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        'color-profile': ['id', 'local', 'name', 'rendering-intent', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        cursor: ['externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        defs: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        desc: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        ellipse: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        feBlend: ['class', 'height', 'id', 'in', 'in2', 'mode', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feColorMatrix: ['class', 'height', 'id', 'in', 'result', 'style', 'type', 'values', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feComponentTransfer: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feComposite: ['class', 'height', 'id', 'in', 'in2', 'k1', 'k2', 'k3', 'k4', 'operator', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feConvolveMatrix: ['bias', 'class', 'divisor', 'edgeMode', 'height', 'id', 'in', 'kernelMatrix', 'kernelUnitLength', 'order', 'preserveAlpha', 'result', 'style', 'targetX', 'targetY', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feDiffuseLighting: ['class', 'diffuseConstant', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feDisplacementMap: ['class', 'height', 'id', 'in', 'in2', 'result', 'scale', 'style', 'width', 'x', 'xChannelSelector', 'xml:base', 'xml:lang', 'xml:space', 'y', 'yChannelSelector'],
        feDistantLight: ['azimuth', 'elevation', 'id', 'xml:base', 'xml:lang', 'xml:space'],
        feFlood: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feFuncA: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncB: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncG: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncR: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feGaussianBlur: ['class', 'height', 'id', 'in', 'result', 'stdDeviation', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feImage: ['class', 'externalResourcesRequired', 'height', 'id', 'preserveAspectRatio', 'result', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feMerge: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feMergeNode: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        feMorphology: ['class', 'height', 'id', 'in', 'operator', 'radius', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feOffset: ['class', 'dx', 'dy', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        fePointLight: ['id', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
        feSpecularLighting: ['class', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'specularConstant', 'specularExponent', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feSpotLight: ['id', 'limitingConeAngle', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
        feTile: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feTurbulence: ['baseFrequency', 'class', 'height', 'id', 'numOctaves', 'result', 'seed', 'stitchTiles', 'style', 'type', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        filter: ['class', 'externalResourcesRequired', 'filterRes', 'filterUnits', 'height', 'id', 'primitiveUnits', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        font: ['class', 'externalResourcesRequired', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face': ['accent-height', 'alphabetic', 'ascent', 'bbox', 'cap-height', 'descent', 'font-family', 'font-size', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging', 'id', 'ideographic', 'mathematical', 'overline-position', 'overline-thickness', 'panose-1', 'slope', 'stemh', 'stemv', 'strikethrough-position', 'strikethrough-thickness', 'underline-position', 'underline-thickness', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'widths', 'x-height', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-format': ['id', 'string', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-name': ['id', 'name', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-src': ['id', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-uri': ['id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        foreignObject: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        g: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        glyph: ['arabic-form', 'class', 'd', 'glyph-name', 'horiz-adv-x', 'id', 'lang', 'orientation', 'style', 'unicode', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        glyphRef: ['class', 'dx', 'dy', 'format', 'glyphRef', 'id', 'style', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        hkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space'],
        image: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        line: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'x1', 'x2', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
        linearGradient: ['class', 'externalResourcesRequired', 'gradientTransform', 'gradientUnits', 'id', 'spreadMethod', 'style', 'x1', 'x2', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
        marker: ['class', 'externalResourcesRequired', 'id', 'markerHeight', 'markerUnits', 'markerWidth', 'orient', 'preserveAspectRatio', 'refX', 'refY', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
        mask: ['class', 'externalResourcesRequired', 'height', 'id', 'maskContentUnits', 'maskUnits', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        metadata: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        'missing-glyph': ['class', 'd', 'horiz-adv-x', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        mpath: ['externalResourcesRequired', 'id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        path: ['class', 'd', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'pathLength', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        pattern: ['class', 'externalResourcesRequired', 'height', 'id', 'patternContentUnits', 'patternTransform', 'patternUnits', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'viewBox', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        polygon: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        polyline: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        radialGradient: ['class', 'cx', 'cy', 'externalResourcesRequired', 'fx', 'fy', 'gradientTransform', 'gradientUnits', 'id', 'r', 'spreadMethod', 'style', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        rect: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        script: ['externalResourcesRequired', 'id', 'type', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        set: ['attributeName', 'attributeType', 'begin', 'dur', 'end', 'externalResourcesRequired', 'fill', 'id', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        stop: ['class', 'id', 'offset', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        style: ['id', 'media', 'title', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        svg: ['baseProfile', 'class', 'contentScriptType', 'contentStyleType', 'externalResourcesRequired', 'height', 'id', 'onabort', 'onactivate', 'onclick', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onresize', 'onscroll', 'onunload', 'onzoom', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'version', 'viewBox', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'zoomAndPan'],
        switch: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        symbol: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
        text: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'transform', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        textPath: ['class', 'externalResourcesRequired', 'id', 'lengthAdjust', 'method', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'spacing', 'startOffset', 'style', 'systemLanguage', 'textLength', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        title: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        tref: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        tspan: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        use: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        view: ['externalResourcesRequired', 'id', 'preserveAspectRatio', 'viewBox', 'viewTarget', 'xml:base', 'xml:lang', 'xml:space', 'zoomAndPan'],
        vkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space']
      };


      svgPresentationElements = {
        'a': true,
        'altGlyph': true,
        'animate': true,
        'animateColor': true,
        'circle': true,
        'clipPath': true,
        'defs': true,
        'ellipse': true,
        'feBlend': true,
        'feColorMatrix': true,
        'feComponentTransfer': true,
        'feComposite': true,
        'feConvolveMatrix': true,
        'feDiffuseLighting': true,
        'feDisplacementMap': true,
        'feFlood': true,
        'feGaussianBlur': true,
        'feImage': true,
        'feMerge': true,
        'feMorphology': true,
        'feOffset': true,
        'feSpecularLighting': true,
        'feTile': true,
        'feTurbulence': true,
        'filter': true,
        'font': true,
        'foreignObject': true,
        'g': true,
        'glyph': true,
        'glyphRef': true,
        'image': true,
        'line': true,
        'linearGradient': true,
        'marker': true,
        'mask': true,
        'missing-glyph': true,
        'path': true,
        'pattern': true,
        'polygon': true,
        'polyline': true,
        'radialGradient': true,
        'rect': true,
        'stop': true,
        'svg': true,
        'switch': true,
        'symbol': true,
        'text': true,
        'textPath': true,
        'tref': true,
        'tspan': true,
        'use': true
      };

      svgPresentationAttributes = {
        'alignment-baseline': true,
        'baseline-shift': true,
        'clip-path': true,
        'clip-rule': true,
        'clip': true,
        'color-interpolation-filters': true,
        'color-interpolation': true,
        'color-profile': true,
        'color-rendering': true,
        'color': true,
        'cursor': true,
        'direction': true,
        'display': true,
        'dominant-baseline': true,
        'enable-background': true,
        'fill-opacity': true,
        'fill-rule': true,
        'fill': true,
        'filter': true,
        'flood-color': true,
        'flood-opacity': true,
        'font-family': true,
        'font-size-adjust': true,
        'font-size': true,
        'font-stretch': true,
        'font-style': true,
        'font-variant': true,
        'font-weight': true,
        'glyph-orientation-horizontal': true,
        'glyph-orientation-vertical': true,
        'image-rendering': true,
        'kerning': true,
        'letter-spacing': true,
        'lighting-color': true,
        'marker-end': true,
        'marker-mid': true,
        'marker-start': true,
        'mask': true,
        'opacity': true,
        'overflow': true,
        'pointer-events': true,
        'shape-rendering': true,
        'stop-color': true,
        'stop-opacity': true,
        'stroke-dasharray': true,
        'stroke-dashoffset': true,
        'stroke-linecap': true,
        'stroke-linejoin': true,
        'stroke-miterlimit': true,
        'stroke-opacity': true,
        'stroke-width': true,
        'stroke': true,
        'text-anchor': true,
        'text-decoration': true,
        'text-rendering': true,
        'unicode-bidi': true,
        'visibility': true,
        'word-spacing': true,
        'writing-mode': true
      };

      var createElement = function createElement(html) {
        var div = aureliaPal.DOM.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
      };

      svgAnalyzer = function () {
        function SVGAnalyzer() {
          

          if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph' && elements.altGlyph) {
            elements.altglyph = elements.altGlyph;
            delete elements.altGlyph;
            elements.altglyphdef = elements.altGlyphDef;
            delete elements.altGlyphDef;
            elements.altglyphitem = elements.altGlyphItem;
            delete elements.altGlyphItem;
            elements.glyphref = elements.glyphRef;
            delete elements.glyphRef;
          }
        }

        SVGAnalyzer.prototype.isStandardSvgAttribute = function isStandardSvgAttribute(nodeName, attributeName) {
          return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
        };

        return SVGAnalyzer;
      }();
    }

    var elements = exports.elements = svgElements;
    var presentationElements = exports.presentationElements = svgPresentationElements;
    var presentationAttributes = exports.presentationAttributes = svgPresentationAttributes;
    var SVGAnalyzer = exports.SVGAnalyzer = svgAnalyzer || function () {
      function _class11() {
        
      }

      _class11.prototype.isStandardSvgAttribute = function isStandardSvgAttribute() {
        return false;
      };

      return _class11;
    }();

    var ObserverLocator = exports.ObserverLocator = (_temp = _class12 = function () {
      function ObserverLocator(taskQueue, eventManager, dirtyChecker, svgAnalyzer, parser) {
        

        this.taskQueue = taskQueue;
        this.eventManager = eventManager;
        this.dirtyChecker = dirtyChecker;
        this.svgAnalyzer = svgAnalyzer;
        this.parser = parser;

        this.adapters = [];
        this.logger = LogManager.getLogger('observer-locator');
      }

      ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
        var observersLookup = obj.__observers__;
        var observer = void 0;

        if (observersLookup && propertyName in observersLookup) {
          return observersLookup[propertyName];
        }

        observer = this.createPropertyObserver(obj, propertyName);

        if (!observer.doNotCache) {
          if (observersLookup === undefined) {
            observersLookup = this.getOrCreateObserversLookup(obj);
          }

          observersLookup[propertyName] = observer;
        }

        return observer;
      };

      ObserverLocator.prototype.getOrCreateObserversLookup = function getOrCreateObserversLookup(obj) {
        return obj.__observers__ || this.createObserversLookup(obj);
      };

      ObserverLocator.prototype.createObserversLookup = function createObserversLookup(obj) {
        var value = {};

        if (!Reflect.defineProperty(obj, '__observers__', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: value
        })) {
          this.logger.warn('Cannot add observers to object', obj);
        }

        return value;
      };

      ObserverLocator.prototype.addAdapter = function addAdapter(adapter) {
        this.adapters.push(adapter);
      };

      ObserverLocator.prototype.getAdapterObserver = function getAdapterObserver(obj, propertyName, descriptor) {
        for (var _i28 = 0, ii = this.adapters.length; _i28 < ii; _i28++) {
          var adapter = this.adapters[_i28];
          var observer = adapter.getObserver(obj, propertyName, descriptor);
          if (observer) {
            return observer;
          }
        }
        return null;
      };

      ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
        var descriptor = void 0;
        var handler = void 0;
        var xlinkResult = void 0;

        if (!(obj instanceof Object)) {
          return new PrimitiveObserver(obj, propertyName);
        }

        if (obj instanceof aureliaPal.DOM.Element) {
          if (propertyName === 'class') {
            return new ClassObserver(obj);
          }
          if (propertyName === 'style' || propertyName === 'css') {
            return new StyleObserver(obj, propertyName);
          }
          handler = this.eventManager.getElementHandler(obj, propertyName);
          if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
            return new SelectValueObserver(obj, handler, this);
          }
          if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
            return new CheckedObserver(obj, handler, this);
          }
          if (handler) {
            return new ValueAttributeObserver(obj, propertyName, handler);
          }
          xlinkResult = /^xlink:(.+)$/.exec(propertyName);
          if (xlinkResult) {
            return new XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
          }
          if (propertyName === 'role' && (obj instanceof aureliaPal.DOM.Element || obj instanceof aureliaPal.DOM.SVGElement) || /^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
            return new DataAttributeObserver(obj, propertyName);
          }
        }

        descriptor = Object.getPropertyDescriptor(obj, propertyName);

        if (hasDeclaredDependencies(descriptor)) {
          return createComputedObserver(obj, propertyName, descriptor, this);
        }

        if (descriptor) {
          var existingGetterOrSetter = descriptor.get || descriptor.set;
          if (existingGetterOrSetter) {
            if (existingGetterOrSetter.getObserver) {
              return existingGetterOrSetter.getObserver(obj);
            }

            var adapterObserver = this.getAdapterObserver(obj, propertyName, descriptor);
            if (adapterObserver) {
              return adapterObserver;
            }
            return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
          }
        }

        if (obj instanceof Array) {
          if (propertyName === 'length') {
            return this.getArrayObserver(obj).getLengthObserver();
          }

          return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        } else if (obj instanceof Map) {
          if (propertyName === 'size') {
            return this.getMapObserver(obj).getLengthObserver();
          }

          return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        } else if (obj instanceof Set) {
          if (propertyName === 'size') {
            return this.getSetObserver(obj).getLengthObserver();
          }

          return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        }

        return new SetterObserver(this.taskQueue, obj, propertyName);
      };

      ObserverLocator.prototype.getAccessor = function getAccessor(obj, propertyName) {
        if (obj instanceof aureliaPal.DOM.Element) {
          if (propertyName === 'class' || propertyName === 'style' || propertyName === 'css' || propertyName === 'value' && (obj.tagName.toLowerCase() === 'input' || obj.tagName.toLowerCase() === 'select') || propertyName === 'checked' && obj.tagName.toLowerCase() === 'input' || propertyName === 'model' && obj.tagName.toLowerCase() === 'input' || /^xlink:.+$/.exec(propertyName)) {
            return this.getObserver(obj, propertyName);
          }
          if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName) || obj.tagName.toLowerCase() === 'img' && propertyName === 'src' || obj.tagName.toLowerCase() === 'a' && propertyName === 'href') {
            return dataAttributeAccessor;
          }
        }
        return propertyAccessor;
      };

      ObserverLocator.prototype.getArrayObserver = function getArrayObserver(array) {
        return _getArrayObserver(this.taskQueue, array);
      };

      ObserverLocator.prototype.getMapObserver = function getMapObserver(map) {
        return _getMapObserver(this.taskQueue, map);
      };

      ObserverLocator.prototype.getSetObserver = function getSetObserver(set) {
        return _getSetObserver(this.taskQueue, set);
      };

      return ObserverLocator;
    }(), _class12.inject = [aureliaTaskQueue.TaskQueue, EventManager, DirtyChecker, SVGAnalyzer, Parser], _temp);

    var ObjectObservationAdapter = exports.ObjectObservationAdapter = function () {
      function ObjectObservationAdapter() {
        
      }

      ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
        throw new Error('BindingAdapters must implement getObserver(object, propertyName).');
      };

      return ObjectObservationAdapter;
    }();

    var BindingExpression = exports.BindingExpression = function () {
      function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, lookupFunctions, attribute) {
        

        this.observerLocator = observerLocator;
        this.targetProperty = targetProperty;
        this.sourceExpression = sourceExpression;
        this.mode = mode;
        this.lookupFunctions = lookupFunctions;
        this.attribute = attribute;
        this.discrete = false;
      }

      BindingExpression.prototype.createBinding = function createBinding(target) {
        return new Binding(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.mode, this.lookupFunctions);
      };

      return BindingExpression;
    }();

    var Binding = exports.Binding = (_dec10 = connectable(), _dec10(_class13 = function () {
      function Binding(observerLocator, sourceExpression, target, targetProperty, mode, lookupFunctions) {
        

        this.observerLocator = observerLocator;
        this.sourceExpression = sourceExpression;
        this.target = target;
        this.targetProperty = targetProperty;
        this.mode = mode;
        this.lookupFunctions = lookupFunctions;
      }

      Binding.prototype.updateTarget = function updateTarget(value) {
        this.targetObserver.setValue(value, this.target, this.targetProperty);
      };

      Binding.prototype.updateSource = function updateSource(value) {
        this.sourceExpression.assign(this.source, value, this.lookupFunctions);
      };

      Binding.prototype.call = function call(context, newValue, oldValue) {
        if (!this.isBound) {
          return;
        }
        if (context === sourceContext) {
          oldValue = this.targetObserver.getValue(this.target, this.targetProperty);
          newValue = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
          if (newValue !== oldValue) {
            this.updateTarget(newValue);
          }
          if (this.mode !== bindingMode.oneTime) {
            this._version++;
            this.sourceExpression.connect(this, this.source);
            this.unobserve(false);
          }
          return;
        }
        if (context === targetContext) {
          if (newValue !== this.sourceExpression.evaluate(this.source, this.lookupFunctions)) {
            this.updateSource(newValue);
          }
          return;
        }
        throw new Error('Unexpected call context ' + context);
      };

      Binding.prototype.bind = function bind(source) {
        if (this.isBound) {
          if (this.source === source) {
            return;
          }
          this.unbind();
        }
        this.isBound = true;
        this.source = source;

        if (this.sourceExpression.bind) {
          this.sourceExpression.bind(this, source, this.lookupFunctions);
        }

        var mode = this.mode;
        if (!this.targetObserver) {
          var method = mode === bindingMode.twoWay || mode === bindingMode.fromView ? 'getObserver' : 'getAccessor';
          this.targetObserver = this.observerLocator[method](this.target, this.targetProperty);
        }

        if ('bind' in this.targetObserver) {
          this.targetObserver.bind();
        }
        if (this.mode !== bindingMode.fromView) {
          var value = this.sourceExpression.evaluate(source, this.lookupFunctions);
          this.updateTarget(value);
        }

        if (mode === bindingMode.oneTime) {
          return;
        } else if (mode === bindingMode.toView) {
          enqueueBindingConnect(this);
        } else if (mode === bindingMode.twoWay) {
          this.sourceExpression.connect(this, source);
          this.targetObserver.subscribe(targetContext, this);
        } else if (mode === bindingMode.fromView) {
          this.targetObserver.subscribe(targetContext, this);
        }
      };

      Binding.prototype.unbind = function unbind() {
        if (!this.isBound) {
          return;
        }
        this.isBound = false;
        if (this.sourceExpression.unbind) {
          this.sourceExpression.unbind(this, this.source);
        }
        this.source = null;
        if ('unbind' in this.targetObserver) {
          this.targetObserver.unbind();
        }
        if (this.targetObserver.unsubscribe) {
          this.targetObserver.unsubscribe(targetContext, this);
        }
        this.unobserve(true);
      };

      Binding.prototype.connect = function connect(evaluate) {
        if (!this.isBound) {
          return;
        }
        if (evaluate) {
          var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
          this.updateTarget(value);
        }
        this.sourceExpression.connect(this, this.source);
      };

      return Binding;
    }()) || _class13);

    var CallExpression = exports.CallExpression = function () {
      function CallExpression(observerLocator, targetProperty, sourceExpression, lookupFunctions) {
        

        this.observerLocator = observerLocator;
        this.targetProperty = targetProperty;
        this.sourceExpression = sourceExpression;
        this.lookupFunctions = lookupFunctions;
      }

      CallExpression.prototype.createBinding = function createBinding(target) {
        return new Call(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.lookupFunctions);
      };

      return CallExpression;
    }();

    var Call = exports.Call = function () {
      function Call(observerLocator, sourceExpression, target, targetProperty, lookupFunctions) {
        

        this.sourceExpression = sourceExpression;
        this.target = target;
        this.targetProperty = observerLocator.getObserver(target, targetProperty);
        this.lookupFunctions = lookupFunctions;
      }

      Call.prototype.callSource = function callSource($event) {
        var overrideContext = this.source.overrideContext;
        Object.assign(overrideContext, $event);
        overrideContext.$event = $event;
        var mustEvaluate = true;
        var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
        delete overrideContext.$event;
        for (var prop in $event) {
          delete overrideContext[prop];
        }
        return result;
      };

      Call.prototype.bind = function bind(source) {
        var _this26 = this;

        if (this.isBound) {
          if (this.source === source) {
            return;
          }
          this.unbind();
        }
        this.isBound = true;
        this.source = source;

        if (this.sourceExpression.bind) {
          this.sourceExpression.bind(this, source, this.lookupFunctions);
        }
        this.targetProperty.setValue(function ($event) {
          return _this26.callSource($event);
        });
      };

      Call.prototype.unbind = function unbind() {
        if (!this.isBound) {
          return;
        }
        this.isBound = false;
        if (this.sourceExpression.unbind) {
          this.sourceExpression.unbind(this, this.source);
        }
        this.source = null;
        this.targetProperty.setValue(null);
      };

      return Call;
    }();

    var ValueConverterResource = exports.ValueConverterResource = function () {
      function ValueConverterResource(name) {
        

        this.name = name;
      }

      ValueConverterResource.convention = function convention(name) {
        if (name.endsWith('ValueConverter')) {
          return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
        }
      };

      ValueConverterResource.prototype.initialize = function initialize(container, target) {
        this.instance = container.get(target);
      };

      ValueConverterResource.prototype.register = function register(registry, name) {
        registry.registerValueConverter(name || this.name, this.instance);
      };

      ValueConverterResource.prototype.load = function load(container, target) {};

      return ValueConverterResource;
    }();

    function valueConverter(nameOrTarget) {
      if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
        return function (target) {
          aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new ValueConverterResource(nameOrTarget), target);
        };
      }

      aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new ValueConverterResource(), nameOrTarget);
    }

    var BindingBehaviorResource = exports.BindingBehaviorResource = function () {
      function BindingBehaviorResource(name) {
        

        this.name = name;
      }

      BindingBehaviorResource.convention = function convention(name) {
        if (name.endsWith('BindingBehavior')) {
          return new BindingBehaviorResource(camelCase(name.substring(0, name.length - 15)));
        }
      };

      BindingBehaviorResource.prototype.initialize = function initialize(container, target) {
        this.instance = container.get(target);
      };

      BindingBehaviorResource.prototype.register = function register(registry, name) {
        registry.registerBindingBehavior(name || this.name, this.instance);
      };

      BindingBehaviorResource.prototype.load = function load(container, target) {};

      return BindingBehaviorResource;
    }();

    function bindingBehavior(nameOrTarget) {
      if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
        return function (target) {
          aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new BindingBehaviorResource(nameOrTarget), target);
        };
      }

      aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new BindingBehaviorResource(), nameOrTarget);
    }

    var ListenerExpression = exports.ListenerExpression = function () {
      function ListenerExpression(eventManager, targetEvent, sourceExpression, delegationStrategy, preventDefault, lookupFunctions) {
        

        this.eventManager = eventManager;
        this.targetEvent = targetEvent;
        this.sourceExpression = sourceExpression;
        this.delegationStrategy = delegationStrategy;
        this.discrete = true;
        this.preventDefault = preventDefault;
        this.lookupFunctions = lookupFunctions;
      }

      ListenerExpression.prototype.createBinding = function createBinding(target) {
        return new Listener(this.eventManager, this.targetEvent, this.delegationStrategy, this.sourceExpression, target, this.preventDefault, this.lookupFunctions);
      };

      return ListenerExpression;
    }();

    var Listener = exports.Listener = function () {
      function Listener(eventManager, targetEvent, delegationStrategy, sourceExpression, target, preventDefault, lookupFunctions) {
        

        this.eventManager = eventManager;
        this.targetEvent = targetEvent;
        this.delegationStrategy = delegationStrategy;
        this.sourceExpression = sourceExpression;
        this.target = target;
        this.preventDefault = preventDefault;
        this.lookupFunctions = lookupFunctions;
      }

      Listener.prototype.callSource = function callSource(event) {
        var overrideContext = this.source.overrideContext;
        overrideContext.$event = event;
        var mustEvaluate = true;
        var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
        delete overrideContext.$event;
        if (result !== true && this.preventDefault) {
          event.preventDefault();
        }
        return result;
      };

      Listener.prototype.handleEvent = function handleEvent(event) {
        this.callSource(event);
      };

      Listener.prototype.bind = function bind(source) {
        if (this.isBound) {
          if (this.source === source) {
            return;
          }
          this.unbind();
        }
        this.isBound = true;
        this.source = source;

        if (this.sourceExpression.bind) {
          this.sourceExpression.bind(this, source, this.lookupFunctions);
        }
        this._handler = this.eventManager.addEventListener(this.target, this.targetEvent, this, this.delegationStrategy, true);
      };

      Listener.prototype.unbind = function unbind() {
        if (!this.isBound) {
          return;
        }
        this.isBound = false;
        if (this.sourceExpression.unbind) {
          this.sourceExpression.unbind(this, this.source);
        }
        this.source = null;
        this._handler.dispose();
        this._handler = null;
      };

      return Listener;
    }();

    function getAU(element) {
      var au = element.au;

      if (au === undefined) {
        throw new Error('No Aurelia APIs are defined for the element: "' + element.tagName + '".');
      }

      return au;
    }

    var NameExpression = exports.NameExpression = function () {
      function NameExpression(sourceExpression, apiName, lookupFunctions) {
        

        this.sourceExpression = sourceExpression;
        this.apiName = apiName;
        this.lookupFunctions = lookupFunctions;
        this.discrete = true;
      }

      NameExpression.prototype.createBinding = function createBinding(target) {
        return new NameBinder(this.sourceExpression, NameExpression.locateAPI(target, this.apiName), this.lookupFunctions);
      };

      NameExpression.locateAPI = function locateAPI(element, apiName) {
        switch (apiName) {
          case 'element':
            return element;
          case 'controller':
            return getAU(element).controller;
          case 'view-model':
            return getAU(element).controller.viewModel;
          case 'view':
            return getAU(element).controller.view;
          default:
            var target = getAU(element)[apiName];

            if (target === undefined) {
              throw new Error('Attempted to reference "' + apiName + '", but it was not found amongst the target\'s API.');
            }

            return target.viewModel;
        }
      };

      return NameExpression;
    }();

    var NameBinder = function () {
      function NameBinder(sourceExpression, target, lookupFunctions) {
        

        this.sourceExpression = sourceExpression;
        this.target = target;
        this.lookupFunctions = lookupFunctions;
      }

      NameBinder.prototype.bind = function bind(source) {
        if (this.isBound) {
          if (this.source === source) {
            return;
          }
          this.unbind();
        }
        this.isBound = true;
        this.source = source;
        if (this.sourceExpression.bind) {
          this.sourceExpression.bind(this, source, this.lookupFunctions);
        }
        this.sourceExpression.assign(this.source, this.target, this.lookupFunctions);
      };

      NameBinder.prototype.unbind = function unbind() {
        if (!this.isBound) {
          return;
        }
        this.isBound = false;
        if (this.sourceExpression.evaluate(this.source, this.lookupFunctions) === this.target) {
          this.sourceExpression.assign(this.source, null, this.lookupFunctions);
        }
        if (this.sourceExpression.unbind) {
          this.sourceExpression.unbind(this, this.source);
        }
        this.source = null;
      };

      return NameBinder;
    }();

    var LookupFunctions = {
      bindingBehaviors: function bindingBehaviors(name) {
        return null;
      },
      valueConverters: function valueConverters(name) {
        return null;
      }
    };

    var BindingEngine = exports.BindingEngine = (_temp2 = _class14 = function () {
      function BindingEngine(observerLocator, parser) {
        

        this.observerLocator = observerLocator;
        this.parser = parser;
      }

      BindingEngine.prototype.createBindingExpression = function createBindingExpression(targetProperty, sourceExpression) {
        var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bindingMode.toView;
        var lookupFunctions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : LookupFunctions;

        return new BindingExpression(this.observerLocator, targetProperty, this.parser.parse(sourceExpression), mode, lookupFunctions);
      };

      BindingEngine.prototype.propertyObserver = function propertyObserver(obj, propertyName) {
        var _this27 = this;

        return {
          subscribe: function subscribe(callback) {
            var observer = _this27.observerLocator.getObserver(obj, propertyName);
            observer.subscribe(callback);
            return {
              dispose: function dispose() {
                return observer.unsubscribe(callback);
              }
            };
          }
        };
      };

      BindingEngine.prototype.collectionObserver = function collectionObserver(collection) {
        var _this28 = this;

        return {
          subscribe: function subscribe(callback) {
            var observer = void 0;
            if (collection instanceof Array) {
              observer = _this28.observerLocator.getArrayObserver(collection);
            } else if (collection instanceof Map) {
              observer = _this28.observerLocator.getMapObserver(collection);
            } else if (collection instanceof Set) {
              observer = _this28.observerLocator.getSetObserver(collection);
            } else {
              throw new Error('collection must be an instance of Array, Map or Set.');
            }
            observer.subscribe(callback);
            return {
              dispose: function dispose() {
                return observer.unsubscribe(callback);
              }
            };
          }
        };
      };

      BindingEngine.prototype.expressionObserver = function expressionObserver(bindingContext, expression) {
        var scope = { bindingContext: bindingContext, overrideContext: createOverrideContext(bindingContext) };
        return new ExpressionObserver(scope, this.parser.parse(expression), this.observerLocator, LookupFunctions);
      };

      BindingEngine.prototype.parseExpression = function parseExpression(expression) {
        return this.parser.parse(expression);
      };

      BindingEngine.prototype.registerAdapter = function registerAdapter(adapter) {
        this.observerLocator.addAdapter(adapter);
      };

      return BindingEngine;
    }(), _class14.inject = [ObserverLocator, Parser], _temp2);


    var setProto = Set.prototype;

    function _getSetObserver(taskQueue, set) {
      return ModifySetObserver.for(taskQueue, set);
    }

    exports.getSetObserver = _getSetObserver;

    var ModifySetObserver = function (_ModifyCollectionObse3) {
      _inherits(ModifySetObserver, _ModifyCollectionObse3);

      function ModifySetObserver(taskQueue, set) {
        

        return _possibleConstructorReturn(this, _ModifyCollectionObse3.call(this, taskQueue, set));
      }

      ModifySetObserver.for = function _for(taskQueue, set) {
        if (!('__set_observer__' in set)) {
          Reflect.defineProperty(set, '__set_observer__', {
            value: ModifySetObserver.create(taskQueue, set),
            enumerable: false, configurable: false
          });
        }
        return set.__set_observer__;
      };

      ModifySetObserver.create = function create(taskQueue, set) {
        var observer = new ModifySetObserver(taskQueue, set);

        var proto = setProto;
        if (proto.add !== set.add || proto.delete !== set.delete || proto.clear !== set.clear) {
          proto = {
            add: set.add,
            delete: set.delete,
            clear: set.clear
          };
        }

        set.add = function () {
          var type = 'add';
          var oldSize = set.size;
          var methodCallResult = proto.add.apply(set, arguments);
          var hasValue = set.size === oldSize;
          if (!hasValue) {
            observer.addChangeRecord({
              type: type,
              object: set,
              value: Array.from(set).pop()
            });
          }
          return methodCallResult;
        };

        set.delete = function () {
          var hasValue = set.has(arguments[0]);
          var methodCallResult = proto.delete.apply(set, arguments);
          if (hasValue) {
            observer.addChangeRecord({
              type: 'delete',
              object: set,
              value: arguments[0]
            });
          }
          return methodCallResult;
        };

        set.clear = function () {
          var methodCallResult = proto.clear.apply(set, arguments);
          observer.addChangeRecord({
            type: 'clear',
            object: set
          });
          return methodCallResult;
        };

        return observer;
      };

      return ModifySetObserver;
    }(ModifyCollectionObserver);

    function observable(targetOrConfig, key, descriptor) {
      function deco(target, key, descriptor, config) {
        var isClassDecorator = key === undefined;
        if (isClassDecorator) {
          target = target.prototype;
          key = typeof config === 'string' ? config : config.name;
        }

        var innerPropertyName = '_' + key;
        var innerPropertyDescriptor = {
          configurable: true,
          enumerable: false,
          writable: true
        };

        var callbackName = config && config.changeHandler || key + 'Changed';

        if (descriptor) {
          if (typeof descriptor.initializer === 'function') {
            innerPropertyDescriptor.value = descriptor.initializer();
          }
        } else {
          descriptor = {};
        }

        if (!('enumerable' in descriptor)) {
          descriptor.enumerable = true;
        }

        delete descriptor.value;
        delete descriptor.writable;
        delete descriptor.initializer;

        Reflect.defineProperty(target, innerPropertyName, innerPropertyDescriptor);

        descriptor.get = function () {
          return this[innerPropertyName];
        };
        descriptor.set = function (newValue) {
          var oldValue = this[innerPropertyName];
          if (newValue === oldValue) {
            return;
          }

          this[innerPropertyName] = newValue;
          Reflect.defineProperty(this, innerPropertyName, { enumerable: false });

          if (this[callbackName]) {
            this[callbackName](newValue, oldValue, key);
          }
        };

        descriptor.get.dependencies = [innerPropertyName];

        if (isClassDecorator) {
          Reflect.defineProperty(target, key, descriptor);
        } else {
          return descriptor;
        }
      }

      if (key === undefined) {
        return function (t, k, d) {
          return deco(t, k, d, targetOrConfig);
        };
      }
      return deco(targetOrConfig, key, descriptor);
    }

    var signals = {};

    function connectBindingToSignal(binding, name) {
      if (!signals.hasOwnProperty(name)) {
        signals[name] = 0;
      }
      binding.observeProperty(signals, name);
    }

    function signalBindings(name) {
      if (signals.hasOwnProperty(name)) {
        signals[name]++;
      }
    }
    });

    unwrapExports(aureliaBinding);
    var aureliaBinding_1 = aureliaBinding.getSetObserver;
    var aureliaBinding_2 = aureliaBinding.BindingEngine;
    var aureliaBinding_3 = aureliaBinding.NameExpression;
    var aureliaBinding_4 = aureliaBinding.Listener;
    var aureliaBinding_5 = aureliaBinding.ListenerExpression;
    var aureliaBinding_6 = aureliaBinding.BindingBehaviorResource;
    var aureliaBinding_7 = aureliaBinding.ValueConverterResource;
    var aureliaBinding_8 = aureliaBinding.Call;
    var aureliaBinding_9 = aureliaBinding.CallExpression;
    var aureliaBinding_10 = aureliaBinding.Binding;
    var aureliaBinding_11 = aureliaBinding.BindingExpression;
    var aureliaBinding_12 = aureliaBinding.ObjectObservationAdapter;
    var aureliaBinding_13 = aureliaBinding.ObserverLocator;
    var aureliaBinding_14 = aureliaBinding.SVGAnalyzer;
    var aureliaBinding_15 = aureliaBinding.presentationAttributes;
    var aureliaBinding_16 = aureliaBinding.presentationElements;
    var aureliaBinding_17 = aureliaBinding.elements;
    var aureliaBinding_18 = aureliaBinding.ComputedExpression;
    var aureliaBinding_19 = aureliaBinding.ClassObserver;
    var aureliaBinding_20 = aureliaBinding.SelectValueObserver;
    var aureliaBinding_21 = aureliaBinding.CheckedObserver;
    var aureliaBinding_22 = aureliaBinding.ValueAttributeObserver;
    var aureliaBinding_23 = aureliaBinding.StyleObserver;
    var aureliaBinding_24 = aureliaBinding.DataAttributeObserver;
    var aureliaBinding_25 = aureliaBinding.dataAttributeAccessor;
    var aureliaBinding_26 = aureliaBinding.XLinkAttributeObserver;
    var aureliaBinding_27 = aureliaBinding.SetterObserver;
    var aureliaBinding_28 = aureliaBinding.PrimitiveObserver;
    var aureliaBinding_29 = aureliaBinding.propertyAccessor;
    var aureliaBinding_30 = aureliaBinding.DirtyCheckProperty;
    var aureliaBinding_31 = aureliaBinding.DirtyChecker;
    var aureliaBinding_32 = aureliaBinding.EventSubscriber;
    var aureliaBinding_33 = aureliaBinding.EventManager;
    var aureliaBinding_34 = aureliaBinding.delegationStrategy;
    var aureliaBinding_35 = aureliaBinding.getMapObserver;
    var aureliaBinding_36 = aureliaBinding.ParserImplementation;
    var aureliaBinding_37 = aureliaBinding.Parser;
    var aureliaBinding_38 = aureliaBinding.Scanner;
    var aureliaBinding_39 = aureliaBinding.Lexer;
    var aureliaBinding_40 = aureliaBinding.Token;
    var aureliaBinding_41 = aureliaBinding.bindingMode;
    var aureliaBinding_42 = aureliaBinding.ExpressionCloner;
    var aureliaBinding_43 = aureliaBinding.Unparser;
    var aureliaBinding_44 = aureliaBinding.LiteralObject;
    var aureliaBinding_45 = aureliaBinding.LiteralArray;
    var aureliaBinding_46 = aureliaBinding.LiteralString;
    var aureliaBinding_47 = aureliaBinding.LiteralPrimitive;
    var aureliaBinding_48 = aureliaBinding.PrefixNot;
    var aureliaBinding_49 = aureliaBinding.Binary;
    var aureliaBinding_50 = aureliaBinding.CallFunction;
    var aureliaBinding_51 = aureliaBinding.CallMember;
    var aureliaBinding_52 = aureliaBinding.CallScope;
    var aureliaBinding_53 = aureliaBinding.AccessKeyed;
    var aureliaBinding_54 = aureliaBinding.AccessMember;
    var aureliaBinding_55 = aureliaBinding.AccessScope;
    var aureliaBinding_56 = aureliaBinding.AccessThis;
    var aureliaBinding_57 = aureliaBinding.Conditional;
    var aureliaBinding_58 = aureliaBinding.Assign;
    var aureliaBinding_59 = aureliaBinding.ValueConverter;
    var aureliaBinding_60 = aureliaBinding.BindingBehavior;
    var aureliaBinding_61 = aureliaBinding.Chain;
    var aureliaBinding_62 = aureliaBinding.Expression;
    var aureliaBinding_63 = aureliaBinding.getArrayObserver;
    var aureliaBinding_64 = aureliaBinding.CollectionLengthObserver;
    var aureliaBinding_65 = aureliaBinding.ModifyCollectionObserver;
    var aureliaBinding_66 = aureliaBinding.ExpressionObserver;
    var aureliaBinding_67 = aureliaBinding.sourceContext;
    var aureliaBinding_68 = aureliaBinding.targetContext;
    var aureliaBinding_69 = aureliaBinding.camelCase;
    var aureliaBinding_70 = aureliaBinding.createOverrideContext;
    var aureliaBinding_71 = aureliaBinding.getContextFor;
    var aureliaBinding_72 = aureliaBinding.createScopeForTest;
    var aureliaBinding_73 = aureliaBinding.connectable;
    var aureliaBinding_74 = aureliaBinding.enqueueBindingConnect;
    var aureliaBinding_75 = aureliaBinding.subscriberCollection;
    var aureliaBinding_76 = aureliaBinding.calcSplices;
    var aureliaBinding_77 = aureliaBinding.mergeSplice;
    var aureliaBinding_78 = aureliaBinding.projectArraySplices;
    var aureliaBinding_79 = aureliaBinding.getChangeRecords;
    var aureliaBinding_80 = aureliaBinding.cloneExpression;
    var aureliaBinding_81 = aureliaBinding.hasDeclaredDependencies;
    var aureliaBinding_82 = aureliaBinding.declarePropertyDependencies;
    var aureliaBinding_83 = aureliaBinding.computedFrom;
    var aureliaBinding_84 = aureliaBinding.createComputedObserver;
    var aureliaBinding_85 = aureliaBinding.valueConverter;
    var aureliaBinding_86 = aureliaBinding.bindingBehavior;
    var aureliaBinding_87 = aureliaBinding.observable;
    var aureliaBinding_88 = aureliaBinding.connectBindingToSignal;
    var aureliaBinding_89 = aureliaBinding.signalBindings;

    var aureliaPath = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

    exports.relativeToFile = relativeToFile;
    exports.join = join;
    exports.buildQueryString = buildQueryString;
    exports.parseQueryString = parseQueryString;

    function trimDots(ary) {
      for (var i = 0; i < ary.length; ++i) {
        var part = ary[i];
        if (part === '.') {
          ary.splice(i, 1);
          i -= 1;
        } else if (part === '..') {
          if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
            continue;
          } else if (i > 0) {
            ary.splice(i - 1, 2);
            i -= 2;
          }
        }
      }
    }

    function relativeToFile(name, file) {
      var fileParts = file && file.split('/');
      var nameParts = name.trim().split('/');

      if (nameParts[0].charAt(0) === '.' && fileParts) {
        var normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
        nameParts.unshift.apply(nameParts, normalizedBaseParts);
      }

      trimDots(nameParts);

      return nameParts.join('/');
    }

    function join(path1, path2) {
      if (!path1) {
        return path2;
      }

      if (!path2) {
        return path1;
      }

      var schemeMatch = path1.match(/^([^/]*?:)\//);
      var scheme = schemeMatch && schemeMatch.length > 0 ? schemeMatch[1] : '';
      path1 = path1.substr(scheme.length);

      var urlPrefix = void 0;
      if (path1.indexOf('///') === 0 && scheme === 'file:') {
        urlPrefix = '///';
      } else if (path1.indexOf('//') === 0) {
        urlPrefix = '//';
      } else if (path1.indexOf('/') === 0) {
        urlPrefix = '/';
      } else {
        urlPrefix = '';
      }

      var trailingSlash = path2.slice(-1) === '/' ? '/' : '';

      var url1 = path1.split('/');
      var url2 = path2.split('/');
      var url3 = [];

      for (var i = 0, ii = url1.length; i < ii; ++i) {
        if (url1[i] === '..') {
          url3.pop();
        } else if (url1[i] === '.' || url1[i] === '') {
          continue;
        } else {
          url3.push(url1[i]);
        }
      }

      for (var _i = 0, _ii = url2.length; _i < _ii; ++_i) {
        if (url2[_i] === '..') {
          url3.pop();
        } else if (url2[_i] === '.' || url2[_i] === '') {
          continue;
        } else {
          url3.push(url2[_i]);
        }
      }

      return scheme + urlPrefix + url3.join('/') + trailingSlash;
    }

    var encode = encodeURIComponent;
    var encodeKey = function encodeKey(k) {
      return encode(k).replace('%24', '$');
    };

    function buildParam(key, value, traditional) {
      var result = [];
      if (value === null || value === undefined) {
        return result;
      }
      if (Array.isArray(value)) {
        for (var i = 0, l = value.length; i < l; i++) {
          if (traditional) {
            result.push(encodeKey(key) + '=' + encode(value[i]));
          } else {
            var arrayKey = key + '[' + (_typeof(value[i]) === 'object' && value[i] !== null ? i : '') + ']';
            result = result.concat(buildParam(arrayKey, value[i]));
          }
        }
      } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !traditional) {
        for (var propertyName in value) {
          result = result.concat(buildParam(key + '[' + propertyName + ']', value[propertyName]));
        }
      } else {
        result.push(encodeKey(key) + '=' + encode(value));
      }
      return result;
    }

    function buildQueryString(params, traditional) {
      var pairs = [];
      var keys = Object.keys(params || {}).sort();
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        pairs = pairs.concat(buildParam(key, params[key], traditional));
      }

      if (pairs.length === 0) {
        return '';
      }

      return pairs.join('&');
    }

    function processScalarParam(existedParam, value) {
      if (Array.isArray(existedParam)) {
        existedParam.push(value);
        return existedParam;
      }
      if (existedParam !== undefined) {
        return [existedParam, value];
      }

      return value;
    }

    function parseComplexParam(queryParams, keys, value) {
      var currentParams = queryParams;
      var keysLastIndex = keys.length - 1;
      for (var j = 0; j <= keysLastIndex; j++) {
        var key = keys[j] === '' ? currentParams.length : keys[j];
        if (j < keysLastIndex) {
          var prevValue = !currentParams[key] || _typeof(currentParams[key]) === 'object' ? currentParams[key] : [currentParams[key]];
          currentParams = currentParams[key] = prevValue || (isNaN(keys[j + 1]) ? {} : []);
        } else {
          currentParams = currentParams[key] = value;
        }
      }
    }

    function parseQueryString(queryString) {
      var queryParams = {};
      if (!queryString || typeof queryString !== 'string') {
        return queryParams;
      }

      var query = queryString;
      if (query.charAt(0) === '?') {
        query = query.substr(1);
      }

      var pairs = query.replace(/\+/g, ' ').split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var key = decodeURIComponent(pair[0]);
        if (!key) {
          continue;
        }

        var keys = key.split('][');
        var keysLastIndex = keys.length - 1;

        if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLastIndex])) {
          keys[keysLastIndex] = keys[keysLastIndex].replace(/\]$/, '');
          keys = keys.shift().split('[').concat(keys);
          keysLastIndex = keys.length - 1;
        } else {
          keysLastIndex = 0;
        }

        if (pair.length >= 2) {
          var value = pair[1] ? decodeURIComponent(pair[1]) : '';
          if (keysLastIndex) {
            parseComplexParam(queryParams, keys, value);
          } else {
            queryParams[key] = processScalarParam(queryParams[key], value);
          }
        } else {
          queryParams[key] = true;
        }
      }
      return queryParams;
    }
    });

    unwrapExports(aureliaPath);
    var aureliaPath_1 = aureliaPath.relativeToFile;
    var aureliaPath_2 = aureliaPath.join;
    var aureliaPath_3 = aureliaPath.buildQueryString;
    var aureliaPath_4 = aureliaPath.parseQueryString;

    var aureliaLoader = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Loader = exports.TemplateRegistryEntry = exports.TemplateDependency = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();







    var TemplateDependency = exports.TemplateDependency = function TemplateDependency(src, name) {
      

      this.src = src;
      this.name = name;
    };

    var TemplateRegistryEntry = exports.TemplateRegistryEntry = function () {
      function TemplateRegistryEntry(address) {
        

        this.templateIsLoaded = false;
        this.factoryIsReady = false;
        this.resources = null;
        this.dependencies = null;

        this.address = address;
        this.onReady = null;
        this._template = null;
        this._factory = null;
      }

      TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
        var finalSrc = typeof src === 'string' ? (0, aureliaPath.relativeToFile)(src, this.address) : aureliaMetadata.Origin.get(src).moduleId;

        this.dependencies.push(new TemplateDependency(finalSrc, name));
      };

      _createClass(TemplateRegistryEntry, [{
        key: 'template',
        get: function get() {
          return this._template;
        },
        set: function set(value) {
          var address = this.address;
          var requires = void 0;
          var current = void 0;
          var src = void 0;
          var dependencies = void 0;

          this._template = value;
          this.templateIsLoaded = true;

          requires = value.content.querySelectorAll('require');
          dependencies = this.dependencies = new Array(requires.length);

          for (var i = 0, ii = requires.length; i < ii; ++i) {
            current = requires[i];
            src = current.getAttribute('from');

            if (!src) {
              throw new Error('<require> element in ' + address + ' has no "from" attribute.');
            }

            dependencies[i] = new TemplateDependency((0, aureliaPath.relativeToFile)(src, address), current.getAttribute('as'));

            if (current.parentNode) {
              current.parentNode.removeChild(current);
            }
          }
        }
      }, {
        key: 'factory',
        get: function get() {
          return this._factory;
        },
        set: function set(value) {
          this._factory = value;
          this.factoryIsReady = true;
        }
      }]);

      return TemplateRegistryEntry;
    }();

    var Loader = exports.Loader = function () {
      function Loader() {
        

        this.templateRegistry = {};
      }

      Loader.prototype.map = function map(id, source) {
        throw new Error('Loaders must implement map(id, source).');
      };

      Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
        throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
      };

      Loader.prototype.normalize = function normalize(moduleId, relativeTo) {
        throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
      };

      Loader.prototype.loadModule = function loadModule(id) {
        throw new Error('Loaders must implement loadModule(id).');
      };

      Loader.prototype.loadAllModules = function loadAllModules(ids) {
        throw new Error('Loader must implement loadAllModules(ids).');
      };

      Loader.prototype.loadTemplate = function loadTemplate(url) {
        throw new Error('Loader must implement loadTemplate(url).');
      };

      Loader.prototype.loadText = function loadText(url) {
        throw new Error('Loader must implement loadText(url).');
      };

      Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
        throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
      };

      Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
        throw new Error('Loader must implement addPlugin(pluginName, implementation).');
      };

      Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(address) {
        return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
      };

      return Loader;
    }();
    });

    unwrapExports(aureliaLoader);
    var aureliaLoader_1 = aureliaLoader.Loader;
    var aureliaLoader_2 = aureliaLoader.TemplateRegistryEntry;
    var aureliaLoader_3 = aureliaLoader.TemplateDependency;

    var aureliaTemplating = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TemplatingEngine = exports.ElementConfigResource = exports.CompositionEngine = exports.SwapStrategies = exports.HtmlBehaviorResource = exports.BindableProperty = exports.BehaviorPropertyObserver = exports.Controller = exports.ViewEngine = exports.ModuleAnalyzer = exports.ResourceDescription = exports.ResourceModule = exports.ViewCompiler = exports.ViewFactory = exports.BoundViewFactory = exports.ViewSlot = exports.View = exports.ViewResources = exports.ShadowDOM = exports.ShadowSlot = exports.PassThroughSlot = exports.SlotCustomAttribute = exports.BindingLanguage = exports.ViewLocator = exports.InlineViewStrategy = exports.TemplateRegistryViewStrategy = exports.NoViewStrategy = exports.ConventionalViewStrategy = exports.RelativeViewStrategy = exports.viewStrategy = exports.TargetInstruction = exports.BehaviorInstruction = exports.ViewCompileInstruction = exports.ResourceLoadContext = exports.ElementEvents = exports.ViewEngineHooksResource = exports.CompositionTransaction = exports.CompositionTransactionOwnershipToken = exports.CompositionTransactionNotifier = exports.Animator = exports.animationEvent = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _class, _temp, _dec, _class2, _dec2, _class3, _dec3, _class4, _dec4, _class5, _dec5, _class6, _class7, _temp2, _dec6, _class8, _class9, _temp3, _class11, _dec7, _class13, _dec8, _class14, _class15, _temp4, _dec9, _class16, _dec10, _class17, _dec11, _class18;

    exports._hyphenate = _hyphenate;
    exports._isAllWhitespace = _isAllWhitespace;
    exports.viewEngineHooks = viewEngineHooks;
    exports.children = children;
    exports.child = child;
    exports.resource = resource;
    exports.behavior = behavior;
    exports.customElement = customElement;
    exports.customAttribute = customAttribute;
    exports.templateController = templateController;
    exports.bindable = bindable;
    exports.dynamicOptions = dynamicOptions;
    exports.useShadowDOM = useShadowDOM;
    exports.processAttributes = processAttributes;
    exports.processContent = processContent;
    exports.containerless = containerless;
    exports.useViewStrategy = useViewStrategy;
    exports.useView = useView;
    exports.inlineView = inlineView;
    exports.noView = noView;
    exports.elementConfig = elementConfig;
    exports.viewResources = viewResources;



    var LogManager = _interopRequireWildcard(aureliaLogging);















    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



    var animationEvent = exports.animationEvent = {
      enterBegin: 'animation:enter:begin',
      enterActive: 'animation:enter:active',
      enterDone: 'animation:enter:done',
      enterTimeout: 'animation:enter:timeout',

      leaveBegin: 'animation:leave:begin',
      leaveActive: 'animation:leave:active',
      leaveDone: 'animation:leave:done',
      leaveTimeout: 'animation:leave:timeout',

      staggerNext: 'animation:stagger:next',

      removeClassBegin: 'animation:remove-class:begin',
      removeClassActive: 'animation:remove-class:active',
      removeClassDone: 'animation:remove-class:done',
      removeClassTimeout: 'animation:remove-class:timeout',

      addClassBegin: 'animation:add-class:begin',
      addClassActive: 'animation:add-class:active',
      addClassDone: 'animation:add-class:done',
      addClassTimeout: 'animation:add-class:timeout',

      animateBegin: 'animation:animate:begin',
      animateActive: 'animation:animate:active',
      animateDone: 'animation:animate:done',
      animateTimeout: 'animation:animate:timeout',

      sequenceBegin: 'animation:sequence:begin',
      sequenceDone: 'animation:sequence:done'
    };

    var Animator = exports.Animator = function () {
      function Animator() {
        
      }

      Animator.prototype.enter = function enter(element) {
        return Promise.resolve(false);
      };

      Animator.prototype.leave = function leave(element) {
        return Promise.resolve(false);
      };

      Animator.prototype.removeClass = function removeClass(element, className) {
        element.classList.remove(className);
        return Promise.resolve(false);
      };

      Animator.prototype.addClass = function addClass(element, className) {
        element.classList.add(className);
        return Promise.resolve(false);
      };

      Animator.prototype.animate = function animate(element, className) {
        return Promise.resolve(false);
      };

      Animator.prototype.runSequence = function runSequence(animations) {};

      Animator.prototype.registerEffect = function registerEffect(effectName, properties) {};

      Animator.prototype.unregisterEffect = function unregisterEffect(effectName) {};

      return Animator;
    }();

    var CompositionTransactionNotifier = exports.CompositionTransactionNotifier = function () {
      function CompositionTransactionNotifier(owner) {
        

        this.owner = owner;
        this.owner._compositionCount++;
      }

      CompositionTransactionNotifier.prototype.done = function done() {
        this.owner._compositionCount--;
        this.owner._tryCompleteTransaction();
      };

      return CompositionTransactionNotifier;
    }();

    var CompositionTransactionOwnershipToken = exports.CompositionTransactionOwnershipToken = function () {
      function CompositionTransactionOwnershipToken(owner) {
        

        this.owner = owner;
        this.owner._ownershipToken = this;
        this.thenable = this._createThenable();
      }

      CompositionTransactionOwnershipToken.prototype.waitForCompositionComplete = function waitForCompositionComplete() {
        this.owner._tryCompleteTransaction();
        return this.thenable;
      };

      CompositionTransactionOwnershipToken.prototype.resolve = function resolve() {
        this._resolveCallback();
      };

      CompositionTransactionOwnershipToken.prototype._createThenable = function _createThenable() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this._resolveCallback = resolve;
        });
      };

      return CompositionTransactionOwnershipToken;
    }();

    var CompositionTransaction = exports.CompositionTransaction = function () {
      function CompositionTransaction() {
        

        this._ownershipToken = null;
        this._compositionCount = 0;
      }

      CompositionTransaction.prototype.tryCapture = function tryCapture() {
        return this._ownershipToken === null ? new CompositionTransactionOwnershipToken(this) : null;
      };

      CompositionTransaction.prototype.enlist = function enlist() {
        return new CompositionTransactionNotifier(this);
      };

      CompositionTransaction.prototype._tryCompleteTransaction = function _tryCompleteTransaction() {
        if (this._compositionCount <= 0) {
          this._compositionCount = 0;

          if (this._ownershipToken !== null) {
            var token = this._ownershipToken;
            this._ownershipToken = null;
            token.resolve();
          }
        }
      };

      return CompositionTransaction;
    }();

    var capitalMatcher = /([A-Z])/g;

    function addHyphenAndLower(char) {
      return '-' + char.toLowerCase();
    }

    function _hyphenate(name) {
      return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
    }

    function _isAllWhitespace(node) {
      return !(node.auInterpolationTarget || /[^\t\n\r ]/.test(node.textContent));
    }

    var ViewEngineHooksResource = exports.ViewEngineHooksResource = function () {
      function ViewEngineHooksResource() {
        
      }

      ViewEngineHooksResource.prototype.initialize = function initialize(container, target) {
        this.instance = container.get(target);
      };

      ViewEngineHooksResource.prototype.register = function register(registry, name) {
        registry.registerViewEngineHooks(this.instance);
      };

      ViewEngineHooksResource.prototype.load = function load(container, target) {};

      ViewEngineHooksResource.convention = function convention(name) {
        if (name.endsWith('ViewEngineHooks')) {
          return new ViewEngineHooksResource();
        }
      };

      return ViewEngineHooksResource;
    }();

    function viewEngineHooks(target) {
      var deco = function deco(t) {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new ViewEngineHooksResource(), t);
      };

      return target ? deco(target) : deco;
    }

    var ElementEvents = exports.ElementEvents = function () {
      function ElementEvents(element) {
        

        this.element = element;
        this.subscriptions = {};
      }

      ElementEvents.prototype._enqueueHandler = function _enqueueHandler(handler) {
        this.subscriptions[handler.eventName] = this.subscriptions[handler.eventName] || [];
        this.subscriptions[handler.eventName].push(handler);
      };

      ElementEvents.prototype._dequeueHandler = function _dequeueHandler(handler) {
        var index = void 0;
        var subscriptions = this.subscriptions[handler.eventName];
        if (subscriptions) {
          index = subscriptions.indexOf(handler);
          if (index > -1) {
            subscriptions.splice(index, 1);
          }
        }
        return handler;
      };

      ElementEvents.prototype.publish = function publish(eventName) {
        var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        var event = aureliaPal.DOM.createCustomEvent(eventName, { cancelable: cancelable, bubbles: bubbles, detail: detail });
        this.element.dispatchEvent(event);
      };

      ElementEvents.prototype.subscribe = function subscribe(eventName, handler) {
        var captureOrOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (typeof handler === 'function') {
          var eventHandler = new EventHandlerImpl(this, eventName, handler, captureOrOptions, false);
          return eventHandler;
        }

        return undefined;
      };

      ElementEvents.prototype.subscribeOnce = function subscribeOnce(eventName, handler) {
        var captureOrOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (typeof handler === 'function') {
          var eventHandler = new EventHandlerImpl(this, eventName, handler, captureOrOptions, true);
          return eventHandler;
        }

        return undefined;
      };

      ElementEvents.prototype.dispose = function dispose(eventName) {
        if (eventName && typeof eventName === 'string') {
          var subscriptions = this.subscriptions[eventName];
          if (subscriptions) {
            while (subscriptions.length) {
              var subscription = subscriptions.pop();
              if (subscription) {
                subscription.dispose();
              }
            }
          }
        } else {
          this.disposeAll();
        }
      };

      ElementEvents.prototype.disposeAll = function disposeAll() {
        for (var key in this.subscriptions) {
          this.dispose(key);
        }
      };

      return ElementEvents;
    }();

    var EventHandlerImpl = function () {
      function EventHandlerImpl(owner, eventName, handler, captureOrOptions, once) {
        

        this.owner = owner;
        this.eventName = eventName;
        this.handler = handler;

        this.capture = typeof captureOrOptions === 'boolean' ? captureOrOptions : captureOrOptions.capture;
        this.bubbles = !this.capture;
        this.captureOrOptions = captureOrOptions;
        this.once = once;
        owner.element.addEventListener(eventName, this, captureOrOptions);
        owner._enqueueHandler(this);
      }

      EventHandlerImpl.prototype.handleEvent = function handleEvent(e) {
        var fn = this.handler;
        fn(e);
        if (this.once) {
          this.dispose();
        }
      };

      EventHandlerImpl.prototype.dispose = function dispose() {
        this.owner.element.removeEventListener(this.eventName, this, this.captureOrOptions);
        this.owner._dequeueHandler(this);
        this.owner = this.handler = null;
      };

      return EventHandlerImpl;
    }();

    var ResourceLoadContext = exports.ResourceLoadContext = function () {
      function ResourceLoadContext() {
        

        this.dependencies = {};
      }

      ResourceLoadContext.prototype.addDependency = function addDependency(url) {
        this.dependencies[url] = true;
      };

      ResourceLoadContext.prototype.hasDependency = function hasDependency(url) {
        return url in this.dependencies;
      };

      return ResourceLoadContext;
    }();

    var ViewCompileInstruction = exports.ViewCompileInstruction = function ViewCompileInstruction() {
      var targetShadowDOM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var compileSurrogate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      

      this.targetShadowDOM = targetShadowDOM;
      this.compileSurrogate = compileSurrogate;
      this.associatedModuleId = null;
    };

    ViewCompileInstruction.normal = new ViewCompileInstruction();

    var BehaviorInstruction = exports.BehaviorInstruction = function () {
      BehaviorInstruction.enhance = function enhance() {
        var instruction = new BehaviorInstruction();
        instruction.enhance = true;
        return instruction;
      };

      BehaviorInstruction.unitTest = function unitTest(type, attributes) {
        var instruction = new BehaviorInstruction();
        instruction.type = type;
        instruction.attributes = attributes || {};
        return instruction;
      };

      BehaviorInstruction.element = function element(node, type) {
        var instruction = new BehaviorInstruction();
        instruction.type = type;
        instruction.attributes = {};
        instruction.anchorIsContainer = !(node.hasAttribute('containerless') || type.containerless);
        instruction.initiatedByBehavior = true;
        return instruction;
      };

      BehaviorInstruction.attribute = function attribute(attrName, type) {
        var instruction = new BehaviorInstruction();
        instruction.attrName = attrName;
        instruction.type = type || null;
        instruction.attributes = {};
        return instruction;
      };

      BehaviorInstruction.dynamic = function dynamic(host, viewModel, viewFactory) {
        var instruction = new BehaviorInstruction();
        instruction.host = host;
        instruction.viewModel = viewModel;
        instruction.viewFactory = viewFactory;
        instruction.inheritBindingContext = true;
        return instruction;
      };

      function BehaviorInstruction() {
        

        this.initiatedByBehavior = false;
        this.enhance = false;
        this.partReplacements = null;
        this.viewFactory = null;
        this.originalAttrName = null;
        this.skipContentProcessing = false;
        this.contentFactory = null;
        this.viewModel = null;
        this.anchorIsContainer = false;
        this.host = null;
        this.attributes = null;
        this.type = null;
        this.attrName = null;
        this.inheritBindingContext = false;
      }

      return BehaviorInstruction;
    }();

    BehaviorInstruction.normal = new BehaviorInstruction();

    var TargetInstruction = exports.TargetInstruction = (_temp = _class = function () {
      TargetInstruction.shadowSlot = function shadowSlot(parentInjectorId) {
        var instruction = new TargetInstruction();
        instruction.parentInjectorId = parentInjectorId;
        instruction.shadowSlot = true;
        return instruction;
      };

      TargetInstruction.contentExpression = function contentExpression(expression) {
        var instruction = new TargetInstruction();
        instruction.contentExpression = expression;
        return instruction;
      };

      TargetInstruction.lifting = function lifting(parentInjectorId, liftingInstruction) {
        var instruction = new TargetInstruction();
        instruction.parentInjectorId = parentInjectorId;
        instruction.expressions = TargetInstruction.noExpressions;
        instruction.behaviorInstructions = [liftingInstruction];
        instruction.viewFactory = liftingInstruction.viewFactory;
        instruction.providers = [liftingInstruction.type.target];
        instruction.lifting = true;
        return instruction;
      };

      TargetInstruction.normal = function normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction) {
        var instruction = new TargetInstruction();
        instruction.injectorId = injectorId;
        instruction.parentInjectorId = parentInjectorId;
        instruction.providers = providers;
        instruction.behaviorInstructions = behaviorInstructions;
        instruction.expressions = expressions;
        instruction.anchorIsContainer = elementInstruction ? elementInstruction.anchorIsContainer : true;
        instruction.elementInstruction = elementInstruction;
        return instruction;
      };

      TargetInstruction.surrogate = function surrogate(providers, behaviorInstructions, expressions, values) {
        var instruction = new TargetInstruction();
        instruction.expressions = expressions;
        instruction.behaviorInstructions = behaviorInstructions;
        instruction.providers = providers;
        instruction.values = values;
        return instruction;
      };

      function TargetInstruction() {
        

        this.injectorId = null;
        this.parentInjectorId = null;

        this.shadowSlot = false;
        this.slotName = null;
        this.slotFallbackFactory = null;

        this.contentExpression = null;

        this.expressions = null;
        this.behaviorInstructions = null;
        this.providers = null;

        this.viewFactory = null;

        this.anchorIsContainer = false;
        this.elementInstruction = null;
        this.lifting = false;

        this.values = null;
      }

      return TargetInstruction;
    }(), _class.noExpressions = Object.freeze([]), _temp);
    var viewStrategy = exports.viewStrategy = aureliaMetadata.protocol.create('aurelia:view-strategy', {
      validate: function validate(target) {
        if (!(typeof target.loadViewFactory === 'function')) {
          return 'View strategies must implement: loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory>';
        }

        return true;
      },
      compose: function compose(target) {
        if (!(typeof target.makeRelativeTo === 'function')) {
          target.makeRelativeTo = aureliaPal.PLATFORM.noop;
        }
      }
    });

    var RelativeViewStrategy = exports.RelativeViewStrategy = (_dec = viewStrategy(), _dec(_class2 = function () {
      function RelativeViewStrategy(path) {
        

        this.path = path;
        this.absolutePath = null;
      }

      RelativeViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        if (this.absolutePath === null && this.moduleId) {
          this.absolutePath = (0, aureliaPath.relativeToFile)(this.path, this.moduleId);
        }

        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(this.absolutePath || this.path, compileInstruction, loadContext, target);
      };

      RelativeViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
        if (this.absolutePath === null) {
          this.absolutePath = (0, aureliaPath.relativeToFile)(this.path, file);
        }
      };

      return RelativeViewStrategy;
    }()) || _class2);
    var ConventionalViewStrategy = exports.ConventionalViewStrategy = (_dec2 = viewStrategy(), _dec2(_class3 = function () {
      function ConventionalViewStrategy(viewLocator, origin) {
        

        this.moduleId = origin.moduleId;
        this.viewUrl = viewLocator.convertOriginToViewUrl(origin);
      }

      ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(this.viewUrl, compileInstruction, loadContext, target);
      };

      return ConventionalViewStrategy;
    }()) || _class3);
    var NoViewStrategy = exports.NoViewStrategy = (_dec3 = viewStrategy(), _dec3(_class4 = function () {
      function NoViewStrategy(dependencies, dependencyBaseUrl) {
        

        this.dependencies = dependencies || null;
        this.dependencyBaseUrl = dependencyBaseUrl || '';
      }

      NoViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        var entry = this.entry;
        var dependencies = this.dependencies;

        if (entry && entry.factoryIsReady) {
          return Promise.resolve(null);
        }

        this.entry = entry = new aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);

        entry.dependencies = [];
        entry.templateIsLoaded = true;

        if (dependencies !== null) {
          for (var i = 0, ii = dependencies.length; i < ii; ++i) {
            var current = dependencies[i];

            if (typeof current === 'string' || typeof current === 'function') {
              entry.addDependency(current);
            } else {
              entry.addDependency(current.from, current.as);
            }
          }
        }

        compileInstruction.associatedModuleId = this.moduleId;

        return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
      };

      return NoViewStrategy;
    }()) || _class4);
    var TemplateRegistryViewStrategy = exports.TemplateRegistryViewStrategy = (_dec4 = viewStrategy(), _dec4(_class5 = function () {
      function TemplateRegistryViewStrategy(moduleId, entry) {
        

        this.moduleId = moduleId;
        this.entry = entry;
      }

      TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        var entry = this.entry;

        if (entry.factoryIsReady) {
          return Promise.resolve(entry.factory);
        }

        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
      };

      return TemplateRegistryViewStrategy;
    }()) || _class5);
    var InlineViewStrategy = exports.InlineViewStrategy = (_dec5 = viewStrategy(), _dec5(_class6 = function () {
      function InlineViewStrategy(markup, dependencies, dependencyBaseUrl) {
        

        this.markup = markup;
        this.dependencies = dependencies || null;
        this.dependencyBaseUrl = dependencyBaseUrl || '';
      }

      InlineViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        var entry = this.entry;
        var dependencies = this.dependencies;

        if (entry && entry.factoryIsReady) {
          return Promise.resolve(entry.factory);
        }

        this.entry = entry = new aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);
        entry.template = aureliaPal.DOM.createTemplateFromMarkup(this.markup);

        if (dependencies !== null) {
          for (var i = 0, ii = dependencies.length; i < ii; ++i) {
            var current = dependencies[i];

            if (typeof current === 'string' || typeof current === 'function') {
              entry.addDependency(current);
            } else {
              entry.addDependency(current.from, current.as);
            }
          }
        }

        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
      };

      return InlineViewStrategy;
    }()) || _class6);
    var ViewLocator = exports.ViewLocator = (_temp2 = _class7 = function () {
      function ViewLocator() {
        
      }

      ViewLocator.prototype.getViewStrategy = function getViewStrategy(value) {
        if (!value) {
          return null;
        }

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'getViewStrategy' in value) {
          var _origin = aureliaMetadata.Origin.get(value.constructor);

          value = value.getViewStrategy();

          if (typeof value === 'string') {
            value = new RelativeViewStrategy(value);
          }

          viewStrategy.assert(value);

          if (_origin.moduleId) {
            value.makeRelativeTo(_origin.moduleId);
          }

          return value;
        }

        if (typeof value === 'string') {
          value = new RelativeViewStrategy(value);
        }

        if (viewStrategy.validate(value)) {
          return value;
        }

        if (typeof value !== 'function') {
          value = value.constructor;
        }

        var origin = aureliaMetadata.Origin.get(value);
        var strategy = aureliaMetadata.metadata.get(ViewLocator.viewStrategyMetadataKey, value);

        if (!strategy) {
          if (!origin.moduleId) {
            throw new Error('Cannot determine default view strategy for object.', value);
          }

          strategy = this.createFallbackViewStrategy(origin);
        } else if (origin.moduleId) {
          strategy.moduleId = origin.moduleId;
        }

        return strategy;
      };

      ViewLocator.prototype.createFallbackViewStrategy = function createFallbackViewStrategy(origin) {
        return new ConventionalViewStrategy(this, origin);
      };

      ViewLocator.prototype.convertOriginToViewUrl = function convertOriginToViewUrl(origin) {
        var moduleId = origin.moduleId;
        var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
        return id + '.html';
      };

      return ViewLocator;
    }(), _class7.viewStrategyMetadataKey = 'aurelia:view-strategy', _temp2);


    function mi(name) {
      throw new Error('BindingLanguage must implement ' + name + '().');
    }

    var BindingLanguage = exports.BindingLanguage = function () {
      function BindingLanguage() {
        
      }

      BindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, elementName, attrName, attrValue) {
        mi('inspectAttribute');
      };

      BindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
        mi('createAttributeInstruction');
      };

      BindingLanguage.prototype.inspectTextContent = function inspectTextContent(resources, value) {
        mi('inspectTextContent');
      };

      return BindingLanguage;
    }();

    var noNodes = Object.freeze([]);

    var SlotCustomAttribute = exports.SlotCustomAttribute = (_dec6 = (0, aureliaDependencyInjection.inject)(aureliaPal.DOM.Element), _dec6(_class8 = function () {
      function SlotCustomAttribute(element) {
        

        this.element = element;
        this.element.auSlotAttribute = this;
      }

      SlotCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

      return SlotCustomAttribute;
    }()) || _class8);

    var PassThroughSlot = exports.PassThroughSlot = function () {
      function PassThroughSlot(anchor, name, destinationName, fallbackFactory) {
        

        this.anchor = anchor;
        this.anchor.viewSlot = this;
        this.name = name;
        this.destinationName = destinationName;
        this.fallbackFactory = fallbackFactory;
        this.destinationSlot = null;
        this.projections = 0;
        this.contentView = null;

        var attr = new SlotCustomAttribute(this.anchor);
        attr.value = this.destinationName;
      }

      PassThroughSlot.prototype.renderFallbackContent = function renderFallbackContent(view, nodes, projectionSource, index) {
        if (this.contentView === null) {
          this.contentView = this.fallbackFactory.create(this.ownerView.container);
          this.contentView.bind(this.ownerView.bindingContext, this.ownerView.overrideContext);

          var slots = Object.create(null);
          slots[this.destinationSlot.name] = this.destinationSlot;

          ShadowDOM.distributeView(this.contentView, slots, projectionSource, index, this.destinationSlot.name);
        }
      };

      PassThroughSlot.prototype.passThroughTo = function passThroughTo(destinationSlot) {
        this.destinationSlot = destinationSlot;
      };

      PassThroughSlot.prototype.addNode = function addNode(view, node, projectionSource, index) {
        if (this.contentView !== null) {
          this.contentView.removeNodes();
          this.contentView.detached();
          this.contentView.unbind();
          this.contentView = null;
        }

        if (node.viewSlot instanceof PassThroughSlot) {
          node.viewSlot.passThroughTo(this);
          return;
        }

        this.projections++;
        this.destinationSlot.addNode(view, node, projectionSource, index);
      };

      PassThroughSlot.prototype.removeView = function removeView(view, projectionSource) {
        this.projections--;
        this.destinationSlot.removeView(view, projectionSource);

        if (this.needsFallbackRendering) {
          this.renderFallbackContent(null, noNodes, projectionSource);
        }
      };

      PassThroughSlot.prototype.removeAll = function removeAll(projectionSource) {
        this.projections = 0;
        this.destinationSlot.removeAll(projectionSource);

        if (this.needsFallbackRendering) {
          this.renderFallbackContent(null, noNodes, projectionSource);
        }
      };

      PassThroughSlot.prototype.projectFrom = function projectFrom(view, projectionSource) {
        this.destinationSlot.projectFrom(view, projectionSource);
      };

      PassThroughSlot.prototype.created = function created(ownerView) {
        this.ownerView = ownerView;
      };

      PassThroughSlot.prototype.bind = function bind(view) {
        if (this.contentView) {
          this.contentView.bind(view.bindingContext, view.overrideContext);
        }
      };

      PassThroughSlot.prototype.attached = function attached() {
        if (this.contentView) {
          this.contentView.attached();
        }
      };

      PassThroughSlot.prototype.detached = function detached() {
        if (this.contentView) {
          this.contentView.detached();
        }
      };

      PassThroughSlot.prototype.unbind = function unbind() {
        if (this.contentView) {
          this.contentView.unbind();
        }
      };

      _createClass(PassThroughSlot, [{
        key: 'needsFallbackRendering',
        get: function get() {
          return this.fallbackFactory && this.projections === 0;
        }
      }]);

      return PassThroughSlot;
    }();

    var ShadowSlot = exports.ShadowSlot = function () {
      function ShadowSlot(anchor, name, fallbackFactory) {
        

        this.anchor = anchor;
        this.anchor.isContentProjectionSource = true;
        this.anchor.viewSlot = this;
        this.name = name;
        this.fallbackFactory = fallbackFactory;
        this.contentView = null;
        this.projections = 0;
        this.children = [];
        this.projectFromAnchors = null;
        this.destinationSlots = null;
      }

      ShadowSlot.prototype.addNode = function addNode(view, node, projectionSource, index, destination) {
        if (this.contentView !== null) {
          this.contentView.removeNodes();
          this.contentView.detached();
          this.contentView.unbind();
          this.contentView = null;
        }

        if (node.viewSlot instanceof PassThroughSlot) {
          node.viewSlot.passThroughTo(this);
          return;
        }

        if (this.destinationSlots !== null) {
          ShadowDOM.distributeNodes(view, [node], this.destinationSlots, this, index);
        } else {
          node.auOwnerView = view;
          node.auProjectionSource = projectionSource;
          node.auAssignedSlot = this;

          var anchor = this._findAnchor(view, node, projectionSource, index);
          var parent = anchor.parentNode;

          parent.insertBefore(node, anchor);
          this.children.push(node);
          this.projections++;
        }
      };

      ShadowSlot.prototype.removeView = function removeView(view, projectionSource) {
        if (this.destinationSlots !== null) {
          ShadowDOM.undistributeView(view, this.destinationSlots, this);
        } else if (this.contentView && this.contentView.hasSlots) {
          ShadowDOM.undistributeView(view, this.contentView.slots, projectionSource);
        } else {
          var found = this.children.find(function (x) {
            return x.auSlotProjectFrom === projectionSource;
          });
          if (found) {
            var _children = found.auProjectionChildren;

            for (var i = 0, ii = _children.length; i < ii; ++i) {
              var _child = _children[i];

              if (_child.auOwnerView === view) {
                _children.splice(i, 1);
                view.fragment.appendChild(_child);
                i--;ii--;
                this.projections--;
              }
            }

            if (this.needsFallbackRendering) {
              this.renderFallbackContent(view, noNodes, projectionSource);
            }
          }
        }
      };

      ShadowSlot.prototype.removeAll = function removeAll(projectionSource) {
        if (this.destinationSlots !== null) {
          ShadowDOM.undistributeAll(this.destinationSlots, this);
        } else if (this.contentView && this.contentView.hasSlots) {
          ShadowDOM.undistributeAll(this.contentView.slots, projectionSource);
        } else {
          var found = this.children.find(function (x) {
            return x.auSlotProjectFrom === projectionSource;
          });

          if (found) {
            var _children2 = found.auProjectionChildren;
            for (var i = 0, ii = _children2.length; i < ii; ++i) {
              var _child2 = _children2[i];
              _child2.auOwnerView.fragment.appendChild(_child2);
              this.projections--;
            }

            found.auProjectionChildren = [];

            if (this.needsFallbackRendering) {
              this.renderFallbackContent(null, noNodes, projectionSource);
            }
          }
        }
      };

      ShadowSlot.prototype._findAnchor = function _findAnchor(view, node, projectionSource, index) {
        if (projectionSource) {
          var found = this.children.find(function (x) {
            return x.auSlotProjectFrom === projectionSource;
          });
          if (found) {
            if (index !== undefined) {
              var _children3 = found.auProjectionChildren;
              var viewIndex = -1;
              var lastView = void 0;

              for (var i = 0, ii = _children3.length; i < ii; ++i) {
                var current = _children3[i];

                if (current.auOwnerView !== lastView) {
                  viewIndex++;
                  lastView = current.auOwnerView;

                  if (viewIndex >= index && lastView !== view) {
                    _children3.splice(i, 0, node);
                    return current;
                  }
                }
              }
            }

            found.auProjectionChildren.push(node);
            return found;
          }
        }

        return this.anchor;
      };

      ShadowSlot.prototype.projectTo = function projectTo(slots) {
        this.destinationSlots = slots;
      };

      ShadowSlot.prototype.projectFrom = function projectFrom(view, projectionSource) {
        var anchor = aureliaPal.DOM.createComment('anchor');
        var parent = this.anchor.parentNode;
        anchor.auSlotProjectFrom = projectionSource;
        anchor.auOwnerView = view;
        anchor.auProjectionChildren = [];
        parent.insertBefore(anchor, this.anchor);
        this.children.push(anchor);

        if (this.projectFromAnchors === null) {
          this.projectFromAnchors = [];
        }

        this.projectFromAnchors.push(anchor);
      };

      ShadowSlot.prototype.renderFallbackContent = function renderFallbackContent(view, nodes, projectionSource, index) {
        if (this.contentView === null) {
          this.contentView = this.fallbackFactory.create(this.ownerView.container);
          this.contentView.bind(this.ownerView.bindingContext, this.ownerView.overrideContext);
          this.contentView.insertNodesBefore(this.anchor);
        }

        if (this.contentView.hasSlots) {
          var slots = this.contentView.slots;
          var projectFromAnchors = this.projectFromAnchors;

          if (projectFromAnchors !== null) {
            for (var slotName in slots) {
              var slot = slots[slotName];

              for (var i = 0, ii = projectFromAnchors.length; i < ii; ++i) {
                var anchor = projectFromAnchors[i];
                slot.projectFrom(anchor.auOwnerView, anchor.auSlotProjectFrom);
              }
            }
          }

          this.fallbackSlots = slots;
          ShadowDOM.distributeNodes(view, nodes, slots, projectionSource, index);
        }
      };

      ShadowSlot.prototype.created = function created(ownerView) {
        this.ownerView = ownerView;
      };

      ShadowSlot.prototype.bind = function bind(view) {
        if (this.contentView) {
          this.contentView.bind(view.bindingContext, view.overrideContext);
        }
      };

      ShadowSlot.prototype.attached = function attached() {
        if (this.contentView) {
          this.contentView.attached();
        }
      };

      ShadowSlot.prototype.detached = function detached() {
        if (this.contentView) {
          this.contentView.detached();
        }
      };

      ShadowSlot.prototype.unbind = function unbind() {
        if (this.contentView) {
          this.contentView.unbind();
        }
      };

      _createClass(ShadowSlot, [{
        key: 'needsFallbackRendering',
        get: function get() {
          return this.fallbackFactory && this.projections === 0;
        }
      }]);

      return ShadowSlot;
    }();

    var ShadowDOM = exports.ShadowDOM = (_temp3 = _class9 = function () {
      function ShadowDOM() {
        
      }

      ShadowDOM.getSlotName = function getSlotName(node) {
        if (node.auSlotAttribute === undefined) {
          return ShadowDOM.defaultSlotKey;
        }

        return node.auSlotAttribute.value;
      };

      ShadowDOM.distributeView = function distributeView(view, slots, projectionSource, index, destinationOverride) {
        var nodes = void 0;

        if (view === null) {
          nodes = noNodes;
        } else {
          var childNodes = view.fragment.childNodes;
          var ii = childNodes.length;
          nodes = new Array(ii);

          for (var i = 0; i < ii; ++i) {
            nodes[i] = childNodes[i];
          }
        }

        ShadowDOM.distributeNodes(view, nodes, slots, projectionSource, index, destinationOverride);
      };

      ShadowDOM.undistributeView = function undistributeView(view, slots, projectionSource) {
        for (var slotName in slots) {
          slots[slotName].removeView(view, projectionSource);
        }
      };

      ShadowDOM.undistributeAll = function undistributeAll(slots, projectionSource) {
        for (var slotName in slots) {
          slots[slotName].removeAll(projectionSource);
        }
      };

      ShadowDOM.distributeNodes = function distributeNodes(view, nodes, slots, projectionSource, index, destinationOverride) {
        for (var i = 0, ii = nodes.length; i < ii; ++i) {
          var currentNode = nodes[i];
          var nodeType = currentNode.nodeType;

          if (currentNode.isContentProjectionSource) {
            currentNode.viewSlot.projectTo(slots);

            for (var slotName in slots) {
              slots[slotName].projectFrom(view, currentNode.viewSlot);
            }

            nodes.splice(i, 1);
            ii--;i--;
          } else if (nodeType === 1 || nodeType === 3 || currentNode.viewSlot instanceof PassThroughSlot) {
            if (nodeType === 3 && _isAllWhitespace(currentNode)) {
              nodes.splice(i, 1);
              ii--;i--;
            } else {
              var found = slots[destinationOverride || ShadowDOM.getSlotName(currentNode)];

              if (found) {
                found.addNode(view, currentNode, projectionSource, index);
                nodes.splice(i, 1);
                ii--;i--;
              }
            }
          } else {
            nodes.splice(i, 1);
            ii--;i--;
          }
        }

        for (var _slotName in slots) {
          var slot = slots[_slotName];

          if (slot.needsFallbackRendering) {
            slot.renderFallbackContent(view, nodes, projectionSource, index);
          }
        }
      };

      return ShadowDOM;
    }(), _class9.defaultSlotKey = '__au-default-slot-key__', _temp3);


    function register(lookup, name, resource, type) {
      if (!name) {
        return;
      }

      var existing = lookup[name];
      if (existing) {
        if (existing !== resource) {
          throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
        }

        return;
      }

      lookup[name] = resource;
    }

    var ViewResources = exports.ViewResources = function () {
      function ViewResources(parent, viewUrl) {
        

        this.bindingLanguage = null;

        this.parent = parent || null;
        this.hasParent = this.parent !== null;
        this.viewUrl = viewUrl || '';
        this.lookupFunctions = {
          valueConverters: this.getValueConverter.bind(this),
          bindingBehaviors: this.getBindingBehavior.bind(this)
        };
        this.attributes = Object.create(null);
        this.elements = Object.create(null);
        this.valueConverters = Object.create(null);
        this.bindingBehaviors = Object.create(null);
        this.attributeMap = Object.create(null);
        this.values = Object.create(null);
        this.beforeCompile = this.afterCompile = this.beforeCreate = this.afterCreate = this.beforeBind = this.beforeUnbind = false;
      }

      ViewResources.prototype._tryAddHook = function _tryAddHook(obj, name) {
        if (typeof obj[name] === 'function') {
          var func = obj[name].bind(obj);
          var counter = 1;
          var callbackName = void 0;

          while (this[callbackName = name + counter.toString()] !== undefined) {
            counter++;
          }

          this[name] = true;
          this[callbackName] = func;
        }
      };

      ViewResources.prototype._invokeHook = function _invokeHook(name, one, two, three, four) {
        if (this.hasParent) {
          this.parent._invokeHook(name, one, two, three, four);
        }

        if (this[name]) {
          this[name + '1'](one, two, three, four);

          var callbackName = name + '2';
          if (this[callbackName]) {
            this[callbackName](one, two, three, four);

            callbackName = name + '3';
            if (this[callbackName]) {
              this[callbackName](one, two, three, four);

              var counter = 4;

              while (this[callbackName = name + counter.toString()] !== undefined) {
                this[callbackName](one, two, three, four);
                counter++;
              }
            }
          }
        }
      };

      ViewResources.prototype.registerViewEngineHooks = function registerViewEngineHooks(hooks) {
        this._tryAddHook(hooks, 'beforeCompile');
        this._tryAddHook(hooks, 'afterCompile');
        this._tryAddHook(hooks, 'beforeCreate');
        this._tryAddHook(hooks, 'afterCreate');
        this._tryAddHook(hooks, 'beforeBind');
        this._tryAddHook(hooks, 'beforeUnbind');
      };

      ViewResources.prototype.getBindingLanguage = function getBindingLanguage(bindingLanguageFallback) {
        return this.bindingLanguage || (this.bindingLanguage = bindingLanguageFallback);
      };

      ViewResources.prototype.patchInParent = function patchInParent(newParent) {
        var originalParent = this.parent;

        this.parent = newParent || null;
        this.hasParent = this.parent !== null;

        if (newParent.parent === null) {
          newParent.parent = originalParent;
          newParent.hasParent = originalParent !== null;
        }
      };

      ViewResources.prototype.relativeToView = function relativeToView(path) {
        return (0, aureliaPath.relativeToFile)(path, this.viewUrl);
      };

      ViewResources.prototype.registerElement = function registerElement(tagName, behavior) {
        register(this.elements, tagName, behavior, 'an Element');
      };

      ViewResources.prototype.getElement = function getElement(tagName) {
        return this.elements[tagName] || (this.hasParent ? this.parent.getElement(tagName) : null);
      };

      ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
        return this.attributeMap[attribute] || (this.hasParent ? this.parent.mapAttribute(attribute) : null);
      };

      ViewResources.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
        this.attributeMap[attribute] = knownAttribute;
        register(this.attributes, attribute, behavior, 'an Attribute');
      };

      ViewResources.prototype.getAttribute = function getAttribute(attribute) {
        return this.attributes[attribute] || (this.hasParent ? this.parent.getAttribute(attribute) : null);
      };

      ViewResources.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
        register(this.valueConverters, name, valueConverter, 'a ValueConverter');
      };

      ViewResources.prototype.getValueConverter = function getValueConverter(name) {
        return this.valueConverters[name] || (this.hasParent ? this.parent.getValueConverter(name) : null);
      };

      ViewResources.prototype.registerBindingBehavior = function registerBindingBehavior(name, bindingBehavior) {
        register(this.bindingBehaviors, name, bindingBehavior, 'a BindingBehavior');
      };

      ViewResources.prototype.getBindingBehavior = function getBindingBehavior(name) {
        return this.bindingBehaviors[name] || (this.hasParent ? this.parent.getBindingBehavior(name) : null);
      };

      ViewResources.prototype.registerValue = function registerValue(name, value) {
        register(this.values, name, value, 'a value');
      };

      ViewResources.prototype.getValue = function getValue(name) {
        return this.values[name] || (this.hasParent ? this.parent.getValue(name) : null);
      };

      return ViewResources;
    }();

    var View = exports.View = function () {
      function View(container, viewFactory, fragment, controllers, bindings, children, slots) {
        

        this.container = container;
        this.viewFactory = viewFactory;
        this.resources = viewFactory.resources;
        this.fragment = fragment;
        this.firstChild = fragment.firstChild;
        this.lastChild = fragment.lastChild;
        this.controllers = controllers;
        this.bindings = bindings;
        this.children = children;
        this.slots = slots;
        this.hasSlots = false;
        this.fromCache = false;
        this.isBound = false;
        this.isAttached = false;
        this.bindingContext = null;
        this.overrideContext = null;
        this.controller = null;
        this.viewModelScope = null;
        this.animatableElement = undefined;
        this._isUserControlled = false;
        this.contentView = null;

        for (var key in slots) {
          this.hasSlots = true;
          break;
        }
      }

      View.prototype.returnToCache = function returnToCache() {
        this.viewFactory.returnViewToCache(this);
      };

      View.prototype.created = function created() {
        var i = void 0;
        var ii = void 0;
        var controllers = this.controllers;

        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].created(this);
        }
      };

      View.prototype.bind = function bind(bindingContext, overrideContext, _systemUpdate) {
        var controllers = void 0;
        var bindings = void 0;
        var children = void 0;
        var i = void 0;
        var ii = void 0;

        if (_systemUpdate && this._isUserControlled) {
          return;
        }

        if (this.isBound) {
          if (this.bindingContext === bindingContext) {
            return;
          }

          this.unbind();
        }

        this.isBound = true;
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext || (0, aureliaBinding.createOverrideContext)(bindingContext);

        this.resources._invokeHook('beforeBind', this);

        bindings = this.bindings;
        for (i = 0, ii = bindings.length; i < ii; ++i) {
          bindings[i].bind(this);
        }

        if (this.viewModelScope !== null) {
          bindingContext.bind(this.viewModelScope.bindingContext, this.viewModelScope.overrideContext);
          this.viewModelScope = null;
        }

        controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].bind(this);
        }

        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].bind(bindingContext, overrideContext, true);
        }

        if (this.hasSlots) {
          ShadowDOM.distributeView(this.contentView, this.slots);
        }
      };

      View.prototype.addBinding = function addBinding(binding) {
        this.bindings.push(binding);

        if (this.isBound) {
          binding.bind(this);
        }
      };

      View.prototype.unbind = function unbind() {
        var controllers = void 0;
        var bindings = void 0;
        var children = void 0;
        var i = void 0;
        var ii = void 0;

        if (this.isBound) {
          this.isBound = false;
          this.resources._invokeHook('beforeUnbind', this);

          if (this.controller !== null) {
            this.controller.unbind();
          }

          bindings = this.bindings;
          for (i = 0, ii = bindings.length; i < ii; ++i) {
            bindings[i].unbind();
          }

          controllers = this.controllers;
          for (i = 0, ii = controllers.length; i < ii; ++i) {
            controllers[i].unbind();
          }

          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].unbind();
          }

          this.bindingContext = null;
          this.overrideContext = null;
        }
      };

      View.prototype.insertNodesBefore = function insertNodesBefore(refNode) {
        refNode.parentNode.insertBefore(this.fragment, refNode);
      };

      View.prototype.appendNodesTo = function appendNodesTo(parent) {
        parent.appendChild(this.fragment);
      };

      View.prototype.removeNodes = function removeNodes() {
        var fragment = this.fragment;
        var current = this.firstChild;
        var end = this.lastChild;
        var next = void 0;

        while (current) {
          next = current.nextSibling;
          fragment.appendChild(current);

          if (current === end) {
            break;
          }

          current = next;
        }
      };

      View.prototype.attached = function attached() {
        var controllers = void 0;
        var children = void 0;
        var i = void 0;
        var ii = void 0;

        if (this.isAttached) {
          return;
        }

        this.isAttached = true;

        if (this.controller !== null) {
          this.controller.attached();
        }

        controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].attached();
        }

        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].attached();
        }
      };

      View.prototype.detached = function detached() {
        var controllers = void 0;
        var children = void 0;
        var i = void 0;
        var ii = void 0;

        if (this.isAttached) {
          this.isAttached = false;

          if (this.controller !== null) {
            this.controller.detached();
          }

          controllers = this.controllers;
          for (i = 0, ii = controllers.length; i < ii; ++i) {
            controllers[i].detached();
          }

          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].detached();
          }
        }
      };

      return View;
    }();

    function getAnimatableElement(view) {
      if (view.animatableElement !== undefined) {
        return view.animatableElement;
      }

      var current = view.firstChild;

      while (current && current.nodeType !== 1) {
        current = current.nextSibling;
      }

      if (current && current.nodeType === 1) {
        return view.animatableElement = current.classList.contains('au-animate') ? current : null;
      }

      return view.animatableElement = null;
    }

    var ViewSlot = exports.ViewSlot = function () {
      function ViewSlot(anchor, anchorIsContainer) {
        var animator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Animator.instance;

        

        this.anchor = anchor;
        this.anchorIsContainer = anchorIsContainer;
        this.bindingContext = null;
        this.overrideContext = null;
        this.animator = animator;
        this.children = [];
        this.isBound = false;
        this.isAttached = false;
        this.contentSelectors = null;
        anchor.viewSlot = this;
        anchor.isContentProjectionSource = false;
      }

      ViewSlot.prototype.animateView = function animateView(view) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'enter';

        var animatableElement = getAnimatableElement(view);

        if (animatableElement !== null) {
          switch (direction) {
            case 'enter':
              return this.animator.enter(animatableElement);
            case 'leave':
              return this.animator.leave(animatableElement);
            default:
              throw new Error('Invalid animation direction: ' + direction);
          }
        }
      };

      ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
        var parent = this.anchor;

        this.children.push({
          fragment: parent,
          firstChild: parent.firstChild,
          lastChild: parent.lastChild,
          returnToCache: function returnToCache() {},
          removeNodes: function removeNodes() {
            var last = void 0;

            while (last = parent.lastChild) {
              parent.removeChild(last);
            }
          },
          created: function created() {},
          bind: function bind() {},
          unbind: function unbind() {},
          attached: function attached() {},
          detached: function detached() {}
        });
      };

      ViewSlot.prototype.bind = function bind(bindingContext, overrideContext) {
        var i = void 0;
        var ii = void 0;
        var children = void 0;

        if (this.isBound) {
          if (this.bindingContext === bindingContext) {
            return;
          }

          this.unbind();
        }

        this.isBound = true;
        this.bindingContext = bindingContext = bindingContext || this.bindingContext;
        this.overrideContext = overrideContext = overrideContext || this.overrideContext;

        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].bind(bindingContext, overrideContext, true);
        }
      };

      ViewSlot.prototype.unbind = function unbind() {
        if (this.isBound) {
          var i = void 0;
          var ii = void 0;
          var _children4 = this.children;

          this.isBound = false;
          this.bindingContext = null;
          this.overrideContext = null;

          for (i = 0, ii = _children4.length; i < ii; ++i) {
            _children4[i].unbind();
          }
        }
      };

      ViewSlot.prototype.add = function add(view) {
        if (this.anchorIsContainer) {
          view.appendNodesTo(this.anchor);
        } else {
          view.insertNodesBefore(this.anchor);
        }

        this.children.push(view);

        if (this.isAttached) {
          view.attached();
          return this.animateView(view, 'enter');
        }
      };

      ViewSlot.prototype.insert = function insert(index, view) {
        var children = this.children;
        var length = children.length;

        if (index === 0 && length === 0 || index >= length) {
          return this.add(view);
        }

        view.insertNodesBefore(children[index].firstChild);
        children.splice(index, 0, view);

        if (this.isAttached) {
          view.attached();
          return this.animateView(view, 'enter');
        }
      };

      ViewSlot.prototype.move = function move(sourceIndex, targetIndex) {
        if (sourceIndex === targetIndex) {
          return;
        }

        var children = this.children;
        var view = children[sourceIndex];

        view.removeNodes();
        view.insertNodesBefore(children[targetIndex].firstChild);
        children.splice(sourceIndex, 1);
        children.splice(targetIndex, 0, view);
      };

      ViewSlot.prototype.remove = function remove(view, returnToCache, skipAnimation) {
        return this.removeAt(this.children.indexOf(view), returnToCache, skipAnimation);
      };

      ViewSlot.prototype.removeMany = function removeMany(viewsToRemove, returnToCache, skipAnimation) {
        var _this2 = this;

        var children = this.children;
        var ii = viewsToRemove.length;
        var i = void 0;
        var rmPromises = [];

        viewsToRemove.forEach(function (child) {
          if (skipAnimation) {
            child.removeNodes();
            return;
          }

          var animation = _this2.animateView(child, 'leave');
          if (animation) {
            rmPromises.push(animation.then(function () {
              return child.removeNodes();
            }));
          } else {
            child.removeNodes();
          }
        });

        var removeAction = function removeAction() {
          if (_this2.isAttached) {
            for (i = 0; i < ii; ++i) {
              viewsToRemove[i].detached();
            }
          }

          if (returnToCache) {
            for (i = 0; i < ii; ++i) {
              viewsToRemove[i].returnToCache();
            }
          }

          for (i = 0; i < ii; ++i) {
            var index = children.indexOf(viewsToRemove[i]);
            if (index >= 0) {
              children.splice(index, 1);
            }
          }
        };

        if (rmPromises.length > 0) {
          return Promise.all(rmPromises).then(function () {
            return removeAction();
          });
        }

        return removeAction();
      };

      ViewSlot.prototype.removeAt = function removeAt(index, returnToCache, skipAnimation) {
        var _this3 = this;

        var view = this.children[index];

        var removeAction = function removeAction() {
          index = _this3.children.indexOf(view);
          view.removeNodes();
          _this3.children.splice(index, 1);

          if (_this3.isAttached) {
            view.detached();
          }

          if (returnToCache) {
            view.returnToCache();
          }

          return view;
        };

        if (!skipAnimation) {
          var animation = this.animateView(view, 'leave');
          if (animation) {
            return animation.then(function () {
              return removeAction();
            });
          }
        }

        return removeAction();
      };

      ViewSlot.prototype.removeAll = function removeAll(returnToCache, skipAnimation) {
        var _this4 = this;

        var children = this.children;
        var ii = children.length;
        var i = void 0;
        var rmPromises = [];

        children.forEach(function (child) {
          if (skipAnimation) {
            child.removeNodes();
            return;
          }

          var animation = _this4.animateView(child, 'leave');
          if (animation) {
            rmPromises.push(animation.then(function () {
              return child.removeNodes();
            }));
          } else {
            child.removeNodes();
          }
        });

        var removeAction = function removeAction() {
          if (_this4.isAttached) {
            for (i = 0; i < ii; ++i) {
              children[i].detached();
            }
          }

          if (returnToCache) {
            for (i = 0; i < ii; ++i) {
              var _child3 = children[i];

              if (_child3) {
                _child3.returnToCache();
              }
            }
          }

          _this4.children = [];
        };

        if (rmPromises.length > 0) {
          return Promise.all(rmPromises).then(function () {
            return removeAction();
          });
        }

        return removeAction();
      };

      ViewSlot.prototype.attached = function attached() {
        var i = void 0;
        var ii = void 0;
        var children = void 0;
        var child = void 0;

        if (this.isAttached) {
          return;
        }

        this.isAttached = true;

        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          child = children[i];
          child.attached();
          this.animateView(child, 'enter');
        }
      };

      ViewSlot.prototype.detached = function detached() {
        var i = void 0;
        var ii = void 0;
        var children = void 0;

        if (this.isAttached) {
          this.isAttached = false;
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].detached();
          }
        }
      };

      ViewSlot.prototype.projectTo = function projectTo(slots) {
        var _this5 = this;

        this.projectToSlots = slots;
        this.add = this._projectionAdd;
        this.insert = this._projectionInsert;
        this.move = this._projectionMove;
        this.remove = this._projectionRemove;
        this.removeAt = this._projectionRemoveAt;
        this.removeMany = this._projectionRemoveMany;
        this.removeAll = this._projectionRemoveAll;
        this.children.forEach(function (view) {
          return ShadowDOM.distributeView(view, slots, _this5);
        });
      };

      ViewSlot.prototype._projectionAdd = function _projectionAdd(view) {
        ShadowDOM.distributeView(view, this.projectToSlots, this);

        this.children.push(view);

        if (this.isAttached) {
          view.attached();
        }
      };

      ViewSlot.prototype._projectionInsert = function _projectionInsert(index, view) {
        if (index === 0 && !this.children.length || index >= this.children.length) {
          this.add(view);
        } else {
          ShadowDOM.distributeView(view, this.projectToSlots, this, index);

          this.children.splice(index, 0, view);

          if (this.isAttached) {
            view.attached();
          }
        }
      };

      ViewSlot.prototype._projectionMove = function _projectionMove(sourceIndex, targetIndex) {
        if (sourceIndex === targetIndex) {
          return;
        }

        var children = this.children;
        var view = children[sourceIndex];

        ShadowDOM.undistributeView(view, this.projectToSlots, this);
        ShadowDOM.distributeView(view, this.projectToSlots, this, targetIndex);

        children.splice(sourceIndex, 1);
        children.splice(targetIndex, 0, view);
      };

      ViewSlot.prototype._projectionRemove = function _projectionRemove(view, returnToCache) {
        ShadowDOM.undistributeView(view, this.projectToSlots, this);
        this.children.splice(this.children.indexOf(view), 1);

        if (this.isAttached) {
          view.detached();
        }
      };

      ViewSlot.prototype._projectionRemoveAt = function _projectionRemoveAt(index, returnToCache) {
        var view = this.children[index];

        ShadowDOM.undistributeView(view, this.projectToSlots, this);
        this.children.splice(index, 1);

        if (this.isAttached) {
          view.detached();
        }
      };

      ViewSlot.prototype._projectionRemoveMany = function _projectionRemoveMany(viewsToRemove, returnToCache) {
        var _this6 = this;

        viewsToRemove.forEach(function (view) {
          return _this6.remove(view, returnToCache);
        });
      };

      ViewSlot.prototype._projectionRemoveAll = function _projectionRemoveAll(returnToCache) {
        ShadowDOM.undistributeAll(this.projectToSlots, this);

        var children = this.children;

        if (this.isAttached) {
          for (var i = 0, ii = children.length; i < ii; ++i) {
            children[i].detached();
          }
        }

        this.children = [];
      };

      return ViewSlot;
    }();

    var ProviderResolver = (0, aureliaDependencyInjection.resolver)(_class11 = function () {
      function ProviderResolver() {
        
      }

      ProviderResolver.prototype.get = function get(container, key) {
        var id = key.__providerId__;
        return id in container ? container[id] : container[id] = container.invoke(key);
      };

      return ProviderResolver;
    }()) || _class11;

    var providerResolverInstance = new ProviderResolver();

    function elementContainerGet(key) {
      if (key === aureliaPal.DOM.Element) {
        return this.element;
      }

      if (key === BoundViewFactory) {
        if (this.boundViewFactory) {
          return this.boundViewFactory;
        }

        var factory = this.instruction.viewFactory;
        var _partReplacements = this.partReplacements;

        if (_partReplacements) {
          factory = _partReplacements[factory.part] || factory;
        }

        this.boundViewFactory = new BoundViewFactory(this, factory, _partReplacements);
        return this.boundViewFactory;
      }

      if (key === ViewSlot) {
        if (this.viewSlot === undefined) {
          this.viewSlot = new ViewSlot(this.element, this.instruction.anchorIsContainer);
          this.element.isContentProjectionSource = this.instruction.lifting;
          this.children.push(this.viewSlot);
        }

        return this.viewSlot;
      }

      if (key === ElementEvents) {
        return this.elementEvents || (this.elementEvents = new ElementEvents(this.element));
      }

      if (key === CompositionTransaction) {
        return this.compositionTransaction || (this.compositionTransaction = this.parent.get(key));
      }

      if (key === ViewResources) {
        return this.viewResources;
      }

      if (key === TargetInstruction) {
        return this.instruction;
      }

      return this.superGet(key);
    }

    function createElementContainer(parent, element, instruction, children, partReplacements, resources) {
      var container = parent.createChild();
      var providers = void 0;
      var i = void 0;

      container.element = element;
      container.instruction = instruction;
      container.children = children;
      container.viewResources = resources;
      container.partReplacements = partReplacements;

      providers = instruction.providers;
      i = providers.length;

      while (i--) {
        container._resolvers.set(providers[i], providerResolverInstance);
      }

      container.superGet = container.get;
      container.get = elementContainerGet;

      return container;
    }

    function hasAttribute(name) {
      return this._element.hasAttribute(name);
    }

    function getAttribute(name) {
      return this._element.getAttribute(name);
    }

    function setAttribute(name, value) {
      this._element.setAttribute(name, value);
    }

    function makeElementIntoAnchor(element, elementInstruction) {
      var anchor = aureliaPal.DOM.createComment('anchor');

      if (elementInstruction) {
        var firstChild = element.firstChild;

        if (firstChild && firstChild.tagName === 'AU-CONTENT') {
          anchor.contentElement = firstChild;
        }

        anchor._element = element;

        anchor.hasAttribute = hasAttribute;
        anchor.getAttribute = getAttribute;
        anchor.setAttribute = setAttribute;
      }

      aureliaPal.DOM.replaceNode(anchor, element);

      return anchor;
    }

    function applyInstructions(containers, element, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources) {
      var behaviorInstructions = instruction.behaviorInstructions;
      var expressions = instruction.expressions;
      var elementContainer = void 0;
      var i = void 0;
      var ii = void 0;
      var current = void 0;
      var instance = void 0;

      if (instruction.contentExpression) {
        bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
        element.nextSibling.auInterpolationTarget = true;
        element.parentNode.removeChild(element);
        return;
      }

      if (instruction.shadowSlot) {
        var commentAnchor = aureliaPal.DOM.createComment('slot');
        var slot = void 0;

        if (instruction.slotDestination) {
          slot = new PassThroughSlot(commentAnchor, instruction.slotName, instruction.slotDestination, instruction.slotFallbackFactory);
        } else {
          slot = new ShadowSlot(commentAnchor, instruction.slotName, instruction.slotFallbackFactory);
        }

        aureliaPal.DOM.replaceNode(commentAnchor, element);
        shadowSlots[instruction.slotName] = slot;
        controllers.push(slot);
        return;
      }

      if (behaviorInstructions.length) {
        if (!instruction.anchorIsContainer) {
          element = makeElementIntoAnchor(element, instruction.elementInstruction);
        }

        containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, children, partReplacements, resources);

        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          current = behaviorInstructions[i];
          instance = current.type.create(elementContainer, current, element, bindings);
          controllers.push(instance);
        }
      }

      for (i = 0, ii = expressions.length; i < ii; ++i) {
        bindings.push(expressions[i].createBinding(element));
      }
    }

    function styleStringToObject(style, target) {
      var attributes = style.split(';');
      var firstIndexOfColon = void 0;
      var i = void 0;
      var current = void 0;
      var key = void 0;
      var value = void 0;

      target = target || {};

      for (i = 0; i < attributes.length; i++) {
        current = attributes[i];
        firstIndexOfColon = current.indexOf(':');
        key = current.substring(0, firstIndexOfColon).trim();
        value = current.substring(firstIndexOfColon + 1).trim();
        target[key] = value;
      }

      return target;
    }

    function styleObjectToString(obj) {
      var result = '';

      for (var key in obj) {
        result += key + ':' + obj[key] + ';';
      }

      return result;
    }

    function applySurrogateInstruction(container, element, instruction, controllers, bindings, children) {
      var behaviorInstructions = instruction.behaviorInstructions;
      var expressions = instruction.expressions;
      var providers = instruction.providers;
      var values = instruction.values;
      var i = void 0;
      var ii = void 0;
      var current = void 0;
      var instance = void 0;
      var currentAttributeValue = void 0;

      i = providers.length;
      while (i--) {
        container._resolvers.set(providers[i], providerResolverInstance);
      }

      for (var key in values) {
        currentAttributeValue = element.getAttribute(key);

        if (currentAttributeValue) {
          if (key === 'class') {
            element.setAttribute('class', currentAttributeValue + ' ' + values[key]);
          } else if (key === 'style') {
            var styleObject = styleStringToObject(values[key]);
            styleStringToObject(currentAttributeValue, styleObject);
            element.setAttribute('style', styleObjectToString(styleObject));
          }
        } else {
          element.setAttribute(key, values[key]);
        }
      }

      if (behaviorInstructions.length) {
        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          current = behaviorInstructions[i];
          instance = current.type.create(container, current, element, bindings);

          if (instance.contentView) {
            children.push(instance.contentView);
          }

          controllers.push(instance);
        }
      }

      for (i = 0, ii = expressions.length; i < ii; ++i) {
        bindings.push(expressions[i].createBinding(element));
      }
    }

    var BoundViewFactory = exports.BoundViewFactory = function () {
      function BoundViewFactory(parentContainer, viewFactory, partReplacements) {
        

        this.parentContainer = parentContainer;
        this.viewFactory = viewFactory;
        this.factoryCreateInstruction = { partReplacements: partReplacements };
      }

      BoundViewFactory.prototype.create = function create() {
        var view = this.viewFactory.create(this.parentContainer.createChild(), this.factoryCreateInstruction);
        view._isUserControlled = true;
        return view;
      };

      BoundViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
      };

      BoundViewFactory.prototype.getCachedView = function getCachedView() {
        return this.viewFactory.getCachedView();
      };

      BoundViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        this.viewFactory.returnViewToCache(view);
      };

      _createClass(BoundViewFactory, [{
        key: 'isCaching',
        get: function get() {
          return this.viewFactory.isCaching;
        }
      }]);

      return BoundViewFactory;
    }();

    var ViewFactory = exports.ViewFactory = function () {
      function ViewFactory(template, instructions, resources) {
        

        this.isCaching = false;

        this.template = template;
        this.instructions = instructions;
        this.resources = resources;
        this.cacheSize = -1;
        this.cache = null;
      }

      ViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        if (size) {
          if (size === '*') {
            size = Number.MAX_VALUE;
          } else if (typeof size === 'string') {
            size = parseInt(size, 10);
          }
        }

        if (this.cacheSize === -1 || !doNotOverrideIfAlreadySet) {
          this.cacheSize = size;
        }

        if (this.cacheSize > 0) {
          this.cache = [];
        } else {
          this.cache = null;
        }

        this.isCaching = this.cacheSize > 0;
      };

      ViewFactory.prototype.getCachedView = function getCachedView() {
        return this.cache !== null ? this.cache.pop() || null : null;
      };

      ViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        if (view.isAttached) {
          view.detached();
        }

        if (view.isBound) {
          view.unbind();
        }

        if (this.cache !== null && this.cache.length < this.cacheSize) {
          view.fromCache = true;
          this.cache.push(view);
        }
      };

      ViewFactory.prototype.create = function create(container, createInstruction, element) {
        createInstruction = createInstruction || BehaviorInstruction.normal;

        var cachedView = this.getCachedView();
        if (cachedView !== null) {
          return cachedView;
        }

        var fragment = createInstruction.enhance ? this.template : this.template.cloneNode(true);
        var instructables = fragment.querySelectorAll('.au-target');
        var instructions = this.instructions;
        var resources = this.resources;
        var controllers = [];
        var bindings = [];
        var children = [];
        var shadowSlots = Object.create(null);
        var containers = { root: container };
        var partReplacements = createInstruction.partReplacements;
        var i = void 0;
        var ii = void 0;
        var view = void 0;
        var instructable = void 0;
        var instruction = void 0;

        this.resources._invokeHook('beforeCreate', this, container, fragment, createInstruction);

        if (element && this.surrogateInstruction !== null) {
          applySurrogateInstruction(container, element, this.surrogateInstruction, controllers, bindings, children);
        }

        if (createInstruction.enhance && fragment.hasAttribute('au-target-id')) {
          instructable = fragment;
          instruction = instructions[instructable.getAttribute('au-target-id')];
          applyInstructions(containers, instructable, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources);
        }

        for (i = 0, ii = instructables.length; i < ii; ++i) {
          instructable = instructables[i];
          instruction = instructions[instructable.getAttribute('au-target-id')];
          applyInstructions(containers, instructable, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources);
        }

        view = new View(container, this, fragment, controllers, bindings, children, shadowSlots);

        if (!createInstruction.initiatedByBehavior) {
          view.created();
        }

        this.resources._invokeHook('afterCreate', view);

        return view;
      };

      return ViewFactory;
    }();

    var nextInjectorId = 0;
    function getNextInjectorId() {
      return ++nextInjectorId;
    }

    var lastAUTargetID = 0;
    function getNextAUTargetID() {
      return (++lastAUTargetID).toString();
    }

    function makeIntoInstructionTarget(element) {
      var value = element.getAttribute('class');
      var auTargetID = getNextAUTargetID();

      element.setAttribute('class', value ? value + ' au-target' : 'au-target');
      element.setAttribute('au-target-id', auTargetID);

      return auTargetID;
    }

    function makeShadowSlot(compiler, resources, node, instructions, parentInjectorId) {
      var auShadowSlot = aureliaPal.DOM.createElement('au-shadow-slot');
      aureliaPal.DOM.replaceNode(auShadowSlot, node);

      var auTargetID = makeIntoInstructionTarget(auShadowSlot);
      var instruction = TargetInstruction.shadowSlot(parentInjectorId);

      instruction.slotName = node.getAttribute('name') || ShadowDOM.defaultSlotKey;
      instruction.slotDestination = node.getAttribute('slot');

      if (node.innerHTML.trim()) {
        var fragment = aureliaPal.DOM.createDocumentFragment();
        var _child4 = void 0;

        while (_child4 = node.firstChild) {
          fragment.appendChild(_child4);
        }

        instruction.slotFallbackFactory = compiler.compile(fragment, resources);
      }

      instructions[auTargetID] = instruction;

      return auShadowSlot;
    }

    var ViewCompiler = exports.ViewCompiler = (_dec7 = (0, aureliaDependencyInjection.inject)(BindingLanguage, ViewResources), _dec7(_class13 = function () {
      function ViewCompiler(bindingLanguage, resources) {
        

        this.bindingLanguage = bindingLanguage;
        this.resources = resources;
      }

      ViewCompiler.prototype.compile = function compile(source, resources, compileInstruction) {
        resources = resources || this.resources;
        compileInstruction = compileInstruction || ViewCompileInstruction.normal;
        source = typeof source === 'string' ? aureliaPal.DOM.createTemplateFromMarkup(source) : source;

        var content = void 0;
        var part = void 0;
        var cacheSize = void 0;

        if (source.content) {
          part = source.getAttribute('part');
          cacheSize = source.getAttribute('view-cache');
          content = aureliaPal.DOM.adoptNode(source.content);
        } else {
          content = source;
        }

        compileInstruction.targetShadowDOM = compileInstruction.targetShadowDOM && aureliaPal.FEATURE.shadowDOM;
        resources._invokeHook('beforeCompile', content, resources, compileInstruction);

        var instructions = {};
        this._compileNode(content, resources, instructions, source, 'root', !compileInstruction.targetShadowDOM);

        var firstChild = content.firstChild;
        if (firstChild && firstChild.nodeType === 1) {
          var targetId = firstChild.getAttribute('au-target-id');
          if (targetId) {
            var ins = instructions[targetId];

            if (ins.shadowSlot || ins.lifting || ins.elementInstruction && !ins.elementInstruction.anchorIsContainer) {
              content.insertBefore(aureliaPal.DOM.createComment('view'), firstChild);
            }
          }
        }

        var factory = new ViewFactory(content, instructions, resources);

        factory.surrogateInstruction = compileInstruction.compileSurrogate ? this._compileSurrogate(source, resources) : null;
        factory.part = part;

        if (cacheSize) {
          factory.setCacheSize(cacheSize);
        }

        resources._invokeHook('afterCompile', factory);

        return factory;
      };

      ViewCompiler.prototype._compileNode = function _compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
        switch (node.nodeType) {
          case 1:
            return this._compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
          case 3:
            var expression = resources.getBindingLanguage(this.bindingLanguage).inspectTextContent(resources, node.wholeText);
            if (expression) {
              var marker = aureliaPal.DOM.createElement('au-marker');
              var auTargetID = makeIntoInstructionTarget(marker);
              (node.parentNode || parentNode).insertBefore(marker, node);
              node.textContent = ' ';
              instructions[auTargetID] = TargetInstruction.contentExpression(expression);

              while (node.nextSibling && node.nextSibling.nodeType === 3) {
                (node.parentNode || parentNode).removeChild(node.nextSibling);
              }
            } else {
              while (node.nextSibling && node.nextSibling.nodeType === 3) {
                node = node.nextSibling;
              }
            }
            return node.nextSibling;
          case 11:
            var currentChild = node.firstChild;
            while (currentChild) {
              currentChild = this._compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
            }
            break;
          default:
            break;
        }

        return node.nextSibling;
      };

      ViewCompiler.prototype._compileSurrogate = function _compileSurrogate(node, resources) {
        var tagName = node.tagName.toLowerCase();
        var attributes = node.attributes;
        var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
        var knownAttribute = void 0;
        var property = void 0;
        var instruction = void 0;
        var i = void 0;
        var ii = void 0;
        var attr = void 0;
        var attrName = void 0;
        var attrValue = void 0;
        var info = void 0;
        var type = void 0;
        var expressions = [];
        var expression = void 0;
        var behaviorInstructions = [];
        var values = {};
        var hasValues = false;
        var providers = [];

        for (i = 0, ii = attributes.length; i < ii; ++i) {
          attr = attributes[i];
          attrName = attr.name;
          attrValue = attr.value;

          info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);
          type = resources.getAttribute(info.attrName);

          if (type) {
            knownAttribute = resources.mapAttribute(info.attrName);
            if (knownAttribute) {
              property = type.attributes[knownAttribute];

              if (property) {
                info.defaultBindingMode = property.defaultBindingMode;

                if (!info.command && !info.expression) {
                  info.command = property.hasOptions ? 'options' : null;
                }

                if (info.command && info.command !== 'options' && type.primaryProperty) {
                  var primaryProperty = type.primaryProperty;
                  attrName = info.attrName = primaryProperty.attribute;

                  info.defaultBindingMode = primaryProperty.defaultBindingMode;
                }
              }
            }
          }

          instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);

          if (instruction) {
            if (instruction.alteredAttr) {
              type = resources.getAttribute(instruction.attrName);
            }

            if (instruction.discrete) {
              expressions.push(instruction);
            } else {
              if (type) {
                instruction.type = type;
                this._configureProperties(instruction, resources);

                if (type.liftsContent) {
                  throw new Error('You cannot place a template controller on a surrogate element.');
                } else {
                  behaviorInstructions.push(instruction);
                }
              } else {
                expressions.push(instruction.attributes[instruction.attrName]);
              }
            }
          } else {
            if (type) {
              instruction = BehaviorInstruction.attribute(attrName, type);
              instruction.attributes[resources.mapAttribute(attrName)] = attrValue;

              if (type.liftsContent) {
                throw new Error('You cannot place a template controller on a surrogate element.');
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (attrName !== 'id' && attrName !== 'part' && attrName !== 'replace-part') {
              hasValues = true;
              values[attrName] = attrValue;
            }
          }
        }

        if (expressions.length || behaviorInstructions.length || hasValues) {
          for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
            instruction = behaviorInstructions[i];
            instruction.type.compile(this, resources, node, instruction);
            providers.push(instruction.type.target);
          }

          for (i = 0, ii = expressions.length; i < ii; ++i) {
            expression = expressions[i];
            if (expression.attrToRemove !== undefined) {
              node.removeAttribute(expression.attrToRemove);
            }
          }

          return TargetInstruction.surrogate(providers, behaviorInstructions, expressions, values);
        }

        return null;
      };

      ViewCompiler.prototype._compileElement = function _compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
        var tagName = node.tagName.toLowerCase();
        var attributes = node.attributes;
        var expressions = [];
        var expression = void 0;
        var behaviorInstructions = [];
        var providers = [];
        var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
        var liftingInstruction = void 0;
        var viewFactory = void 0;
        var type = void 0;
        var elementInstruction = void 0;
        var elementProperty = void 0;
        var i = void 0;
        var ii = void 0;
        var attr = void 0;
        var attrName = void 0;
        var attrValue = void 0;
        var originalAttrName = void 0;
        var instruction = void 0;
        var info = void 0;
        var property = void 0;
        var knownAttribute = void 0;
        var auTargetID = void 0;
        var injectorId = void 0;

        if (tagName === 'slot') {
          if (targetLightDOM) {
            node = makeShadowSlot(this, resources, node, instructions, parentInjectorId);
          }
          return node.nextSibling;
        } else if (tagName === 'template') {
          if (!('content' in node)) {
            throw new Error('You cannot place a template element within ' + node.namespaceURI + ' namespace');
          }
          viewFactory = this.compile(node, resources);
          viewFactory.part = node.getAttribute('part');
        } else {
          type = resources.getElement(node.getAttribute('as-element') || tagName);
          if (type) {
            elementInstruction = BehaviorInstruction.element(node, type);
            type.processAttributes(this, resources, node, attributes, elementInstruction);
            behaviorInstructions.push(elementInstruction);
          }
        }

        for (i = 0, ii = attributes.length; i < ii; ++i) {
          attr = attributes[i];
          originalAttrName = attrName = attr.name;
          attrValue = attr.value;
          info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);

          if (targetLightDOM && info.attrName === 'slot') {
            info.attrName = attrName = 'au-slot';
          }

          type = resources.getAttribute(info.attrName);
          elementProperty = null;

          if (type) {
            knownAttribute = resources.mapAttribute(info.attrName);
            if (knownAttribute) {
              property = type.attributes[knownAttribute];

              if (property) {
                info.defaultBindingMode = property.defaultBindingMode;

                if (!info.command && !info.expression) {
                  info.command = property.hasOptions ? 'options' : null;
                }

                if (info.command && info.command !== 'options' && type.primaryProperty) {
                  var primaryProperty = type.primaryProperty;
                  attrName = info.attrName = primaryProperty.attribute;

                  info.defaultBindingMode = primaryProperty.defaultBindingMode;
                }
              }
            }
          } else if (elementInstruction) {
            elementProperty = elementInstruction.type.attributes[info.attrName];
            if (elementProperty) {
              info.defaultBindingMode = elementProperty.defaultBindingMode;
            }
          }

          if (elementProperty) {
            instruction = bindingLanguage.createAttributeInstruction(resources, node, info, elementInstruction);
          } else {
            instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);
          }

          if (instruction) {
            if (instruction.alteredAttr) {
              type = resources.getAttribute(instruction.attrName);
            }

            if (instruction.discrete) {
              expressions.push(instruction);
            } else {
              if (type) {
                instruction.type = type;
                this._configureProperties(instruction, resources);

                if (type.liftsContent) {
                  instruction.originalAttrName = originalAttrName;
                  liftingInstruction = instruction;
                  break;
                } else {
                  behaviorInstructions.push(instruction);
                }
              } else if (elementProperty) {
                elementInstruction.attributes[info.attrName].targetProperty = elementProperty.name;
              } else {
                expressions.push(instruction.attributes[instruction.attrName]);
              }
            }
          } else {
            if (type) {
              instruction = BehaviorInstruction.attribute(attrName, type);
              instruction.attributes[resources.mapAttribute(attrName)] = attrValue;

              if (type.liftsContent) {
                instruction.originalAttrName = originalAttrName;
                liftingInstruction = instruction;
                break;
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (elementProperty) {
              elementInstruction.attributes[attrName] = attrValue;
            }
          }
        }

        if (liftingInstruction) {
          liftingInstruction.viewFactory = viewFactory;
          node = liftingInstruction.type.compile(this, resources, node, liftingInstruction, parentNode);
          auTargetID = makeIntoInstructionTarget(node);
          instructions[auTargetID] = TargetInstruction.lifting(parentInjectorId, liftingInstruction);
        } else {
          var skipContentProcessing = false;

          if (expressions.length || behaviorInstructions.length) {
            injectorId = behaviorInstructions.length ? getNextInjectorId() : false;

            for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
              instruction = behaviorInstructions[i];
              instruction.type.compile(this, resources, node, instruction, parentNode);
              providers.push(instruction.type.target);
              skipContentProcessing = skipContentProcessing || instruction.skipContentProcessing;
            }

            for (i = 0, ii = expressions.length; i < ii; ++i) {
              expression = expressions[i];
              if (expression.attrToRemove !== undefined) {
                node.removeAttribute(expression.attrToRemove);
              }
            }

            auTargetID = makeIntoInstructionTarget(node);
            instructions[auTargetID] = TargetInstruction.normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction);
          }

          if (skipContentProcessing) {
            return node.nextSibling;
          }

          var currentChild = node.firstChild;
          while (currentChild) {
            currentChild = this._compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
          }
        }

        return node.nextSibling;
      };

      ViewCompiler.prototype._configureProperties = function _configureProperties(instruction, resources) {
        var type = instruction.type;
        var attrName = instruction.attrName;
        var attributes = instruction.attributes;
        var property = void 0;
        var key = void 0;
        var value = void 0;

        var knownAttribute = resources.mapAttribute(attrName);
        if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
          attributes[knownAttribute] = attributes[attrName];
          delete attributes[attrName];
        }

        for (key in attributes) {
          value = attributes[key];

          if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            property = type.attributes[key];

            if (property !== undefined) {
              value.targetProperty = property.name;
            } else {
              value.targetProperty = key;
            }
          }
        }
      };

      return ViewCompiler;
    }()) || _class13);

    var ResourceModule = exports.ResourceModule = function () {
      function ResourceModule(moduleId) {
        

        this.id = moduleId;
        this.moduleInstance = null;
        this.mainResource = null;
        this.resources = null;
        this.viewStrategy = null;
        this.isInitialized = false;
        this.onLoaded = null;
        this.loadContext = null;
      }

      ResourceModule.prototype.initialize = function initialize(container) {
        var current = this.mainResource;
        var resources = this.resources;
        var vs = this.viewStrategy;

        if (this.isInitialized) {
          return;
        }

        this.isInitialized = true;

        if (current !== undefined) {
          current.metadata.viewStrategy = vs;
          current.initialize(container);
        }

        for (var i = 0, ii = resources.length; i < ii; ++i) {
          current = resources[i];
          current.metadata.viewStrategy = vs;
          current.initialize(container);
        }
      };

      ResourceModule.prototype.register = function register(registry, name) {
        var main = this.mainResource;
        var resources = this.resources;

        if (main !== undefined) {
          main.register(registry, name);
          name = null;
        }

        for (var i = 0, ii = resources.length; i < ii; ++i) {
          resources[i].register(registry, name);
          name = null;
        }
      };

      ResourceModule.prototype.load = function load(container, loadContext) {
        if (this.onLoaded !== null) {
          return this.loadContext === loadContext ? Promise.resolve() : this.onLoaded;
        }

        var main = this.mainResource;
        var resources = this.resources;
        var loads = void 0;

        if (main !== undefined) {
          loads = new Array(resources.length + 1);
          loads[0] = main.load(container, loadContext);
          for (var i = 0, ii = resources.length; i < ii; ++i) {
            loads[i + 1] = resources[i].load(container, loadContext);
          }
        } else {
          loads = new Array(resources.length);
          for (var _i = 0, _ii = resources.length; _i < _ii; ++_i) {
            loads[_i] = resources[_i].load(container, loadContext);
          }
        }

        this.loadContext = loadContext;
        this.onLoaded = Promise.all(loads);
        return this.onLoaded;
      };

      return ResourceModule;
    }();

    var ResourceDescription = exports.ResourceDescription = function () {
      function ResourceDescription(key, exportedValue, resourceTypeMeta) {
        

        if (!resourceTypeMeta) {
          resourceTypeMeta = aureliaMetadata.metadata.get(aureliaMetadata.metadata.resource, exportedValue);

          if (!resourceTypeMeta) {
            resourceTypeMeta = new HtmlBehaviorResource();
            resourceTypeMeta.elementName = _hyphenate(key);
            aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, resourceTypeMeta, exportedValue);
          }
        }

        if (resourceTypeMeta instanceof HtmlBehaviorResource) {
          if (resourceTypeMeta.elementName === undefined) {
            resourceTypeMeta.elementName = _hyphenate(key);
          } else if (resourceTypeMeta.attributeName === undefined) {
            resourceTypeMeta.attributeName = _hyphenate(key);
          } else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            HtmlBehaviorResource.convention(key, resourceTypeMeta);
          }
        } else if (!resourceTypeMeta.name) {
          resourceTypeMeta.name = _hyphenate(key);
        }

        this.metadata = resourceTypeMeta;
        this.value = exportedValue;
      }

      ResourceDescription.prototype.initialize = function initialize(container) {
        this.metadata.initialize(container, this.value);
      };

      ResourceDescription.prototype.register = function register(registry, name) {
        this.metadata.register(registry, name);
      };

      ResourceDescription.prototype.load = function load(container, loadContext) {
        return this.metadata.load(container, this.value, loadContext);
      };

      return ResourceDescription;
    }();

    var ModuleAnalyzer = exports.ModuleAnalyzer = function () {
      function ModuleAnalyzer() {
        

        this.cache = Object.create(null);
      }

      ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
        return this.cache[moduleId];
      };

      ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, mainResourceKey) {
        var mainResource = void 0;
        var fallbackValue = void 0;
        var fallbackKey = void 0;
        var resourceTypeMeta = void 0;
        var key = void 0;
        var exportedValue = void 0;
        var resources = [];
        var conventional = void 0;
        var vs = void 0;
        var resourceModule = void 0;

        resourceModule = this.cache[moduleId];
        if (resourceModule) {
          return resourceModule;
        }

        resourceModule = new ResourceModule(moduleId);
        this.cache[moduleId] = resourceModule;

        if (typeof moduleInstance === 'function') {
          moduleInstance = { 'default': moduleInstance };
        }

        if (mainResourceKey) {
          mainResource = new ResourceDescription(mainResourceKey, moduleInstance[mainResourceKey]);
        }

        for (key in moduleInstance) {
          exportedValue = moduleInstance[key];

          if (key === mainResourceKey || typeof exportedValue !== 'function') {
            continue;
          }

          resourceTypeMeta = aureliaMetadata.metadata.get(aureliaMetadata.metadata.resource, exportedValue);

          if (resourceTypeMeta) {
            if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
              HtmlBehaviorResource.convention(key, resourceTypeMeta);
            }

            if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
              resourceTypeMeta.elementName = _hyphenate(key);
            }

            if (!mainResource && resourceTypeMeta instanceof HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
              mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
            } else {
              resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
            }
          } else if (viewStrategy.decorates(exportedValue)) {
            vs = exportedValue;
          } else if (exportedValue instanceof aureliaLoader.TemplateRegistryEntry) {
            vs = new TemplateRegistryViewStrategy(moduleId, exportedValue);
          } else {
            if (conventional = HtmlBehaviorResource.convention(key)) {
              if (conventional.elementName !== null && !mainResource) {
                mainResource = new ResourceDescription(key, exportedValue, conventional);
              } else {
                resources.push(new ResourceDescription(key, exportedValue, conventional));
              }

              aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, conventional, exportedValue);
            } else if (conventional = aureliaBinding.ValueConverterResource.convention(key) || aureliaBinding.BindingBehaviorResource.convention(key) || ViewEngineHooksResource.convention(key)) {
              resources.push(new ResourceDescription(key, exportedValue, conventional));
              aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, conventional, exportedValue);
            } else if (!fallbackValue) {
              fallbackValue = exportedValue;
              fallbackKey = key;
            }
          }
        }

        if (!mainResource && fallbackValue) {
          mainResource = new ResourceDescription(fallbackKey, fallbackValue);
        }

        resourceModule.moduleInstance = moduleInstance;
        resourceModule.mainResource = mainResource;
        resourceModule.resources = resources;
        resourceModule.viewStrategy = vs;

        return resourceModule;
      };

      return ModuleAnalyzer;
    }();

    var logger = LogManager.getLogger('templating');

    function ensureRegistryEntry(loader, urlOrRegistryEntry) {
      if (urlOrRegistryEntry instanceof aureliaLoader.TemplateRegistryEntry) {
        return Promise.resolve(urlOrRegistryEntry);
      }

      return loader.loadTemplate(urlOrRegistryEntry);
    }

    var ProxyViewFactory = function () {
      function ProxyViewFactory(promise) {
        var _this7 = this;

        

        promise.then(function (x) {
          return _this7.viewFactory = x;
        });
      }

      ProxyViewFactory.prototype.create = function create(container, bindingContext, createInstruction, element) {
        return this.viewFactory.create(container, bindingContext, createInstruction, element);
      };

      ProxyViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
      };

      ProxyViewFactory.prototype.getCachedView = function getCachedView() {
        return this.viewFactory.getCachedView();
      };

      ProxyViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        this.viewFactory.returnViewToCache(view);
      };

      _createClass(ProxyViewFactory, [{
        key: 'isCaching',
        get: function get() {
          return this.viewFactory.isCaching;
        }
      }]);

      return ProxyViewFactory;
    }();

    var auSlotBehavior = null;

    var ViewEngine = exports.ViewEngine = (_dec8 = (0, aureliaDependencyInjection.inject)(aureliaLoader.Loader, aureliaDependencyInjection.Container, ViewCompiler, ModuleAnalyzer, ViewResources), _dec8(_class14 = (_temp4 = _class15 = function () {
      function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
        

        this.loader = loader;
        this.container = container;
        this.viewCompiler = viewCompiler;
        this.moduleAnalyzer = moduleAnalyzer;
        this.appResources = appResources;
        this._pluginMap = {};

        if (auSlotBehavior === null) {
          auSlotBehavior = new HtmlBehaviorResource();
          auSlotBehavior.attributeName = 'au-slot';
          aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, auSlotBehavior, SlotCustomAttribute);
        }

        auSlotBehavior.initialize(container, SlotCustomAttribute);
        auSlotBehavior.register(appResources);
      }

      ViewEngine.prototype.addResourcePlugin = function addResourcePlugin(extension, implementation) {
        var name = extension.replace('.', '') + '-resource-plugin';
        this._pluginMap[extension] = name;
        this.loader.addPlugin(name, implementation);
      };

      ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileInstruction, loadContext, target) {
        var _this8 = this;

        loadContext = loadContext || new ResourceLoadContext();

        return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function (registryEntry) {
          var url = registryEntry.address;

          if (registryEntry.onReady) {
            if (!loadContext.hasDependency(url)) {
              loadContext.addDependency(url);
              return registryEntry.onReady;
            }

            if (registryEntry.template === null) {
              return registryEntry.onReady;
            }

            return Promise.resolve(new ProxyViewFactory(registryEntry.onReady));
          }

          loadContext.addDependency(url);

          registryEntry.onReady = _this8.loadTemplateResources(registryEntry, compileInstruction, loadContext, target).then(function (resources) {
            registryEntry.resources = resources;

            if (registryEntry.template === null) {
              return registryEntry.factory = null;
            }

            var viewFactory = _this8.viewCompiler.compile(registryEntry.template, resources, compileInstruction);
            return registryEntry.factory = viewFactory;
          });

          return registryEntry.onReady;
        });
      };

      ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(registryEntry, compileInstruction, loadContext, target) {
        var resources = new ViewResources(this.appResources, registryEntry.address);
        var dependencies = registryEntry.dependencies;
        var importIds = void 0;
        var names = void 0;

        compileInstruction = compileInstruction || ViewCompileInstruction.normal;

        if (dependencies.length === 0 && !compileInstruction.associatedModuleId) {
          return Promise.resolve(resources);
        }

        importIds = dependencies.map(function (x) {
          return x.src;
        });
        names = dependencies.map(function (x) {
          return x.name;
        });
        logger.debug('importing resources for ' + registryEntry.address, importIds);

        if (target) {
          var viewModelRequires = aureliaMetadata.metadata.get(ViewEngine.viewModelRequireMetadataKey, target);
          if (viewModelRequires) {
            var templateImportCount = importIds.length;
            for (var i = 0, ii = viewModelRequires.length; i < ii; ++i) {
              var req = viewModelRequires[i];
              var importId = typeof req === 'function' ? aureliaMetadata.Origin.get(req).moduleId : (0, aureliaPath.relativeToFile)(req.src || req, registryEntry.address);

              if (importIds.indexOf(importId) === -1) {
                importIds.push(importId);
                names.push(req.as);
              }
            }
            logger.debug('importing ViewModel resources for ' + compileInstruction.associatedModuleId, importIds.slice(templateImportCount));
          }
        }

        return this.importViewResources(importIds, names, resources, compileInstruction, loadContext);
      };

      ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
        var _this9 = this;

        return this.loader.loadModule(moduleImport).then(function (viewModelModule) {
          var normalizedId = aureliaMetadata.Origin.get(viewModelModule).moduleId;
          var resourceModule = _this9.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);

          if (!resourceModule.mainResource) {
            throw new Error('No view model found in module "' + moduleImport + '".');
          }

          resourceModule.initialize(_this9.container);

          return resourceModule.mainResource;
        });
      };

      ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, compileInstruction, loadContext) {
        var _this10 = this;

        loadContext = loadContext || new ResourceLoadContext();
        compileInstruction = compileInstruction || ViewCompileInstruction.normal;

        moduleIds = moduleIds.map(function (x) {
          return _this10._applyLoaderPlugin(x);
        });

        return this.loader.loadAllModules(moduleIds).then(function (imports) {
          var i = void 0;
          var ii = void 0;
          var analysis = void 0;
          var normalizedId = void 0;
          var current = void 0;
          var associatedModule = void 0;
          var container = _this10.container;
          var moduleAnalyzer = _this10.moduleAnalyzer;
          var allAnalysis = new Array(imports.length);

          for (i = 0, ii = imports.length; i < ii; ++i) {
            current = imports[i];
            normalizedId = aureliaMetadata.Origin.get(current).moduleId;

            analysis = moduleAnalyzer.analyze(normalizedId, current);
            analysis.initialize(container);
            analysis.register(resources, names[i]);

            allAnalysis[i] = analysis;
          }

          if (compileInstruction.associatedModuleId) {
            associatedModule = moduleAnalyzer.getAnalysis(compileInstruction.associatedModuleId);

            if (associatedModule) {
              associatedModule.register(resources);
            }
          }

          for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
            allAnalysis[i] = allAnalysis[i].load(container, loadContext);
          }

          return Promise.all(allAnalysis).then(function () {
            return resources;
          });
        });
      };

      ViewEngine.prototype._applyLoaderPlugin = function _applyLoaderPlugin(id) {
        var index = id.lastIndexOf('.');
        if (index !== -1) {
          var ext = id.substring(index);
          var pluginName = this._pluginMap[ext];

          if (pluginName === undefined) {
            return id;
          }

          return this.loader.applyPluginToUrl(id, pluginName);
        }

        return id;
      };

      return ViewEngine;
    }(), _class15.viewModelRequireMetadataKey = 'aurelia:view-model-require', _temp4)) || _class14);

    var Controller = exports.Controller = function () {
      function Controller(behavior, instruction, viewModel, container) {
        

        this.behavior = behavior;
        this.instruction = instruction;
        this.viewModel = viewModel;
        this.isAttached = false;
        this.view = null;
        this.isBound = false;
        this.scope = null;
        this.container = container;
        this.elementEvents = container.elementEvents || null;

        var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(viewModel);
        var handlesBind = behavior.handlesBind;
        var attributes = instruction.attributes;
        var boundProperties = this.boundProperties = [];
        var properties = behavior.properties;
        var i = void 0;
        var ii = void 0;

        behavior._ensurePropertiesDefined(viewModel, observerLookup);

        for (i = 0, ii = properties.length; i < ii; ++i) {
          properties[i]._initialize(viewModel, observerLookup, attributes, handlesBind, boundProperties);
        }
      }

      Controller.prototype.created = function created(owningView) {
        if (this.behavior.handlesCreated) {
          this.viewModel.created(owningView, this.view);
        }
      };

      Controller.prototype.automate = function automate(overrideContext, owningView) {
        this.view.bindingContext = this.viewModel;
        this.view.overrideContext = overrideContext || (0, aureliaBinding.createOverrideContext)(this.viewModel);
        this.view._isUserControlled = true;

        if (this.behavior.handlesCreated) {
          this.viewModel.created(owningView || null, this.view);
        }

        this.bind(this.view);
      };

      Controller.prototype.bind = function bind(scope) {
        var skipSelfSubscriber = this.behavior.handlesBind;
        var boundProperties = this.boundProperties;
        var i = void 0;
        var ii = void 0;
        var x = void 0;
        var observer = void 0;
        var selfSubscriber = void 0;

        if (this.isBound) {
          if (this.scope === scope) {
            return;
          }

          this.unbind();
        }

        this.isBound = true;
        this.scope = scope;

        for (i = 0, ii = boundProperties.length; i < ii; ++i) {
          x = boundProperties[i];
          observer = x.observer;
          selfSubscriber = observer.selfSubscriber;
          observer.publishing = false;

          if (skipSelfSubscriber) {
            observer.selfSubscriber = null;
          }

          x.binding.bind(scope);
          observer.call();

          observer.publishing = true;
          observer.selfSubscriber = selfSubscriber;
        }

        var overrideContext = void 0;
        if (this.view !== null) {
          if (skipSelfSubscriber) {
            this.view.viewModelScope = scope;
          }

          if (this.viewModel === scope.overrideContext.bindingContext) {
            overrideContext = scope.overrideContext;
          } else if (this.instruction.inheritBindingContext) {
            overrideContext = (0, aureliaBinding.createOverrideContext)(this.viewModel, scope.overrideContext);
          } else {
            overrideContext = (0, aureliaBinding.createOverrideContext)(this.viewModel);
            overrideContext.__parentOverrideContext = scope.overrideContext;
          }

          this.view.bind(this.viewModel, overrideContext);
        } else if (skipSelfSubscriber) {
          overrideContext = scope.overrideContext;

          if (scope.overrideContext.__parentOverrideContext !== undefined && this.viewModel.viewFactory && this.viewModel.viewFactory.factoryCreateInstruction.partReplacements) {
            overrideContext = Object.assign({}, scope.overrideContext);
            overrideContext.parentOverrideContext = scope.overrideContext.__parentOverrideContext;
          }
          this.viewModel.bind(scope.bindingContext, overrideContext);
        }
      };

      Controller.prototype.unbind = function unbind() {
        if (this.isBound) {
          var _boundProperties = this.boundProperties;
          var _i2 = void 0;
          var _ii2 = void 0;

          this.isBound = false;
          this.scope = null;

          if (this.view !== null) {
            this.view.unbind();
          }

          if (this.behavior.handlesUnbind) {
            this.viewModel.unbind();
          }

          if (this.elementEvents !== null) {
            this.elementEvents.disposeAll();
          }

          for (_i2 = 0, _ii2 = _boundProperties.length; _i2 < _ii2; ++_i2) {
            _boundProperties[_i2].binding.unbind();
          }
        }
      };

      Controller.prototype.attached = function attached() {
        if (this.isAttached) {
          return;
        }

        this.isAttached = true;

        if (this.behavior.handlesAttached) {
          this.viewModel.attached();
        }

        if (this.view !== null) {
          this.view.attached();
        }
      };

      Controller.prototype.detached = function detached() {
        if (this.isAttached) {
          this.isAttached = false;

          if (this.view !== null) {
            this.view.detached();
          }

          if (this.behavior.handlesDetached) {
            this.viewModel.detached();
          }
        }
      };

      return Controller;
    }();

    var BehaviorPropertyObserver = exports.BehaviorPropertyObserver = (_dec9 = (0, aureliaBinding.subscriberCollection)(), _dec9(_class16 = function () {
      function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
        

        this.taskQueue = taskQueue;
        this.obj = obj;
        this.propertyName = propertyName;
        this.notqueued = true;
        this.publishing = false;
        this.selfSubscriber = selfSubscriber;
        this.currentValue = this.oldValue = initialValue;
      }

      BehaviorPropertyObserver.prototype.getValue = function getValue() {
        return this.currentValue;
      };

      BehaviorPropertyObserver.prototype.setValue = function setValue(newValue) {
        var oldValue = this.currentValue;

        if (oldValue !== newValue) {
          this.oldValue = oldValue;
          this.currentValue = newValue;

          if (this.publishing && this.notqueued) {
            if (this.taskQueue.flushing) {
              this.call();
            } else {
              this.notqueued = false;
              this.taskQueue.queueMicroTask(this);
            }
          }
        }
      };

      BehaviorPropertyObserver.prototype.call = function call() {
        var oldValue = this.oldValue;
        var newValue = this.currentValue;

        this.notqueued = true;

        if (newValue === oldValue) {
          return;
        }

        if (this.selfSubscriber) {
          this.selfSubscriber(newValue, oldValue);
        }

        this.callSubscribers(newValue, oldValue);
        this.oldValue = newValue;
      };

      BehaviorPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };

      BehaviorPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };

      return BehaviorPropertyObserver;
    }()) || _class16);


    function getObserver(instance, name) {
      var lookup = instance.__observers__;

      if (lookup === undefined) {
        var ctor = Object.getPrototypeOf(instance).constructor;
        var _behavior = aureliaMetadata.metadata.get(aureliaMetadata.metadata.resource, ctor);
        if (!_behavior.isInitialized) {
          _behavior.initialize(aureliaDependencyInjection.Container.instance || new aureliaDependencyInjection.Container(), instance.constructor);
        }

        lookup = _behavior.observerLocator.getOrCreateObserversLookup(instance);
        _behavior._ensurePropertiesDefined(instance, lookup);
      }

      return lookup[name];
    }

    var BindableProperty = exports.BindableProperty = function () {
      function BindableProperty(nameOrConfig) {
        

        if (typeof nameOrConfig === 'string') {
          this.name = nameOrConfig;
        } else {
          Object.assign(this, nameOrConfig);
        }

        this.attribute = this.attribute || _hyphenate(this.name);
        if (this.defaultBindingMode === null || this.defaultBindingMode === undefined) {
          this.defaultBindingMode = aureliaBinding.bindingMode.oneWay;
        }
        this.changeHandler = this.changeHandler || null;
        this.owner = null;
        this.descriptor = null;
      }

      BindableProperty.prototype.registerWith = function registerWith(target, behavior, descriptor) {
        behavior.properties.push(this);
        behavior.attributes[this.attribute] = this;
        this.owner = behavior;

        if (descriptor) {
          this.descriptor = descriptor;
          return this._configureDescriptor(descriptor);
        }

        return undefined;
      };

      BindableProperty.prototype._configureDescriptor = function _configureDescriptor(descriptor) {
        var name = this.name;

        descriptor.configurable = true;
        descriptor.enumerable = true;

        if ('initializer' in descriptor) {
          this.defaultValue = descriptor.initializer;
          delete descriptor.initializer;
          delete descriptor.writable;
        }

        if ('value' in descriptor) {
          this.defaultValue = descriptor.value;
          delete descriptor.value;
          delete descriptor.writable;
        }

        descriptor.get = function () {
          return getObserver(this, name).getValue();
        };

        descriptor.set = function (value) {
          getObserver(this, name).setValue(value);
        };

        descriptor.get.getObserver = function (obj) {
          return getObserver(obj, name);
        };

        return descriptor;
      };

      BindableProperty.prototype.defineOn = function defineOn(target, behavior) {
        var name = this.name;
        var handlerName = void 0;

        if (this.changeHandler === null) {
          handlerName = name + 'Changed';
          if (handlerName in target.prototype) {
            this.changeHandler = handlerName;
          }
        }

        if (this.descriptor === null) {
          Object.defineProperty(target.prototype, name, this._configureDescriptor(behavior, {}));
        }
      };

      BindableProperty.prototype.createObserver = function createObserver(viewModel) {
        var selfSubscriber = null;
        var defaultValue = this.defaultValue;
        var changeHandlerName = this.changeHandler;
        var name = this.name;
        var initialValue = void 0;

        if (this.hasOptions) {
          return undefined;
        }

        if (changeHandlerName in viewModel) {
          if ('propertyChanged' in viewModel) {
            selfSubscriber = function selfSubscriber(newValue, oldValue) {
              viewModel[changeHandlerName](newValue, oldValue);
              viewModel.propertyChanged(name, newValue, oldValue);
            };
          } else {
            selfSubscriber = function selfSubscriber(newValue, oldValue) {
              return viewModel[changeHandlerName](newValue, oldValue);
            };
          }
        } else if ('propertyChanged' in viewModel) {
          selfSubscriber = function selfSubscriber(newValue, oldValue) {
            return viewModel.propertyChanged(name, newValue, oldValue);
          };
        } else if (changeHandlerName !== null) {
          throw new Error('Change handler ' + changeHandlerName + ' was specified but not declared on the class.');
        }

        if (defaultValue !== undefined) {
          initialValue = typeof defaultValue === 'function' ? defaultValue.call(viewModel) : defaultValue;
        }

        return new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, this.name, selfSubscriber, initialValue);
      };

      BindableProperty.prototype._initialize = function _initialize(viewModel, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
        var selfSubscriber = void 0;
        var observer = void 0;
        var attribute = void 0;
        var defaultValue = this.defaultValue;

        if (this.isDynamic) {
          for (var key in attributes) {
            this._createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
          }
        } else if (!this.hasOptions) {
          observer = observerLookup[this.name];

          if (attributes !== null) {
            selfSubscriber = observer.selfSubscriber;
            attribute = attributes[this.attribute];

            if (behaviorHandlesBind) {
              observer.selfSubscriber = null;
            }

            if (typeof attribute === 'string') {
              viewModel[this.name] = attribute;
              observer.call();
            } else if (attribute) {
              boundProperties.push({ observer: observer, binding: attribute.createBinding(viewModel) });
            } else if (defaultValue !== undefined) {
              observer.call();
            }

            observer.selfSubscriber = selfSubscriber;
          }

          observer.publishing = true;
        }
      };

      BindableProperty.prototype._createDynamicProperty = function _createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
        var changeHandlerName = name + 'Changed';
        var selfSubscriber = null;
        var observer = void 0;
        var info = void 0;

        if (changeHandlerName in viewModel) {
          if ('propertyChanged' in viewModel) {
            selfSubscriber = function selfSubscriber(newValue, oldValue) {
              viewModel[changeHandlerName](newValue, oldValue);
              viewModel.propertyChanged(name, newValue, oldValue);
            };
          } else {
            selfSubscriber = function selfSubscriber(newValue, oldValue) {
              return viewModel[changeHandlerName](newValue, oldValue);
            };
          }
        } else if ('propertyChanged' in viewModel) {
          selfSubscriber = function selfSubscriber(newValue, oldValue) {
            return viewModel.propertyChanged(name, newValue, oldValue);
          };
        }

        observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, name, selfSubscriber);

        Object.defineProperty(viewModel, name, {
          configurable: true,
          enumerable: true,
          get: observer.getValue.bind(observer),
          set: observer.setValue.bind(observer)
        });

        if (behaviorHandlesBind) {
          observer.selfSubscriber = null;
        }

        if (typeof attribute === 'string') {
          viewModel[name] = attribute;
          observer.call();
        } else if (attribute) {
          info = { observer: observer, binding: attribute.createBinding(viewModel) };
          boundProperties.push(info);
        }

        observer.publishing = true;
        observer.selfSubscriber = selfSubscriber;
      };

      return BindableProperty;
    }();

    var lastProviderId = 0;

    function nextProviderId() {
      return ++lastProviderId;
    }

    function doProcessContent() {
      return true;
    }
    function doProcessAttributes() {}

    var HtmlBehaviorResource = exports.HtmlBehaviorResource = function () {
      function HtmlBehaviorResource() {
        

        this.elementName = null;
        this.attributeName = null;
        this.attributeDefaultBindingMode = undefined;
        this.liftsContent = false;
        this.targetShadowDOM = false;
        this.shadowDOMOptions = null;
        this.processAttributes = doProcessAttributes;
        this.processContent = doProcessContent;
        this.usesShadowDOM = false;
        this.childBindings = null;
        this.hasDynamicOptions = false;
        this.containerless = false;
        this.properties = [];
        this.attributes = {};
        this.isInitialized = false;
        this.primaryProperty = null;
      }

      HtmlBehaviorResource.convention = function convention(name, existing) {
        var behavior = void 0;

        if (name.endsWith('CustomAttribute')) {
          behavior = existing || new HtmlBehaviorResource();
          behavior.attributeName = _hyphenate(name.substring(0, name.length - 15));
        }

        if (name.endsWith('CustomElement')) {
          behavior = existing || new HtmlBehaviorResource();
          behavior.elementName = _hyphenate(name.substring(0, name.length - 13));
        }

        return behavior;
      };

      HtmlBehaviorResource.prototype.addChildBinding = function addChildBinding(behavior) {
        if (this.childBindings === null) {
          this.childBindings = [];
        }

        this.childBindings.push(behavior);
      };

      HtmlBehaviorResource.prototype.initialize = function initialize(container, target) {
        var proto = target.prototype;
        var properties = this.properties;
        var attributeName = this.attributeName;
        var attributeDefaultBindingMode = this.attributeDefaultBindingMode;
        var i = void 0;
        var ii = void 0;
        var current = void 0;

        if (this.isInitialized) {
          return;
        }

        this.isInitialized = true;
        target.__providerId__ = nextProviderId();

        this.observerLocator = container.get(aureliaBinding.ObserverLocator);
        this.taskQueue = container.get(aureliaTaskQueue.TaskQueue);

        this.target = target;
        this.usesShadowDOM = this.targetShadowDOM && aureliaPal.FEATURE.shadowDOM;
        this.handlesCreated = 'created' in proto;
        this.handlesBind = 'bind' in proto;
        this.handlesUnbind = 'unbind' in proto;
        this.handlesAttached = 'attached' in proto;
        this.handlesDetached = 'detached' in proto;
        this.htmlName = this.elementName || this.attributeName;

        if (attributeName !== null) {
          if (properties.length === 0) {
            new BindableProperty({
              name: 'value',
              changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
              attribute: attributeName,
              defaultBindingMode: attributeDefaultBindingMode
            }).registerWith(target, this);
          }

          current = properties[0];

          if (properties.length === 1 && current.name === 'value') {
            current.isDynamic = current.hasOptions = this.hasDynamicOptions;
            current.defineOn(target, this);
          } else {
            for (i = 0, ii = properties.length; i < ii; ++i) {
              properties[i].defineOn(target, this);
              if (properties[i].primaryProperty) {
                if (this.primaryProperty) {
                  throw new Error('Only one bindable property on a custom element can be defined as the default');
                }
                this.primaryProperty = properties[i];
              }
            }

            current = new BindableProperty({
              name: 'value',
              changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
              attribute: attributeName,
              defaultBindingMode: attributeDefaultBindingMode
            });

            current.hasOptions = true;
            current.registerWith(target, this);
          }
        } else {
          for (i = 0, ii = properties.length; i < ii; ++i) {
            properties[i].defineOn(target, this);
          }

          this._copyInheritedProperties(container, target);
        }
      };

      HtmlBehaviorResource.prototype.register = function register(registry, name) {
        var _this11 = this;

        if (this.attributeName !== null) {
          registry.registerAttribute(name || this.attributeName, this, this.attributeName);

          if (Array.isArray(this.aliases)) {
            this.aliases.forEach(function (alias) {
              registry.registerAttribute(alias, _this11, _this11.attributeName);
            });
          }
        }

        if (this.elementName !== null) {
          registry.registerElement(name || this.elementName, this);
        }
      };

      HtmlBehaviorResource.prototype.load = function load(container, target, loadContext, viewStrategy, transientView) {
        var _this12 = this;

        var options = void 0;

        if (this.elementName !== null) {
          viewStrategy = container.get(ViewLocator).getViewStrategy(viewStrategy || this.viewStrategy || target);
          options = new ViewCompileInstruction(this.targetShadowDOM, true);

          if (!viewStrategy.moduleId) {
            viewStrategy.moduleId = aureliaMetadata.Origin.get(target).moduleId;
          }

          return viewStrategy.loadViewFactory(container.get(ViewEngine), options, loadContext, target).then(function (viewFactory) {
            if (!transientView || !_this12.viewFactory) {
              _this12.viewFactory = viewFactory;
            }

            return viewFactory;
          });
        }

        return Promise.resolve(this);
      };

      HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
        if (this.liftsContent) {
          if (!instruction.viewFactory) {
            var template = aureliaPal.DOM.createElement('template');
            var fragment = aureliaPal.DOM.createDocumentFragment();
            var cacheSize = node.getAttribute('view-cache');
            var part = node.getAttribute('part');

            node.removeAttribute(instruction.originalAttrName);
            aureliaPal.DOM.replaceNode(template, node, parentNode);
            fragment.appendChild(node);
            instruction.viewFactory = compiler.compile(fragment, resources);

            if (part) {
              instruction.viewFactory.part = part;
              node.removeAttribute('part');
            }

            if (cacheSize) {
              instruction.viewFactory.setCacheSize(cacheSize);
              node.removeAttribute('view-cache');
            }

            node = template;
          }
        } else if (this.elementName !== null) {
          var _partReplacements2 = {};

          if (this.processContent(compiler, resources, node, instruction) && node.hasChildNodes()) {
            var currentChild = node.firstChild;
            var contentElement = this.usesShadowDOM ? null : aureliaPal.DOM.createElement('au-content');
            var nextSibling = void 0;
            var toReplace = void 0;

            while (currentChild) {
              nextSibling = currentChild.nextSibling;

              if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                _partReplacements2[toReplace] = compiler.compile(currentChild, resources);
                aureliaPal.DOM.removeNode(currentChild, parentNode);
                instruction.partReplacements = _partReplacements2;
              } else if (contentElement !== null) {
                if (currentChild.nodeType === 3 && _isAllWhitespace(currentChild)) {
                  aureliaPal.DOM.removeNode(currentChild, parentNode);
                } else {
                  contentElement.appendChild(currentChild);
                }
              }

              currentChild = nextSibling;
            }

            if (contentElement !== null && contentElement.hasChildNodes()) {
              node.appendChild(contentElement);
            }

            instruction.skipContentProcessing = false;
          } else {
            instruction.skipContentProcessing = true;
          }
        } else if (!this.processContent(compiler, resources, node, instruction)) {
          instruction.skipContentProcessing = true;
        }

        return node;
      };

      HtmlBehaviorResource.prototype.create = function create(container, instruction, element, bindings) {
        var viewHost = void 0;
        var au = null;

        instruction = instruction || BehaviorInstruction.normal;
        element = element || null;
        bindings = bindings || null;

        if (this.elementName !== null && element) {
          if (this.usesShadowDOM) {
            viewHost = element.attachShadow(this.shadowDOMOptions);
            container.registerInstance(aureliaPal.DOM.boundary, viewHost);
          } else {
            viewHost = element;
            if (this.targetShadowDOM) {
              container.registerInstance(aureliaPal.DOM.boundary, viewHost);
            }
          }
        }

        if (element !== null) {
          element.au = au = element.au || {};
        }

        var viewModel = instruction.viewModel || container.get(this.target);
        var controller = new Controller(this, instruction, viewModel, container);
        var childBindings = this.childBindings;
        var viewFactory = void 0;

        if (this.liftsContent) {
          au.controller = controller;
        } else if (this.elementName !== null) {
          viewFactory = instruction.viewFactory || this.viewFactory;
          container.viewModel = viewModel;

          if (viewFactory) {
            controller.view = viewFactory.create(container, instruction, element);
          }

          if (element !== null) {
            au.controller = controller;

            if (controller.view) {
              if (!this.usesShadowDOM && (element.childNodes.length === 1 || element.contentElement)) {
                var contentElement = element.childNodes[0] || element.contentElement;
                controller.view.contentView = { fragment: contentElement };
                contentElement.parentNode && aureliaPal.DOM.removeNode(contentElement);
              }

              if (instruction.anchorIsContainer) {
                if (childBindings !== null) {
                  for (var _i3 = 0, _ii3 = childBindings.length; _i3 < _ii3; ++_i3) {
                    controller.view.addBinding(childBindings[_i3].create(element, viewModel, controller));
                  }
                }

                controller.view.appendNodesTo(viewHost);
              } else {
                controller.view.insertNodesBefore(viewHost);
              }
            } else if (childBindings !== null) {
              for (var _i4 = 0, _ii4 = childBindings.length; _i4 < _ii4; ++_i4) {
                bindings.push(childBindings[_i4].create(element, viewModel, controller));
              }
            }
          } else if (controller.view) {
            controller.view.controller = controller;

            if (childBindings !== null) {
              for (var _i5 = 0, _ii5 = childBindings.length; _i5 < _ii5; ++_i5) {
                controller.view.addBinding(childBindings[_i5].create(instruction.host, viewModel, controller));
              }
            }
          } else if (childBindings !== null) {
            for (var _i6 = 0, _ii6 = childBindings.length; _i6 < _ii6; ++_i6) {
              bindings.push(childBindings[_i6].create(instruction.host, viewModel, controller));
            }
          }
        } else if (childBindings !== null) {
          for (var _i7 = 0, _ii7 = childBindings.length; _i7 < _ii7; ++_i7) {
            bindings.push(childBindings[_i7].create(element, viewModel, controller));
          }
        }

        if (au !== null) {
          au[this.htmlName] = controller;
        }

        if (instruction.initiatedByBehavior && viewFactory) {
          controller.view.created();
        }

        return controller;
      };

      HtmlBehaviorResource.prototype._ensurePropertiesDefined = function _ensurePropertiesDefined(instance, lookup) {
        var properties = void 0;
        var i = void 0;
        var ii = void 0;
        var observer = void 0;

        if ('__propertiesDefined__' in lookup) {
          return;
        }

        lookup.__propertiesDefined__ = true;
        properties = this.properties;

        for (i = 0, ii = properties.length; i < ii; ++i) {
          observer = properties[i].createObserver(instance);

          if (observer !== undefined) {
            lookup[observer.propertyName] = observer;
          }
        }
      };

      HtmlBehaviorResource.prototype._copyInheritedProperties = function _copyInheritedProperties(container, target) {
        var _this13 = this;

        var behavior = void 0;
        var derived = target;

        while (true) {
          var proto = Object.getPrototypeOf(target.prototype);
          target = proto && proto.constructor;
          if (!target) {
            return;
          }
          behavior = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.resource, target);
          if (behavior) {
            break;
          }
        }
        behavior.initialize(container, target);

        var _loop = function _loop(_i8, _ii8) {
          var prop = behavior.properties[_i8];

          if (_this13.properties.some(function (p) {
            return p.name === prop.name;
          })) {
            return 'continue';
          }

          new BindableProperty(prop).registerWith(derived, _this13);
        };

        for (var _i8 = 0, _ii8 = behavior.properties.length; _i8 < _ii8; ++_i8) {
          var _ret = _loop(_i8, _ii8);

          if (_ret === 'continue') continue;
        }
      };

      return HtmlBehaviorResource;
    }();

    function createChildObserverDecorator(selectorOrConfig, all) {
      return function (target, key, descriptor) {
        var actualTarget = typeof key === 'string' ? target.constructor : target;
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);

        if (typeof selectorOrConfig === 'string') {
          selectorOrConfig = {
            selector: selectorOrConfig,
            name: key
          };
        }

        if (descriptor) {
          descriptor.writable = true;
          descriptor.configurable = true;
        }

        selectorOrConfig.all = all;
        r.addChildBinding(new ChildObserver(selectorOrConfig));
      };
    }

    function children(selectorOrConfig) {
      return createChildObserverDecorator(selectorOrConfig, true);
    }

    function child(selectorOrConfig) {
      return createChildObserverDecorator(selectorOrConfig, false);
    }

    var ChildObserver = function () {
      function ChildObserver(config) {
        

        this.name = config.name;
        this.changeHandler = config.changeHandler || this.name + 'Changed';
        this.selector = config.selector;
        this.all = config.all;
      }

      ChildObserver.prototype.create = function create(viewHost, viewModel, controller) {
        return new ChildObserverBinder(this.selector, viewHost, this.name, viewModel, controller, this.changeHandler, this.all);
      };

      return ChildObserver;
    }();

    var noMutations = [];

    function trackMutation(groupedMutations, binder, record) {
      var mutations = groupedMutations.get(binder);

      if (!mutations) {
        mutations = [];
        groupedMutations.set(binder, mutations);
      }

      mutations.push(record);
    }

    function onChildChange(mutations, observer) {
      var binders = observer.binders;
      var bindersLength = binders.length;
      var groupedMutations = new Map();

      for (var _i9 = 0, _ii9 = mutations.length; _i9 < _ii9; ++_i9) {
        var record = mutations[_i9];
        var added = record.addedNodes;
        var removed = record.removedNodes;

        for (var j = 0, jj = removed.length; j < jj; ++j) {
          var node = removed[j];
          if (node.nodeType === 1) {
            for (var k = 0; k < bindersLength; ++k) {
              var binder = binders[k];
              if (binder.onRemove(node)) {
                trackMutation(groupedMutations, binder, record);
              }
            }
          }
        }

        for (var _j = 0, _jj = added.length; _j < _jj; ++_j) {
          var _node = added[_j];
          if (_node.nodeType === 1) {
            for (var _k = 0; _k < bindersLength; ++_k) {
              var _binder = binders[_k];
              if (_binder.onAdd(_node)) {
                trackMutation(groupedMutations, _binder, record);
              }
            }
          }
        }
      }

      groupedMutations.forEach(function (value, key) {
        if (key.changeHandler !== null) {
          key.viewModel[key.changeHandler](value);
        }
      });
    }

    var ChildObserverBinder = function () {
      function ChildObserverBinder(selector, viewHost, property, viewModel, controller, changeHandler, all) {
        

        this.selector = selector;
        this.viewHost = viewHost;
        this.property = property;
        this.viewModel = viewModel;
        this.controller = controller;
        this.changeHandler = changeHandler in viewModel ? changeHandler : null;
        this.usesShadowDOM = controller.behavior.usesShadowDOM;
        this.all = all;

        if (!this.usesShadowDOM && controller.view && controller.view.contentView) {
          this.contentView = controller.view.contentView;
        } else {
          this.contentView = null;
        }
      }

      ChildObserverBinder.prototype.matches = function matches(element) {
        if (element.matches(this.selector)) {
          if (this.contentView === null) {
            return true;
          }

          var contentView = this.contentView;
          var assignedSlot = element.auAssignedSlot;

          if (assignedSlot && assignedSlot.projectFromAnchors) {
            var anchors = assignedSlot.projectFromAnchors;

            for (var _i10 = 0, _ii10 = anchors.length; _i10 < _ii10; ++_i10) {
              if (anchors[_i10].auOwnerView === contentView) {
                return true;
              }
            }

            return false;
          }

          return element.auOwnerView === contentView;
        }

        return false;
      };

      ChildObserverBinder.prototype.bind = function bind(source) {
        var viewHost = this.viewHost;
        var viewModel = this.viewModel;
        var observer = viewHost.__childObserver__;

        if (!observer) {
          observer = viewHost.__childObserver__ = aureliaPal.DOM.createMutationObserver(onChildChange);

          var options = {
            childList: true,
            subtree: !this.usesShadowDOM
          };

          observer.observe(viewHost, options);
          observer.binders = [];
        }

        observer.binders.push(this);

        if (this.usesShadowDOM) {
          var current = viewHost.firstElementChild;

          if (this.all) {
            var items = viewModel[this.property];
            if (!items) {
              items = viewModel[this.property] = [];
            } else {
              items.length = 0;
            }

            while (current) {
              if (this.matches(current)) {
                items.push(current.au && current.au.controller ? current.au.controller.viewModel : current);
              }

              current = current.nextElementSibling;
            }

            if (this.changeHandler !== null) {
              this.viewModel[this.changeHandler](noMutations);
            }
          } else {
            while (current) {
              if (this.matches(current)) {
                var value = current.au && current.au.controller ? current.au.controller.viewModel : current;
                this.viewModel[this.property] = value;

                if (this.changeHandler !== null) {
                  this.viewModel[this.changeHandler](value);
                }

                break;
              }

              current = current.nextElementSibling;
            }
          }
        }
      };

      ChildObserverBinder.prototype.onRemove = function onRemove(element) {
        if (this.matches(element)) {
          var value = element.au && element.au.controller ? element.au.controller.viewModel : element;

          if (this.all) {
            var items = this.viewModel[this.property] || (this.viewModel[this.property] = []);
            var index = items.indexOf(value);

            if (index !== -1) {
              items.splice(index, 1);
            }

            return true;
          }

          return false;
        }

        return false;
      };

      ChildObserverBinder.prototype.onAdd = function onAdd(element) {
        if (this.matches(element)) {
          var value = element.au && element.au.controller ? element.au.controller.viewModel : element;

          if (this.all) {
            var items = this.viewModel[this.property] || (this.viewModel[this.property] = []);

            if (this.selector === '*') {
              items.push(value);
              return true;
            }

            var index = 0;
            var prev = element.previousElementSibling;

            while (prev) {
              if (this.matches(prev)) {
                index++;
              }

              prev = prev.previousElementSibling;
            }

            items.splice(index, 0, value);
            return true;
          }

          this.viewModel[this.property] = value;

          if (this.changeHandler !== null) {
            this.viewModel[this.changeHandler](value);
          }
        }

        return false;
      };

      ChildObserverBinder.prototype.unbind = function unbind() {
        if (this.viewHost.__childObserver__) {
          this.viewHost.__childObserver__.disconnect();
          this.viewHost.__childObserver__ = null;
        }
      };

      return ChildObserverBinder;
    }();

    function remove(viewSlot, previous) {
      return Array.isArray(previous) ? viewSlot.removeMany(previous, true) : viewSlot.remove(previous, true);
    }

    var SwapStrategies = exports.SwapStrategies = {
      before: function before(viewSlot, previous, callback) {
        return previous === undefined ? callback() : callback().then(function () {
          return remove(viewSlot, previous);
        });
      },
      with: function _with(viewSlot, previous, callback) {
        return previous === undefined ? callback() : Promise.all([remove(viewSlot, previous), callback()]);
      },
      after: function after(viewSlot, previous, callback) {
        return Promise.resolve(viewSlot.removeAll(true)).then(callback);
      }
    };

    function tryActivateViewModel(context) {
      if (context.skipActivation || typeof context.viewModel.activate !== 'function') {
        return Promise.resolve();
      }

      return context.viewModel.activate(context.model) || Promise.resolve();
    }

    var CompositionEngine = exports.CompositionEngine = (_dec10 = (0, aureliaDependencyInjection.inject)(ViewEngine, ViewLocator), _dec10(_class17 = function () {
      function CompositionEngine(viewEngine, viewLocator) {
        

        this.viewEngine = viewEngine;
        this.viewLocator = viewLocator;
      }

      CompositionEngine.prototype._swap = function _swap(context, view) {
        var swapStrategy = SwapStrategies[context.swapOrder] || SwapStrategies.after;
        var previousViews = context.viewSlot.children.slice();

        return swapStrategy(context.viewSlot, previousViews, function () {
          return Promise.resolve(context.viewSlot.add(view)).then(function () {
            if (context.currentController) {
              context.currentController.unbind();
            }
          });
        }).then(function () {
          if (context.compositionTransactionNotifier) {
            context.compositionTransactionNotifier.done();
          }
        });
      };

      CompositionEngine.prototype._createControllerAndSwap = function _createControllerAndSwap(context) {
        var _this14 = this;

        return this.createController(context).then(function (controller) {
          controller.automate(context.overrideContext, context.owningView);

          if (context.compositionTransactionOwnershipToken) {
            return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
              return _this14._swap(context, controller.view);
            }).then(function () {
              return controller;
            });
          }

          return _this14._swap(context, controller.view).then(function () {
            return controller;
          });
        });
      };

      CompositionEngine.prototype.createController = function createController(context) {
        var _this15 = this;

        var childContainer = void 0;
        var viewModel = void 0;
        var viewModelResource = void 0;
        var m = void 0;

        return this.ensureViewModel(context).then(tryActivateViewModel).then(function () {
          childContainer = context.childContainer;
          viewModel = context.viewModel;
          viewModelResource = context.viewModelResource;
          m = viewModelResource.metadata;

          var viewStrategy = _this15.viewLocator.getViewStrategy(context.view || viewModel);

          if (context.viewResources) {
            viewStrategy.makeRelativeTo(context.viewResources.viewUrl);
          }

          return m.load(childContainer, viewModelResource.value, null, viewStrategy, true);
        }).then(function (viewFactory) {
          return m.create(childContainer, BehaviorInstruction.dynamic(context.host, viewModel, viewFactory));
        });
      };

      CompositionEngine.prototype.ensureViewModel = function ensureViewModel(context) {
        var childContainer = context.childContainer = context.childContainer || context.container.createChild();

        if (typeof context.viewModel === 'string') {
          context.viewModel = context.viewResources ? context.viewResources.relativeToView(context.viewModel) : context.viewModel;

          return this.viewEngine.importViewModelResource(context.viewModel).then(function (viewModelResource) {
            childContainer.autoRegister(viewModelResource.value);

            if (context.host) {
              childContainer.registerInstance(aureliaPal.DOM.Element, context.host);
            }

            context.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
            context.viewModelResource = viewModelResource;
            return context;
          });
        }

        var m = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, context.viewModel.constructor);
        m.elementName = m.elementName || 'dynamic-element';
        m.initialize(context.container || childContainer, context.viewModel.constructor);
        context.viewModelResource = { metadata: m, value: context.viewModel.constructor };
        childContainer.viewModel = context.viewModel;
        return Promise.resolve(context);
      };

      CompositionEngine.prototype.compose = function compose(context) {
        var _this16 = this;

        context.childContainer = context.childContainer || context.container.createChild();
        context.view = this.viewLocator.getViewStrategy(context.view);

        var transaction = context.childContainer.get(CompositionTransaction);
        var compositionTransactionOwnershipToken = transaction.tryCapture();

        if (compositionTransactionOwnershipToken) {
          context.compositionTransactionOwnershipToken = compositionTransactionOwnershipToken;
        } else {
          context.compositionTransactionNotifier = transaction.enlist();
        }

        if (context.viewModel) {
          return this._createControllerAndSwap(context);
        } else if (context.view) {
          if (context.viewResources) {
            context.view.makeRelativeTo(context.viewResources.viewUrl);
          }

          return context.view.loadViewFactory(this.viewEngine, new ViewCompileInstruction()).then(function (viewFactory) {
            var result = viewFactory.create(context.childContainer);
            result.bind(context.bindingContext, context.overrideContext);

            if (context.compositionTransactionOwnershipToken) {
              return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
                return _this16._swap(context, result);
              }).then(function () {
                return result;
              });
            }

            return _this16._swap(context, result).then(function () {
              return result;
            });
          });
        } else if (context.viewSlot) {
          context.viewSlot.removeAll();

          if (context.compositionTransactionNotifier) {
            context.compositionTransactionNotifier.done();
          }

          return Promise.resolve(null);
        }

        return Promise.resolve(null);
      };

      return CompositionEngine;
    }()) || _class17);

    var ElementConfigResource = exports.ElementConfigResource = function () {
      function ElementConfigResource() {
        
      }

      ElementConfigResource.prototype.initialize = function initialize(container, target) {};

      ElementConfigResource.prototype.register = function register(registry, name) {};

      ElementConfigResource.prototype.load = function load(container, target) {
        var config = new target();
        var eventManager = container.get(aureliaBinding.EventManager);
        eventManager.registerElementConfig(config);
      };

      return ElementConfigResource;
    }();

    function validateBehaviorName(name, type) {
      if (/[A-Z]/.test(name)) {
        var newName = _hyphenate(name);
        LogManager.getLogger('templating').warn('\'' + name + '\' is not a valid ' + type + ' name and has been converted to \'' + newName + '\'. Upper-case letters are not allowed because the DOM is not case-sensitive.');
        return newName;
      }
      return name;
    }

    function resource(instance) {
      return function (target) {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, instance, target);
      };
    }

    function behavior(override) {
      return function (target) {
        if (override instanceof HtmlBehaviorResource) {
          aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, override, target);
        } else {
          var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
          Object.assign(r, override);
        }
      };
    }

    function customElement(name) {
      return function (target) {
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
        r.elementName = validateBehaviorName(name, 'custom element');
      };
    }

    function customAttribute(name, defaultBindingMode, aliases) {
      return function (target) {
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
        r.attributeName = validateBehaviorName(name, 'custom attribute');
        r.attributeDefaultBindingMode = defaultBindingMode;
        r.aliases = aliases;
      };
    }

    function templateController(target) {
      var deco = function deco(t) {
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.liftsContent = true;
      };

      return target ? deco(target) : deco;
    }

    function bindable(nameOrConfigOrTarget, key, descriptor) {
      var deco = function deco(target, key2, descriptor2) {
        var actualTarget = key2 ? target.constructor : target;
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
        var prop = void 0;

        if (key2) {
          nameOrConfigOrTarget = nameOrConfigOrTarget || {};
          nameOrConfigOrTarget.name = key2;
        }

        prop = new BindableProperty(nameOrConfigOrTarget);
        return prop.registerWith(actualTarget, r, descriptor2);
      };

      if (!nameOrConfigOrTarget) {
        return deco;
      }

      if (key) {
        var _target = nameOrConfigOrTarget;
        nameOrConfigOrTarget = null;
        return deco(_target, key, descriptor);
      }

      return deco;
    }

    function dynamicOptions(target) {
      var deco = function deco(t) {
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.hasDynamicOptions = true;
      };

      return target ? deco(target) : deco;
    }

    var defaultShadowDOMOptions = { mode: 'open' };
    function useShadowDOM(targetOrOptions) {
      var options = typeof targetOrOptions === 'function' || !targetOrOptions ? defaultShadowDOMOptions : targetOrOptions;

      var deco = function deco(t) {
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.targetShadowDOM = true;
        r.shadowDOMOptions = options;
      };

      return typeof targetOrOptions === 'function' ? deco(targetOrOptions) : deco;
    }

    function processAttributes(processor) {
      return function (t) {
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.processAttributes = function (compiler, resources, node, attributes, elementInstruction) {
          try {
            processor(compiler, resources, node, attributes, elementInstruction);
          } catch (error) {
            LogManager.getLogger('templating').error(error);
          }
        };
      };
    }

    function doNotProcessContent() {
      return false;
    }

    function processContent(processor) {
      return function (t) {
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.processContent = processor ? function (compiler, resources, node, instruction) {
          try {
            return processor(compiler, resources, node, instruction);
          } catch (error) {
            LogManager.getLogger('templating').error(error);
            return false;
          }
        } : doNotProcessContent;
      };
    }

    function containerless(target) {
      var deco = function deco(t) {
        var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.containerless = true;
      };

      return target ? deco(target) : deco;
    }

    function useViewStrategy(strategy) {
      return function (target) {
        aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, strategy, target);
      };
    }

    function useView(path) {
      return useViewStrategy(new RelativeViewStrategy(path));
    }

    function inlineView(markup, dependencies, dependencyBaseUrl) {
      return useViewStrategy(new InlineViewStrategy(markup, dependencies, dependencyBaseUrl));
    }

    function noView(targetOrDependencies, dependencyBaseUrl) {
      var target = void 0;
      var dependencies = void 0;
      if (typeof targetOrDependencies === 'function') {
        target = targetOrDependencies;
      } else {
        dependencies = targetOrDependencies;
        target = undefined;
      }

      var deco = function deco(t) {
        aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, new NoViewStrategy(dependencies, dependencyBaseUrl), t);
      };

      return target ? deco(target) : deco;
    }

    function elementConfig(target) {
      var deco = function deco(t) {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new ElementConfigResource(), t);
      };

      return target ? deco(target) : deco;
    }

    function viewResources() {
      for (var _len = arguments.length, resources = Array(_len), _key = 0; _key < _len; _key++) {
        resources[_key] = arguments[_key];
      }

      return function (target) {
        aureliaMetadata.metadata.define(ViewEngine.viewModelRequireMetadataKey, resources, target);
      };
    }

    var TemplatingEngine = exports.TemplatingEngine = (_dec11 = (0, aureliaDependencyInjection.inject)(aureliaDependencyInjection.Container, ModuleAnalyzer, ViewCompiler, CompositionEngine), _dec11(_class18 = function () {
      function TemplatingEngine(container, moduleAnalyzer, viewCompiler, compositionEngine) {
        

        this._container = container;
        this._moduleAnalyzer = moduleAnalyzer;
        this._viewCompiler = viewCompiler;
        this._compositionEngine = compositionEngine;
        container.registerInstance(Animator, Animator.instance = new Animator());
      }

      TemplatingEngine.prototype.configureAnimator = function configureAnimator(animator) {
        this._container.unregister(Animator);
        this._container.registerInstance(Animator, Animator.instance = animator);
      };

      TemplatingEngine.prototype.compose = function compose(context) {
        return this._compositionEngine.compose(context);
      };

      TemplatingEngine.prototype.enhance = function enhance(instruction) {
        if (instruction instanceof aureliaPal.DOM.Element) {
          instruction = { element: instruction };
        }

        var compilerInstructions = {};
        var resources = instruction.resources || this._container.get(ViewResources);

        this._viewCompiler._compileNode(instruction.element, resources, compilerInstructions, instruction.element.parentNode, 'root', true);

        var factory = new ViewFactory(instruction.element, compilerInstructions, resources);
        var container = instruction.container || this._container.createChild();
        var view = factory.create(container, BehaviorInstruction.enhance());

        view.bind(instruction.bindingContext || {}, instruction.overrideContext);

        view.firstChild = view.lastChild = view.fragment;
        view.fragment = aureliaPal.DOM.createDocumentFragment();
        view.attached();

        return view;
      };

      return TemplatingEngine;
    }()) || _class18);
    });

    unwrapExports(aureliaTemplating);
    var aureliaTemplating_1 = aureliaTemplating.TemplatingEngine;
    var aureliaTemplating_2 = aureliaTemplating.ElementConfigResource;
    var aureliaTemplating_3 = aureliaTemplating.CompositionEngine;
    var aureliaTemplating_4 = aureliaTemplating.SwapStrategies;
    var aureliaTemplating_5 = aureliaTemplating.HtmlBehaviorResource;
    var aureliaTemplating_6 = aureliaTemplating.BindableProperty;
    var aureliaTemplating_7 = aureliaTemplating.BehaviorPropertyObserver;
    var aureliaTemplating_8 = aureliaTemplating.Controller;
    var aureliaTemplating_9 = aureliaTemplating.ViewEngine;
    var aureliaTemplating_10 = aureliaTemplating.ModuleAnalyzer;
    var aureliaTemplating_11 = aureliaTemplating.ResourceDescription;
    var aureliaTemplating_12 = aureliaTemplating.ResourceModule;
    var aureliaTemplating_13 = aureliaTemplating.ViewCompiler;
    var aureliaTemplating_14 = aureliaTemplating.ViewFactory;
    var aureliaTemplating_15 = aureliaTemplating.BoundViewFactory;
    var aureliaTemplating_16 = aureliaTemplating.ViewSlot;
    var aureliaTemplating_17 = aureliaTemplating.View;
    var aureliaTemplating_18 = aureliaTemplating.ViewResources;
    var aureliaTemplating_19 = aureliaTemplating.ShadowDOM;
    var aureliaTemplating_20 = aureliaTemplating.ShadowSlot;
    var aureliaTemplating_21 = aureliaTemplating.PassThroughSlot;
    var aureliaTemplating_22 = aureliaTemplating.SlotCustomAttribute;
    var aureliaTemplating_23 = aureliaTemplating.BindingLanguage;
    var aureliaTemplating_24 = aureliaTemplating.ViewLocator;
    var aureliaTemplating_25 = aureliaTemplating.InlineViewStrategy;
    var aureliaTemplating_26 = aureliaTemplating.TemplateRegistryViewStrategy;
    var aureliaTemplating_27 = aureliaTemplating.NoViewStrategy;
    var aureliaTemplating_28 = aureliaTemplating.ConventionalViewStrategy;
    var aureliaTemplating_29 = aureliaTemplating.RelativeViewStrategy;
    var aureliaTemplating_30 = aureliaTemplating.viewStrategy;
    var aureliaTemplating_31 = aureliaTemplating.TargetInstruction;
    var aureliaTemplating_32 = aureliaTemplating.BehaviorInstruction;
    var aureliaTemplating_33 = aureliaTemplating.ViewCompileInstruction;
    var aureliaTemplating_34 = aureliaTemplating.ResourceLoadContext;
    var aureliaTemplating_35 = aureliaTemplating.ElementEvents;
    var aureliaTemplating_36 = aureliaTemplating.ViewEngineHooksResource;
    var aureliaTemplating_37 = aureliaTemplating.CompositionTransaction;
    var aureliaTemplating_38 = aureliaTemplating.CompositionTransactionOwnershipToken;
    var aureliaTemplating_39 = aureliaTemplating.CompositionTransactionNotifier;
    var aureliaTemplating_40 = aureliaTemplating.Animator;
    var aureliaTemplating_41 = aureliaTemplating.animationEvent;
    var aureliaTemplating_42 = aureliaTemplating._hyphenate;
    var aureliaTemplating_43 = aureliaTemplating._isAllWhitespace;
    var aureliaTemplating_44 = aureliaTemplating.viewEngineHooks;
    var aureliaTemplating_45 = aureliaTemplating.children;
    var aureliaTemplating_46 = aureliaTemplating.child;
    var aureliaTemplating_47 = aureliaTemplating.resource;
    var aureliaTemplating_48 = aureliaTemplating.behavior;
    var aureliaTemplating_49 = aureliaTemplating.customElement;
    var aureliaTemplating_50 = aureliaTemplating.customAttribute;
    var aureliaTemplating_51 = aureliaTemplating.templateController;
    var aureliaTemplating_52 = aureliaTemplating.bindable;
    var aureliaTemplating_53 = aureliaTemplating.dynamicOptions;
    var aureliaTemplating_54 = aureliaTemplating.useShadowDOM;
    var aureliaTemplating_55 = aureliaTemplating.processAttributes;
    var aureliaTemplating_56 = aureliaTemplating.processContent;
    var aureliaTemplating_57 = aureliaTemplating.containerless;
    var aureliaTemplating_58 = aureliaTemplating.useViewStrategy;
    var aureliaTemplating_59 = aureliaTemplating.useView;
    var aureliaTemplating_60 = aureliaTemplating.inlineView;
    var aureliaTemplating_61 = aureliaTemplating.noView;
    var aureliaTemplating_62 = aureliaTemplating.elementConfig;
    var aureliaTemplating_63 = aureliaTemplating.viewResources;

    var aureliaFramework = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LogManager = exports.FrameworkConfiguration = exports.Aurelia = undefined;



    Object.keys(aureliaDependencyInjection).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return aureliaDependencyInjection[key];
        }
      });
    });



    Object.keys(aureliaBinding).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return aureliaBinding[key];
        }
      });
    });



    Object.keys(aureliaMetadata).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return aureliaMetadata[key];
        }
      });
    });



    Object.keys(aureliaTemplating).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return aureliaTemplating[key];
        }
      });
    });



    Object.keys(aureliaLoader).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return aureliaLoader[key];
        }
      });
    });



    Object.keys(aureliaTaskQueue).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return aureliaTaskQueue[key];
        }
      });
    });



    Object.keys(aureliaPath).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return aureliaPath[key];
        }
      });
    });



    Object.keys(aureliaPal).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return aureliaPal[key];
        }
      });
    });



    var TheLogManager = _interopRequireWildcard(aureliaLogging);

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



    function preventActionlessFormSubmit() {
      aureliaPal.DOM.addEventListener('submit', function (evt) {
        var target = evt.target;
        var action = target.action;

        if (target.tagName.toLowerCase() === 'form' && !action) {
          evt.preventDefault();
        }
      });
    }

    var Aurelia = exports.Aurelia = function () {
      function Aurelia(loader, container, resources) {
        

        this.loader = loader || new aureliaPal.PLATFORM.Loader();
        this.container = container || new aureliaDependencyInjection.Container().makeGlobal();
        this.resources = resources || new aureliaTemplating.ViewResources();
        this.use = new FrameworkConfiguration(this);
        this.logger = TheLogManager.getLogger('aurelia');
        this.hostConfigured = false;
        this.host = null;

        this.use.instance(Aurelia, this);
        this.use.instance(aureliaLoader.Loader, this.loader);
        this.use.instance(aureliaTemplating.ViewResources, this.resources);
      }

      Aurelia.prototype.start = function start() {
        var _this = this;

        if (this._started) {
          return this._started;
        }

        this.logger.info('Aurelia Starting');
        return this._started = this.use.apply().then(function () {
          preventActionlessFormSubmit();

          if (!_this.container.hasResolver(aureliaTemplating.BindingLanguage)) {
            var message = 'You must configure Aurelia with a BindingLanguage implementation.';
            _this.logger.error(message);
            throw new Error(message);
          }

          _this.logger.info('Aurelia Started');
          var evt = aureliaPal.DOM.createCustomEvent('aurelia-started', { bubbles: true, cancelable: true });
          aureliaPal.DOM.dispatchEvent(evt);
          return _this;
        });
      };

      Aurelia.prototype.enhance = function enhance() {
        var _this2 = this;

        var bindingContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var applicationHost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this._configureHost(applicationHost || aureliaPal.DOM.querySelectorAll('body')[0]);

        return new Promise(function (resolve) {
          var engine = _this2.container.get(aureliaTemplating.TemplatingEngine);
          _this2.root = engine.enhance({ container: _this2.container, element: _this2.host, resources: _this2.resources, bindingContext: bindingContext });
          _this2.root.attached();
          _this2._onAureliaComposed();
          resolve(_this2);
        });
      };

      Aurelia.prototype.setRoot = function setRoot() {
        var _this3 = this;

        var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var applicationHost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var instruction = {};

        if (this.root && this.root.viewModel && this.root.viewModel.router) {
          this.root.viewModel.router.deactivate();
          this.root.viewModel.router.reset();
        }

        this._configureHost(applicationHost);

        var engine = this.container.get(aureliaTemplating.TemplatingEngine);
        var transaction = this.container.get(aureliaTemplating.CompositionTransaction);
        delete transaction.initialComposition;

        if (!root) {
          if (this.configModuleId) {
            root = (0, aureliaPath.relativeToFile)('./app', this.configModuleId);
          } else {
            root = 'app';
          }
        }

        instruction.viewModel = root;
        instruction.container = instruction.childContainer = this.container;
        instruction.viewSlot = this.hostSlot;
        instruction.host = this.host;

        return engine.compose(instruction).then(function (r) {
          _this3.root = r;
          instruction.viewSlot.attached();
          _this3._onAureliaComposed();
          return _this3;
        });
      };

      Aurelia.prototype._configureHost = function _configureHost(applicationHost) {
        if (this.hostConfigured) {
          return;
        }
        applicationHost = applicationHost || this.host;

        if (!applicationHost || typeof applicationHost === 'string') {
          this.host = aureliaPal.DOM.getElementById(applicationHost || 'applicationHost');
        } else {
          this.host = applicationHost;
        }

        if (!this.host) {
          throw new Error('No applicationHost was specified.');
        }

        this.hostConfigured = true;
        this.host.aurelia = this;
        this.hostSlot = new aureliaTemplating.ViewSlot(this.host, true);
        this.hostSlot.transformChildNodesIntoView();
        this.container.registerInstance(aureliaPal.DOM.boundary, this.host);
      };

      Aurelia.prototype._onAureliaComposed = function _onAureliaComposed() {
        var evt = aureliaPal.DOM.createCustomEvent('aurelia-composed', { bubbles: true, cancelable: true });
        setTimeout(function () {
          return aureliaPal.DOM.dispatchEvent(evt);
        }, 1);
      };

      return Aurelia;
    }();

    var logger = TheLogManager.getLogger('aurelia');
    var extPattern = /\.[^/.]+$/;

    function runTasks(config, tasks) {
      var current = void 0;
      var next = function next() {
        current = tasks.shift();
        if (current) {
          return Promise.resolve(current(config)).then(next);
        }

        return Promise.resolve();
      };

      return next();
    }

    function loadPlugin(config, loader, info) {
      logger.debug('Loading plugin ' + info.moduleId + '.');
      config.resourcesRelativeTo = info.resourcesRelativeTo;

      var id = info.moduleId;

      if (info.resourcesRelativeTo.length > 1) {
        return loader.normalize(info.moduleId, info.resourcesRelativeTo[1]).then(function (normalizedId) {
          return _loadPlugin(normalizedId);
        });
      }

      return _loadPlugin(id);

      function _loadPlugin(moduleId) {
        return loader.loadModule(moduleId).then(function (m) {
          if ('configure' in m) {
            return Promise.resolve(m.configure(config, info.config || {})).then(function () {
              config.resourcesRelativeTo = null;
              logger.debug('Configured plugin ' + info.moduleId + '.');
            });
          }

          config.resourcesRelativeTo = null;
          logger.debug('Loaded plugin ' + info.moduleId + '.');
        });
      }
    }

    function loadResources(aurelia, resourcesToLoad, appResources) {
      var viewEngine = aurelia.container.get(aureliaTemplating.ViewEngine);

      return Promise.all(Object.keys(resourcesToLoad).map(function (n) {
        return _normalize(resourcesToLoad[n]);
      })).then(function (loads) {
        var names = [];
        var importIds = [];

        loads.forEach(function (l) {
          names.push(undefined);
          importIds.push(l.importId);
        });

        return viewEngine.importViewResources(importIds, names, appResources);
      });

      function _normalize(load) {
        var moduleId = load.moduleId;
        var ext = getExt(moduleId);

        if (isOtherResource(moduleId)) {
          moduleId = removeExt(moduleId);
        }

        return aurelia.loader.normalize(moduleId, load.relativeTo).then(function (normalized) {
          return {
            name: load.moduleId,
            importId: isOtherResource(load.moduleId) ? addOriginalExt(normalized, ext) : normalized
          };
        });
      }

      function isOtherResource(name) {
        var ext = getExt(name);
        if (!ext) return false;
        if (ext === '') return false;
        if (ext === '.js' || ext === '.ts') return false;
        return true;
      }

      function removeExt(name) {
        return name.replace(extPattern, '');
      }

      function addOriginalExt(normalized, ext) {
        return removeExt(normalized) + '.' + ext;
      }
    }

    function getExt(name) {
      var match = name.match(extPattern);
      if (match && match.length > 0) {
        return match[0].split('.')[1];
      }
    }

    function assertProcessed(plugins) {
      if (plugins.processed) {
        throw new Error('This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.');
      }
    }

    var FrameworkConfiguration = function () {
      function FrameworkConfiguration(aurelia) {
        var _this4 = this;

        

        this.aurelia = aurelia;
        this.container = aurelia.container;
        this.info = [];
        this.processed = false;
        this.preTasks = [];
        this.postTasks = [];
        this.resourcesToLoad = {};
        this.preTask(function () {
          return aurelia.loader.normalize('aurelia-bootstrapper').then(function (name) {
            return _this4.bootstrapperName = name;
          });
        });
        this.postTask(function () {
          return loadResources(aurelia, _this4.resourcesToLoad, aurelia.resources);
        });
      }

      FrameworkConfiguration.prototype.instance = function instance(type, _instance) {
        this.container.registerInstance(type, _instance);
        return this;
      };

      FrameworkConfiguration.prototype.singleton = function singleton(type, implementation) {
        this.container.registerSingleton(type, implementation);
        return this;
      };

      FrameworkConfiguration.prototype.transient = function transient(type, implementation) {
        this.container.registerTransient(type, implementation);
        return this;
      };

      FrameworkConfiguration.prototype.preTask = function preTask(task) {
        assertProcessed(this);
        this.preTasks.push(task);
        return this;
      };

      FrameworkConfiguration.prototype.postTask = function postTask(task) {
        assertProcessed(this);
        this.postTasks.push(task);
        return this;
      };

      FrameworkConfiguration.prototype.feature = function feature(plugin) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var hasIndex = /\/index$/i.test(plugin);
        var moduleId = hasIndex || getExt(plugin) ? plugin : plugin + '/index';
        var root = hasIndex ? plugin.substr(0, plugin.length - 6) : plugin;
        return this.plugin({ moduleId: moduleId, resourcesRelativeTo: [root, ''], config: config });
      };

      FrameworkConfiguration.prototype.globalResources = function globalResources(resources) {
        assertProcessed(this);

        var toAdd = Array.isArray(resources) ? resources : arguments;
        var resource = void 0;
        var resourcesRelativeTo = this.resourcesRelativeTo || ['', ''];

        for (var i = 0, ii = toAdd.length; i < ii; ++i) {
          resource = toAdd[i];
          if (typeof resource !== 'string') {
            throw new Error('Invalid resource path [' + resource + ']. Resources must be specified as relative module IDs.');
          }

          var parent = resourcesRelativeTo[0];
          var grandParent = resourcesRelativeTo[1];
          var name = resource;

          if ((resource.startsWith('./') || resource.startsWith('../')) && parent !== '') {
            name = (0, aureliaPath.join)(parent, resource);
          }

          this.resourcesToLoad[name] = { moduleId: name, relativeTo: grandParent };
        }

        return this;
      };

      FrameworkConfiguration.prototype.globalName = function globalName(resourcePath, newName) {
        assertProcessed(this);
        this.resourcesToLoad[resourcePath] = { moduleId: newName, relativeTo: '' };
        return this;
      };

      FrameworkConfiguration.prototype.plugin = function plugin(_plugin, config) {
        assertProcessed(this);

        if (typeof _plugin === 'string') {
          return this.plugin({ moduleId: _plugin, resourcesRelativeTo: [_plugin, ''], config: config || {} });
        }

        this.info.push(_plugin);
        return this;
      };

      FrameworkConfiguration.prototype._addNormalizedPlugin = function _addNormalizedPlugin(name, config) {
        var _this5 = this;

        var plugin = { moduleId: name, resourcesRelativeTo: [name, ''], config: config || {} };
        this.plugin(plugin);

        this.preTask(function () {
          var relativeTo = [name, _this5.bootstrapperName];
          plugin.moduleId = name;
          plugin.resourcesRelativeTo = relativeTo;
          return Promise.resolve();
        });

        return this;
      };

      FrameworkConfiguration.prototype.defaultBindingLanguage = function defaultBindingLanguage() {
        return this._addNormalizedPlugin('aurelia-templating-binding');
      };

      FrameworkConfiguration.prototype.router = function router() {
        return this._addNormalizedPlugin('aurelia-templating-router');
      };

      FrameworkConfiguration.prototype.history = function history() {
        return this._addNormalizedPlugin('aurelia-history-browser');
      };

      FrameworkConfiguration.prototype.defaultResources = function defaultResources() {
        return this._addNormalizedPlugin('aurelia-templating-resources');
      };

      FrameworkConfiguration.prototype.eventAggregator = function eventAggregator() {
        return this._addNormalizedPlugin('aurelia-event-aggregator');
      };

      FrameworkConfiguration.prototype.basicConfiguration = function basicConfiguration() {
        return this.defaultBindingLanguage().defaultResources().eventAggregator();
      };

      FrameworkConfiguration.prototype.standardConfiguration = function standardConfiguration() {
        return this.basicConfiguration().history().router();
      };

      FrameworkConfiguration.prototype.developmentLogging = function developmentLogging(level) {
        var _this6 = this;

        var logLevel = level ? TheLogManager.logLevel[level] : undefined;

        if (logLevel === undefined) {
          logLevel = TheLogManager.logLevel.debug;
        }

        this.preTask(function () {
          return _this6.aurelia.loader.normalize('aurelia-logging-console', _this6.bootstrapperName).then(function (name) {
            return _this6.aurelia.loader.loadModule(name).then(function (m) {
              TheLogManager.addAppender(new m.ConsoleAppender());
              TheLogManager.setLevel(logLevel);
            });
          });
        });

        return this;
      };

      FrameworkConfiguration.prototype.apply = function apply() {
        var _this7 = this;

        if (this.processed) {
          return Promise.resolve();
        }

        return runTasks(this, this.preTasks).then(function () {
          var loader = _this7.aurelia.loader;
          var info = _this7.info;
          var current = void 0;

          var next = function next() {
            current = info.shift();
            if (current) {
              return loadPlugin(_this7, loader, current).then(next);
            }

            _this7.processed = true;
            return Promise.resolve();
          };

          return next().then(function () {
            return runTasks(_this7, _this7.postTasks);
          });
        });
      };

      return FrameworkConfiguration;
    }();

    exports.FrameworkConfiguration = FrameworkConfiguration;
    var LogManager = exports.LogManager = TheLogManager;
    });

    unwrapExports(aureliaFramework);
    var aureliaFramework_1 = aureliaFramework.bindable;
    var aureliaFramework_2 = aureliaFramework.inject;
    var aureliaFramework_3 = aureliaFramework.LogManager;
    var aureliaFramework_4 = aureliaFramework.FrameworkConfiguration;
    var aureliaFramework_5 = aureliaFramework.Aurelia;

    function trimDots(ary) {
      for (let i = 0; i < ary.length; ++i) {
        let part = ary[i];
        if (part === '.') {
          ary.splice(i, 1);
          i -= 1;
        } else if (part === '..') {
          if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
            continue;
          } else if (i > 0) {
            ary.splice(i - 1, 2);
            i -= 2;
          }
        }
      }
    }

    function relativeToFile(name, file) {
      let fileParts = file && file.split('/');
      let nameParts = name.trim().split('/');

      if (nameParts[0].charAt(0) === '.' && fileParts) {
        let normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
        nameParts.unshift(...normalizedBaseParts);
      }

      trimDots(nameParts);

      return nameParts.join('/');
    }

    function join(path1, path2) {
      if (!path1) {
        return path2;
      }

      if (!path2) {
        return path1;
      }

      let schemeMatch = path1.match(/^([^/]*?:)\//);
      let scheme = schemeMatch && schemeMatch.length > 0 ? schemeMatch[1] : '';
      path1 = path1.substr(scheme.length);

      let urlPrefix;
      if (path1.indexOf('///') === 0 && scheme === 'file:') {
        urlPrefix = '///';
      } else if (path1.indexOf('//') === 0) {
        urlPrefix = '//';
      } else if (path1.indexOf('/') === 0) {
        urlPrefix = '/';
      } else {
        urlPrefix = '';
      }

      let trailingSlash = path2.slice(-1) === '/' ? '/' : '';

      let url1 = path1.split('/');
      let url2 = path2.split('/');
      let url3 = [];

      for (let i = 0, ii = url1.length; i < ii; ++i) {
        if (url1[i] === '..') {
          url3.pop();
        } else if (url1[i] === '.' || url1[i] === '') {
          continue;
        } else {
          url3.push(url1[i]);
        }
      }

      for (let i = 0, ii = url2.length; i < ii; ++i) {
        if (url2[i] === '..') {
          url3.pop();
        } else if (url2[i] === '.' || url2[i] === '') {
          continue;
        } else {
          url3.push(url2[i]);
        }
      }

      return scheme + urlPrefix + url3.join('/') + trailingSlash;
    }

    let encode = encodeURIComponent;
    let encodeKey = k => encode(k).replace('%24', '$');

    function buildParam(key, value, traditional) {
      let result = [];
      if (value === null || value === undefined) {
        return result;
      }
      if (Array.isArray(value)) {
        for (let i = 0, l = value.length; i < l; i++) {
          if (traditional) {
            result.push(`${encodeKey(key)}=${encode(value[i])}`);
          } else {
            let arrayKey = key + '[' + (typeof value[i] === 'object' && value[i] !== null ? i : '') + ']';
            result = result.concat(buildParam(arrayKey, value[i]));
          }
        }
      } else if (typeof value === 'object' && !traditional) {
        for (let propertyName in value) {
          result = result.concat(buildParam(key + '[' + propertyName + ']', value[propertyName]));
        }
      } else {
        result.push(`${encodeKey(key)}=${encode(value)}`);
      }
      return result;
    }

    function buildQueryString(params, traditional) {
      let pairs = [];
      let keys = Object.keys(params || {}).sort();
      for (let i = 0, len = keys.length; i < len; i++) {
        let key = keys[i];
        pairs = pairs.concat(buildParam(key, params[key], traditional));
      }

      if (pairs.length === 0) {
        return '';
      }

      return pairs.join('&');
    }

    function processScalarParam(existedParam, value) {
      if (Array.isArray(existedParam)) {
        existedParam.push(value);
        return existedParam;
      }
      if (existedParam !== undefined) {
        return [existedParam, value];
      }

      return value;
    }

    function parseComplexParam(queryParams, keys, value) {
      let currentParams = queryParams;
      let keysLastIndex = keys.length - 1;
      for (let j = 0; j <= keysLastIndex; j++) {
        let key = keys[j] === '' ? currentParams.length : keys[j];
        if (j < keysLastIndex) {
          let prevValue = !currentParams[key] || typeof currentParams[key] === 'object' ? currentParams[key] : [currentParams[key]];
          currentParams = currentParams[key] = prevValue || (isNaN(keys[j + 1]) ? {} : []);
        } else {
          currentParams = currentParams[key] = value;
        }
      }
    }

    function parseQueryString(queryString) {
      let queryParams = {};
      if (!queryString || typeof queryString !== 'string') {
        return queryParams;
      }

      let query = queryString;
      if (query.charAt(0) === '?') {
        query = query.substr(1);
      }

      let pairs = query.replace(/\+/g, ' ').split('&');
      for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        let key = decodeURIComponent(pair[0]);
        if (!key) {
          continue;
        }

        let keys = key.split('][');
        let keysLastIndex = keys.length - 1;

        if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLastIndex])) {
          keys[keysLastIndex] = keys[keysLastIndex].replace(/\]$/, '');
          keys = keys.shift().split('[').concat(keys);
          keysLastIndex = keys.length - 1;
        } else {
          keysLastIndex = 0;
        }

        if (pair.length >= 2) {
          let value = pair[1] ? decodeURIComponent(pair[1]) : '';
          if (keysLastIndex) {
            parseComplexParam(queryParams, keys, value);
          } else {
            queryParams[key] = processScalarParam(queryParams[key], value);
          }
        } else {
          queryParams[key] = true;
        }
      }
      return queryParams;
    }

    var aureliaPath$2 = /*#__PURE__*/Object.freeze({
        relativeToFile: relativeToFile,
        join: join,
        buildQueryString: buildQueryString,
        parseQueryString: parseQueryString
    });

    var aureliaHttpClient = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HttpClient = exports.RequestBuilder = exports.ErrorHttpResponseMessage = exports.HttpRequestMessage = exports.JSONPRequestMessage = exports.RequestMessageProcessor = exports.mimeTypes = exports.HttpResponseMessage = exports.RequestMessage = exports.Headers = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    exports.timeoutTransformer = timeoutTransformer;
    exports.callbackParameterNameTransformer = callbackParameterNameTransformer;
    exports.credentialsTransformer = credentialsTransformer;
    exports.progressTransformer = progressTransformer;
    exports.downloadProgressTransformer = downloadProgressTransformer;
    exports.responseTypeTransformer = responseTypeTransformer;
    exports.headerTransformer = headerTransformer;
    exports.contentTransformer = contentTransformer;
    exports.createJSONPRequestMessageProcessor = createJSONPRequestMessageProcessor;
    exports.createHttpRequestMessageProcessor = createHttpRequestMessageProcessor;





    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



    var Headers = exports.Headers = function () {
      function Headers() {
        var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        

        this.headers = {};

        for (var _key in headers) {
          this.headers[_key.toLowerCase()] = { key: _key, value: headers[_key] };
        }
      }

      Headers.prototype.add = function add(key, value) {
        this.headers[key.toLowerCase()] = { key: key, value: value };
      };

      Headers.prototype.get = function get(key) {
        var header = this.headers[key.toLowerCase()];
        return header ? header.value : undefined;
      };

      Headers.prototype.clear = function clear() {
        this.headers = {};
      };

      Headers.prototype.has = function has(header) {
        return this.headers.hasOwnProperty(header.toLowerCase());
      };

      Headers.prototype.configureXHR = function configureXHR(xhr) {
        for (var name in this.headers) {
          if (this.headers.hasOwnProperty(name)) {
            xhr.setRequestHeader(this.headers[name].key, this.headers[name].value);
          }
        }
      };

      Headers.parse = function parse(headerStr) {
        var headers = new Headers();
        if (!headerStr) {
          return headers;
        }

        var headerPairs = headerStr.split('\r\n');
        for (var i = 0; i < headerPairs.length; i++) {
          var headerPair = headerPairs[i];

          var index = headerPair.indexOf(': ');
          if (index > 0) {
            var _key2 = headerPair.substring(0, index);
            var val = headerPair.substring(index + 2);
            headers.add(_key2, val);
          }
        }

        return headers;
      };

      return Headers;
    }();

    var RequestMessage = exports.RequestMessage = function () {
      function RequestMessage(method, url, content, headers) {
        

        this.method = method;
        this.url = url;
        this.content = content;
        this.headers = headers || new Headers();
        this.baseUrl = '';
      }

      RequestMessage.prototype.buildFullUrl = function buildFullUrl() {
        var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
        var url = absoluteUrl.test(this.url) ? this.url : (0, aureliaPath$2.join)(this.baseUrl, this.url);

        if (this.params) {
          var qs = (0, aureliaPath$2.buildQueryString)(this.params, this.traditional);
          url = qs ? url + (this.url.indexOf('?') < 0 ? '?' : '&') + qs : url;
        }

        return url;
      };

      return RequestMessage;
    }();

    var HttpResponseMessage = exports.HttpResponseMessage = function () {
      function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
        

        this.requestMessage = requestMessage;
        this.statusCode = xhr.status;
        this.response = xhr.response || xhr.responseText;
        this.isSuccess = xhr.status >= 200 && xhr.status < 400;
        this.statusText = xhr.statusText;
        this.reviver = reviver;
        this.mimeType = null;

        if (xhr.getAllResponseHeaders) {
          this.headers = Headers.parse(xhr.getAllResponseHeaders());
        } else {
          this.headers = new Headers();
        }

        var contentType = void 0;

        if (this.headers && this.headers.headers) {
          contentType = this.headers.get('Content-Type');
        }

        if (contentType) {
          this.mimeType = responseType = contentType.split(';')[0].trim();
          if (mimeTypes.hasOwnProperty(this.mimeType)) responseType = mimeTypes[this.mimeType];
        }

        this.responseType = responseType;
      }

      _createClass(HttpResponseMessage, [{
        key: 'content',
        get: function get() {
          try {
            if (this._content !== undefined) {
              return this._content;
            }

            if (this.response === undefined || this.response === null || this.response === '') {
              this._content = this.response;
              return this._content;
            }

            if (this.responseType === 'json') {
              this._content = JSON.parse(this.response, this.reviver);
              return this._content;
            }

            if (this.reviver) {
              this._content = this.reviver(this.response);
              return this._content;
            }

            this._content = this.response;
            return this._content;
          } catch (e) {
            if (this.isSuccess) {
              throw e;
            }

            this._content = null;
            return this._content;
          }
        }
      }]);

      return HttpResponseMessage;
    }();

    var mimeTypes = exports.mimeTypes = {
      'text/html': 'html',
      'text/javascript': 'js',
      'application/javascript': 'js',
      'text/json': 'json',
      'application/json': 'json',
      'application/rss+xml': 'rss',
      'application/atom+xml': 'atom',
      'application/xhtml+xml': 'xhtml',
      'text/markdown': 'md',
      'text/xml': 'xml',
      'text/mathml': 'mml',
      'application/xml': 'xml',
      'text/yml': 'yml',
      'text/csv': 'csv',
      'text/css': 'css',
      'text/less': 'less',
      'text/stylus': 'styl',
      'text/scss': 'scss',
      'text/sass': 'sass',
      'text/plain': 'txt'
    };

    function applyXhrTransformers(xhrTransformers, client, processor, message, xhr) {
      var i = void 0;
      var ii = void 0;

      for (i = 0, ii = xhrTransformers.length; i < ii; ++i) {
        xhrTransformers[i](client, processor, message, xhr);
      }
    }

    var RequestMessageProcessor = exports.RequestMessageProcessor = function () {
      function RequestMessageProcessor(xhrType, xhrTransformers) {
        

        this.XHRType = xhrType;
        this.xhrTransformers = xhrTransformers;
        this.isAborted = false;
      }

      RequestMessageProcessor.prototype.abort = function abort() {
        if (this.xhr && this.xhr.readyState !== aureliaPal.PLATFORM.XMLHttpRequest.UNSENT) {
          this.xhr.abort();
        }

        this.isAborted = true;
      };

      RequestMessageProcessor.prototype.process = function process(client, requestMessage) {
        var _this = this;

        var promise = new Promise(function (resolve, reject) {
          var rejectResponse = void 0;
          if (client.rejectPromiseWithErrorObject) {
            rejectResponse = function rejectResponse(resp) {
              var errorResp = new ErrorHttpResponseMessage(resp);
              reject(errorResp);
            };
          } else {
            rejectResponse = function rejectResponse(resp) {
              reject(resp);
            };
          }

          var xhr = _this.xhr = new _this.XHRType();
          xhr.onload = function (e) {
            var response = new HttpResponseMessage(requestMessage, xhr, requestMessage.responseType, requestMessage.reviver);
            if (response.isSuccess) {
              resolve(response);
            } else {
              rejectResponse(response);
            }
          };

          xhr.ontimeout = function (e) {
            rejectResponse(new HttpResponseMessage(requestMessage, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'timeout'));
          };

          xhr.onerror = function (e) {
            rejectResponse(new HttpResponseMessage(requestMessage, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'error'));
          };

          xhr.onabort = function (e) {
            rejectResponse(new HttpResponseMessage(requestMessage, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'abort'));
          };
        });

        return Promise.resolve(requestMessage).then(function (message) {
          var processRequest = function processRequest() {
            if (_this.isAborted) {
              _this.xhr.abort();
            } else {
              _this.xhr.open(message.method, message.buildFullUrl(), true, message.user, message.password);
              applyXhrTransformers(_this.xhrTransformers, client, _this, message, _this.xhr);
              if (typeof message.content === 'undefined') {
                _this.xhr.send();
              } else {
                _this.xhr.send(message.content);
              }
            }

            return promise;
          };

          var chain = [[processRequest, undefined]];

          var interceptors = message.interceptors || [];
          interceptors.forEach(function (interceptor) {
            if (interceptor.request || interceptor.requestError) {
              chain.unshift([interceptor.request ? interceptor.request.bind(interceptor) : undefined, interceptor.requestError ? interceptor.requestError.bind(interceptor) : undefined]);
            }

            if (interceptor.response || interceptor.responseError) {
              chain.push([interceptor.response ? interceptor.response.bind(interceptor) : undefined, interceptor.responseError ? interceptor.responseError.bind(interceptor) : undefined]);
            }
          });

          var interceptorsPromise = Promise.resolve(message);

          while (chain.length) {
            var _interceptorsPromise;

            interceptorsPromise = (_interceptorsPromise = interceptorsPromise).then.apply(_interceptorsPromise, chain.shift());
          }

          return interceptorsPromise;
        });
      };

      return RequestMessageProcessor;
    }();

    function timeoutTransformer(client, processor, message, xhr) {
      if (message.timeout !== undefined) {
        xhr.timeout = message.timeout;
      }
    }

    function callbackParameterNameTransformer(client, processor, message, xhr) {
      if (message.callbackParameterName !== undefined) {
        xhr.callbackParameterName = message.callbackParameterName;
      }
    }

    function credentialsTransformer(client, processor, message, xhr) {
      if (message.withCredentials !== undefined) {
        xhr.withCredentials = message.withCredentials;
      }
    }

    function progressTransformer(client, processor, message, xhr) {
      if (message.progressCallback) {
        xhr.upload.onprogress = message.progressCallback;
      }
    }

    function downloadProgressTransformer(client, processor, message, xhr) {
      if (message.downloadProgressCallback) {
        xhr.onprogress = message.downloadProgressCallback;
      }
    }

    function responseTypeTransformer(client, processor, message, xhr) {
      var responseType = message.responseType;

      if (responseType === 'json') {
        responseType = 'text';
      }

      xhr.responseType = responseType;
    }

    function headerTransformer(client, processor, message, xhr) {
      message.headers.configureXHR(xhr);
    }

    function contentTransformer(client, processor, message, xhr) {
      if (message.skipContentProcessing) {
        return;
      }

      if (aureliaPal.PLATFORM.global.FormData && message.content instanceof FormData) {
        return;
      }

      if (aureliaPal.PLATFORM.global.Blob && message.content instanceof Blob) {
        return;
      }

      if (aureliaPal.PLATFORM.global.ArrayBuffer && message.content instanceof ArrayBuffer) {
        return;
      }

      if (message.content instanceof Document) {
        return;
      }

      if (typeof message.content === 'string') {
        return;
      }

      if (message.content === null || message.content === undefined) {
        return;
      }

      message.content = JSON.stringify(message.content, message.replacer);

      if (!message.headers.has('Content-Type')) {
        message.headers.add('Content-Type', 'application/json');
      }
    }

    var JSONPRequestMessage = exports.JSONPRequestMessage = function (_RequestMessage) {
      _inherits(JSONPRequestMessage, _RequestMessage);

      function JSONPRequestMessage(url, callbackParameterName) {
        

        var _this2 = _possibleConstructorReturn(this, _RequestMessage.call(this, 'JSONP', url));

        _this2.responseType = 'jsonp';
        _this2.callbackParameterName = callbackParameterName;
        return _this2;
      }

      return JSONPRequestMessage;
    }(RequestMessage);

    var JSONPXHR = function () {
      function JSONPXHR() {
        
      }

      JSONPXHR.prototype.open = function open(method, url) {
        this.method = method;
        this.url = url;
        this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      };

      JSONPXHR.prototype.send = function send() {
        var _this3 = this;

        var url = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + encodeURIComponent(this.callbackParameterName) + '=' + this.callbackName;
        var script = aureliaPal.DOM.createElement('script');

        script.src = url;
        script.onerror = function (e) {
          cleanUp();

          _this3.status = 0;
          _this3.onerror(new Error('error'));
        };

        var cleanUp = function cleanUp() {
          delete aureliaPal.PLATFORM.global[_this3.callbackName];
          aureliaPal.DOM.removeNode(script);
        };

        aureliaPal.PLATFORM.global[this.callbackName] = function (data) {
          cleanUp();

          if (_this3.status === undefined) {
            _this3.status = 200;
            _this3.statusText = 'OK';
            _this3.response = data;
            _this3.onload(_this3);
          }
        };

        aureliaPal.DOM.appendNode(script);

        if (this.timeout !== undefined) {
          setTimeout(function () {
            if (_this3.status === undefined) {
              _this3.status = 0;
              _this3.ontimeout(new Error('timeout'));
            }
          }, this.timeout);
        }
      };

      JSONPXHR.prototype.abort = function abort() {
        if (this.status === undefined) {
          this.status = 0;
          this.onabort(new Error('abort'));
        }
      };

      JSONPXHR.prototype.setRequestHeader = function setRequestHeader() {};

      return JSONPXHR;
    }();

    function createJSONPRequestMessageProcessor() {
      return new RequestMessageProcessor(JSONPXHR, [timeoutTransformer, callbackParameterNameTransformer]);
    }

    var HttpRequestMessage = exports.HttpRequestMessage = function (_RequestMessage2) {
      _inherits(HttpRequestMessage, _RequestMessage2);

      function HttpRequestMessage(method, url, content, headers) {
        

        var _this4 = _possibleConstructorReturn(this, _RequestMessage2.call(this, method, url, content, headers));

        _this4.responseType = 'json';return _this4;
      }

      return HttpRequestMessage;
    }(RequestMessage);

    function createHttpRequestMessageProcessor() {
      return new RequestMessageProcessor(aureliaPal.PLATFORM.XMLHttpRequest, [timeoutTransformer, credentialsTransformer, progressTransformer, downloadProgressTransformer, responseTypeTransformer, contentTransformer, headerTransformer]);
    }

    var ErrorHttpResponseMessage = exports.ErrorHttpResponseMessage = function (_HttpResponseMessage) {
      _inherits(ErrorHttpResponseMessage, _HttpResponseMessage);

      function ErrorHttpResponseMessage(responseMessage) {
        

        var _this5 = _possibleConstructorReturn(this, _HttpResponseMessage.call(this, responseMessage.requestMessage, {
          response: responseMessage.response,
          status: responseMessage.statusCode,
          statusText: responseMessage.statusText
        }, responseMessage.responseType));

        _this5.name = responseMessage.responseType;
        _this5.message = 'Error: ' + responseMessage.statusCode + ' Status: ' + responseMessage.statusText;
        return _this5;
      }

      return ErrorHttpResponseMessage;
    }(HttpResponseMessage);

    var RequestBuilder = exports.RequestBuilder = function () {
      function RequestBuilder(client) {
        

        this.client = client;
        this.transformers = client.requestTransformers.slice(0);
        this.useJsonp = false;
      }

      RequestBuilder.prototype.asDelete = function asDelete() {
        return this._addTransformer(function (client, processor, message) {
          message.method = 'DELETE';
        });
      };

      RequestBuilder.prototype.asGet = function asGet() {
        return this._addTransformer(function (client, processor, message) {
          message.method = 'GET';
        });
      };

      RequestBuilder.prototype.asHead = function asHead() {
        return this._addTransformer(function (client, processor, message) {
          message.method = 'HEAD';
        });
      };

      RequestBuilder.prototype.asOptions = function asOptions() {
        return this._addTransformer(function (client, processor, message) {
          message.method = 'OPTIONS';
        });
      };

      RequestBuilder.prototype.asPatch = function asPatch() {
        return this._addTransformer(function (client, processor, message) {
          message.method = 'PATCH';
        });
      };

      RequestBuilder.prototype.asPost = function asPost() {
        return this._addTransformer(function (client, processor, message) {
          message.method = 'POST';
        });
      };

      RequestBuilder.prototype.asPut = function asPut() {
        return this._addTransformer(function (client, processor, message) {
          message.method = 'PUT';
        });
      };

      RequestBuilder.prototype.asJsonp = function asJsonp(callbackParameterName) {
        this.useJsonp = true;
        return this._addTransformer(function (client, processor, message) {
          message.callbackParameterName = callbackParameterName;
        });
      };

      RequestBuilder.prototype.withUrl = function withUrl(url) {
        return this._addTransformer(function (client, processor, message) {
          message.url = url;
        });
      };

      RequestBuilder.prototype.withContent = function withContent(content) {
        return this._addTransformer(function (client, processor, message) {
          message.content = content;
        });
      };

      RequestBuilder.prototype.withBaseUrl = function withBaseUrl(baseUrl) {
        return this._addTransformer(function (client, processor, message) {
          message.baseUrl = baseUrl;
        });
      };

      RequestBuilder.prototype.withParams = function withParams(params, traditional) {
        return this._addTransformer(function (client, processor, message) {
          message.traditional = traditional;
          message.params = params;
        });
      };

      RequestBuilder.prototype.withResponseType = function withResponseType(responseType) {
        return this._addTransformer(function (client, processor, message) {
          message.responseType = responseType;
        });
      };

      RequestBuilder.prototype.withTimeout = function withTimeout(timeout) {
        return this._addTransformer(function (client, processor, message) {
          message.timeout = timeout;
        });
      };

      RequestBuilder.prototype.withHeader = function withHeader(key, value) {
        return this._addTransformer(function (client, processor, message) {
          message.headers.add(key, value);
        });
      };

      RequestBuilder.prototype.withCredentials = function withCredentials(value) {
        return this._addTransformer(function (client, processor, message) {
          message.withCredentials = value;
        });
      };

      RequestBuilder.prototype.withLogin = function withLogin(user, password) {
        return this._addTransformer(function (client, processor, message) {
          message.user = user;message.password = password;
        });
      };

      RequestBuilder.prototype.withReviver = function withReviver(reviver) {
        return this._addTransformer(function (client, processor, message) {
          message.reviver = reviver;
        });
      };

      RequestBuilder.prototype.withReplacer = function withReplacer(replacer) {
        return this._addTransformer(function (client, processor, message) {
          message.replacer = replacer;
        });
      };

      RequestBuilder.prototype.withProgressCallback = function withProgressCallback(progressCallback) {
        return this._addTransformer(function (client, processor, message) {
          message.progressCallback = progressCallback;
        });
      };

      RequestBuilder.prototype.withDownloadProgressCallback = function withDownloadProgressCallback(downloadProgressCallback) {
        return this._addTransformer(function (client, processor, message) {
          message.downloadProgressCallback = downloadProgressCallback;
        });
      };

      RequestBuilder.prototype.withCallbackParameterName = function withCallbackParameterName(callbackParameterName) {
        return this._addTransformer(function (client, processor, message) {
          message.callbackParameterName = callbackParameterName;
        });
      };

      RequestBuilder.prototype.withInterceptor = function withInterceptor(interceptor) {
        return this._addTransformer(function (client, processor, message) {
          message.interceptors = message.interceptors || [];
          message.interceptors.unshift(interceptor);
        });
      };

      RequestBuilder.prototype.skipContentProcessing = function skipContentProcessing() {
        return this._addTransformer(function (client, processor, message) {
          message.skipContentProcessing = true;
        });
      };

      RequestBuilder.prototype._addTransformer = function _addTransformer(fn) {
        this.transformers.push(fn);
        return this;
      };

      RequestBuilder.addHelper = function addHelper(name, fn) {
        RequestBuilder.prototype[name] = function () {
          return this._addTransformer(fn.apply(this, arguments));
        };
      };

      RequestBuilder.prototype.send = function send() {
        var message = this.useJsonp ? new JSONPRequestMessage() : new HttpRequestMessage();
        return this.client.send(message, this.transformers);
      };

      return RequestBuilder;
    }();

    function trackRequestStart(client, processor) {
      client.pendingRequests.push(processor);
      client.isRequesting = true;
    }

    function trackRequestEnd(client, processor) {
      var index = client.pendingRequests.indexOf(processor);

      client.pendingRequests.splice(index, 1);
      client.isRequesting = client.pendingRequests.length > 0;

      if (!client.isRequesting) {
        var evt = aureliaPal.DOM.createCustomEvent('aurelia-http-client-requests-drained', { bubbles: true, cancelable: true });
        setTimeout(function () {
          return aureliaPal.DOM.dispatchEvent(evt);
        }, 1);
      }
    }

    var HttpClient = exports.HttpClient = function () {
      function HttpClient() {
        

        this.isRequesting = false;

        this.rejectPromiseWithErrorObject = false;
        this.requestTransformers = [];
        this.requestProcessorFactories = new Map();
        this.requestProcessorFactories.set(HttpRequestMessage, createHttpRequestMessageProcessor);
        this.requestProcessorFactories.set(JSONPRequestMessage, createJSONPRequestMessageProcessor);
        this.pendingRequests = [];
      }

      HttpClient.prototype.configure = function configure(fn) {
        var builder = new RequestBuilder(this);
        fn(builder);
        this.requestTransformers = builder.transformers;
        return this;
      };

      HttpClient.prototype.createRequest = function createRequest(url) {
        var builder = new RequestBuilder(this);

        if (url) {
          builder.withUrl(url);
        }

        return builder;
      };

      HttpClient.prototype.send = function send(requestMessage, transformers) {
        var _this6 = this;

        var createProcessor = this.requestProcessorFactories.get(requestMessage.constructor);
        var processor = void 0;
        var promise = void 0;
        var i = void 0;
        var ii = void 0;

        if (!createProcessor) {
          throw new Error('No request message processor factory for ' + requestMessage.constructor + '.');
        }

        processor = createProcessor();
        trackRequestStart(this, processor);

        transformers = transformers || this.requestTransformers;

        promise = Promise.resolve(requestMessage).then(function (message) {
          for (i = 0, ii = transformers.length; i < ii; ++i) {
            transformers[i](_this6, processor, message);
          }

          return processor.process(_this6, message).then(function (response) {
            trackRequestEnd(_this6, processor);
            return response;
          }).catch(function (response) {
            trackRequestEnd(_this6, processor);
            throw response;
          });
        });

        promise.abort = promise.cancel = function () {
          processor.abort();
        };

        return promise;
      };

      HttpClient.prototype.delete = function _delete(url) {
        return this.createRequest(url).asDelete().send();
      };

      HttpClient.prototype.get = function get(url, params, traditional) {
        var req = this.createRequest(url).asGet();

        if (params) {
          return req.withParams(params, traditional).send();
        }

        return req.send();
      };

      HttpClient.prototype.head = function head(url) {
        return this.createRequest(url).asHead().send();
      };

      HttpClient.prototype.jsonp = function jsonp(url) {
        var callbackParameterName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jsoncallback';

        return this.createRequest(url).asJsonp(callbackParameterName).send();
      };

      HttpClient.prototype.options = function options(url) {
        return this.createRequest(url).asOptions().send();
      };

      HttpClient.prototype.put = function put(url, content) {
        return this.createRequest(url).asPut().withContent(content).send();
      };

      HttpClient.prototype.patch = function patch(url, content) {
        return this.createRequest(url).asPatch().withContent(content).send();
      };

      HttpClient.prototype.post = function post(url, content) {
        return this.createRequest(url).asPost().withContent(content).send();
      };

      return HttpClient;
    }();
    });

    unwrapExports(aureliaHttpClient);
    var aureliaHttpClient_1 = aureliaHttpClient.HttpClient;
    var aureliaHttpClient_2 = aureliaHttpClient.RequestBuilder;
    var aureliaHttpClient_3 = aureliaHttpClient.ErrorHttpResponseMessage;
    var aureliaHttpClient_4 = aureliaHttpClient.HttpRequestMessage;
    var aureliaHttpClient_5 = aureliaHttpClient.JSONPRequestMessage;
    var aureliaHttpClient_6 = aureliaHttpClient.RequestMessageProcessor;
    var aureliaHttpClient_7 = aureliaHttpClient.mimeTypes;
    var aureliaHttpClient_8 = aureliaHttpClient.HttpResponseMessage;
    var aureliaHttpClient_9 = aureliaHttpClient.RequestMessage;
    var aureliaHttpClient_10 = aureliaHttpClient.Headers;
    var aureliaHttpClient_11 = aureliaHttpClient.timeoutTransformer;
    var aureliaHttpClient_12 = aureliaHttpClient.callbackParameterNameTransformer;
    var aureliaHttpClient_13 = aureliaHttpClient.credentialsTransformer;
    var aureliaHttpClient_14 = aureliaHttpClient.progressTransformer;
    var aureliaHttpClient_15 = aureliaHttpClient.downloadProgressTransformer;
    var aureliaHttpClient_16 = aureliaHttpClient.responseTypeTransformer;
    var aureliaHttpClient_17 = aureliaHttpClient.headerTransformer;
    var aureliaHttpClient_18 = aureliaHttpClient.contentTransformer;
    var aureliaHttpClient_19 = aureliaHttpClient.createJSONPRequestMessageProcessor;
    var aureliaHttpClient_20 = aureliaHttpClient.createHttpRequestMessageProcessor;

    var jquery = createCommonjsModule(function (module) {
    /*!
     * jQuery JavaScript Library v3.3.1
     * https://jquery.com/
     *
     * Includes Sizzle.js
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2018-01-20T17:24Z
     */
    ( function( global, factory ) {

    	{

    		// For CommonJS and CommonJS-like environments where a proper `window`
    		// is present, execute the factory and get jQuery.
    		// For environments that do not have a `window` with a `document`
    		// (such as Node.js), expose a factory as module.exports.
    		// This accentuates the need for the creation of a real `window`.
    		// e.g. var jQuery = require("jquery")(window);
    		// See ticket #14549 for more info.
    		module.exports = global.document ?
    			factory( global, true ) :
    			function( w ) {
    				if ( !w.document ) {
    					throw new Error( "jQuery requires a window with a document" );
    				}
    				return factory( w );
    			};
    	}

    // Pass this if window is not defined yet
    } )( typeof window !== "undefined" ? window : commonjsGlobal, function( window, noGlobal ) {

    var arr = [];

    var document = window.document;

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call( Object );

    var support = {};

    var isFunction = function isFunction( obj ) {

          // Support: Chrome <=57, Firefox <=52
          // In some browsers, typeof returns "function" for HTML <object> elements
          // (i.e., `typeof document.createElement( "object" ) === "function"`).
          // We don't want to classify *any* DOM node as a function.
          return typeof obj === "function" && typeof obj.nodeType !== "number";
      };


    var isWindow = function isWindow( obj ) {
    		return obj != null && obj === obj.window;
    	};




    	var preservedScriptAttributes = {
    		type: true,
    		src: true,
    		noModule: true
    	};

    	function DOMEval( code, doc, node ) {
    		doc = doc || document;

    		var i,
    			script = doc.createElement( "script" );

    		script.text = code;
    		if ( node ) {
    			for ( i in preservedScriptAttributes ) {
    				if ( node[ i ] ) {
    					script[ i ] = node[ i ];
    				}
    			}
    		}
    		doc.head.appendChild( script ).parentNode.removeChild( script );
    	}


    function toType( obj ) {
    	if ( obj == null ) {
    		return obj + "";
    	}

    	// Support: Android <=2.3 only (functionish RegExp)
    	return typeof obj === "object" || typeof obj === "function" ?
    		class2type[ toString.call( obj ) ] || "object" :
    		typeof obj;
    }
    /* global Symbol */
    // Defining this global in .eslintrc.json would create a danger of using the global
    // unguarded in another place, it seems safer to define global only for this module



    var
    	version = "3.3.1",

    	// Define a local copy of jQuery
    	jQuery = function( selector, context ) {

    		// The jQuery object is actually just the init constructor 'enhanced'
    		// Need init if jQuery is called (just allow error to be thrown if not included)
    		return new jQuery.fn.init( selector, context );
    	},

    	// Support: Android <=4.0 only
    	// Make sure we trim BOM and NBSP
    	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    jQuery.fn = jQuery.prototype = {

    	// The current version of jQuery being used
    	jquery: version,

    	constructor: jQuery,

    	// The default length of a jQuery object is 0
    	length: 0,

    	toArray: function() {
    		return slice.call( this );
    	},

    	// Get the Nth element in the matched element set OR
    	// Get the whole matched element set as a clean array
    	get: function( num ) {

    		// Return all the elements in a clean array
    		if ( num == null ) {
    			return slice.call( this );
    		}

    		// Return just the one element from the set
    		return num < 0 ? this[ num + this.length ] : this[ num ];
    	},

    	// Take an array of elements and push it onto the stack
    	// (returning the new matched element set)
    	pushStack: function( elems ) {

    		// Build a new jQuery matched element set
    		var ret = jQuery.merge( this.constructor(), elems );

    		// Add the old object onto the stack (as a reference)
    		ret.prevObject = this;

    		// Return the newly-formed element set
    		return ret;
    	},

    	// Execute a callback for every element in the matched set.
    	each: function( callback ) {
    		return jQuery.each( this, callback );
    	},

    	map: function( callback ) {
    		return this.pushStack( jQuery.map( this, function( elem, i ) {
    			return callback.call( elem, i, elem );
    		} ) );
    	},

    	slice: function() {
    		return this.pushStack( slice.apply( this, arguments ) );
    	},

    	first: function() {
    		return this.eq( 0 );
    	},

    	last: function() {
    		return this.eq( -1 );
    	},

    	eq: function( i ) {
    		var len = this.length,
    			j = +i + ( i < 0 ? len : 0 );
    		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
    	},

    	end: function() {
    		return this.prevObject || this.constructor();
    	},

    	// For internal use only.
    	// Behaves like an Array's method, not like a jQuery method.
    	push: push,
    	sort: arr.sort,
    	splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
    	var options, name, src, copy, copyIsArray, clone,
    		target = arguments[ 0 ] || {},
    		i = 1,
    		length = arguments.length,
    		deep = false;

    	// Handle a deep copy situation
    	if ( typeof target === "boolean" ) {
    		deep = target;

    		// Skip the boolean and the target
    		target = arguments[ i ] || {};
    		i++;
    	}

    	// Handle case when target is a string or something (possible in deep copy)
    	if ( typeof target !== "object" && !isFunction( target ) ) {
    		target = {};
    	}

    	// Extend jQuery itself if only one argument is passed
    	if ( i === length ) {
    		target = this;
    		i--;
    	}

    	for ( ; i < length; i++ ) {

    		// Only deal with non-null/undefined values
    		if ( ( options = arguments[ i ] ) != null ) {

    			// Extend the base object
    			for ( name in options ) {
    				src = target[ name ];
    				copy = options[ name ];

    				// Prevent never-ending loop
    				if ( target === copy ) {
    					continue;
    				}

    				// Recurse if we're merging plain objects or arrays
    				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
    					( copyIsArray = Array.isArray( copy ) ) ) ) {

    					if ( copyIsArray ) {
    						copyIsArray = false;
    						clone = src && Array.isArray( src ) ? src : [];

    					} else {
    						clone = src && jQuery.isPlainObject( src ) ? src : {};
    					}

    					// Never move original objects, clone them
    					target[ name ] = jQuery.extend( deep, clone, copy );

    				// Don't bring in undefined values
    				} else if ( copy !== undefined ) {
    					target[ name ] = copy;
    				}
    			}
    		}
    	}

    	// Return the modified object
    	return target;
    };

    jQuery.extend( {

    	// Unique for each copy of jQuery on the page
    	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

    	// Assume jQuery is ready without the ready module
    	isReady: true,

    	error: function( msg ) {
    		throw new Error( msg );
    	},

    	noop: function() {},

    	isPlainObject: function( obj ) {
    		var proto, Ctor;

    		// Detect obvious negatives
    		// Use toString instead of jQuery.type to catch host objects
    		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
    			return false;
    		}

    		proto = getProto( obj );

    		// Objects with no prototype (e.g., `Object.create( null )`) are plain
    		if ( !proto ) {
    			return true;
    		}

    		// Objects with prototype are plain iff they were constructed by a global Object function
    		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
    		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
    	},

    	isEmptyObject: function( obj ) {

    		/* eslint-disable no-unused-vars */
    		// See https://github.com/eslint/eslint/issues/6125
    		var name;

    		for ( name in obj ) {
    			return false;
    		}
    		return true;
    	},

    	// Evaluates a script in a global context
    	globalEval: function( code ) {
    		DOMEval( code );
    	},

    	each: function( obj, callback ) {
    		var length, i = 0;

    		if ( isArrayLike( obj ) ) {
    			length = obj.length;
    			for ( ; i < length; i++ ) {
    				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
    					break;
    				}
    			}
    		} else {
    			for ( i in obj ) {
    				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
    					break;
    				}
    			}
    		}

    		return obj;
    	},

    	// Support: Android <=4.0 only
    	trim: function( text ) {
    		return text == null ?
    			"" :
    			( text + "" ).replace( rtrim, "" );
    	},

    	// results is for internal usage only
    	makeArray: function( arr, results ) {
    		var ret = results || [];

    		if ( arr != null ) {
    			if ( isArrayLike( Object( arr ) ) ) {
    				jQuery.merge( ret,
    					typeof arr === "string" ?
    					[ arr ] : arr
    				);
    			} else {
    				push.call( ret, arr );
    			}
    		}

    		return ret;
    	},

    	inArray: function( elem, arr, i ) {
    		return arr == null ? -1 : indexOf.call( arr, elem, i );
    	},

    	// Support: Android <=4.0 only, PhantomJS 1 only
    	// push.apply(_, arraylike) throws on ancient WebKit
    	merge: function( first, second ) {
    		var len = +second.length,
    			j = 0,
    			i = first.length;

    		for ( ; j < len; j++ ) {
    			first[ i++ ] = second[ j ];
    		}

    		first.length = i;

    		return first;
    	},

    	grep: function( elems, callback, invert ) {
    		var callbackInverse,
    			matches = [],
    			i = 0,
    			length = elems.length,
    			callbackExpect = !invert;

    		// Go through the array, only saving the items
    		// that pass the validator function
    		for ( ; i < length; i++ ) {
    			callbackInverse = !callback( elems[ i ], i );
    			if ( callbackInverse !== callbackExpect ) {
    				matches.push( elems[ i ] );
    			}
    		}

    		return matches;
    	},

    	// arg is for internal usage only
    	map: function( elems, callback, arg ) {
    		var length, value,
    			i = 0,
    			ret = [];

    		// Go through the array, translating each of the items to their new values
    		if ( isArrayLike( elems ) ) {
    			length = elems.length;
    			for ( ; i < length; i++ ) {
    				value = callback( elems[ i ], i, arg );

    				if ( value != null ) {
    					ret.push( value );
    				}
    			}

    		// Go through every key on the object,
    		} else {
    			for ( i in elems ) {
    				value = callback( elems[ i ], i, arg );

    				if ( value != null ) {
    					ret.push( value );
    				}
    			}
    		}

    		// Flatten any nested arrays
    		return concat.apply( [], ret );
    	},

    	// A global GUID counter for objects
    	guid: 1,

    	// jQuery.support is not used in Core but other projects attach their
    	// properties to it so it needs to exist.
    	support: support
    } );

    if ( typeof Symbol === "function" ) {
    	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
    }

    // Populate the class2type map
    jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
    function( i, name ) {
    	class2type[ "[object " + name + "]" ] = name.toLowerCase();
    } );

    function isArrayLike( obj ) {

    	// Support: real iOS 8.2 only (not reproducible in simulator)
    	// `in` check used to prevent JIT error (gh-2145)
    	// hasOwn isn't used here due to false negatives
    	// regarding Nodelist length in IE
    	var length = !!obj && "length" in obj && obj.length,
    		type = toType( obj );

    	if ( isFunction( obj ) || isWindow( obj ) ) {
    		return false;
    	}

    	return type === "array" || length === 0 ||
    		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }
    var Sizzle =
    /*!
     * Sizzle CSS Selector Engine v2.3.3
     * https://sizzlejs.com/
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2016-08-08
     */
    (function( window ) {

    var i,
    	support,
    	Expr,
    	getText,
    	isXML,
    	tokenize,
    	compile,
    	select,
    	outermostContext,
    	sortInput,
    	hasDuplicate,

    	// Local document vars
    	setDocument,
    	document,
    	docElem,
    	documentIsHTML,
    	rbuggyQSA,
    	rbuggyMatches,
    	matches,
    	contains,

    	// Instance-specific data
    	expando = "sizzle" + 1 * new Date(),
    	preferredDoc = window.document,
    	dirruns = 0,
    	done = 0,
    	classCache = createCache(),
    	tokenCache = createCache(),
    	compilerCache = createCache(),
    	sortOrder = function( a, b ) {
    		if ( a === b ) {
    			hasDuplicate = true;
    		}
    		return 0;
    	},

    	// Instance methods
    	hasOwn = ({}).hasOwnProperty,
    	arr = [],
    	pop = arr.pop,
    	push_native = arr.push,
    	push = arr.push,
    	slice = arr.slice,
    	// Use a stripped-down indexOf as it's faster than native
    	// https://jsperf.com/thor-indexof-vs-for/5
    	indexOf = function( list, elem ) {
    		var i = 0,
    			len = list.length;
    		for ( ; i < len; i++ ) {
    			if ( list[i] === elem ) {
    				return i;
    			}
    		}
    		return -1;
    	},

    	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

    	// Regular expressions

    	// http://www.w3.org/TR/css3-selectors/#whitespace
    	whitespace = "[\\x20\\t\\r\\n\\f]",

    	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

    	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
    		// Operator (capture 2)
    		"*([*^$|!~]?=)" + whitespace +
    		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
    		"*\\]",

    	pseudos = ":(" + identifier + ")(?:\\((" +
    		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    		// 1. quoted (capture 3; capture 4 or capture 5)
    		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
    		// 2. simple (capture 6)
    		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
    		// 3. anything else (capture 2)
    		".*" +
    		")\\)|)",

    	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    	rwhitespace = new RegExp( whitespace + "+", "g" ),
    	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

    	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
    	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

    	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

    	rpseudo = new RegExp( pseudos ),
    	ridentifier = new RegExp( "^" + identifier + "$" ),

    	matchExpr = {
    		"ID": new RegExp( "^#(" + identifier + ")" ),
    		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
    		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
    		"ATTR": new RegExp( "^" + attributes ),
    		"PSEUDO": new RegExp( "^" + pseudos ),
    		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
    			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
    			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
    		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
    		// For use in libraries implementing .is()
    		// We use this for POS matching in `select`
    		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
    			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
    	},

    	rinputs = /^(?:input|select|textarea|button)$/i,
    	rheader = /^h\d$/i,

    	rnative = /^[^{]+\{\s*\[native \w/,

    	// Easily-parseable/retrievable ID or TAG or CLASS selectors
    	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

    	rsibling = /[+~]/,

    	// CSS escapes
    	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
    	funescape = function( _, escaped, escapedWhitespace ) {
    		var high = "0x" + escaped - 0x10000;
    		// NaN means non-codepoint
    		// Support: Firefox<24
    		// Workaround erroneous numeric interpretation of +"0x"
    		return high !== high || escapedWhitespace ?
    			escaped :
    			high < 0 ?
    				// BMP codepoint
    				String.fromCharCode( high + 0x10000 ) :
    				// Supplemental Plane codepoint (surrogate pair)
    				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
    	},

    	// CSS string/identifier serialization
    	// https://drafts.csswg.org/cssom/#common-serializing-idioms
    	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
    	fcssescape = function( ch, asCodePoint ) {
    		if ( asCodePoint ) {

    			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
    			if ( ch === "\0" ) {
    				return "\uFFFD";
    			}

    			// Control characters and (dependent upon position) numbers get escaped as code points
    			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
    		}

    		// Other potentially-special ASCII characters get backslash-escaped
    		return "\\" + ch;
    	},

    	// Used for iframes
    	// See setDocument()
    	// Removing the function wrapper causes a "Permission Denied"
    	// error in IE
    	unloadHandler = function() {
    		setDocument();
    	},

    	disabledAncestor = addCombinator(
    		function( elem ) {
    			return elem.disabled === true && ("form" in elem || "label" in elem);
    		},
    		{ dir: "parentNode", next: "legend" }
    	);

    // Optimize for push.apply( _, NodeList )
    try {
    	push.apply(
    		(arr = slice.call( preferredDoc.childNodes )),
    		preferredDoc.childNodes
    	);
    	// Support: Android<4.0
    	// Detect silently failing push.apply
    	arr[ preferredDoc.childNodes.length ].nodeType;
    } catch ( e ) {
    	push = { apply: arr.length ?

    		// Leverage slice if possible
    		function( target, els ) {
    			push_native.apply( target, slice.call(els) );
    		} :

    		// Support: IE<9
    		// Otherwise append directly
    		function( target, els ) {
    			var j = target.length,
    				i = 0;
    			// Can't trust NodeList.length
    			while ( (target[j++] = els[i++]) ) {}
    			target.length = j - 1;
    		}
    	};
    }

    function Sizzle( selector, context, results, seed ) {
    	var m, i, elem, nid, match, groups, newSelector,
    		newContext = context && context.ownerDocument,

    		// nodeType defaults to 9, since context defaults to document
    		nodeType = context ? context.nodeType : 9;

    	results = results || [];

    	// Return early from calls with invalid selector or context
    	if ( typeof selector !== "string" || !selector ||
    		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

    		return results;
    	}

    	// Try to shortcut find operations (as opposed to filters) in HTML documents
    	if ( !seed ) {

    		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
    			setDocument( context );
    		}
    		context = context || document;

    		if ( documentIsHTML ) {

    			// If the selector is sufficiently simple, try using a "get*By*" DOM method
    			// (excepting DocumentFragment context, where the methods don't exist)
    			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

    				// ID selector
    				if ( (m = match[1]) ) {

    					// Document context
    					if ( nodeType === 9 ) {
    						if ( (elem = context.getElementById( m )) ) {

    							// Support: IE, Opera, Webkit
    							// TODO: identify versions
    							// getElementById can match elements by name instead of ID
    							if ( elem.id === m ) {
    								results.push( elem );
    								return results;
    							}
    						} else {
    							return results;
    						}

    					// Element context
    					} else {

    						// Support: IE, Opera, Webkit
    						// TODO: identify versions
    						// getElementById can match elements by name instead of ID
    						if ( newContext && (elem = newContext.getElementById( m )) &&
    							contains( context, elem ) &&
    							elem.id === m ) {

    							results.push( elem );
    							return results;
    						}
    					}

    				// Type selector
    				} else if ( match[2] ) {
    					push.apply( results, context.getElementsByTagName( selector ) );
    					return results;

    				// Class selector
    				} else if ( (m = match[3]) && support.getElementsByClassName &&
    					context.getElementsByClassName ) {

    					push.apply( results, context.getElementsByClassName( m ) );
    					return results;
    				}
    			}

    			// Take advantage of querySelectorAll
    			if ( support.qsa &&
    				!compilerCache[ selector + " " ] &&
    				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

    				if ( nodeType !== 1 ) {
    					newContext = context;
    					newSelector = selector;

    				// qSA looks outside Element context, which is not what we want
    				// Thanks to Andrew Dupont for this workaround technique
    				// Support: IE <=8
    				// Exclude object elements
    				} else if ( context.nodeName.toLowerCase() !== "object" ) {

    					// Capture the context ID, setting it first if necessary
    					if ( (nid = context.getAttribute( "id" )) ) {
    						nid = nid.replace( rcssescape, fcssescape );
    					} else {
    						context.setAttribute( "id", (nid = expando) );
    					}

    					// Prefix every selector in the list
    					groups = tokenize( selector );
    					i = groups.length;
    					while ( i-- ) {
    						groups[i] = "#" + nid + " " + toSelector( groups[i] );
    					}
    					newSelector = groups.join( "," );

    					// Expand context for sibling selectors
    					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
    						context;
    				}

    				if ( newSelector ) {
    					try {
    						push.apply( results,
    							newContext.querySelectorAll( newSelector )
    						);
    						return results;
    					} catch ( qsaError ) {
    					} finally {
    						if ( nid === expando ) {
    							context.removeAttribute( "id" );
    						}
    					}
    				}
    			}
    		}
    	}

    	// All others
    	return select( selector.replace( rtrim, "$1" ), context, results, seed );
    }

    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */
    function createCache() {
    	var keys = [];

    	function cache( key, value ) {
    		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
    		if ( keys.push( key + " " ) > Expr.cacheLength ) {
    			// Only keep the most recent entries
    			delete cache[ keys.shift() ];
    		}
    		return (cache[ key + " " ] = value);
    	}
    	return cache;
    }

    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction( fn ) {
    	fn[ expando ] = true;
    	return fn;
    }

    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */
    function assert( fn ) {
    	var el = document.createElement("fieldset");

    	try {
    		return !!fn( el );
    	} catch (e) {
    		return false;
    	} finally {
    		// Remove from its parent by default
    		if ( el.parentNode ) {
    			el.parentNode.removeChild( el );
    		}
    		// release memory in IE
    		el = null;
    	}
    }

    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle( attrs, handler ) {
    	var arr = attrs.split("|"),
    		i = arr.length;

    	while ( i-- ) {
    		Expr.attrHandle[ arr[i] ] = handler;
    	}
    }

    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck( a, b ) {
    	var cur = b && a,
    		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
    			a.sourceIndex - b.sourceIndex;

    	// Use IE sourceIndex if available on both nodes
    	if ( diff ) {
    		return diff;
    	}

    	// Check if b follows a
    	if ( cur ) {
    		while ( (cur = cur.nextSibling) ) {
    			if ( cur === b ) {
    				return -1;
    			}
    		}
    	}

    	return a ? 1 : -1;
    }

    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo( type ) {
    	return function( elem ) {
    		var name = elem.nodeName.toLowerCase();
    		return name === "input" && elem.type === type;
    	};
    }

    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo( type ) {
    	return function( elem ) {
    		var name = elem.nodeName.toLowerCase();
    		return (name === "input" || name === "button") && elem.type === type;
    	};
    }

    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */
    function createDisabledPseudo( disabled ) {

    	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
    	return function( elem ) {

    		// Only certain elements can match :enabled or :disabled
    		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
    		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
    		if ( "form" in elem ) {

    			// Check for inherited disabledness on relevant non-disabled elements:
    			// * listed form-associated elements in a disabled fieldset
    			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
    			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
    			// * option elements in a disabled optgroup
    			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
    			// All such elements have a "form" property.
    			if ( elem.parentNode && elem.disabled === false ) {

    				// Option elements defer to a parent optgroup if present
    				if ( "label" in elem ) {
    					if ( "label" in elem.parentNode ) {
    						return elem.parentNode.disabled === disabled;
    					} else {
    						return elem.disabled === disabled;
    					}
    				}

    				// Support: IE 6 - 11
    				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
    				return elem.isDisabled === disabled ||

    					// Where there is no isDisabled, check manually
    					/* jshint -W018 */
    					elem.isDisabled !== !disabled &&
    						disabledAncestor( elem ) === disabled;
    			}

    			return elem.disabled === disabled;

    		// Try to winnow out elements that can't be disabled before trusting the disabled property.
    		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
    		// even exist on them, let alone have a boolean value.
    		} else if ( "label" in elem ) {
    			return elem.disabled === disabled;
    		}

    		// Remaining elements are neither :enabled nor :disabled
    		return false;
    	};
    }

    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo( fn ) {
    	return markFunction(function( argument ) {
    		argument = +argument;
    		return markFunction(function( seed, matches ) {
    			var j,
    				matchIndexes = fn( [], seed.length, argument ),
    				i = matchIndexes.length;

    			// Match elements found at the specified indexes
    			while ( i-- ) {
    				if ( seed[ (j = matchIndexes[i]) ] ) {
    					seed[j] = !(matches[j] = seed[j]);
    				}
    			}
    		});
    	});
    }

    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext( context ) {
    	return context && typeof context.getElementsByTagName !== "undefined" && context;
    }

    // Expose support vars for convenience
    support = Sizzle.support = {};

    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */
    isXML = Sizzle.isXML = function( elem ) {
    	// documentElement is verified for cases where it doesn't yet exist
    	// (such as loading iframes in IE - #4833)
    	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    	return documentElement ? documentElement.nodeName !== "HTML" : false;
    };

    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function( node ) {
    	var hasCompare, subWindow,
    		doc = node ? node.ownerDocument || node : preferredDoc;

    	// Return early if doc is invalid or already selected
    	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
    		return document;
    	}

    	// Update global variables
    	document = doc;
    	docElem = document.documentElement;
    	documentIsHTML = !isXML( document );

    	// Support: IE 9-11, Edge
    	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
    	if ( preferredDoc !== document &&
    		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

    		// Support: IE 11, Edge
    		if ( subWindow.addEventListener ) {
    			subWindow.addEventListener( "unload", unloadHandler, false );

    		// Support: IE 9 - 10 only
    		} else if ( subWindow.attachEvent ) {
    			subWindow.attachEvent( "onunload", unloadHandler );
    		}
    	}

    	/* Attributes
    	---------------------------------------------------------------------- */

    	// Support: IE<8
    	// Verify that getAttribute really returns attributes and not properties
    	// (excepting IE8 booleans)
    	support.attributes = assert(function( el ) {
    		el.className = "i";
    		return !el.getAttribute("className");
    	});

    	/* getElement(s)By*
    	---------------------------------------------------------------------- */

    	// Check if getElementsByTagName("*") returns only elements
    	support.getElementsByTagName = assert(function( el ) {
    		el.appendChild( document.createComment("") );
    		return !el.getElementsByTagName("*").length;
    	});

    	// Support: IE<9
    	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

    	// Support: IE<10
    	// Check if getElementById returns elements by name
    	// The broken getElementById methods don't pick up programmatically-set names,
    	// so use a roundabout getElementsByName test
    	support.getById = assert(function( el ) {
    		docElem.appendChild( el ).id = expando;
    		return !document.getElementsByName || !document.getElementsByName( expando ).length;
    	});

    	// ID filter and find
    	if ( support.getById ) {
    		Expr.filter["ID"] = function( id ) {
    			var attrId = id.replace( runescape, funescape );
    			return function( elem ) {
    				return elem.getAttribute("id") === attrId;
    			};
    		};
    		Expr.find["ID"] = function( id, context ) {
    			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
    				var elem = context.getElementById( id );
    				return elem ? [ elem ] : [];
    			}
    		};
    	} else {
    		Expr.filter["ID"] =  function( id ) {
    			var attrId = id.replace( runescape, funescape );
    			return function( elem ) {
    				var node = typeof elem.getAttributeNode !== "undefined" &&
    					elem.getAttributeNode("id");
    				return node && node.value === attrId;
    			};
    		};

    		// Support: IE 6 - 7 only
    		// getElementById is not reliable as a find shortcut
    		Expr.find["ID"] = function( id, context ) {
    			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
    				var node, i, elems,
    					elem = context.getElementById( id );

    				if ( elem ) {

    					// Verify the id attribute
    					node = elem.getAttributeNode("id");
    					if ( node && node.value === id ) {
    						return [ elem ];
    					}

    					// Fall back on getElementsByName
    					elems = context.getElementsByName( id );
    					i = 0;
    					while ( (elem = elems[i++]) ) {
    						node = elem.getAttributeNode("id");
    						if ( node && node.value === id ) {
    							return [ elem ];
    						}
    					}
    				}

    				return [];
    			}
    		};
    	}

    	// Tag
    	Expr.find["TAG"] = support.getElementsByTagName ?
    		function( tag, context ) {
    			if ( typeof context.getElementsByTagName !== "undefined" ) {
    				return context.getElementsByTagName( tag );

    			// DocumentFragment nodes don't have gEBTN
    			} else if ( support.qsa ) {
    				return context.querySelectorAll( tag );
    			}
    		} :

    		function( tag, context ) {
    			var elem,
    				tmp = [],
    				i = 0,
    				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
    				results = context.getElementsByTagName( tag );

    			// Filter out possible comments
    			if ( tag === "*" ) {
    				while ( (elem = results[i++]) ) {
    					if ( elem.nodeType === 1 ) {
    						tmp.push( elem );
    					}
    				}

    				return tmp;
    			}
    			return results;
    		};

    	// Class
    	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
    		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
    			return context.getElementsByClassName( className );
    		}
    	};

    	/* QSA/matchesSelector
    	---------------------------------------------------------------------- */

    	// QSA and matchesSelector support

    	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
    	rbuggyMatches = [];

    	// qSa(:focus) reports false when true (Chrome 21)
    	// We allow this because of a bug in IE8/9 that throws an error
    	// whenever `document.activeElement` is accessed on an iframe
    	// So, we allow :focus to pass through QSA all the time to avoid the IE error
    	// See https://bugs.jquery.com/ticket/13378
    	rbuggyQSA = [];

    	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
    		// Build QSA regex
    		// Regex strategy adopted from Diego Perini
    		assert(function( el ) {
    			// Select is set to empty string on purpose
    			// This is to test IE's treatment of not explicitly
    			// setting a boolean content attribute,
    			// since its presence should be enough
    			// https://bugs.jquery.com/ticket/12359
    			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
    				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
    				"<option selected=''></option></select>";

    			// Support: IE8, Opera 11-12.16
    			// Nothing should be selected when empty strings follow ^= or $= or *=
    			// The test attribute must be unknown in Opera but "safe" for WinRT
    			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
    			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
    				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
    			}

    			// Support: IE8
    			// Boolean attributes and "value" are not treated correctly
    			if ( !el.querySelectorAll("[selected]").length ) {
    				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
    			}

    			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
    			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
    				rbuggyQSA.push("~=");
    			}

    			// Webkit/Opera - :checked should return selected option elements
    			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
    			// IE8 throws error here and will not see later tests
    			if ( !el.querySelectorAll(":checked").length ) {
    				rbuggyQSA.push(":checked");
    			}

    			// Support: Safari 8+, iOS 8+
    			// https://bugs.webkit.org/show_bug.cgi?id=136851
    			// In-page `selector#id sibling-combinator selector` fails
    			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
    				rbuggyQSA.push(".#.+[+~]");
    			}
    		});

    		assert(function( el ) {
    			el.innerHTML = "<a href='' disabled='disabled'></a>" +
    				"<select disabled='disabled'><option/></select>";

    			// Support: Windows 8 Native Apps
    			// The type and name attributes are restricted during .innerHTML assignment
    			var input = document.createElement("input");
    			input.setAttribute( "type", "hidden" );
    			el.appendChild( input ).setAttribute( "name", "D" );

    			// Support: IE8
    			// Enforce case-sensitivity of name attribute
    			if ( el.querySelectorAll("[name=d]").length ) {
    				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
    			}

    			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
    			// IE8 throws error here and will not see later tests
    			if ( el.querySelectorAll(":enabled").length !== 2 ) {
    				rbuggyQSA.push( ":enabled", ":disabled" );
    			}

    			// Support: IE9-11+
    			// IE's :disabled selector does not pick up the children of disabled fieldsets
    			docElem.appendChild( el ).disabled = true;
    			if ( el.querySelectorAll(":disabled").length !== 2 ) {
    				rbuggyQSA.push( ":enabled", ":disabled" );
    			}

    			// Opera 10-11 does not throw on post-comma invalid pseudos
    			el.querySelectorAll("*,:x");
    			rbuggyQSA.push(",.*:");
    		});
    	}

    	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
    		docElem.webkitMatchesSelector ||
    		docElem.mozMatchesSelector ||
    		docElem.oMatchesSelector ||
    		docElem.msMatchesSelector) )) ) {

    		assert(function( el ) {
    			// Check to see if it's possible to do matchesSelector
    			// on a disconnected node (IE 9)
    			support.disconnectedMatch = matches.call( el, "*" );

    			// This should fail with an exception
    			// Gecko does not error, returns false instead
    			matches.call( el, "[s!='']:x" );
    			rbuggyMatches.push( "!=", pseudos );
    		});
    	}

    	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
    	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

    	/* Contains
    	---------------------------------------------------------------------- */
    	hasCompare = rnative.test( docElem.compareDocumentPosition );

    	// Element contains another
    	// Purposefully self-exclusive
    	// As in, an element does not contain itself
    	contains = hasCompare || rnative.test( docElem.contains ) ?
    		function( a, b ) {
    			var adown = a.nodeType === 9 ? a.documentElement : a,
    				bup = b && b.parentNode;
    			return a === bup || !!( bup && bup.nodeType === 1 && (
    				adown.contains ?
    					adown.contains( bup ) :
    					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
    			));
    		} :
    		function( a, b ) {
    			if ( b ) {
    				while ( (b = b.parentNode) ) {
    					if ( b === a ) {
    						return true;
    					}
    				}
    			}
    			return false;
    		};

    	/* Sorting
    	---------------------------------------------------------------------- */

    	// Document order sorting
    	sortOrder = hasCompare ?
    	function( a, b ) {

    		// Flag for duplicate removal
    		if ( a === b ) {
    			hasDuplicate = true;
    			return 0;
    		}

    		// Sort on method existence if only one input has compareDocumentPosition
    		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
    		if ( compare ) {
    			return compare;
    		}

    		// Calculate position if both inputs belong to the same document
    		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
    			a.compareDocumentPosition( b ) :

    			// Otherwise we know they are disconnected
    			1;

    		// Disconnected nodes
    		if ( compare & 1 ||
    			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

    			// Choose the first element that is related to our preferred document
    			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
    				return -1;
    			}
    			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
    				return 1;
    			}

    			// Maintain original order
    			return sortInput ?
    				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
    				0;
    		}

    		return compare & 4 ? -1 : 1;
    	} :
    	function( a, b ) {
    		// Exit early if the nodes are identical
    		if ( a === b ) {
    			hasDuplicate = true;
    			return 0;
    		}

    		var cur,
    			i = 0,
    			aup = a.parentNode,
    			bup = b.parentNode,
    			ap = [ a ],
    			bp = [ b ];

    		// Parentless nodes are either documents or disconnected
    		if ( !aup || !bup ) {
    			return a === document ? -1 :
    				b === document ? 1 :
    				aup ? -1 :
    				bup ? 1 :
    				sortInput ?
    				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
    				0;

    		// If the nodes are siblings, we can do a quick check
    		} else if ( aup === bup ) {
    			return siblingCheck( a, b );
    		}

    		// Otherwise we need full lists of their ancestors for comparison
    		cur = a;
    		while ( (cur = cur.parentNode) ) {
    			ap.unshift( cur );
    		}
    		cur = b;
    		while ( (cur = cur.parentNode) ) {
    			bp.unshift( cur );
    		}

    		// Walk down the tree looking for a discrepancy
    		while ( ap[i] === bp[i] ) {
    			i++;
    		}

    		return i ?
    			// Do a sibling check if the nodes have a common ancestor
    			siblingCheck( ap[i], bp[i] ) :

    			// Otherwise nodes in our document sort first
    			ap[i] === preferredDoc ? -1 :
    			bp[i] === preferredDoc ? 1 :
    			0;
    	};

    	return document;
    };

    Sizzle.matches = function( expr, elements ) {
    	return Sizzle( expr, null, null, elements );
    };

    Sizzle.matchesSelector = function( elem, expr ) {
    	// Set document vars if needed
    	if ( ( elem.ownerDocument || elem ) !== document ) {
    		setDocument( elem );
    	}

    	// Make sure that attribute selectors are quoted
    	expr = expr.replace( rattributeQuotes, "='$1']" );

    	if ( support.matchesSelector && documentIsHTML &&
    		!compilerCache[ expr + " " ] &&
    		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
    		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

    		try {
    			var ret = matches.call( elem, expr );

    			// IE 9's matchesSelector returns false on disconnected nodes
    			if ( ret || support.disconnectedMatch ||
    					// As well, disconnected nodes are said to be in a document
    					// fragment in IE 9
    					elem.document && elem.document.nodeType !== 11 ) {
    				return ret;
    			}
    		} catch (e) {}
    	}

    	return Sizzle( expr, document, null, [ elem ] ).length > 0;
    };

    Sizzle.contains = function( context, elem ) {
    	// Set document vars if needed
    	if ( ( context.ownerDocument || context ) !== document ) {
    		setDocument( context );
    	}
    	return contains( context, elem );
    };

    Sizzle.attr = function( elem, name ) {
    	// Set document vars if needed
    	if ( ( elem.ownerDocument || elem ) !== document ) {
    		setDocument( elem );
    	}

    	var fn = Expr.attrHandle[ name.toLowerCase() ],
    		// Don't get fooled by Object.prototype properties (jQuery #13807)
    		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
    			fn( elem, name, !documentIsHTML ) :
    			undefined;

    	return val !== undefined ?
    		val :
    		support.attributes || !documentIsHTML ?
    			elem.getAttribute( name ) :
    			(val = elem.getAttributeNode(name)) && val.specified ?
    				val.value :
    				null;
    };

    Sizzle.escape = function( sel ) {
    	return (sel + "").replace( rcssescape, fcssescape );
    };

    Sizzle.error = function( msg ) {
    	throw new Error( "Syntax error, unrecognized expression: " + msg );
    };

    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function( results ) {
    	var elem,
    		duplicates = [],
    		j = 0,
    		i = 0;

    	// Unless we *know* we can detect duplicates, assume their presence
    	hasDuplicate = !support.detectDuplicates;
    	sortInput = !support.sortStable && results.slice( 0 );
    	results.sort( sortOrder );

    	if ( hasDuplicate ) {
    		while ( (elem = results[i++]) ) {
    			if ( elem === results[ i ] ) {
    				j = duplicates.push( i );
    			}
    		}
    		while ( j-- ) {
    			results.splice( duplicates[ j ], 1 );
    		}
    	}

    	// Clear input after sorting to release objects
    	// See https://github.com/jquery/sizzle/pull/225
    	sortInput = null;

    	return results;
    };

    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function( elem ) {
    	var node,
    		ret = "",
    		i = 0,
    		nodeType = elem.nodeType;

    	if ( !nodeType ) {
    		// If no nodeType, this is expected to be an array
    		while ( (node = elem[i++]) ) {
    			// Do not traverse comment nodes
    			ret += getText( node );
    		}
    	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
    		// Use textContent for elements
    		// innerText usage removed for consistency of new lines (jQuery #11153)
    		if ( typeof elem.textContent === "string" ) {
    			return elem.textContent;
    		} else {
    			// Traverse its children
    			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
    				ret += getText( elem );
    			}
    		}
    	} else if ( nodeType === 3 || nodeType === 4 ) {
    		return elem.nodeValue;
    	}
    	// Do not include comment or processing instruction nodes

    	return ret;
    };

    Expr = Sizzle.selectors = {

    	// Can be adjusted by the user
    	cacheLength: 50,

    	createPseudo: markFunction,

    	match: matchExpr,

    	attrHandle: {},

    	find: {},

    	relative: {
    		">": { dir: "parentNode", first: true },
    		" ": { dir: "parentNode" },
    		"+": { dir: "previousSibling", first: true },
    		"~": { dir: "previousSibling" }
    	},

    	preFilter: {
    		"ATTR": function( match ) {
    			match[1] = match[1].replace( runescape, funescape );

    			// Move the given value to match[3] whether quoted or unquoted
    			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

    			if ( match[2] === "~=" ) {
    				match[3] = " " + match[3] + " ";
    			}

    			return match.slice( 0, 4 );
    		},

    		"CHILD": function( match ) {
    			/* matches from matchExpr["CHILD"]
    				1 type (only|nth|...)
    				2 what (child|of-type)
    				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
    				4 xn-component of xn+y argument ([+-]?\d*n|)
    				5 sign of xn-component
    				6 x of xn-component
    				7 sign of y-component
    				8 y of y-component
    			*/
    			match[1] = match[1].toLowerCase();

    			if ( match[1].slice( 0, 3 ) === "nth" ) {
    				// nth-* requires argument
    				if ( !match[3] ) {
    					Sizzle.error( match[0] );
    				}

    				// numeric x and y parameters for Expr.filter.CHILD
    				// remember that false/true cast respectively to 0/1
    				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
    				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

    			// other types prohibit arguments
    			} else if ( match[3] ) {
    				Sizzle.error( match[0] );
    			}

    			return match;
    		},

    		"PSEUDO": function( match ) {
    			var excess,
    				unquoted = !match[6] && match[2];

    			if ( matchExpr["CHILD"].test( match[0] ) ) {
    				return null;
    			}

    			// Accept quoted arguments as-is
    			if ( match[3] ) {
    				match[2] = match[4] || match[5] || "";

    			// Strip excess characters from unquoted arguments
    			} else if ( unquoted && rpseudo.test( unquoted ) &&
    				// Get excess from tokenize (recursively)
    				(excess = tokenize( unquoted, true )) &&
    				// advance to the next closing parenthesis
    				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

    				// excess is a negative index
    				match[0] = match[0].slice( 0, excess );
    				match[2] = unquoted.slice( 0, excess );
    			}

    			// Return only captures needed by the pseudo filter method (type and argument)
    			return match.slice( 0, 3 );
    		}
    	},

    	filter: {

    		"TAG": function( nodeNameSelector ) {
    			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
    			return nodeNameSelector === "*" ?
    				function() { return true; } :
    				function( elem ) {
    					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
    				};
    		},

    		"CLASS": function( className ) {
    			var pattern = classCache[ className + " " ];

    			return pattern ||
    				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
    				classCache( className, function( elem ) {
    					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
    				});
    		},

    		"ATTR": function( name, operator, check ) {
    			return function( elem ) {
    				var result = Sizzle.attr( elem, name );

    				if ( result == null ) {
    					return operator === "!=";
    				}
    				if ( !operator ) {
    					return true;
    				}

    				result += "";

    				return operator === "=" ? result === check :
    					operator === "!=" ? result !== check :
    					operator === "^=" ? check && result.indexOf( check ) === 0 :
    					operator === "*=" ? check && result.indexOf( check ) > -1 :
    					operator === "$=" ? check && result.slice( -check.length ) === check :
    					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
    					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
    					false;
    			};
    		},

    		"CHILD": function( type, what, argument, first, last ) {
    			var simple = type.slice( 0, 3 ) !== "nth",
    				forward = type.slice( -4 ) !== "last",
    				ofType = what === "of-type";

    			return first === 1 && last === 0 ?

    				// Shortcut for :nth-*(n)
    				function( elem ) {
    					return !!elem.parentNode;
    				} :

    				function( elem, context, xml ) {
    					var cache, uniqueCache, outerCache, node, nodeIndex, start,
    						dir = simple !== forward ? "nextSibling" : "previousSibling",
    						parent = elem.parentNode,
    						name = ofType && elem.nodeName.toLowerCase(),
    						useCache = !xml && !ofType,
    						diff = false;

    					if ( parent ) {

    						// :(first|last|only)-(child|of-type)
    						if ( simple ) {
    							while ( dir ) {
    								node = elem;
    								while ( (node = node[ dir ]) ) {
    									if ( ofType ?
    										node.nodeName.toLowerCase() === name :
    										node.nodeType === 1 ) {

    										return false;
    									}
    								}
    								// Reverse direction for :only-* (if we haven't yet done so)
    								start = dir = type === "only" && !start && "nextSibling";
    							}
    							return true;
    						}

    						start = [ forward ? parent.firstChild : parent.lastChild ];

    						// non-xml :nth-child(...) stores cache data on `parent`
    						if ( forward && useCache ) {

    							// Seek `elem` from a previously-cached index

    							// ...in a gzip-friendly way
    							node = parent;
    							outerCache = node[ expando ] || (node[ expando ] = {});

    							// Support: IE <9 only
    							// Defend against cloned attroperties (jQuery gh-1709)
    							uniqueCache = outerCache[ node.uniqueID ] ||
    								(outerCache[ node.uniqueID ] = {});

    							cache = uniqueCache[ type ] || [];
    							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
    							diff = nodeIndex && cache[ 2 ];
    							node = nodeIndex && parent.childNodes[ nodeIndex ];

    							while ( (node = ++nodeIndex && node && node[ dir ] ||

    								// Fallback to seeking `elem` from the start
    								(diff = nodeIndex = 0) || start.pop()) ) {

    								// When found, cache indexes on `parent` and break
    								if ( node.nodeType === 1 && ++diff && node === elem ) {
    									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
    									break;
    								}
    							}

    						} else {
    							// Use previously-cached element index if available
    							if ( useCache ) {
    								// ...in a gzip-friendly way
    								node = elem;
    								outerCache = node[ expando ] || (node[ expando ] = {});

    								// Support: IE <9 only
    								// Defend against cloned attroperties (jQuery gh-1709)
    								uniqueCache = outerCache[ node.uniqueID ] ||
    									(outerCache[ node.uniqueID ] = {});

    								cache = uniqueCache[ type ] || [];
    								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
    								diff = nodeIndex;
    							}

    							// xml :nth-child(...)
    							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
    							if ( diff === false ) {
    								// Use the same loop as above to seek `elem` from the start
    								while ( (node = ++nodeIndex && node && node[ dir ] ||
    									(diff = nodeIndex = 0) || start.pop()) ) {

    									if ( ( ofType ?
    										node.nodeName.toLowerCase() === name :
    										node.nodeType === 1 ) &&
    										++diff ) {

    										// Cache the index of each encountered element
    										if ( useCache ) {
    											outerCache = node[ expando ] || (node[ expando ] = {});

    											// Support: IE <9 only
    											// Defend against cloned attroperties (jQuery gh-1709)
    											uniqueCache = outerCache[ node.uniqueID ] ||
    												(outerCache[ node.uniqueID ] = {});

    											uniqueCache[ type ] = [ dirruns, diff ];
    										}

    										if ( node === elem ) {
    											break;
    										}
    									}
    								}
    							}
    						}

    						// Incorporate the offset, then check against cycle size
    						diff -= last;
    						return diff === first || ( diff % first === 0 && diff / first >= 0 );
    					}
    				};
    		},

    		"PSEUDO": function( pseudo, argument ) {
    			// pseudo-class names are case-insensitive
    			// http://www.w3.org/TR/selectors/#pseudo-classes
    			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
    			// Remember that setFilters inherits from pseudos
    			var args,
    				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
    					Sizzle.error( "unsupported pseudo: " + pseudo );

    			// The user may use createPseudo to indicate that
    			// arguments are needed to create the filter function
    			// just as Sizzle does
    			if ( fn[ expando ] ) {
    				return fn( argument );
    			}

    			// But maintain support for old signatures
    			if ( fn.length > 1 ) {
    				args = [ pseudo, pseudo, "", argument ];
    				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
    					markFunction(function( seed, matches ) {
    						var idx,
    							matched = fn( seed, argument ),
    							i = matched.length;
    						while ( i-- ) {
    							idx = indexOf( seed, matched[i] );
    							seed[ idx ] = !( matches[ idx ] = matched[i] );
    						}
    					}) :
    					function( elem ) {
    						return fn( elem, 0, args );
    					};
    			}

    			return fn;
    		}
    	},

    	pseudos: {
    		// Potentially complex pseudos
    		"not": markFunction(function( selector ) {
    			// Trim the selector passed to compile
    			// to avoid treating leading and trailing
    			// spaces as combinators
    			var input = [],
    				results = [],
    				matcher = compile( selector.replace( rtrim, "$1" ) );

    			return matcher[ expando ] ?
    				markFunction(function( seed, matches, context, xml ) {
    					var elem,
    						unmatched = matcher( seed, null, xml, [] ),
    						i = seed.length;

    					// Match elements unmatched by `matcher`
    					while ( i-- ) {
    						if ( (elem = unmatched[i]) ) {
    							seed[i] = !(matches[i] = elem);
    						}
    					}
    				}) :
    				function( elem, context, xml ) {
    					input[0] = elem;
    					matcher( input, null, xml, results );
    					// Don't keep the element (issue #299)
    					input[0] = null;
    					return !results.pop();
    				};
    		}),

    		"has": markFunction(function( selector ) {
    			return function( elem ) {
    				return Sizzle( selector, elem ).length > 0;
    			};
    		}),

    		"contains": markFunction(function( text ) {
    			text = text.replace( runescape, funescape );
    			return function( elem ) {
    				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
    			};
    		}),

    		// "Whether an element is represented by a :lang() selector
    		// is based solely on the element's language value
    		// being equal to the identifier C,
    		// or beginning with the identifier C immediately followed by "-".
    		// The matching of C against the element's language value is performed case-insensitively.
    		// The identifier C does not have to be a valid language name."
    		// http://www.w3.org/TR/selectors/#lang-pseudo
    		"lang": markFunction( function( lang ) {
    			// lang value must be a valid identifier
    			if ( !ridentifier.test(lang || "") ) {
    				Sizzle.error( "unsupported lang: " + lang );
    			}
    			lang = lang.replace( runescape, funescape ).toLowerCase();
    			return function( elem ) {
    				var elemLang;
    				do {
    					if ( (elemLang = documentIsHTML ?
    						elem.lang :
    						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

    						elemLang = elemLang.toLowerCase();
    						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
    					}
    				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
    				return false;
    			};
    		}),

    		// Miscellaneous
    		"target": function( elem ) {
    			var hash = window.location && window.location.hash;
    			return hash && hash.slice( 1 ) === elem.id;
    		},

    		"root": function( elem ) {
    			return elem === docElem;
    		},

    		"focus": function( elem ) {
    			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
    		},

    		// Boolean properties
    		"enabled": createDisabledPseudo( false ),
    		"disabled": createDisabledPseudo( true ),

    		"checked": function( elem ) {
    			// In CSS3, :checked should return both checked and selected elements
    			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
    			var nodeName = elem.nodeName.toLowerCase();
    			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
    		},

    		"selected": function( elem ) {
    			// Accessing this property makes selected-by-default
    			// options in Safari work properly
    			if ( elem.parentNode ) {
    				elem.parentNode.selectedIndex;
    			}

    			return elem.selected === true;
    		},

    		// Contents
    		"empty": function( elem ) {
    			// http://www.w3.org/TR/selectors/#empty-pseudo
    			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
    			//   but not by others (comment: 8; processing instruction: 7; etc.)
    			// nodeType < 6 works because attributes (2) do not appear as children
    			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
    				if ( elem.nodeType < 6 ) {
    					return false;
    				}
    			}
    			return true;
    		},

    		"parent": function( elem ) {
    			return !Expr.pseudos["empty"]( elem );
    		},

    		// Element/input types
    		"header": function( elem ) {
    			return rheader.test( elem.nodeName );
    		},

    		"input": function( elem ) {
    			return rinputs.test( elem.nodeName );
    		},

    		"button": function( elem ) {
    			var name = elem.nodeName.toLowerCase();
    			return name === "input" && elem.type === "button" || name === "button";
    		},

    		"text": function( elem ) {
    			var attr;
    			return elem.nodeName.toLowerCase() === "input" &&
    				elem.type === "text" &&

    				// Support: IE<8
    				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
    				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
    		},

    		// Position-in-collection
    		"first": createPositionalPseudo(function() {
    			return [ 0 ];
    		}),

    		"last": createPositionalPseudo(function( matchIndexes, length ) {
    			return [ length - 1 ];
    		}),

    		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
    			return [ argument < 0 ? argument + length : argument ];
    		}),

    		"even": createPositionalPseudo(function( matchIndexes, length ) {
    			var i = 0;
    			for ( ; i < length; i += 2 ) {
    				matchIndexes.push( i );
    			}
    			return matchIndexes;
    		}),

    		"odd": createPositionalPseudo(function( matchIndexes, length ) {
    			var i = 1;
    			for ( ; i < length; i += 2 ) {
    				matchIndexes.push( i );
    			}
    			return matchIndexes;
    		}),

    		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
    			var i = argument < 0 ? argument + length : argument;
    			for ( ; --i >= 0; ) {
    				matchIndexes.push( i );
    			}
    			return matchIndexes;
    		}),

    		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
    			var i = argument < 0 ? argument + length : argument;
    			for ( ; ++i < length; ) {
    				matchIndexes.push( i );
    			}
    			return matchIndexes;
    		})
    	}
    };

    Expr.pseudos["nth"] = Expr.pseudos["eq"];

    // Add button/input type pseudos
    for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
    	Expr.pseudos[ i ] = createInputPseudo( i );
    }
    for ( i in { submit: true, reset: true } ) {
    	Expr.pseudos[ i ] = createButtonPseudo( i );
    }

    // Easy API for creating new setFilters
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();

    tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
    	var matched, match, tokens, type,
    		soFar, groups, preFilters,
    		cached = tokenCache[ selector + " " ];

    	if ( cached ) {
    		return parseOnly ? 0 : cached.slice( 0 );
    	}

    	soFar = selector;
    	groups = [];
    	preFilters = Expr.preFilter;

    	while ( soFar ) {

    		// Comma and first run
    		if ( !matched || (match = rcomma.exec( soFar )) ) {
    			if ( match ) {
    				// Don't consume trailing commas as valid
    				soFar = soFar.slice( match[0].length ) || soFar;
    			}
    			groups.push( (tokens = []) );
    		}

    		matched = false;

    		// Combinators
    		if ( (match = rcombinators.exec( soFar )) ) {
    			matched = match.shift();
    			tokens.push({
    				value: matched,
    				// Cast descendant combinators to space
    				type: match[0].replace( rtrim, " " )
    			});
    			soFar = soFar.slice( matched.length );
    		}

    		// Filters
    		for ( type in Expr.filter ) {
    			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
    				(match = preFilters[ type ]( match ))) ) {
    				matched = match.shift();
    				tokens.push({
    					value: matched,
    					type: type,
    					matches: match
    				});
    				soFar = soFar.slice( matched.length );
    			}
    		}

    		if ( !matched ) {
    			break;
    		}
    	}

    	// Return the length of the invalid excess
    	// if we're just parsing
    	// Otherwise, throw an error or return tokens
    	return parseOnly ?
    		soFar.length :
    		soFar ?
    			Sizzle.error( selector ) :
    			// Cache the tokens
    			tokenCache( selector, groups ).slice( 0 );
    };

    function toSelector( tokens ) {
    	var i = 0,
    		len = tokens.length,
    		selector = "";
    	for ( ; i < len; i++ ) {
    		selector += tokens[i].value;
    	}
    	return selector;
    }

    function addCombinator( matcher, combinator, base ) {
    	var dir = combinator.dir,
    		skip = combinator.next,
    		key = skip || dir,
    		checkNonElements = base && key === "parentNode",
    		doneName = done++;

    	return combinator.first ?
    		// Check against closest ancestor/preceding element
    		function( elem, context, xml ) {
    			while ( (elem = elem[ dir ]) ) {
    				if ( elem.nodeType === 1 || checkNonElements ) {
    					return matcher( elem, context, xml );
    				}
    			}
    			return false;
    		} :

    		// Check against all ancestor/preceding elements
    		function( elem, context, xml ) {
    			var oldCache, uniqueCache, outerCache,
    				newCache = [ dirruns, doneName ];

    			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
    			if ( xml ) {
    				while ( (elem = elem[ dir ]) ) {
    					if ( elem.nodeType === 1 || checkNonElements ) {
    						if ( matcher( elem, context, xml ) ) {
    							return true;
    						}
    					}
    				}
    			} else {
    				while ( (elem = elem[ dir ]) ) {
    					if ( elem.nodeType === 1 || checkNonElements ) {
    						outerCache = elem[ expando ] || (elem[ expando ] = {});

    						// Support: IE <9 only
    						// Defend against cloned attroperties (jQuery gh-1709)
    						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

    						if ( skip && skip === elem.nodeName.toLowerCase() ) {
    							elem = elem[ dir ] || elem;
    						} else if ( (oldCache = uniqueCache[ key ]) &&
    							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

    							// Assign to newCache so results back-propagate to previous elements
    							return (newCache[ 2 ] = oldCache[ 2 ]);
    						} else {
    							// Reuse newcache so results back-propagate to previous elements
    							uniqueCache[ key ] = newCache;

    							// A match means we're done; a fail means we have to keep checking
    							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
    								return true;
    							}
    						}
    					}
    				}
    			}
    			return false;
    		};
    }

    function elementMatcher( matchers ) {
    	return matchers.length > 1 ?
    		function( elem, context, xml ) {
    			var i = matchers.length;
    			while ( i-- ) {
    				if ( !matchers[i]( elem, context, xml ) ) {
    					return false;
    				}
    			}
    			return true;
    		} :
    		matchers[0];
    }

    function multipleContexts( selector, contexts, results ) {
    	var i = 0,
    		len = contexts.length;
    	for ( ; i < len; i++ ) {
    		Sizzle( selector, contexts[i], results );
    	}
    	return results;
    }

    function condense( unmatched, map, filter, context, xml ) {
    	var elem,
    		newUnmatched = [],
    		i = 0,
    		len = unmatched.length,
    		mapped = map != null;

    	for ( ; i < len; i++ ) {
    		if ( (elem = unmatched[i]) ) {
    			if ( !filter || filter( elem, context, xml ) ) {
    				newUnmatched.push( elem );
    				if ( mapped ) {
    					map.push( i );
    				}
    			}
    		}
    	}

    	return newUnmatched;
    }

    function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
    	if ( postFilter && !postFilter[ expando ] ) {
    		postFilter = setMatcher( postFilter );
    	}
    	if ( postFinder && !postFinder[ expando ] ) {
    		postFinder = setMatcher( postFinder, postSelector );
    	}
    	return markFunction(function( seed, results, context, xml ) {
    		var temp, i, elem,
    			preMap = [],
    			postMap = [],
    			preexisting = results.length,

    			// Get initial elements from seed or context
    			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

    			// Prefilter to get matcher input, preserving a map for seed-results synchronization
    			matcherIn = preFilter && ( seed || !selector ) ?
    				condense( elems, preMap, preFilter, context, xml ) :
    				elems,

    			matcherOut = matcher ?
    				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
    				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

    					// ...intermediate processing is necessary
    					[] :

    					// ...otherwise use results directly
    					results :
    				matcherIn;

    		// Find primary matches
    		if ( matcher ) {
    			matcher( matcherIn, matcherOut, context, xml );
    		}

    		// Apply postFilter
    		if ( postFilter ) {
    			temp = condense( matcherOut, postMap );
    			postFilter( temp, [], context, xml );

    			// Un-match failing elements by moving them back to matcherIn
    			i = temp.length;
    			while ( i-- ) {
    				if ( (elem = temp[i]) ) {
    					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
    				}
    			}
    		}

    		if ( seed ) {
    			if ( postFinder || preFilter ) {
    				if ( postFinder ) {
    					// Get the final matcherOut by condensing this intermediate into postFinder contexts
    					temp = [];
    					i = matcherOut.length;
    					while ( i-- ) {
    						if ( (elem = matcherOut[i]) ) {
    							// Restore matcherIn since elem is not yet a final match
    							temp.push( (matcherIn[i] = elem) );
    						}
    					}
    					postFinder( null, (matcherOut = []), temp, xml );
    				}

    				// Move matched elements from seed to results to keep them synchronized
    				i = matcherOut.length;
    				while ( i-- ) {
    					if ( (elem = matcherOut[i]) &&
    						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

    						seed[temp] = !(results[temp] = elem);
    					}
    				}
    			}

    		// Add elements to results, through postFinder if defined
    		} else {
    			matcherOut = condense(
    				matcherOut === results ?
    					matcherOut.splice( preexisting, matcherOut.length ) :
    					matcherOut
    			);
    			if ( postFinder ) {
    				postFinder( null, results, matcherOut, xml );
    			} else {
    				push.apply( results, matcherOut );
    			}
    		}
    	});
    }

    function matcherFromTokens( tokens ) {
    	var checkContext, matcher, j,
    		len = tokens.length,
    		leadingRelative = Expr.relative[ tokens[0].type ],
    		implicitRelative = leadingRelative || Expr.relative[" "],
    		i = leadingRelative ? 1 : 0,

    		// The foundational matcher ensures that elements are reachable from top-level context(s)
    		matchContext = addCombinator( function( elem ) {
    			return elem === checkContext;
    		}, implicitRelative, true ),
    		matchAnyContext = addCombinator( function( elem ) {
    			return indexOf( checkContext, elem ) > -1;
    		}, implicitRelative, true ),
    		matchers = [ function( elem, context, xml ) {
    			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
    				(checkContext = context).nodeType ?
    					matchContext( elem, context, xml ) :
    					matchAnyContext( elem, context, xml ) );
    			// Avoid hanging onto element (issue #299)
    			checkContext = null;
    			return ret;
    		} ];

    	for ( ; i < len; i++ ) {
    		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
    			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
    		} else {
    			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

    			// Return special upon seeing a positional matcher
    			if ( matcher[ expando ] ) {
    				// Find the next relative operator (if any) for proper handling
    				j = ++i;
    				for ( ; j < len; j++ ) {
    					if ( Expr.relative[ tokens[j].type ] ) {
    						break;
    					}
    				}
    				return setMatcher(
    					i > 1 && elementMatcher( matchers ),
    					i > 1 && toSelector(
    						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
    						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
    					).replace( rtrim, "$1" ),
    					matcher,
    					i < j && matcherFromTokens( tokens.slice( i, j ) ),
    					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
    					j < len && toSelector( tokens )
    				);
    			}
    			matchers.push( matcher );
    		}
    	}

    	return elementMatcher( matchers );
    }

    function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
    	var bySet = setMatchers.length > 0,
    		byElement = elementMatchers.length > 0,
    		superMatcher = function( seed, context, xml, results, outermost ) {
    			var elem, j, matcher,
    				matchedCount = 0,
    				i = "0",
    				unmatched = seed && [],
    				setMatched = [],
    				contextBackup = outermostContext,
    				// We must always have either seed elements or outermost context
    				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
    				// Use integer dirruns iff this is the outermost matcher
    				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
    				len = elems.length;

    			if ( outermost ) {
    				outermostContext = context === document || context || outermost;
    			}

    			// Add elements passing elementMatchers directly to results
    			// Support: IE<9, Safari
    			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
    			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
    				if ( byElement && elem ) {
    					j = 0;
    					if ( !context && elem.ownerDocument !== document ) {
    						setDocument( elem );
    						xml = !documentIsHTML;
    					}
    					while ( (matcher = elementMatchers[j++]) ) {
    						if ( matcher( elem, context || document, xml) ) {
    							results.push( elem );
    							break;
    						}
    					}
    					if ( outermost ) {
    						dirruns = dirrunsUnique;
    					}
    				}

    				// Track unmatched elements for set filters
    				if ( bySet ) {
    					// They will have gone through all possible matchers
    					if ( (elem = !matcher && elem) ) {
    						matchedCount--;
    					}

    					// Lengthen the array for every element, matched or not
    					if ( seed ) {
    						unmatched.push( elem );
    					}
    				}
    			}

    			// `i` is now the count of elements visited above, and adding it to `matchedCount`
    			// makes the latter nonnegative.
    			matchedCount += i;

    			// Apply set filters to unmatched elements
    			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
    			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
    			// no element matchers and no seed.
    			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
    			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
    			// numerically zero.
    			if ( bySet && i !== matchedCount ) {
    				j = 0;
    				while ( (matcher = setMatchers[j++]) ) {
    					matcher( unmatched, setMatched, context, xml );
    				}

    				if ( seed ) {
    					// Reintegrate element matches to eliminate the need for sorting
    					if ( matchedCount > 0 ) {
    						while ( i-- ) {
    							if ( !(unmatched[i] || setMatched[i]) ) {
    								setMatched[i] = pop.call( results );
    							}
    						}
    					}

    					// Discard index placeholder values to get only actual matches
    					setMatched = condense( setMatched );
    				}

    				// Add matches to results
    				push.apply( results, setMatched );

    				// Seedless set matches succeeding multiple successful matchers stipulate sorting
    				if ( outermost && !seed && setMatched.length > 0 &&
    					( matchedCount + setMatchers.length ) > 1 ) {

    					Sizzle.uniqueSort( results );
    				}
    			}

    			// Override manipulation of globals by nested matchers
    			if ( outermost ) {
    				dirruns = dirrunsUnique;
    				outermostContext = contextBackup;
    			}

    			return unmatched;
    		};

    	return bySet ?
    		markFunction( superMatcher ) :
    		superMatcher;
    }

    compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
    	var i,
    		setMatchers = [],
    		elementMatchers = [],
    		cached = compilerCache[ selector + " " ];

    	if ( !cached ) {
    		// Generate a function of recursive functions that can be used to check each element
    		if ( !match ) {
    			match = tokenize( selector );
    		}
    		i = match.length;
    		while ( i-- ) {
    			cached = matcherFromTokens( match[i] );
    			if ( cached[ expando ] ) {
    				setMatchers.push( cached );
    			} else {
    				elementMatchers.push( cached );
    			}
    		}

    		// Cache the compiled function
    		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

    		// Save selector and tokenization
    		cached.selector = selector;
    	}
    	return cached;
    };

    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    select = Sizzle.select = function( selector, context, results, seed ) {
    	var i, tokens, token, type, find,
    		compiled = typeof selector === "function" && selector,
    		match = !seed && tokenize( (selector = compiled.selector || selector) );

    	results = results || [];

    	// Try to minimize operations if there is only one selector in the list and no seed
    	// (the latter of which guarantees us context)
    	if ( match.length === 1 ) {

    		// Reduce context if the leading compound selector is an ID
    		tokens = match[0] = match[0].slice( 0 );
    		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
    				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

    			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
    			if ( !context ) {
    				return results;

    			// Precompiled matchers will still verify ancestry, so step up a level
    			} else if ( compiled ) {
    				context = context.parentNode;
    			}

    			selector = selector.slice( tokens.shift().value.length );
    		}

    		// Fetch a seed set for right-to-left matching
    		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
    		while ( i-- ) {
    			token = tokens[i];

    			// Abort if we hit a combinator
    			if ( Expr.relative[ (type = token.type) ] ) {
    				break;
    			}
    			if ( (find = Expr.find[ type ]) ) {
    				// Search, expanding context for leading sibling combinators
    				if ( (seed = find(
    					token.matches[0].replace( runescape, funescape ),
    					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
    				)) ) {

    					// If seed is empty or no tokens remain, we can return early
    					tokens.splice( i, 1 );
    					selector = seed.length && toSelector( tokens );
    					if ( !selector ) {
    						push.apply( results, seed );
    						return results;
    					}

    					break;
    				}
    			}
    		}
    	}

    	// Compile and execute a filtering function if one is not provided
    	// Provide `match` to avoid retokenization if we modified the selector above
    	( compiled || compile( selector, match ) )(
    		seed,
    		context,
    		!documentIsHTML,
    		results,
    		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
    	);
    	return results;
    };

    // One-time assignments

    // Sort stability
    support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

    // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = !!hasDuplicate;

    // Initialize against the default document
    setDocument();

    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function( el ) {
    	// Should return 1, but returns 4 (following)
    	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
    });

    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if ( !assert(function( el ) {
    	el.innerHTML = "<a href='#'></a>";
    	return el.firstChild.getAttribute("href") === "#" ;
    }) ) {
    	addHandle( "type|href|height|width", function( elem, name, isXML ) {
    		if ( !isXML ) {
    			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
    		}
    	});
    }

    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if ( !support.attributes || !assert(function( el ) {
    	el.innerHTML = "<input/>";
    	el.firstChild.setAttribute( "value", "" );
    	return el.firstChild.getAttribute( "value" ) === "";
    }) ) {
    	addHandle( "value", function( elem, name, isXML ) {
    		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
    			return elem.defaultValue;
    		}
    	});
    }

    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if ( !assert(function( el ) {
    	return el.getAttribute("disabled") == null;
    }) ) {
    	addHandle( booleans, function( elem, name, isXML ) {
    		var val;
    		if ( !isXML ) {
    			return elem[ name ] === true ? name.toLowerCase() :
    					(val = elem.getAttributeNode( name )) && val.specified ?
    					val.value :
    				null;
    		}
    	});
    }

    return Sizzle;

    })( window );



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;

    // Deprecated
    jQuery.expr[ ":" ] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;




    var dir = function( elem, dir, until ) {
    	var matched = [],
    		truncate = until !== undefined;

    	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
    		if ( elem.nodeType === 1 ) {
    			if ( truncate && jQuery( elem ).is( until ) ) {
    				break;
    			}
    			matched.push( elem );
    		}
    	}
    	return matched;
    };


    var siblings = function( n, elem ) {
    	var matched = [];

    	for ( ; n; n = n.nextSibling ) {
    		if ( n.nodeType === 1 && n !== elem ) {
    			matched.push( n );
    		}
    	}

    	return matched;
    };


    var rneedsContext = jQuery.expr.match.needsContext;



    function nodeName( elem, name ) {

      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

    }var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



    // Implement the identical functionality for filter and not
    function winnow( elements, qualifier, not ) {
    	if ( isFunction( qualifier ) ) {
    		return jQuery.grep( elements, function( elem, i ) {
    			return !!qualifier.call( elem, i, elem ) !== not;
    		} );
    	}

    	// Single element
    	if ( qualifier.nodeType ) {
    		return jQuery.grep( elements, function( elem ) {
    			return ( elem === qualifier ) !== not;
    		} );
    	}

    	// Arraylike of elements (jQuery, arguments, Array)
    	if ( typeof qualifier !== "string" ) {
    		return jQuery.grep( elements, function( elem ) {
    			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
    		} );
    	}

    	// Filtered directly for both simple and complex selectors
    	return jQuery.filter( qualifier, elements, not );
    }

    jQuery.filter = function( expr, elems, not ) {
    	var elem = elems[ 0 ];

    	if ( not ) {
    		expr = ":not(" + expr + ")";
    	}

    	if ( elems.length === 1 && elem.nodeType === 1 ) {
    		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
    	}

    	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
    		return elem.nodeType === 1;
    	} ) );
    };

    jQuery.fn.extend( {
    	find: function( selector ) {
    		var i, ret,
    			len = this.length,
    			self = this;

    		if ( typeof selector !== "string" ) {
    			return this.pushStack( jQuery( selector ).filter( function() {
    				for ( i = 0; i < len; i++ ) {
    					if ( jQuery.contains( self[ i ], this ) ) {
    						return true;
    					}
    				}
    			} ) );
    		}

    		ret = this.pushStack( [] );

    		for ( i = 0; i < len; i++ ) {
    			jQuery.find( selector, self[ i ], ret );
    		}

    		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
    	},
    	filter: function( selector ) {
    		return this.pushStack( winnow( this, selector || [], false ) );
    	},
    	not: function( selector ) {
    		return this.pushStack( winnow( this, selector || [], true ) );
    	},
    	is: function( selector ) {
    		return !!winnow(
    			this,

    			// If this is a positional/relative selector, check membership in the returned set
    			// so $("p:first").is("p:last") won't return true for a doc with two "p".
    			typeof selector === "string" && rneedsContext.test( selector ) ?
    				jQuery( selector ) :
    				selector || [],
    			false
    		).length;
    	}
    } );


    // Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,

    	// A simple way to check for HTML strings
    	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    	// Strict HTML recognition (#11290: must start with <)
    	// Shortcut simple #id case for speed
    	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

    	init = jQuery.fn.init = function( selector, context, root ) {
    		var match, elem;

    		// HANDLE: $(""), $(null), $(undefined), $(false)
    		if ( !selector ) {
    			return this;
    		}

    		// Method init() accepts an alternate rootjQuery
    		// so migrate can support jQuery.sub (gh-2101)
    		root = root || rootjQuery;

    		// Handle HTML strings
    		if ( typeof selector === "string" ) {
    			if ( selector[ 0 ] === "<" &&
    				selector[ selector.length - 1 ] === ">" &&
    				selector.length >= 3 ) {

    				// Assume that strings that start and end with <> are HTML and skip the regex check
    				match = [ null, selector, null ];

    			} else {
    				match = rquickExpr.exec( selector );
    			}

    			// Match html or make sure no context is specified for #id
    			if ( match && ( match[ 1 ] || !context ) ) {

    				// HANDLE: $(html) -> $(array)
    				if ( match[ 1 ] ) {
    					context = context instanceof jQuery ? context[ 0 ] : context;

    					// Option to run scripts is true for back-compat
    					// Intentionally let the error be thrown if parseHTML is not present
    					jQuery.merge( this, jQuery.parseHTML(
    						match[ 1 ],
    						context && context.nodeType ? context.ownerDocument || context : document,
    						true
    					) );

    					// HANDLE: $(html, props)
    					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
    						for ( match in context ) {

    							// Properties of context are called as methods if possible
    							if ( isFunction( this[ match ] ) ) {
    								this[ match ]( context[ match ] );

    							// ...and otherwise set as attributes
    							} else {
    								this.attr( match, context[ match ] );
    							}
    						}
    					}

    					return this;

    				// HANDLE: $(#id)
    				} else {
    					elem = document.getElementById( match[ 2 ] );

    					if ( elem ) {

    						// Inject the element directly into the jQuery object
    						this[ 0 ] = elem;
    						this.length = 1;
    					}
    					return this;
    				}

    			// HANDLE: $(expr, $(...))
    			} else if ( !context || context.jquery ) {
    				return ( context || root ).find( selector );

    			// HANDLE: $(expr, context)
    			// (which is just equivalent to: $(context).find(expr)
    			} else {
    				return this.constructor( context ).find( selector );
    			}

    		// HANDLE: $(DOMElement)
    		} else if ( selector.nodeType ) {
    			this[ 0 ] = selector;
    			this.length = 1;
    			return this;

    		// HANDLE: $(function)
    		// Shortcut for document ready
    		} else if ( isFunction( selector ) ) {
    			return root.ready !== undefined ?
    				root.ready( selector ) :

    				// Execute immediately if ready is not present
    				selector( jQuery );
    		}

    		return jQuery.makeArray( selector, this );
    	};

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery( document );


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,

    	// Methods guaranteed to produce a unique set when starting from a unique set
    	guaranteedUnique = {
    		children: true,
    		contents: true,
    		next: true,
    		prev: true
    	};

    jQuery.fn.extend( {
    	has: function( target ) {
    		var targets = jQuery( target, this ),
    			l = targets.length;

    		return this.filter( function() {
    			var i = 0;
    			for ( ; i < l; i++ ) {
    				if ( jQuery.contains( this, targets[ i ] ) ) {
    					return true;
    				}
    			}
    		} );
    	},

    	closest: function( selectors, context ) {
    		var cur,
    			i = 0,
    			l = this.length,
    			matched = [],
    			targets = typeof selectors !== "string" && jQuery( selectors );

    		// Positional selectors never match, since there's no _selection_ context
    		if ( !rneedsContext.test( selectors ) ) {
    			for ( ; i < l; i++ ) {
    				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

    					// Always skip document fragments
    					if ( cur.nodeType < 11 && ( targets ?
    						targets.index( cur ) > -1 :

    						// Don't pass non-elements to Sizzle
    						cur.nodeType === 1 &&
    							jQuery.find.matchesSelector( cur, selectors ) ) ) {

    						matched.push( cur );
    						break;
    					}
    				}
    			}
    		}

    		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
    	},

    	// Determine the position of an element within the set
    	index: function( elem ) {

    		// No argument, return index in parent
    		if ( !elem ) {
    			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
    		}

    		// Index in selector
    		if ( typeof elem === "string" ) {
    			return indexOf.call( jQuery( elem ), this[ 0 ] );
    		}

    		// Locate the position of the desired element
    		return indexOf.call( this,

    			// If it receives a jQuery object, the first element is used
    			elem.jquery ? elem[ 0 ] : elem
    		);
    	},

    	add: function( selector, context ) {
    		return this.pushStack(
    			jQuery.uniqueSort(
    				jQuery.merge( this.get(), jQuery( selector, context ) )
    			)
    		);
    	},

    	addBack: function( selector ) {
    		return this.add( selector == null ?
    			this.prevObject : this.prevObject.filter( selector )
    		);
    	}
    } );

    function sibling( cur, dir ) {
    	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
    	return cur;
    }

    jQuery.each( {
    	parent: function( elem ) {
    		var parent = elem.parentNode;
    		return parent && parent.nodeType !== 11 ? parent : null;
    	},
    	parents: function( elem ) {
    		return dir( elem, "parentNode" );
    	},
    	parentsUntil: function( elem, i, until ) {
    		return dir( elem, "parentNode", until );
    	},
    	next: function( elem ) {
    		return sibling( elem, "nextSibling" );
    	},
    	prev: function( elem ) {
    		return sibling( elem, "previousSibling" );
    	},
    	nextAll: function( elem ) {
    		return dir( elem, "nextSibling" );
    	},
    	prevAll: function( elem ) {
    		return dir( elem, "previousSibling" );
    	},
    	nextUntil: function( elem, i, until ) {
    		return dir( elem, "nextSibling", until );
    	},
    	prevUntil: function( elem, i, until ) {
    		return dir( elem, "previousSibling", until );
    	},
    	siblings: function( elem ) {
    		return siblings( ( elem.parentNode || {} ).firstChild, elem );
    	},
    	children: function( elem ) {
    		return siblings( elem.firstChild );
    	},
    	contents: function( elem ) {
            if ( nodeName( elem, "iframe" ) ) {
                return elem.contentDocument;
            }

            // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
            // Treat the template element as a regular one in browsers that
            // don't support it.
            if ( nodeName( elem, "template" ) ) {
                elem = elem.content || elem;
            }

            return jQuery.merge( [], elem.childNodes );
    	}
    }, function( name, fn ) {
    	jQuery.fn[ name ] = function( until, selector ) {
    		var matched = jQuery.map( this, fn, until );

    		if ( name.slice( -5 ) !== "Until" ) {
    			selector = until;
    		}

    		if ( selector && typeof selector === "string" ) {
    			matched = jQuery.filter( selector, matched );
    		}

    		if ( this.length > 1 ) {

    			// Remove duplicates
    			if ( !guaranteedUnique[ name ] ) {
    				jQuery.uniqueSort( matched );
    			}

    			// Reverse order for parents* and prev-derivatives
    			if ( rparentsprev.test( name ) ) {
    				matched.reverse();
    			}
    		}

    		return this.pushStack( matched );
    	};
    } );
    var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



    // Convert String-formatted options into Object-formatted ones
    function createOptions( options ) {
    	var object = {};
    	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
    		object[ flag ] = true;
    	} );
    	return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function( options ) {

    	// Convert options from String-formatted to Object-formatted if needed
    	// (we check in cache first)
    	options = typeof options === "string" ?
    		createOptions( options ) :
    		jQuery.extend( {}, options );

    	var // Flag to know if list is currently firing
    		firing,

    		// Last fire value for non-forgettable lists
    		memory,

    		// Flag to know if list was already fired
    		fired,

    		// Flag to prevent firing
    		locked,

    		// Actual callback list
    		list = [],

    		// Queue of execution data for repeatable lists
    		queue = [],

    		// Index of currently firing callback (modified by add/remove as needed)
    		firingIndex = -1,

    		// Fire callbacks
    		fire = function() {

    			// Enforce single-firing
    			locked = locked || options.once;

    			// Execute callbacks for all pending executions,
    			// respecting firingIndex overrides and runtime changes
    			fired = firing = true;
    			for ( ; queue.length; firingIndex = -1 ) {
    				memory = queue.shift();
    				while ( ++firingIndex < list.length ) {

    					// Run callback and check for early termination
    					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
    						options.stopOnFalse ) {

    						// Jump to end and forget the data so .add doesn't re-fire
    						firingIndex = list.length;
    						memory = false;
    					}
    				}
    			}

    			// Forget the data if we're done with it
    			if ( !options.memory ) {
    				memory = false;
    			}

    			firing = false;

    			// Clean up if we're done firing for good
    			if ( locked ) {

    				// Keep an empty list if we have data for future add calls
    				if ( memory ) {
    					list = [];

    				// Otherwise, this object is spent
    				} else {
    					list = "";
    				}
    			}
    		},

    		// Actual Callbacks object
    		self = {

    			// Add a callback or a collection of callbacks to the list
    			add: function() {
    				if ( list ) {

    					// If we have memory from a past run, we should fire after adding
    					if ( memory && !firing ) {
    						firingIndex = list.length - 1;
    						queue.push( memory );
    					}

    					( function add( args ) {
    						jQuery.each( args, function( _, arg ) {
    							if ( isFunction( arg ) ) {
    								if ( !options.unique || !self.has( arg ) ) {
    									list.push( arg );
    								}
    							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

    								// Inspect recursively
    								add( arg );
    							}
    						} );
    					} )( arguments );

    					if ( memory && !firing ) {
    						fire();
    					}
    				}
    				return this;
    			},

    			// Remove a callback from the list
    			remove: function() {
    				jQuery.each( arguments, function( _, arg ) {
    					var index;
    					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
    						list.splice( index, 1 );

    						// Handle firing indexes
    						if ( index <= firingIndex ) {
    							firingIndex--;
    						}
    					}
    				} );
    				return this;
    			},

    			// Check if a given callback is in the list.
    			// If no argument is given, return whether or not list has callbacks attached.
    			has: function( fn ) {
    				return fn ?
    					jQuery.inArray( fn, list ) > -1 :
    					list.length > 0;
    			},

    			// Remove all callbacks from the list
    			empty: function() {
    				if ( list ) {
    					list = [];
    				}
    				return this;
    			},

    			// Disable .fire and .add
    			// Abort any current/pending executions
    			// Clear all callbacks and values
    			disable: function() {
    				locked = queue = [];
    				list = memory = "";
    				return this;
    			},
    			disabled: function() {
    				return !list;
    			},

    			// Disable .fire
    			// Also disable .add unless we have memory (since it would have no effect)
    			// Abort any pending executions
    			lock: function() {
    				locked = queue = [];
    				if ( !memory && !firing ) {
    					list = memory = "";
    				}
    				return this;
    			},
    			locked: function() {
    				return !!locked;
    			},

    			// Call all callbacks with the given context and arguments
    			fireWith: function( context, args ) {
    				if ( !locked ) {
    					args = args || [];
    					args = [ context, args.slice ? args.slice() : args ];
    					queue.push( args );
    					if ( !firing ) {
    						fire();
    					}
    				}
    				return this;
    			},

    			// Call all the callbacks with the given arguments
    			fire: function() {
    				self.fireWith( this, arguments );
    				return this;
    			},

    			// To know if the callbacks have already been called at least once
    			fired: function() {
    				return !!fired;
    			}
    		};

    	return self;
    };


    function Identity( v ) {
    	return v;
    }
    function Thrower( ex ) {
    	throw ex;
    }

    function adoptValue( value, resolve, reject, noValue ) {
    	var method;

    	try {

    		// Check for promise aspect first to privilege synchronous behavior
    		if ( value && isFunction( ( method = value.promise ) ) ) {
    			method.call( value ).done( resolve ).fail( reject );

    		// Other thenables
    		} else if ( value && isFunction( ( method = value.then ) ) ) {
    			method.call( value, resolve, reject );

    		// Other non-thenables
    		} else {

    			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
    			// * false: [ value ].slice( 0 ) => resolve( value )
    			// * true: [ value ].slice( 1 ) => resolve()
    			resolve.apply( undefined, [ value ].slice( noValue ) );
    		}

    	// For Promises/A+, convert exceptions into rejections
    	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
    	// Deferred#then to conditionally suppress rejection.
    	} catch ( value ) {

    		// Support: Android 4.0 only
    		// Strict mode functions invoked without .call/.apply get global-object context
    		reject.apply( undefined, [ value ] );
    	}
    }

    jQuery.extend( {

    	Deferred: function( func ) {
    		var tuples = [

    				// action, add listener, callbacks,
    				// ... .then handlers, argument index, [final state]
    				[ "notify", "progress", jQuery.Callbacks( "memory" ),
    					jQuery.Callbacks( "memory" ), 2 ],
    				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
    					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
    				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
    					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
    			],
    			state = "pending",
    			promise = {
    				state: function() {
    					return state;
    				},
    				always: function() {
    					deferred.done( arguments ).fail( arguments );
    					return this;
    				},
    				"catch": function( fn ) {
    					return promise.then( null, fn );
    				},

    				// Keep pipe for back-compat
    				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
    					var fns = arguments;

    					return jQuery.Deferred( function( newDefer ) {
    						jQuery.each( tuples, function( i, tuple ) {

    							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
    							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

    							// deferred.progress(function() { bind to newDefer or newDefer.notify })
    							// deferred.done(function() { bind to newDefer or newDefer.resolve })
    							// deferred.fail(function() { bind to newDefer or newDefer.reject })
    							deferred[ tuple[ 1 ] ]( function() {
    								var returned = fn && fn.apply( this, arguments );
    								if ( returned && isFunction( returned.promise ) ) {
    									returned.promise()
    										.progress( newDefer.notify )
    										.done( newDefer.resolve )
    										.fail( newDefer.reject );
    								} else {
    									newDefer[ tuple[ 0 ] + "With" ](
    										this,
    										fn ? [ returned ] : arguments
    									);
    								}
    							} );
    						} );
    						fns = null;
    					} ).promise();
    				},
    				then: function( onFulfilled, onRejected, onProgress ) {
    					var maxDepth = 0;
    					function resolve( depth, deferred, handler, special ) {
    						return function() {
    							var that = this,
    								args = arguments,
    								mightThrow = function() {
    									var returned, then;

    									// Support: Promises/A+ section 2.3.3.3.3
    									// https://promisesaplus.com/#point-59
    									// Ignore double-resolution attempts
    									if ( depth < maxDepth ) {
    										return;
    									}

    									returned = handler.apply( that, args );

    									// Support: Promises/A+ section 2.3.1
    									// https://promisesaplus.com/#point-48
    									if ( returned === deferred.promise() ) {
    										throw new TypeError( "Thenable self-resolution" );
    									}

    									// Support: Promises/A+ sections 2.3.3.1, 3.5
    									// https://promisesaplus.com/#point-54
    									// https://promisesaplus.com/#point-75
    									// Retrieve `then` only once
    									then = returned &&

    										// Support: Promises/A+ section 2.3.4
    										// https://promisesaplus.com/#point-64
    										// Only check objects and functions for thenability
    										( typeof returned === "object" ||
    											typeof returned === "function" ) &&
    										returned.then;

    									// Handle a returned thenable
    									if ( isFunction( then ) ) {

    										// Special processors (notify) just wait for resolution
    										if ( special ) {
    											then.call(
    												returned,
    												resolve( maxDepth, deferred, Identity, special ),
    												resolve( maxDepth, deferred, Thrower, special )
    											);

    										// Normal processors (resolve) also hook into progress
    										} else {

    											// ...and disregard older resolution values
    											maxDepth++;

    											then.call(
    												returned,
    												resolve( maxDepth, deferred, Identity, special ),
    												resolve( maxDepth, deferred, Thrower, special ),
    												resolve( maxDepth, deferred, Identity,
    													deferred.notifyWith )
    											);
    										}

    									// Handle all other returned values
    									} else {

    										// Only substitute handlers pass on context
    										// and multiple values (non-spec behavior)
    										if ( handler !== Identity ) {
    											that = undefined;
    											args = [ returned ];
    										}

    										// Process the value(s)
    										// Default process is resolve
    										( special || deferred.resolveWith )( that, args );
    									}
    								},

    								// Only normal processors (resolve) catch and reject exceptions
    								process = special ?
    									mightThrow :
    									function() {
    										try {
    											mightThrow();
    										} catch ( e ) {

    											if ( jQuery.Deferred.exceptionHook ) {
    												jQuery.Deferred.exceptionHook( e,
    													process.stackTrace );
    											}

    											// Support: Promises/A+ section 2.3.3.3.4.1
    											// https://promisesaplus.com/#point-61
    											// Ignore post-resolution exceptions
    											if ( depth + 1 >= maxDepth ) {

    												// Only substitute handlers pass on context
    												// and multiple values (non-spec behavior)
    												if ( handler !== Thrower ) {
    													that = undefined;
    													args = [ e ];
    												}

    												deferred.rejectWith( that, args );
    											}
    										}
    									};

    							// Support: Promises/A+ section 2.3.3.3.1
    							// https://promisesaplus.com/#point-57
    							// Re-resolve promises immediately to dodge false rejection from
    							// subsequent errors
    							if ( depth ) {
    								process();
    							} else {

    								// Call an optional hook to record the stack, in case of exception
    								// since it's otherwise lost when execution goes async
    								if ( jQuery.Deferred.getStackHook ) {
    									process.stackTrace = jQuery.Deferred.getStackHook();
    								}
    								window.setTimeout( process );
    							}
    						};
    					}

    					return jQuery.Deferred( function( newDefer ) {

    						// progress_handlers.add( ... )
    						tuples[ 0 ][ 3 ].add(
    							resolve(
    								0,
    								newDefer,
    								isFunction( onProgress ) ?
    									onProgress :
    									Identity,
    								newDefer.notifyWith
    							)
    						);

    						// fulfilled_handlers.add( ... )
    						tuples[ 1 ][ 3 ].add(
    							resolve(
    								0,
    								newDefer,
    								isFunction( onFulfilled ) ?
    									onFulfilled :
    									Identity
    							)
    						);

    						// rejected_handlers.add( ... )
    						tuples[ 2 ][ 3 ].add(
    							resolve(
    								0,
    								newDefer,
    								isFunction( onRejected ) ?
    									onRejected :
    									Thrower
    							)
    						);
    					} ).promise();
    				},

    				// Get a promise for this deferred
    				// If obj is provided, the promise aspect is added to the object
    				promise: function( obj ) {
    					return obj != null ? jQuery.extend( obj, promise ) : promise;
    				}
    			},
    			deferred = {};

    		// Add list-specific methods
    		jQuery.each( tuples, function( i, tuple ) {
    			var list = tuple[ 2 ],
    				stateString = tuple[ 5 ];

    			// promise.progress = list.add
    			// promise.done = list.add
    			// promise.fail = list.add
    			promise[ tuple[ 1 ] ] = list.add;

    			// Handle state
    			if ( stateString ) {
    				list.add(
    					function() {

    						// state = "resolved" (i.e., fulfilled)
    						// state = "rejected"
    						state = stateString;
    					},

    					// rejected_callbacks.disable
    					// fulfilled_callbacks.disable
    					tuples[ 3 - i ][ 2 ].disable,

    					// rejected_handlers.disable
    					// fulfilled_handlers.disable
    					tuples[ 3 - i ][ 3 ].disable,

    					// progress_callbacks.lock
    					tuples[ 0 ][ 2 ].lock,

    					// progress_handlers.lock
    					tuples[ 0 ][ 3 ].lock
    				);
    			}

    			// progress_handlers.fire
    			// fulfilled_handlers.fire
    			// rejected_handlers.fire
    			list.add( tuple[ 3 ].fire );

    			// deferred.notify = function() { deferred.notifyWith(...) }
    			// deferred.resolve = function() { deferred.resolveWith(...) }
    			// deferred.reject = function() { deferred.rejectWith(...) }
    			deferred[ tuple[ 0 ] ] = function() {
    				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
    				return this;
    			};

    			// deferred.notifyWith = list.fireWith
    			// deferred.resolveWith = list.fireWith
    			// deferred.rejectWith = list.fireWith
    			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
    		} );

    		// Make the deferred a promise
    		promise.promise( deferred );

    		// Call given func if any
    		if ( func ) {
    			func.call( deferred, deferred );
    		}

    		// All done!
    		return deferred;
    	},

    	// Deferred helper
    	when: function( singleValue ) {
    		var

    			// count of uncompleted subordinates
    			remaining = arguments.length,

    			// count of unprocessed arguments
    			i = remaining,

    			// subordinate fulfillment data
    			resolveContexts = Array( i ),
    			resolveValues = slice.call( arguments ),

    			// the master Deferred
    			master = jQuery.Deferred(),

    			// subordinate callback factory
    			updateFunc = function( i ) {
    				return function( value ) {
    					resolveContexts[ i ] = this;
    					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
    					if ( !( --remaining ) ) {
    						master.resolveWith( resolveContexts, resolveValues );
    					}
    				};
    			};

    		// Single- and empty arguments are adopted like Promise.resolve
    		if ( remaining <= 1 ) {
    			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
    				!remaining );

    			// Use .then() to unwrap secondary thenables (cf. gh-3000)
    			if ( master.state() === "pending" ||
    				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

    				return master.then();
    			}
    		}

    		// Multiple arguments are aggregated like Promise.all array elements
    		while ( i-- ) {
    			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
    		}

    		return master.promise();
    	}
    } );


    // These usually indicate a programmer mistake during development,
    // warn about them ASAP rather than swallowing them by default.
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

    jQuery.Deferred.exceptionHook = function( error, stack ) {

    	// Support: IE 8 - 9 only
    	// Console exists when dev tools are open, which can happen at any time
    	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
    		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
    	}
    };




    jQuery.readyException = function( error ) {
    	window.setTimeout( function() {
    		throw error;
    	} );
    };




    // The deferred used on DOM ready
    var readyList = jQuery.Deferred();

    jQuery.fn.ready = function( fn ) {

    	readyList
    		.then( fn )

    		// Wrap jQuery.readyException in a function so that the lookup
    		// happens at the time of error handling instead of callback
    		// registration.
    		.catch( function( error ) {
    			jQuery.readyException( error );
    		} );

    	return this;
    };

    jQuery.extend( {

    	// Is the DOM ready to be used? Set to true once it occurs.
    	isReady: false,

    	// A counter to track how many items to wait for before
    	// the ready event fires. See #6781
    	readyWait: 1,

    	// Handle when the DOM is ready
    	ready: function( wait ) {

    		// Abort if there are pending holds or we're already ready
    		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
    			return;
    		}

    		// Remember that the DOM is ready
    		jQuery.isReady = true;

    		// If a normal DOM Ready event fired, decrement, and wait if need be
    		if ( wait !== true && --jQuery.readyWait > 0 ) {
    			return;
    		}

    		// If there are functions bound, to execute
    		readyList.resolveWith( document, [ jQuery ] );
    	}
    } );

    jQuery.ready.then = readyList.then;

    // The ready event handler and self cleanup method
    function completed() {
    	document.removeEventListener( "DOMContentLoaded", completed );
    	window.removeEventListener( "load", completed );
    	jQuery.ready();
    }

    // Catch cases where $(document).ready() is called
    // after the browser event has already occurred.
    // Support: IE <=9 - 10 only
    // Older IE sometimes signals "interactive" too soon
    if ( document.readyState === "complete" ||
    	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

    	// Handle it asynchronously to allow scripts the opportunity to delay ready
    	window.setTimeout( jQuery.ready );

    } else {

    	// Use the handy event callback
    	document.addEventListener( "DOMContentLoaded", completed );

    	// A fallback to window.onload, that will always work
    	window.addEventListener( "load", completed );
    }




    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
    	var i = 0,
    		len = elems.length,
    		bulk = key == null;

    	// Sets many values
    	if ( toType( key ) === "object" ) {
    		chainable = true;
    		for ( i in key ) {
    			access( elems, fn, i, key[ i ], true, emptyGet, raw );
    		}

    	// Sets one value
    	} else if ( value !== undefined ) {
    		chainable = true;

    		if ( !isFunction( value ) ) {
    			raw = true;
    		}

    		if ( bulk ) {

    			// Bulk operations run against the entire set
    			if ( raw ) {
    				fn.call( elems, value );
    				fn = null;

    			// ...except when executing function values
    			} else {
    				bulk = fn;
    				fn = function( elem, key, value ) {
    					return bulk.call( jQuery( elem ), value );
    				};
    			}
    		}

    		if ( fn ) {
    			for ( ; i < len; i++ ) {
    				fn(
    					elems[ i ], key, raw ?
    					value :
    					value.call( elems[ i ], i, fn( elems[ i ], key ) )
    				);
    			}
    		}
    	}

    	if ( chainable ) {
    		return elems;
    	}

    	// Gets
    	if ( bulk ) {
    		return fn.call( elems );
    	}

    	return len ? fn( elems[ 0 ], key ) : emptyGet;
    };


    // Matches dashed string for camelizing
    var rmsPrefix = /^-ms-/,
    	rdashAlpha = /-([a-z])/g;

    // Used by camelCase as callback to replace()
    function fcamelCase( all, letter ) {
    	return letter.toUpperCase();
    }

    // Convert dashed to camelCase; used by the css and data modules
    // Support: IE <=9 - 11, Edge 12 - 15
    // Microsoft forgot to hump their vendor prefix (#9572)
    function camelCase( string ) {
    	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    }
    var acceptData = function( owner ) {

    	// Accepts only:
    	//  - Node
    	//    - Node.ELEMENT_NODE
    	//    - Node.DOCUMENT_NODE
    	//  - Object
    	//    - Any
    	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
    };




    function Data() {
    	this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;

    Data.prototype = {

    	cache: function( owner ) {

    		// Check if the owner object already has a cache
    		var value = owner[ this.expando ];

    		// If not, create one
    		if ( !value ) {
    			value = {};

    			// We can accept data for non-element nodes in modern browsers,
    			// but we should not, see #8335.
    			// Always return an empty object.
    			if ( acceptData( owner ) ) {

    				// If it is a node unlikely to be stringify-ed or looped over
    				// use plain assignment
    				if ( owner.nodeType ) {
    					owner[ this.expando ] = value;

    				// Otherwise secure it in a non-enumerable property
    				// configurable must be true to allow the property to be
    				// deleted when data is removed
    				} else {
    					Object.defineProperty( owner, this.expando, {
    						value: value,
    						configurable: true
    					} );
    				}
    			}
    		}

    		return value;
    	},
    	set: function( owner, data, value ) {
    		var prop,
    			cache = this.cache( owner );

    		// Handle: [ owner, key, value ] args
    		// Always use camelCase key (gh-2257)
    		if ( typeof data === "string" ) {
    			cache[ camelCase( data ) ] = value;

    		// Handle: [ owner, { properties } ] args
    		} else {

    			// Copy the properties one-by-one to the cache object
    			for ( prop in data ) {
    				cache[ camelCase( prop ) ] = data[ prop ];
    			}
    		}
    		return cache;
    	},
    	get: function( owner, key ) {
    		return key === undefined ?
    			this.cache( owner ) :

    			// Always use camelCase key (gh-2257)
    			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
    	},
    	access: function( owner, key, value ) {

    		// In cases where either:
    		//
    		//   1. No key was specified
    		//   2. A string key was specified, but no value provided
    		//
    		// Take the "read" path and allow the get method to determine
    		// which value to return, respectively either:
    		//
    		//   1. The entire cache object
    		//   2. The data stored at the key
    		//
    		if ( key === undefined ||
    				( ( key && typeof key === "string" ) && value === undefined ) ) {

    			return this.get( owner, key );
    		}

    		// When the key is not a string, or both a key and value
    		// are specified, set or extend (existing objects) with either:
    		//
    		//   1. An object of properties
    		//   2. A key and value
    		//
    		this.set( owner, key, value );

    		// Since the "set" path can have two possible entry points
    		// return the expected data based on which path was taken[*]
    		return value !== undefined ? value : key;
    	},
    	remove: function( owner, key ) {
    		var i,
    			cache = owner[ this.expando ];

    		if ( cache === undefined ) {
    			return;
    		}

    		if ( key !== undefined ) {

    			// Support array or space separated string of keys
    			if ( Array.isArray( key ) ) {

    				// If key is an array of keys...
    				// We always set camelCase keys, so remove that.
    				key = key.map( camelCase );
    			} else {
    				key = camelCase( key );

    				// If a key with the spaces exists, use it.
    				// Otherwise, create an array by matching non-whitespace
    				key = key in cache ?
    					[ key ] :
    					( key.match( rnothtmlwhite ) || [] );
    			}

    			i = key.length;

    			while ( i-- ) {
    				delete cache[ key[ i ] ];
    			}
    		}

    		// Remove the expando if there's no more data
    		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

    			// Support: Chrome <=35 - 45
    			// Webkit & Blink performance suffers when deleting properties
    			// from DOM nodes, so set to undefined instead
    			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
    			if ( owner.nodeType ) {
    				owner[ this.expando ] = undefined;
    			} else {
    				delete owner[ this.expando ];
    			}
    		}
    	},
    	hasData: function( owner ) {
    		var cache = owner[ this.expando ];
    		return cache !== undefined && !jQuery.isEmptyObject( cache );
    	}
    };
    var dataPriv = new Data();

    var dataUser = new Data();



    //	Implementation Summary
    //
    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
    //	2. Improve the module's maintainability by reducing the storage
    //		paths to a single mechanism.
    //	3. Use the same single mechanism to support "private" and "user" data.
    //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    	rmultiDash = /[A-Z]/g;

    function getData( data ) {
    	if ( data === "true" ) {
    		return true;
    	}

    	if ( data === "false" ) {
    		return false;
    	}

    	if ( data === "null" ) {
    		return null;
    	}

    	// Only convert to a number if it doesn't change the string
    	if ( data === +data + "" ) {
    		return +data;
    	}

    	if ( rbrace.test( data ) ) {
    		return JSON.parse( data );
    	}

    	return data;
    }

    function dataAttr( elem, key, data ) {
    	var name;

    	// If nothing was found internally, try to fetch any
    	// data from the HTML5 data-* attribute
    	if ( data === undefined && elem.nodeType === 1 ) {
    		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
    		data = elem.getAttribute( name );

    		if ( typeof data === "string" ) {
    			try {
    				data = getData( data );
    			} catch ( e ) {}

    			// Make sure we set the data so it isn't changed later
    			dataUser.set( elem, key, data );
    		} else {
    			data = undefined;
    		}
    	}
    	return data;
    }

    jQuery.extend( {
    	hasData: function( elem ) {
    		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
    	},

    	data: function( elem, name, data ) {
    		return dataUser.access( elem, name, data );
    	},

    	removeData: function( elem, name ) {
    		dataUser.remove( elem, name );
    	},

    	// TODO: Now that all calls to _data and _removeData have been replaced
    	// with direct calls to dataPriv methods, these can be deprecated.
    	_data: function( elem, name, data ) {
    		return dataPriv.access( elem, name, data );
    	},

    	_removeData: function( elem, name ) {
    		dataPriv.remove( elem, name );
    	}
    } );

    jQuery.fn.extend( {
    	data: function( key, value ) {
    		var i, name, data,
    			elem = this[ 0 ],
    			attrs = elem && elem.attributes;

    		// Gets all values
    		if ( key === undefined ) {
    			if ( this.length ) {
    				data = dataUser.get( elem );

    				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
    					i = attrs.length;
    					while ( i-- ) {

    						// Support: IE 11 only
    						// The attrs elements can be null (#14894)
    						if ( attrs[ i ] ) {
    							name = attrs[ i ].name;
    							if ( name.indexOf( "data-" ) === 0 ) {
    								name = camelCase( name.slice( 5 ) );
    								dataAttr( elem, name, data[ name ] );
    							}
    						}
    					}
    					dataPriv.set( elem, "hasDataAttrs", true );
    				}
    			}

    			return data;
    		}

    		// Sets multiple values
    		if ( typeof key === "object" ) {
    			return this.each( function() {
    				dataUser.set( this, key );
    			} );
    		}

    		return access( this, function( value ) {
    			var data;

    			// The calling jQuery object (element matches) is not empty
    			// (and therefore has an element appears at this[ 0 ]) and the
    			// `value` parameter was not undefined. An empty jQuery object
    			// will result in `undefined` for elem = this[ 0 ] which will
    			// throw an exception if an attempt to read a data cache is made.
    			if ( elem && value === undefined ) {

    				// Attempt to get data from the cache
    				// The key will always be camelCased in Data
    				data = dataUser.get( elem, key );
    				if ( data !== undefined ) {
    					return data;
    				}

    				// Attempt to "discover" the data in
    				// HTML5 custom data-* attrs
    				data = dataAttr( elem, key );
    				if ( data !== undefined ) {
    					return data;
    				}

    				// We tried really hard, but the data doesn't exist.
    				return;
    			}

    			// Set the data...
    			this.each( function() {

    				// We always store the camelCased key
    				dataUser.set( this, key, value );
    			} );
    		}, null, value, arguments.length > 1, null, true );
    	},

    	removeData: function( key ) {
    		return this.each( function() {
    			dataUser.remove( this, key );
    		} );
    	}
    } );


    jQuery.extend( {
    	queue: function( elem, type, data ) {
    		var queue;

    		if ( elem ) {
    			type = ( type || "fx" ) + "queue";
    			queue = dataPriv.get( elem, type );

    			// Speed up dequeue by getting out quickly if this is just a lookup
    			if ( data ) {
    				if ( !queue || Array.isArray( data ) ) {
    					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
    				} else {
    					queue.push( data );
    				}
    			}
    			return queue || [];
    		}
    	},

    	dequeue: function( elem, type ) {
    		type = type || "fx";

    		var queue = jQuery.queue( elem, type ),
    			startLength = queue.length,
    			fn = queue.shift(),
    			hooks = jQuery._queueHooks( elem, type ),
    			next = function() {
    				jQuery.dequeue( elem, type );
    			};

    		// If the fx queue is dequeued, always remove the progress sentinel
    		if ( fn === "inprogress" ) {
    			fn = queue.shift();
    			startLength--;
    		}

    		if ( fn ) {

    			// Add a progress sentinel to prevent the fx queue from being
    			// automatically dequeued
    			if ( type === "fx" ) {
    				queue.unshift( "inprogress" );
    			}

    			// Clear up the last queue stop function
    			delete hooks.stop;
    			fn.call( elem, next, hooks );
    		}

    		if ( !startLength && hooks ) {
    			hooks.empty.fire();
    		}
    	},

    	// Not public - generate a queueHooks object, or return the current one
    	_queueHooks: function( elem, type ) {
    		var key = type + "queueHooks";
    		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
    			empty: jQuery.Callbacks( "once memory" ).add( function() {
    				dataPriv.remove( elem, [ type + "queue", key ] );
    			} )
    		} );
    	}
    } );

    jQuery.fn.extend( {
    	queue: function( type, data ) {
    		var setter = 2;

    		if ( typeof type !== "string" ) {
    			data = type;
    			type = "fx";
    			setter--;
    		}

    		if ( arguments.length < setter ) {
    			return jQuery.queue( this[ 0 ], type );
    		}

    		return data === undefined ?
    			this :
    			this.each( function() {
    				var queue = jQuery.queue( this, type, data );

    				// Ensure a hooks for this queue
    				jQuery._queueHooks( this, type );

    				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
    					jQuery.dequeue( this, type );
    				}
    			} );
    	},
    	dequeue: function( type ) {
    		return this.each( function() {
    			jQuery.dequeue( this, type );
    		} );
    	},
    	clearQueue: function( type ) {
    		return this.queue( type || "fx", [] );
    	},

    	// Get a promise resolved when queues of a certain type
    	// are emptied (fx is the type by default)
    	promise: function( type, obj ) {
    		var tmp,
    			count = 1,
    			defer = jQuery.Deferred(),
    			elements = this,
    			i = this.length,
    			resolve = function() {
    				if ( !( --count ) ) {
    					defer.resolveWith( elements, [ elements ] );
    				}
    			};

    		if ( typeof type !== "string" ) {
    			obj = type;
    			type = undefined;
    		}
    		type = type || "fx";

    		while ( i-- ) {
    			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
    			if ( tmp && tmp.empty ) {
    				count++;
    				tmp.empty.add( resolve );
    			}
    		}
    		resolve();
    		return defer.promise( obj );
    	}
    } );
    var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

    var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

    var isHiddenWithinTree = function( elem, el ) {

    		// isHiddenWithinTree might be called from jQuery#filter function;
    		// in that case, element will be second argument
    		elem = el || elem;

    		// Inline style trumps all
    		return elem.style.display === "none" ||
    			elem.style.display === "" &&

    			// Otherwise, check computed style
    			// Support: Firefox <=43 - 45
    			// Disconnected elements can have computed display: none, so first confirm that elem is
    			// in the document.
    			jQuery.contains( elem.ownerDocument, elem ) &&

    			jQuery.css( elem, "display" ) === "none";
    	};

    var swap = function( elem, options, callback, args ) {
    	var ret, name,
    		old = {};

    	// Remember the old values, and insert the new ones
    	for ( name in options ) {
    		old[ name ] = elem.style[ name ];
    		elem.style[ name ] = options[ name ];
    	}

    	ret = callback.apply( elem, args || [] );

    	// Revert the old values
    	for ( name in options ) {
    		elem.style[ name ] = old[ name ];
    	}

    	return ret;
    };




    function adjustCSS( elem, prop, valueParts, tween ) {
    	var adjusted, scale,
    		maxIterations = 20,
    		currentValue = tween ?
    			function() {
    				return tween.cur();
    			} :
    			function() {
    				return jQuery.css( elem, prop, "" );
    			},
    		initial = currentValue(),
    		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

    		// Starting value computation is required for potential unit mismatches
    		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
    			rcssNum.exec( jQuery.css( elem, prop ) );

    	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

    		// Support: Firefox <=54
    		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
    		initial = initial / 2;

    		// Trust units reported by jQuery.css
    		unit = unit || initialInUnit[ 3 ];

    		// Iteratively approximate from a nonzero starting point
    		initialInUnit = +initial || 1;

    		while ( maxIterations-- ) {

    			// Evaluate and update our best guess (doubling guesses that zero out).
    			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
    			jQuery.style( elem, prop, initialInUnit + unit );
    			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
    				maxIterations = 0;
    			}
    			initialInUnit = initialInUnit / scale;

    		}

    		initialInUnit = initialInUnit * 2;
    		jQuery.style( elem, prop, initialInUnit + unit );

    		// Make sure we update the tween properties later on
    		valueParts = valueParts || [];
    	}

    	if ( valueParts ) {
    		initialInUnit = +initialInUnit || +initial || 0;

    		// Apply relative offset (+=/-=) if specified
    		adjusted = valueParts[ 1 ] ?
    			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
    			+valueParts[ 2 ];
    		if ( tween ) {
    			tween.unit = unit;
    			tween.start = initialInUnit;
    			tween.end = adjusted;
    		}
    	}
    	return adjusted;
    }


    var defaultDisplayMap = {};

    function getDefaultDisplay( elem ) {
    	var temp,
    		doc = elem.ownerDocument,
    		nodeName = elem.nodeName,
    		display = defaultDisplayMap[ nodeName ];

    	if ( display ) {
    		return display;
    	}

    	temp = doc.body.appendChild( doc.createElement( nodeName ) );
    	display = jQuery.css( temp, "display" );

    	temp.parentNode.removeChild( temp );

    	if ( display === "none" ) {
    		display = "block";
    	}
    	defaultDisplayMap[ nodeName ] = display;

    	return display;
    }

    function showHide( elements, show ) {
    	var display, elem,
    		values = [],
    		index = 0,
    		length = elements.length;

    	// Determine new display value for elements that need to change
    	for ( ; index < length; index++ ) {
    		elem = elements[ index ];
    		if ( !elem.style ) {
    			continue;
    		}

    		display = elem.style.display;
    		if ( show ) {

    			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
    			// check is required in this first loop unless we have a nonempty display value (either
    			// inline or about-to-be-restored)
    			if ( display === "none" ) {
    				values[ index ] = dataPriv.get( elem, "display" ) || null;
    				if ( !values[ index ] ) {
    					elem.style.display = "";
    				}
    			}
    			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
    				values[ index ] = getDefaultDisplay( elem );
    			}
    		} else {
    			if ( display !== "none" ) {
    				values[ index ] = "none";

    				// Remember what we're overwriting
    				dataPriv.set( elem, "display", display );
    			}
    		}
    	}

    	// Set the display of the elements in a second loop to avoid constant reflow
    	for ( index = 0; index < length; index++ ) {
    		if ( values[ index ] != null ) {
    			elements[ index ].style.display = values[ index ];
    		}
    	}

    	return elements;
    }

    jQuery.fn.extend( {
    	show: function() {
    		return showHide( this, true );
    	},
    	hide: function() {
    		return showHide( this );
    	},
    	toggle: function( state ) {
    		if ( typeof state === "boolean" ) {
    			return state ? this.show() : this.hide();
    		}

    		return this.each( function() {
    			if ( isHiddenWithinTree( this ) ) {
    				jQuery( this ).show();
    			} else {
    				jQuery( this ).hide();
    			}
    		} );
    	}
    } );
    var rcheckableType = ( /^(?:checkbox|radio)$/i );

    var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

    var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



    // We have to close these tags to support XHTML (#13200)
    var wrapMap = {

    	// Support: IE <=9 only
    	option: [ 1, "<select multiple='multiple'>", "</select>" ],

    	// XHTML parsers do not magically insert elements in the
    	// same way that tag soup parsers do. So we cannot shorten
    	// this by omitting <tbody> or other required elements.
    	thead: [ 1, "<table>", "</table>" ],
    	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
    	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

    	_default: [ 0, "", "" ]
    };

    // Support: IE <=9 only
    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;


    function getAll( context, tag ) {

    	// Support: IE <=9 - 11 only
    	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
    	var ret;

    	if ( typeof context.getElementsByTagName !== "undefined" ) {
    		ret = context.getElementsByTagName( tag || "*" );

    	} else if ( typeof context.querySelectorAll !== "undefined" ) {
    		ret = context.querySelectorAll( tag || "*" );

    	} else {
    		ret = [];
    	}

    	if ( tag === undefined || tag && nodeName( context, tag ) ) {
    		return jQuery.merge( [ context ], ret );
    	}

    	return ret;
    }


    // Mark scripts as having already been evaluated
    function setGlobalEval( elems, refElements ) {
    	var i = 0,
    		l = elems.length;

    	for ( ; i < l; i++ ) {
    		dataPriv.set(
    			elems[ i ],
    			"globalEval",
    			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
    		);
    	}
    }


    var rhtml = /<|&#?\w+;/;

    function buildFragment( elems, context, scripts, selection, ignored ) {
    	var elem, tmp, tag, wrap, contains, j,
    		fragment = context.createDocumentFragment(),
    		nodes = [],
    		i = 0,
    		l = elems.length;

    	for ( ; i < l; i++ ) {
    		elem = elems[ i ];

    		if ( elem || elem === 0 ) {

    			// Add nodes directly
    			if ( toType( elem ) === "object" ) {

    				// Support: Android <=4.0 only, PhantomJS 1 only
    				// push.apply(_, arraylike) throws on ancient WebKit
    				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

    			// Convert non-html into a text node
    			} else if ( !rhtml.test( elem ) ) {
    				nodes.push( context.createTextNode( elem ) );

    			// Convert html into DOM nodes
    			} else {
    				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

    				// Deserialize a standard representation
    				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
    				wrap = wrapMap[ tag ] || wrapMap._default;
    				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

    				// Descend through wrappers to the right content
    				j = wrap[ 0 ];
    				while ( j-- ) {
    					tmp = tmp.lastChild;
    				}

    				// Support: Android <=4.0 only, PhantomJS 1 only
    				// push.apply(_, arraylike) throws on ancient WebKit
    				jQuery.merge( nodes, tmp.childNodes );

    				// Remember the top-level container
    				tmp = fragment.firstChild;

    				// Ensure the created nodes are orphaned (#12392)
    				tmp.textContent = "";
    			}
    		}
    	}

    	// Remove wrapper from fragment
    	fragment.textContent = "";

    	i = 0;
    	while ( ( elem = nodes[ i++ ] ) ) {

    		// Skip elements already in the context collection (trac-4087)
    		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
    			if ( ignored ) {
    				ignored.push( elem );
    			}
    			continue;
    		}

    		contains = jQuery.contains( elem.ownerDocument, elem );

    		// Append to fragment
    		tmp = getAll( fragment.appendChild( elem ), "script" );

    		// Preserve script evaluation history
    		if ( contains ) {
    			setGlobalEval( tmp );
    		}

    		// Capture executables
    		if ( scripts ) {
    			j = 0;
    			while ( ( elem = tmp[ j++ ] ) ) {
    				if ( rscriptType.test( elem.type || "" ) ) {
    					scripts.push( elem );
    				}
    			}
    		}
    	}

    	return fragment;
    }


    ( function() {
    	var fragment = document.createDocumentFragment(),
    		div = fragment.appendChild( document.createElement( "div" ) ),
    		input = document.createElement( "input" );

    	// Support: Android 4.0 - 4.3 only
    	// Check state lost if the name is set (#11217)
    	// Support: Windows Web Apps (WWA)
    	// `name` and `type` must use .setAttribute for WWA (#14901)
    	input.setAttribute( "type", "radio" );
    	input.setAttribute( "checked", "checked" );
    	input.setAttribute( "name", "t" );

    	div.appendChild( input );

    	// Support: Android <=4.1 only
    	// Older WebKit doesn't clone checked state correctly in fragments
    	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

    	// Support: IE <=11 only
    	// Make sure textarea (and checkbox) defaultValue is properly cloned
    	div.innerHTML = "<textarea>x</textarea>";
    	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
    } )();
    var documentElement = document.documentElement;



    var
    	rkeyEvent = /^key/,
    	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
    	return true;
    }

    function returnFalse() {
    	return false;
    }

    // Support: IE <=9 only
    // See #13393 for more info
    function safeActiveElement() {
    	try {
    		return document.activeElement;
    	} catch ( err ) { }
    }

    function on( elem, types, selector, data, fn, one ) {
    	var origFn, type;

    	// Types can be a map of types/handlers
    	if ( typeof types === "object" ) {

    		// ( types-Object, selector, data )
    		if ( typeof selector !== "string" ) {

    			// ( types-Object, data )
    			data = data || selector;
    			selector = undefined;
    		}
    		for ( type in types ) {
    			on( elem, type, selector, data, types[ type ], one );
    		}
    		return elem;
    	}

    	if ( data == null && fn == null ) {

    		// ( types, fn )
    		fn = selector;
    		data = selector = undefined;
    	} else if ( fn == null ) {
    		if ( typeof selector === "string" ) {

    			// ( types, selector, fn )
    			fn = data;
    			data = undefined;
    		} else {

    			// ( types, data, fn )
    			fn = data;
    			data = selector;
    			selector = undefined;
    		}
    	}
    	if ( fn === false ) {
    		fn = returnFalse;
    	} else if ( !fn ) {
    		return elem;
    	}

    	if ( one === 1 ) {
    		origFn = fn;
    		fn = function( event ) {

    			// Can use an empty set, since event contains the info
    			jQuery().off( event );
    			return origFn.apply( this, arguments );
    		};

    		// Use same guid so caller can remove using origFn
    		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
    	}
    	return elem.each( function() {
    		jQuery.event.add( this, types, fn, data, selector );
    	} );
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

    	global: {},

    	add: function( elem, types, handler, data, selector ) {

    		var handleObjIn, eventHandle, tmp,
    			events, t, handleObj,
    			special, handlers, type, namespaces, origType,
    			elemData = dataPriv.get( elem );

    		// Don't attach events to noData or text/comment nodes (but allow plain objects)
    		if ( !elemData ) {
    			return;
    		}

    		// Caller can pass in an object of custom data in lieu of the handler
    		if ( handler.handler ) {
    			handleObjIn = handler;
    			handler = handleObjIn.handler;
    			selector = handleObjIn.selector;
    		}

    		// Ensure that invalid selectors throw exceptions at attach time
    		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
    		if ( selector ) {
    			jQuery.find.matchesSelector( documentElement, selector );
    		}

    		// Make sure that the handler has a unique ID, used to find/remove it later
    		if ( !handler.guid ) {
    			handler.guid = jQuery.guid++;
    		}

    		// Init the element's event structure and main handler, if this is the first
    		if ( !( events = elemData.events ) ) {
    			events = elemData.events = {};
    		}
    		if ( !( eventHandle = elemData.handle ) ) {
    			eventHandle = elemData.handle = function( e ) {

    				// Discard the second event of a jQuery.event.trigger() and
    				// when an event is called after a page has unloaded
    				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
    					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
    			};
    		}

    		// Handle multiple events separated by a space
    		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
    		t = types.length;
    		while ( t-- ) {
    			tmp = rtypenamespace.exec( types[ t ] ) || [];
    			type = origType = tmp[ 1 ];
    			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

    			// There *must* be a type, no attaching namespace-only handlers
    			if ( !type ) {
    				continue;
    			}

    			// If event changes its type, use the special event handlers for the changed type
    			special = jQuery.event.special[ type ] || {};

    			// If selector defined, determine special event api type, otherwise given type
    			type = ( selector ? special.delegateType : special.bindType ) || type;

    			// Update special based on newly reset type
    			special = jQuery.event.special[ type ] || {};

    			// handleObj is passed to all event handlers
    			handleObj = jQuery.extend( {
    				type: type,
    				origType: origType,
    				data: data,
    				handler: handler,
    				guid: handler.guid,
    				selector: selector,
    				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
    				namespace: namespaces.join( "." )
    			}, handleObjIn );

    			// Init the event handler queue if we're the first
    			if ( !( handlers = events[ type ] ) ) {
    				handlers = events[ type ] = [];
    				handlers.delegateCount = 0;

    				// Only use addEventListener if the special events handler returns false
    				if ( !special.setup ||
    					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

    					if ( elem.addEventListener ) {
    						elem.addEventListener( type, eventHandle );
    					}
    				}
    			}

    			if ( special.add ) {
    				special.add.call( elem, handleObj );

    				if ( !handleObj.handler.guid ) {
    					handleObj.handler.guid = handler.guid;
    				}
    			}

    			// Add to the element's handler list, delegates in front
    			if ( selector ) {
    				handlers.splice( handlers.delegateCount++, 0, handleObj );
    			} else {
    				handlers.push( handleObj );
    			}

    			// Keep track of which events have ever been used, for event optimization
    			jQuery.event.global[ type ] = true;
    		}

    	},

    	// Detach an event or set of events from an element
    	remove: function( elem, types, handler, selector, mappedTypes ) {

    		var j, origCount, tmp,
    			events, t, handleObj,
    			special, handlers, type, namespaces, origType,
    			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

    		if ( !elemData || !( events = elemData.events ) ) {
    			return;
    		}

    		// Once for each type.namespace in types; type may be omitted
    		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
    		t = types.length;
    		while ( t-- ) {
    			tmp = rtypenamespace.exec( types[ t ] ) || [];
    			type = origType = tmp[ 1 ];
    			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

    			// Unbind all events (on this namespace, if provided) for the element
    			if ( !type ) {
    				for ( type in events ) {
    					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
    				}
    				continue;
    			}

    			special = jQuery.event.special[ type ] || {};
    			type = ( selector ? special.delegateType : special.bindType ) || type;
    			handlers = events[ type ] || [];
    			tmp = tmp[ 2 ] &&
    				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

    			// Remove matching events
    			origCount = j = handlers.length;
    			while ( j-- ) {
    				handleObj = handlers[ j ];

    				if ( ( mappedTypes || origType === handleObj.origType ) &&
    					( !handler || handler.guid === handleObj.guid ) &&
    					( !tmp || tmp.test( handleObj.namespace ) ) &&
    					( !selector || selector === handleObj.selector ||
    						selector === "**" && handleObj.selector ) ) {
    					handlers.splice( j, 1 );

    					if ( handleObj.selector ) {
    						handlers.delegateCount--;
    					}
    					if ( special.remove ) {
    						special.remove.call( elem, handleObj );
    					}
    				}
    			}

    			// Remove generic event handler if we removed something and no more handlers exist
    			// (avoids potential for endless recursion during removal of special event handlers)
    			if ( origCount && !handlers.length ) {
    				if ( !special.teardown ||
    					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

    					jQuery.removeEvent( elem, type, elemData.handle );
    				}

    				delete events[ type ];
    			}
    		}

    		// Remove data and the expando if it's no longer used
    		if ( jQuery.isEmptyObject( events ) ) {
    			dataPriv.remove( elem, "handle events" );
    		}
    	},

    	dispatch: function( nativeEvent ) {

    		// Make a writable jQuery.Event from the native event object
    		var event = jQuery.event.fix( nativeEvent );

    		var i, j, ret, matched, handleObj, handlerQueue,
    			args = new Array( arguments.length ),
    			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
    			special = jQuery.event.special[ event.type ] || {};

    		// Use the fix-ed jQuery.Event rather than the (read-only) native event
    		args[ 0 ] = event;

    		for ( i = 1; i < arguments.length; i++ ) {
    			args[ i ] = arguments[ i ];
    		}

    		event.delegateTarget = this;

    		// Call the preDispatch hook for the mapped type, and let it bail if desired
    		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
    			return;
    		}

    		// Determine handlers
    		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

    		// Run delegates first; they may want to stop propagation beneath us
    		i = 0;
    		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
    			event.currentTarget = matched.elem;

    			j = 0;
    			while ( ( handleObj = matched.handlers[ j++ ] ) &&
    				!event.isImmediatePropagationStopped() ) {

    				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
    				// a subset or equal to those in the bound event (both can have no namespace).
    				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

    					event.handleObj = handleObj;
    					event.data = handleObj.data;

    					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
    						handleObj.handler ).apply( matched.elem, args );

    					if ( ret !== undefined ) {
    						if ( ( event.result = ret ) === false ) {
    							event.preventDefault();
    							event.stopPropagation();
    						}
    					}
    				}
    			}
    		}

    		// Call the postDispatch hook for the mapped type
    		if ( special.postDispatch ) {
    			special.postDispatch.call( this, event );
    		}

    		return event.result;
    	},

    	handlers: function( event, handlers ) {
    		var i, handleObj, sel, matchedHandlers, matchedSelectors,
    			handlerQueue = [],
    			delegateCount = handlers.delegateCount,
    			cur = event.target;

    		// Find delegate handlers
    		if ( delegateCount &&

    			// Support: IE <=9
    			// Black-hole SVG <use> instance trees (trac-13180)
    			cur.nodeType &&

    			// Support: Firefox <=42
    			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
    			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
    			// Support: IE 11 only
    			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
    			!( event.type === "click" && event.button >= 1 ) ) {

    			for ( ; cur !== this; cur = cur.parentNode || this ) {

    				// Don't check non-elements (#13208)
    				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
    				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
    					matchedHandlers = [];
    					matchedSelectors = {};
    					for ( i = 0; i < delegateCount; i++ ) {
    						handleObj = handlers[ i ];

    						// Don't conflict with Object.prototype properties (#13203)
    						sel = handleObj.selector + " ";

    						if ( matchedSelectors[ sel ] === undefined ) {
    							matchedSelectors[ sel ] = handleObj.needsContext ?
    								jQuery( sel, this ).index( cur ) > -1 :
    								jQuery.find( sel, this, null, [ cur ] ).length;
    						}
    						if ( matchedSelectors[ sel ] ) {
    							matchedHandlers.push( handleObj );
    						}
    					}
    					if ( matchedHandlers.length ) {
    						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
    					}
    				}
    			}
    		}

    		// Add the remaining (directly-bound) handlers
    		cur = this;
    		if ( delegateCount < handlers.length ) {
    			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
    		}

    		return handlerQueue;
    	},

    	addProp: function( name, hook ) {
    		Object.defineProperty( jQuery.Event.prototype, name, {
    			enumerable: true,
    			configurable: true,

    			get: isFunction( hook ) ?
    				function() {
    					if ( this.originalEvent ) {
    							return hook( this.originalEvent );
    					}
    				} :
    				function() {
    					if ( this.originalEvent ) {
    							return this.originalEvent[ name ];
    					}
    				},

    			set: function( value ) {
    				Object.defineProperty( this, name, {
    					enumerable: true,
    					configurable: true,
    					writable: true,
    					value: value
    				} );
    			}
    		} );
    	},

    	fix: function( originalEvent ) {
    		return originalEvent[ jQuery.expando ] ?
    			originalEvent :
    			new jQuery.Event( originalEvent );
    	},

    	special: {
    		load: {

    			// Prevent triggered image.load events from bubbling to window.load
    			noBubble: true
    		},
    		focus: {

    			// Fire native event if possible so blur/focus sequence is correct
    			trigger: function() {
    				if ( this !== safeActiveElement() && this.focus ) {
    					this.focus();
    					return false;
    				}
    			},
    			delegateType: "focusin"
    		},
    		blur: {
    			trigger: function() {
    				if ( this === safeActiveElement() && this.blur ) {
    					this.blur();
    					return false;
    				}
    			},
    			delegateType: "focusout"
    		},
    		click: {

    			// For checkbox, fire native event so checked state will be right
    			trigger: function() {
    				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
    					this.click();
    					return false;
    				}
    			},

    			// For cross-browser consistency, don't fire native .click() on links
    			_default: function( event ) {
    				return nodeName( event.target, "a" );
    			}
    		},

    		beforeunload: {
    			postDispatch: function( event ) {

    				// Support: Firefox 20+
    				// Firefox doesn't alert if the returnValue field is not set.
    				if ( event.result !== undefined && event.originalEvent ) {
    					event.originalEvent.returnValue = event.result;
    				}
    			}
    		}
    	}
    };

    jQuery.removeEvent = function( elem, type, handle ) {

    	// This "if" is needed for plain objects
    	if ( elem.removeEventListener ) {
    		elem.removeEventListener( type, handle );
    	}
    };

    jQuery.Event = function( src, props ) {

    	// Allow instantiation without the 'new' keyword
    	if ( !( this instanceof jQuery.Event ) ) {
    		return new jQuery.Event( src, props );
    	}

    	// Event object
    	if ( src && src.type ) {
    		this.originalEvent = src;
    		this.type = src.type;

    		// Events bubbling up the document may have been marked as prevented
    		// by a handler lower down the tree; reflect the correct value.
    		this.isDefaultPrevented = src.defaultPrevented ||
    				src.defaultPrevented === undefined &&

    				// Support: Android <=2.3 only
    				src.returnValue === false ?
    			returnTrue :
    			returnFalse;

    		// Create target properties
    		// Support: Safari <=6 - 7 only
    		// Target should not be a text node (#504, #13143)
    		this.target = ( src.target && src.target.nodeType === 3 ) ?
    			src.target.parentNode :
    			src.target;

    		this.currentTarget = src.currentTarget;
    		this.relatedTarget = src.relatedTarget;

    	// Event type
    	} else {
    		this.type = src;
    	}

    	// Put explicitly provided properties onto the event object
    	if ( props ) {
    		jQuery.extend( this, props );
    	}

    	// Create a timestamp if incoming event doesn't have one
    	this.timeStamp = src && src.timeStamp || Date.now();

    	// Mark it as fixed
    	this[ jQuery.expando ] = true;
    };

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
    	constructor: jQuery.Event,
    	isDefaultPrevented: returnFalse,
    	isPropagationStopped: returnFalse,
    	isImmediatePropagationStopped: returnFalse,
    	isSimulated: false,

    	preventDefault: function() {
    		var e = this.originalEvent;

    		this.isDefaultPrevented = returnTrue;

    		if ( e && !this.isSimulated ) {
    			e.preventDefault();
    		}
    	},
    	stopPropagation: function() {
    		var e = this.originalEvent;

    		this.isPropagationStopped = returnTrue;

    		if ( e && !this.isSimulated ) {
    			e.stopPropagation();
    		}
    	},
    	stopImmediatePropagation: function() {
    		var e = this.originalEvent;

    		this.isImmediatePropagationStopped = returnTrue;

    		if ( e && !this.isSimulated ) {
    			e.stopImmediatePropagation();
    		}

    		this.stopPropagation();
    	}
    };

    // Includes all common event props including KeyEvent and MouseEvent specific props
    jQuery.each( {
    	altKey: true,
    	bubbles: true,
    	cancelable: true,
    	changedTouches: true,
    	ctrlKey: true,
    	detail: true,
    	eventPhase: true,
    	metaKey: true,
    	pageX: true,
    	pageY: true,
    	shiftKey: true,
    	view: true,
    	"char": true,
    	charCode: true,
    	key: true,
    	keyCode: true,
    	button: true,
    	buttons: true,
    	clientX: true,
    	clientY: true,
    	offsetX: true,
    	offsetY: true,
    	pointerId: true,
    	pointerType: true,
    	screenX: true,
    	screenY: true,
    	targetTouches: true,
    	toElement: true,
    	touches: true,

    	which: function( event ) {
    		var button = event.button;

    		// Add which for key events
    		if ( event.which == null && rkeyEvent.test( event.type ) ) {
    			return event.charCode != null ? event.charCode : event.keyCode;
    		}

    		// Add which for click: 1 === left; 2 === middle; 3 === right
    		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
    			if ( button & 1 ) {
    				return 1;
    			}

    			if ( button & 2 ) {
    				return 3;
    			}

    			if ( button & 4 ) {
    				return 2;
    			}

    			return 0;
    		}

    		return event.which;
    	}
    }, jQuery.event.addProp );

    // Create mouseenter/leave events using mouseover/out and event-time checks
    // so that event delegation works in jQuery.
    // Do the same for pointerenter/pointerleave and pointerover/pointerout
    //
    // Support: Safari 7 only
    // Safari sends mouseenter too often; see:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
    // for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each( {
    	mouseenter: "mouseover",
    	mouseleave: "mouseout",
    	pointerenter: "pointerover",
    	pointerleave: "pointerout"
    }, function( orig, fix ) {
    	jQuery.event.special[ orig ] = {
    		delegateType: fix,
    		bindType: fix,

    		handle: function( event ) {
    			var ret,
    				target = this,
    				related = event.relatedTarget,
    				handleObj = event.handleObj;

    			// For mouseenter/leave call the handler if related is outside the target.
    			// NB: No relatedTarget if the mouse left/entered the browser window
    			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
    				event.type = handleObj.origType;
    				ret = handleObj.handler.apply( this, arguments );
    				event.type = fix;
    			}
    			return ret;
    		}
    	};
    } );

    jQuery.fn.extend( {

    	on: function( types, selector, data, fn ) {
    		return on( this, types, selector, data, fn );
    	},
    	one: function( types, selector, data, fn ) {
    		return on( this, types, selector, data, fn, 1 );
    	},
    	off: function( types, selector, fn ) {
    		var handleObj, type;
    		if ( types && types.preventDefault && types.handleObj ) {

    			// ( event )  dispatched jQuery.Event
    			handleObj = types.handleObj;
    			jQuery( types.delegateTarget ).off(
    				handleObj.namespace ?
    					handleObj.origType + "." + handleObj.namespace :
    					handleObj.origType,
    				handleObj.selector,
    				handleObj.handler
    			);
    			return this;
    		}
    		if ( typeof types === "object" ) {

    			// ( types-object [, selector] )
    			for ( type in types ) {
    				this.off( type, selector, types[ type ] );
    			}
    			return this;
    		}
    		if ( selector === false || typeof selector === "function" ) {

    			// ( types [, fn] )
    			fn = selector;
    			selector = undefined;
    		}
    		if ( fn === false ) {
    			fn = returnFalse;
    		}
    		return this.each( function() {
    			jQuery.event.remove( this, types, fn, selector );
    		} );
    	}
    } );


    var

    	/* eslint-disable max-len */

    	// See https://github.com/eslint/eslint/issues/3229
    	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

    	/* eslint-enable */

    	// Support: IE <=10 - 11, Edge 12 - 13 only
    	// In IE/Edge using regex groups here causes severe slowdowns.
    	// See https://connect.microsoft.com/IE/feedback/details/1736512/
    	rnoInnerhtml = /<script|<style|<link/i,

    	// checked="checked" or checked
    	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    // Prefer a tbody over its parent table for containing new rows
    function manipulationTarget( elem, content ) {
    	if ( nodeName( elem, "table" ) &&
    		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

    		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
    	}

    	return elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript( elem ) {
    	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
    	return elem;
    }
    function restoreScript( elem ) {
    	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
    		elem.type = elem.type.slice( 5 );
    	} else {
    		elem.removeAttribute( "type" );
    	}

    	return elem;
    }

    function cloneCopyEvent( src, dest ) {
    	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

    	if ( dest.nodeType !== 1 ) {
    		return;
    	}

    	// 1. Copy private data: events, handlers, etc.
    	if ( dataPriv.hasData( src ) ) {
    		pdataOld = dataPriv.access( src );
    		pdataCur = dataPriv.set( dest, pdataOld );
    		events = pdataOld.events;

    		if ( events ) {
    			delete pdataCur.handle;
    			pdataCur.events = {};

    			for ( type in events ) {
    				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
    					jQuery.event.add( dest, type, events[ type ][ i ] );
    				}
    			}
    		}
    	}

    	// 2. Copy user data
    	if ( dataUser.hasData( src ) ) {
    		udataOld = dataUser.access( src );
    		udataCur = jQuery.extend( {}, udataOld );

    		dataUser.set( dest, udataCur );
    	}
    }

    // Fix IE bugs, see support tests
    function fixInput( src, dest ) {
    	var nodeName = dest.nodeName.toLowerCase();

    	// Fails to persist the checked state of a cloned checkbox or radio button.
    	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
    		dest.checked = src.checked;

    	// Fails to return the selected option to the default selected state when cloning options
    	} else if ( nodeName === "input" || nodeName === "textarea" ) {
    		dest.defaultValue = src.defaultValue;
    	}
    }

    function domManip( collection, args, callback, ignored ) {

    	// Flatten any nested arrays
    	args = concat.apply( [], args );

    	var fragment, first, scripts, hasScripts, node, doc,
    		i = 0,
    		l = collection.length,
    		iNoClone = l - 1,
    		value = args[ 0 ],
    		valueIsFunction = isFunction( value );

    	// We can't cloneNode fragments that contain checked, in WebKit
    	if ( valueIsFunction ||
    			( l > 1 && typeof value === "string" &&
    				!support.checkClone && rchecked.test( value ) ) ) {
    		return collection.each( function( index ) {
    			var self = collection.eq( index );
    			if ( valueIsFunction ) {
    				args[ 0 ] = value.call( this, index, self.html() );
    			}
    			domManip( self, args, callback, ignored );
    		} );
    	}

    	if ( l ) {
    		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
    		first = fragment.firstChild;

    		if ( fragment.childNodes.length === 1 ) {
    			fragment = first;
    		}

    		// Require either new content or an interest in ignored elements to invoke the callback
    		if ( first || ignored ) {
    			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
    			hasScripts = scripts.length;

    			// Use the original fragment for the last item
    			// instead of the first because it can end up
    			// being emptied incorrectly in certain situations (#8070).
    			for ( ; i < l; i++ ) {
    				node = fragment;

    				if ( i !== iNoClone ) {
    					node = jQuery.clone( node, true, true );

    					// Keep references to cloned scripts for later restoration
    					if ( hasScripts ) {

    						// Support: Android <=4.0 only, PhantomJS 1 only
    						// push.apply(_, arraylike) throws on ancient WebKit
    						jQuery.merge( scripts, getAll( node, "script" ) );
    					}
    				}

    				callback.call( collection[ i ], node, i );
    			}

    			if ( hasScripts ) {
    				doc = scripts[ scripts.length - 1 ].ownerDocument;

    				// Reenable scripts
    				jQuery.map( scripts, restoreScript );

    				// Evaluate executable scripts on first document insertion
    				for ( i = 0; i < hasScripts; i++ ) {
    					node = scripts[ i ];
    					if ( rscriptType.test( node.type || "" ) &&
    						!dataPriv.access( node, "globalEval" ) &&
    						jQuery.contains( doc, node ) ) {

    						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

    							// Optional AJAX dependency, but won't run scripts if not present
    							if ( jQuery._evalUrl ) {
    								jQuery._evalUrl( node.src );
    							}
    						} else {
    							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
    						}
    					}
    				}
    			}
    		}
    	}

    	return collection;
    }

    function remove( elem, selector, keepData ) {
    	var node,
    		nodes = selector ? jQuery.filter( selector, elem ) : elem,
    		i = 0;

    	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
    		if ( !keepData && node.nodeType === 1 ) {
    			jQuery.cleanData( getAll( node ) );
    		}

    		if ( node.parentNode ) {
    			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
    				setGlobalEval( getAll( node, "script" ) );
    			}
    			node.parentNode.removeChild( node );
    		}
    	}

    	return elem;
    }

    jQuery.extend( {
    	htmlPrefilter: function( html ) {
    		return html.replace( rxhtmlTag, "<$1></$2>" );
    	},

    	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
    		var i, l, srcElements, destElements,
    			clone = elem.cloneNode( true ),
    			inPage = jQuery.contains( elem.ownerDocument, elem );

    		// Fix IE cloning issues
    		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
    				!jQuery.isXMLDoc( elem ) ) {

    			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
    			destElements = getAll( clone );
    			srcElements = getAll( elem );

    			for ( i = 0, l = srcElements.length; i < l; i++ ) {
    				fixInput( srcElements[ i ], destElements[ i ] );
    			}
    		}

    		// Copy the events from the original to the clone
    		if ( dataAndEvents ) {
    			if ( deepDataAndEvents ) {
    				srcElements = srcElements || getAll( elem );
    				destElements = destElements || getAll( clone );

    				for ( i = 0, l = srcElements.length; i < l; i++ ) {
    					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
    				}
    			} else {
    				cloneCopyEvent( elem, clone );
    			}
    		}

    		// Preserve script evaluation history
    		destElements = getAll( clone, "script" );
    		if ( destElements.length > 0 ) {
    			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
    		}

    		// Return the cloned set
    		return clone;
    	},

    	cleanData: function( elems ) {
    		var data, elem, type,
    			special = jQuery.event.special,
    			i = 0;

    		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
    			if ( acceptData( elem ) ) {
    				if ( ( data = elem[ dataPriv.expando ] ) ) {
    					if ( data.events ) {
    						for ( type in data.events ) {
    							if ( special[ type ] ) {
    								jQuery.event.remove( elem, type );

    							// This is a shortcut to avoid jQuery.event.remove's overhead
    							} else {
    								jQuery.removeEvent( elem, type, data.handle );
    							}
    						}
    					}

    					// Support: Chrome <=35 - 45+
    					// Assign undefined instead of using delete, see Data#remove
    					elem[ dataPriv.expando ] = undefined;
    				}
    				if ( elem[ dataUser.expando ] ) {

    					// Support: Chrome <=35 - 45+
    					// Assign undefined instead of using delete, see Data#remove
    					elem[ dataUser.expando ] = undefined;
    				}
    			}
    		}
    	}
    } );

    jQuery.fn.extend( {
    	detach: function( selector ) {
    		return remove( this, selector, true );
    	},

    	remove: function( selector ) {
    		return remove( this, selector );
    	},

    	text: function( value ) {
    		return access( this, function( value ) {
    			return value === undefined ?
    				jQuery.text( this ) :
    				this.empty().each( function() {
    					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
    						this.textContent = value;
    					}
    				} );
    		}, null, value, arguments.length );
    	},

    	append: function() {
    		return domManip( this, arguments, function( elem ) {
    			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
    				var target = manipulationTarget( this, elem );
    				target.appendChild( elem );
    			}
    		} );
    	},

    	prepend: function() {
    		return domManip( this, arguments, function( elem ) {
    			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
    				var target = manipulationTarget( this, elem );
    				target.insertBefore( elem, target.firstChild );
    			}
    		} );
    	},

    	before: function() {
    		return domManip( this, arguments, function( elem ) {
    			if ( this.parentNode ) {
    				this.parentNode.insertBefore( elem, this );
    			}
    		} );
    	},

    	after: function() {
    		return domManip( this, arguments, function( elem ) {
    			if ( this.parentNode ) {
    				this.parentNode.insertBefore( elem, this.nextSibling );
    			}
    		} );
    	},

    	empty: function() {
    		var elem,
    			i = 0;

    		for ( ; ( elem = this[ i ] ) != null; i++ ) {
    			if ( elem.nodeType === 1 ) {

    				// Prevent memory leaks
    				jQuery.cleanData( getAll( elem, false ) );

    				// Remove any remaining nodes
    				elem.textContent = "";
    			}
    		}

    		return this;
    	},

    	clone: function( dataAndEvents, deepDataAndEvents ) {
    		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

    		return this.map( function() {
    			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
    		} );
    	},

    	html: function( value ) {
    		return access( this, function( value ) {
    			var elem = this[ 0 ] || {},
    				i = 0,
    				l = this.length;

    			if ( value === undefined && elem.nodeType === 1 ) {
    				return elem.innerHTML;
    			}

    			// See if we can take a shortcut and just use innerHTML
    			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
    				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

    				value = jQuery.htmlPrefilter( value );

    				try {
    					for ( ; i < l; i++ ) {
    						elem = this[ i ] || {};

    						// Remove element nodes and prevent memory leaks
    						if ( elem.nodeType === 1 ) {
    							jQuery.cleanData( getAll( elem, false ) );
    							elem.innerHTML = value;
    						}
    					}

    					elem = 0;

    				// If using innerHTML throws an exception, use the fallback method
    				} catch ( e ) {}
    			}

    			if ( elem ) {
    				this.empty().append( value );
    			}
    		}, null, value, arguments.length );
    	},

    	replaceWith: function() {
    		var ignored = [];

    		// Make the changes, replacing each non-ignored context element with the new content
    		return domManip( this, arguments, function( elem ) {
    			var parent = this.parentNode;

    			if ( jQuery.inArray( this, ignored ) < 0 ) {
    				jQuery.cleanData( getAll( this ) );
    				if ( parent ) {
    					parent.replaceChild( elem, this );
    				}
    			}

    		// Force callback invocation
    		}, ignored );
    	}
    } );

    jQuery.each( {
    	appendTo: "append",
    	prependTo: "prepend",
    	insertBefore: "before",
    	insertAfter: "after",
    	replaceAll: "replaceWith"
    }, function( name, original ) {
    	jQuery.fn[ name ] = function( selector ) {
    		var elems,
    			ret = [],
    			insert = jQuery( selector ),
    			last = insert.length - 1,
    			i = 0;

    		for ( ; i <= last; i++ ) {
    			elems = i === last ? this : this.clone( true );
    			jQuery( insert[ i ] )[ original ]( elems );

    			// Support: Android <=4.0 only, PhantomJS 1 only
    			// .get() because push.apply(_, arraylike) throws on ancient WebKit
    			push.apply( ret, elems.get() );
    		}

    		return this.pushStack( ret );
    	};
    } );
    var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

    var getStyles = function( elem ) {

    		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
    		// IE throws on elements created in popups
    		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    		var view = elem.ownerDocument.defaultView;

    		if ( !view || !view.opener ) {
    			view = window;
    		}

    		return view.getComputedStyle( elem );
    	};

    var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



    ( function() {

    	// Executing both pixelPosition & boxSizingReliable tests require only one layout
    	// so they're executed at the same time to save the second computation.
    	function computeStyleTests() {

    		// This is a singleton, we need to execute it only once
    		if ( !div ) {
    			return;
    		}

    		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
    			"margin-top:1px;padding:0;border:0";
    		div.style.cssText =
    			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
    			"margin:auto;border:1px;padding:1px;" +
    			"width:60%;top:1%";
    		documentElement.appendChild( container ).appendChild( div );

    		var divStyle = window.getComputedStyle( div );
    		pixelPositionVal = divStyle.top !== "1%";

    		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
    		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

    		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
    		// Some styles come back with percentage values, even though they shouldn't
    		div.style.right = "60%";
    		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

    		// Support: IE 9 - 11 only
    		// Detect misreporting of content dimensions for box-sizing:border-box elements
    		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

    		// Support: IE 9 only
    		// Detect overflow:scroll screwiness (gh-3699)
    		div.style.position = "absolute";
    		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

    		documentElement.removeChild( container );

    		// Nullify the div so it wouldn't be stored in the memory and
    		// it will also be a sign that checks already performed
    		div = null;
    	}

    	function roundPixelMeasures( measure ) {
    		return Math.round( parseFloat( measure ) );
    	}

    	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
    		reliableMarginLeftVal,
    		container = document.createElement( "div" ),
    		div = document.createElement( "div" );

    	// Finish early in limited (non-browser) environments
    	if ( !div.style ) {
    		return;
    	}

    	// Support: IE <=9 - 11 only
    	// Style of cloned element affects source element cloned (#8908)
    	div.style.backgroundClip = "content-box";
    	div.cloneNode( true ).style.backgroundClip = "";
    	support.clearCloneStyle = div.style.backgroundClip === "content-box";

    	jQuery.extend( support, {
    		boxSizingReliable: function() {
    			computeStyleTests();
    			return boxSizingReliableVal;
    		},
    		pixelBoxStyles: function() {
    			computeStyleTests();
    			return pixelBoxStylesVal;
    		},
    		pixelPosition: function() {
    			computeStyleTests();
    			return pixelPositionVal;
    		},
    		reliableMarginLeft: function() {
    			computeStyleTests();
    			return reliableMarginLeftVal;
    		},
    		scrollboxSize: function() {
    			computeStyleTests();
    			return scrollboxSizeVal;
    		}
    	} );
    } )();


    function curCSS( elem, name, computed ) {
    	var width, minWidth, maxWidth, ret,

    		// Support: Firefox 51+
    		// Retrieving style before computed somehow
    		// fixes an issue with getting wrong values
    		// on detached elements
    		style = elem.style;

    	computed = computed || getStyles( elem );

    	// getPropertyValue is needed for:
    	//   .css('filter') (IE 9 only, #12537)
    	//   .css('--customProperty) (#3144)
    	if ( computed ) {
    		ret = computed.getPropertyValue( name ) || computed[ name ];

    		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
    			ret = jQuery.style( elem, name );
    		}

    		// A tribute to the "awesome hack by Dean Edwards"
    		// Android Browser returns percentage for some values,
    		// but width seems to be reliably pixels.
    		// This is against the CSSOM draft spec:
    		// https://drafts.csswg.org/cssom/#resolved-values
    		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

    			// Remember the original values
    			width = style.width;
    			minWidth = style.minWidth;
    			maxWidth = style.maxWidth;

    			// Put in the new values to get a computed value out
    			style.minWidth = style.maxWidth = style.width = ret;
    			ret = computed.width;

    			// Revert the changed values
    			style.width = width;
    			style.minWidth = minWidth;
    			style.maxWidth = maxWidth;
    		}
    	}

    	return ret !== undefined ?

    		// Support: IE <=9 - 11 only
    		// IE returns zIndex value as an integer.
    		ret + "" :
    		ret;
    }


    function addGetHookIf( conditionFn, hookFn ) {

    	// Define the hook, we'll check on the first run if it's really needed.
    	return {
    		get: function() {
    			if ( conditionFn() ) {

    				// Hook not needed (or it's not possible to use it due
    				// to missing dependency), remove it.
    				delete this.get;
    				return;
    			}

    			// Hook needed; redefine it so that the support test is not executed again.
    			return ( this.get = hookFn ).apply( this, arguments );
    		}
    	};
    }


    var

    	// Swappable if display is none or starts with table
    	// except "table", "table-cell", or "table-caption"
    	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    	rcustomProp = /^--/,
    	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
    	cssNormalTransform = {
    		letterSpacing: "0",
    		fontWeight: "400"
    	},

    	cssPrefixes = [ "Webkit", "Moz", "ms" ],
    	emptyStyle = document.createElement( "div" ).style;

    // Return a css property mapped to a potentially vendor prefixed property
    function vendorPropName( name ) {

    	// Shortcut for names that are not vendor prefixed
    	if ( name in emptyStyle ) {
    		return name;
    	}

    	// Check for vendor prefixed names
    	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
    		i = cssPrefixes.length;

    	while ( i-- ) {
    		name = cssPrefixes[ i ] + capName;
    		if ( name in emptyStyle ) {
    			return name;
    		}
    	}
    }

    // Return a property mapped along what jQuery.cssProps suggests or to
    // a vendor prefixed property.
    function finalPropName( name ) {
    	var ret = jQuery.cssProps[ name ];
    	if ( !ret ) {
    		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
    	}
    	return ret;
    }

    function setPositiveNumber( elem, value, subtract ) {

    	// Any relative (+/-) values have already been
    	// normalized at this point
    	var matches = rcssNum.exec( value );
    	return matches ?

    		// Guard against undefined "subtract", e.g., when used as in cssHooks
    		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
    		value;
    }

    function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
    	var i = dimension === "width" ? 1 : 0,
    		extra = 0,
    		delta = 0;

    	// Adjustment may not be necessary
    	if ( box === ( isBorderBox ? "border" : "content" ) ) {
    		return 0;
    	}

    	for ( ; i < 4; i += 2 ) {

    		// Both box models exclude margin
    		if ( box === "margin" ) {
    			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
    		}

    		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
    		if ( !isBorderBox ) {

    			// Add padding
    			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

    			// For "border" or "margin", add border
    			if ( box !== "padding" ) {
    				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

    			// But still keep track of it otherwise
    			} else {
    				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
    			}

    		// If we get here with a border-box (content + padding + border), we're seeking "content" or
    		// "padding" or "margin"
    		} else {

    			// For "content", subtract padding
    			if ( box === "content" ) {
    				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
    			}

    			// For "content" or "padding", subtract border
    			if ( box !== "margin" ) {
    				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
    			}
    		}
    	}

    	// Account for positive content-box scroll gutter when requested by providing computedVal
    	if ( !isBorderBox && computedVal >= 0 ) {

    		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
    		// Assuming integer scroll gutter, subtract the rest and round down
    		delta += Math.max( 0, Math.ceil(
    			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
    			computedVal -
    			delta -
    			extra -
    			0.5
    		) );
    	}

    	return delta;
    }

    function getWidthOrHeight( elem, dimension, extra ) {

    	// Start with computed style
    	var styles = getStyles( elem ),
    		val = curCSS( elem, dimension, styles ),
    		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
    		valueIsBorderBox = isBorderBox;

    	// Support: Firefox <=54
    	// Return a confounding non-pixel value or feign ignorance, as appropriate.
    	if ( rnumnonpx.test( val ) ) {
    		if ( !extra ) {
    			return val;
    		}
    		val = "auto";
    	}

    	// Check for style in case a browser which returns unreliable values
    	// for getComputedStyle silently falls back to the reliable elem.style
    	valueIsBorderBox = valueIsBorderBox &&
    		( support.boxSizingReliable() || val === elem.style[ dimension ] );

    	// Fall back to offsetWidth/offsetHeight when value is "auto"
    	// This happens for inline elements with no explicit setting (gh-3571)
    	// Support: Android <=4.1 - 4.3 only
    	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
    	if ( val === "auto" ||
    		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

    		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

    		// offsetWidth/offsetHeight provide border-box values
    		valueIsBorderBox = true;
    	}

    	// Normalize "" and auto
    	val = parseFloat( val ) || 0;

    	// Adjust for the element's box model
    	return ( val +
    		boxModelAdjustment(
    			elem,
    			dimension,
    			extra || ( isBorderBox ? "border" : "content" ),
    			valueIsBorderBox,
    			styles,

    			// Provide the current computed size to request scroll gutter calculation (gh-3589)
    			val
    		)
    	) + "px";
    }

    jQuery.extend( {

    	// Add in style property hooks for overriding the default
    	// behavior of getting and setting a style property
    	cssHooks: {
    		opacity: {
    			get: function( elem, computed ) {
    				if ( computed ) {

    					// We should always get a number back from opacity
    					var ret = curCSS( elem, "opacity" );
    					return ret === "" ? "1" : ret;
    				}
    			}
    		}
    	},

    	// Don't automatically add "px" to these possibly-unitless properties
    	cssNumber: {
    		"animationIterationCount": true,
    		"columnCount": true,
    		"fillOpacity": true,
    		"flexGrow": true,
    		"flexShrink": true,
    		"fontWeight": true,
    		"lineHeight": true,
    		"opacity": true,
    		"order": true,
    		"orphans": true,
    		"widows": true,
    		"zIndex": true,
    		"zoom": true
    	},

    	// Add in properties whose names you wish to fix before
    	// setting or getting the value
    	cssProps: {},

    	// Get and set the style property on a DOM Node
    	style: function( elem, name, value, extra ) {

    		// Don't set styles on text and comment nodes
    		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
    			return;
    		}

    		// Make sure that we're working with the right name
    		var ret, type, hooks,
    			origName = camelCase( name ),
    			isCustomProp = rcustomProp.test( name ),
    			style = elem.style;

    		// Make sure that we're working with the right name. We don't
    		// want to query the value if it is a CSS custom property
    		// since they are user-defined.
    		if ( !isCustomProp ) {
    			name = finalPropName( origName );
    		}

    		// Gets hook for the prefixed version, then unprefixed version
    		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    		// Check if we're setting a value
    		if ( value !== undefined ) {
    			type = typeof value;

    			// Convert "+=" or "-=" to relative numbers (#7345)
    			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
    				value = adjustCSS( elem, name, ret );

    				// Fixes bug #9237
    				type = "number";
    			}

    			// Make sure that null and NaN values aren't set (#7116)
    			if ( value == null || value !== value ) {
    				return;
    			}

    			// If a number was passed in, add the unit (except for certain CSS properties)
    			if ( type === "number" ) {
    				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
    			}

    			// background-* props affect original clone's values
    			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
    				style[ name ] = "inherit";
    			}

    			// If a hook was provided, use that value, otherwise just set the specified value
    			if ( !hooks || !( "set" in hooks ) ||
    				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

    				if ( isCustomProp ) {
    					style.setProperty( name, value );
    				} else {
    					style[ name ] = value;
    				}
    			}

    		} else {

    			// If a hook was provided get the non-computed value from there
    			if ( hooks && "get" in hooks &&
    				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

    				return ret;
    			}

    			// Otherwise just get the value from the style object
    			return style[ name ];
    		}
    	},

    	css: function( elem, name, extra, styles ) {
    		var val, num, hooks,
    			origName = camelCase( name ),
    			isCustomProp = rcustomProp.test( name );

    		// Make sure that we're working with the right name. We don't
    		// want to modify the value if it is a CSS custom property
    		// since they are user-defined.
    		if ( !isCustomProp ) {
    			name = finalPropName( origName );
    		}

    		// Try prefixed name followed by the unprefixed name
    		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    		// If a hook was provided get the computed value from there
    		if ( hooks && "get" in hooks ) {
    			val = hooks.get( elem, true, extra );
    		}

    		// Otherwise, if a way to get the computed value exists, use that
    		if ( val === undefined ) {
    			val = curCSS( elem, name, styles );
    		}

    		// Convert "normal" to computed value
    		if ( val === "normal" && name in cssNormalTransform ) {
    			val = cssNormalTransform[ name ];
    		}

    		// Make numeric if forced or a qualifier was provided and val looks numeric
    		if ( extra === "" || extra ) {
    			num = parseFloat( val );
    			return extra === true || isFinite( num ) ? num || 0 : val;
    		}

    		return val;
    	}
    } );

    jQuery.each( [ "height", "width" ], function( i, dimension ) {
    	jQuery.cssHooks[ dimension ] = {
    		get: function( elem, computed, extra ) {
    			if ( computed ) {

    				// Certain elements can have dimension info if we invisibly show them
    				// but it must have a current display style that would benefit
    				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

    					// Support: Safari 8+
    					// Table columns in Safari have non-zero offsetWidth & zero
    					// getBoundingClientRect().width unless display is changed.
    					// Support: IE <=11 only
    					// Running getBoundingClientRect on a disconnected node
    					// in IE throws an error.
    					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
    						swap( elem, cssShow, function() {
    							return getWidthOrHeight( elem, dimension, extra );
    						} ) :
    						getWidthOrHeight( elem, dimension, extra );
    			}
    		},

    		set: function( elem, value, extra ) {
    			var matches,
    				styles = getStyles( elem ),
    				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
    				subtract = extra && boxModelAdjustment(
    					elem,
    					dimension,
    					extra,
    					isBorderBox,
    					styles
    				);

    			// Account for unreliable border-box dimensions by comparing offset* to computed and
    			// faking a content-box to get border and padding (gh-3699)
    			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
    				subtract -= Math.ceil(
    					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
    					parseFloat( styles[ dimension ] ) -
    					boxModelAdjustment( elem, dimension, "border", false, styles ) -
    					0.5
    				);
    			}

    			// Convert to pixels if value adjustment is needed
    			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
    				( matches[ 3 ] || "px" ) !== "px" ) {

    				elem.style[ dimension ] = value;
    				value = jQuery.css( elem, dimension );
    			}

    			return setPositiveNumber( elem, value, subtract );
    		}
    	};
    } );

    jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
    	function( elem, computed ) {
    		if ( computed ) {
    			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
    				elem.getBoundingClientRect().left -
    					swap( elem, { marginLeft: 0 }, function() {
    						return elem.getBoundingClientRect().left;
    					} )
    				) + "px";
    		}
    	}
    );

    // These hooks are used by animate to expand properties
    jQuery.each( {
    	margin: "",
    	padding: "",
    	border: "Width"
    }, function( prefix, suffix ) {
    	jQuery.cssHooks[ prefix + suffix ] = {
    		expand: function( value ) {
    			var i = 0,
    				expanded = {},

    				// Assumes a single number if not a string
    				parts = typeof value === "string" ? value.split( " " ) : [ value ];

    			for ( ; i < 4; i++ ) {
    				expanded[ prefix + cssExpand[ i ] + suffix ] =
    					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
    			}

    			return expanded;
    		}
    	};

    	if ( prefix !== "margin" ) {
    		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
    	}
    } );

    jQuery.fn.extend( {
    	css: function( name, value ) {
    		return access( this, function( elem, name, value ) {
    			var styles, len,
    				map = {},
    				i = 0;

    			if ( Array.isArray( name ) ) {
    				styles = getStyles( elem );
    				len = name.length;

    				for ( ; i < len; i++ ) {
    					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
    				}

    				return map;
    			}

    			return value !== undefined ?
    				jQuery.style( elem, name, value ) :
    				jQuery.css( elem, name );
    		}, name, value, arguments.length > 1 );
    	}
    } );


    function Tween( elem, options, prop, end, easing ) {
    	return new Tween.prototype.init( elem, options, prop, end, easing );
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
    	constructor: Tween,
    	init: function( elem, options, prop, end, easing, unit ) {
    		this.elem = elem;
    		this.prop = prop;
    		this.easing = easing || jQuery.easing._default;
    		this.options = options;
    		this.start = this.now = this.cur();
    		this.end = end;
    		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
    	},
    	cur: function() {
    		var hooks = Tween.propHooks[ this.prop ];

    		return hooks && hooks.get ?
    			hooks.get( this ) :
    			Tween.propHooks._default.get( this );
    	},
    	run: function( percent ) {
    		var eased,
    			hooks = Tween.propHooks[ this.prop ];

    		if ( this.options.duration ) {
    			this.pos = eased = jQuery.easing[ this.easing ](
    				percent, this.options.duration * percent, 0, 1, this.options.duration
    			);
    		} else {
    			this.pos = eased = percent;
    		}
    		this.now = ( this.end - this.start ) * eased + this.start;

    		if ( this.options.step ) {
    			this.options.step.call( this.elem, this.now, this );
    		}

    		if ( hooks && hooks.set ) {
    			hooks.set( this );
    		} else {
    			Tween.propHooks._default.set( this );
    		}
    		return this;
    	}
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
    	_default: {
    		get: function( tween ) {
    			var result;

    			// Use a property on the element directly when it is not a DOM element,
    			// or when there is no matching style property that exists.
    			if ( tween.elem.nodeType !== 1 ||
    				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
    				return tween.elem[ tween.prop ];
    			}

    			// Passing an empty string as a 3rd parameter to .css will automatically
    			// attempt a parseFloat and fallback to a string if the parse fails.
    			// Simple values such as "10px" are parsed to Float;
    			// complex values such as "rotate(1rad)" are returned as-is.
    			result = jQuery.css( tween.elem, tween.prop, "" );

    			// Empty strings, null, undefined and "auto" are converted to 0.
    			return !result || result === "auto" ? 0 : result;
    		},
    		set: function( tween ) {

    			// Use step hook for back compat.
    			// Use cssHook if its there.
    			// Use .style if available and use plain properties where available.
    			if ( jQuery.fx.step[ tween.prop ] ) {
    				jQuery.fx.step[ tween.prop ]( tween );
    			} else if ( tween.elem.nodeType === 1 &&
    				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
    					jQuery.cssHooks[ tween.prop ] ) ) {
    				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
    			} else {
    				tween.elem[ tween.prop ] = tween.now;
    			}
    		}
    	}
    };

    // Support: IE <=9 only
    // Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    	set: function( tween ) {
    		if ( tween.elem.nodeType && tween.elem.parentNode ) {
    			tween.elem[ tween.prop ] = tween.now;
    		}
    	}
    };

    jQuery.easing = {
    	linear: function( p ) {
    		return p;
    	},
    	swing: function( p ) {
    		return 0.5 - Math.cos( p * Math.PI ) / 2;
    	},
    	_default: "swing"
    };

    jQuery.fx = Tween.prototype.init;

    // Back compat <1.8 extension point
    jQuery.fx.step = {};




    var
    	fxNow, inProgress,
    	rfxtypes = /^(?:toggle|show|hide)$/,
    	rrun = /queueHooks$/;

    function schedule() {
    	if ( inProgress ) {
    		if ( document.hidden === false && window.requestAnimationFrame ) {
    			window.requestAnimationFrame( schedule );
    		} else {
    			window.setTimeout( schedule, jQuery.fx.interval );
    		}

    		jQuery.fx.tick();
    	}
    }

    // Animations created synchronously will run synchronously
    function createFxNow() {
    	window.setTimeout( function() {
    		fxNow = undefined;
    	} );
    	return ( fxNow = Date.now() );
    }

    // Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
    	var which,
    		i = 0,
    		attrs = { height: type };

    	// If we include width, step value is 1 to do all cssExpand values,
    	// otherwise step value is 2 to skip over Left and Right
    	includeWidth = includeWidth ? 1 : 0;
    	for ( ; i < 4; i += 2 - includeWidth ) {
    		which = cssExpand[ i ];
    		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
    	}

    	if ( includeWidth ) {
    		attrs.opacity = attrs.width = type;
    	}

    	return attrs;
    }

    function createTween( value, prop, animation ) {
    	var tween,
    		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
    		index = 0,
    		length = collection.length;
    	for ( ; index < length; index++ ) {
    		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

    			// We're done with this property
    			return tween;
    		}
    	}
    }

    function defaultPrefilter( elem, props, opts ) {
    	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
    		isBox = "width" in props || "height" in props,
    		anim = this,
    		orig = {},
    		style = elem.style,
    		hidden = elem.nodeType && isHiddenWithinTree( elem ),
    		dataShow = dataPriv.get( elem, "fxshow" );

    	// Queue-skipping animations hijack the fx hooks
    	if ( !opts.queue ) {
    		hooks = jQuery._queueHooks( elem, "fx" );
    		if ( hooks.unqueued == null ) {
    			hooks.unqueued = 0;
    			oldfire = hooks.empty.fire;
    			hooks.empty.fire = function() {
    				if ( !hooks.unqueued ) {
    					oldfire();
    				}
    			};
    		}
    		hooks.unqueued++;

    		anim.always( function() {

    			// Ensure the complete handler is called before this completes
    			anim.always( function() {
    				hooks.unqueued--;
    				if ( !jQuery.queue( elem, "fx" ).length ) {
    					hooks.empty.fire();
    				}
    			} );
    		} );
    	}

    	// Detect show/hide animations
    	for ( prop in props ) {
    		value = props[ prop ];
    		if ( rfxtypes.test( value ) ) {
    			delete props[ prop ];
    			toggle = toggle || value === "toggle";
    			if ( value === ( hidden ? "hide" : "show" ) ) {

    				// Pretend to be hidden if this is a "show" and
    				// there is still data from a stopped show/hide
    				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
    					hidden = true;

    				// Ignore all other no-op show/hide data
    				} else {
    					continue;
    				}
    			}
    			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
    		}
    	}

    	// Bail out if this is a no-op like .hide().hide()
    	propTween = !jQuery.isEmptyObject( props );
    	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
    		return;
    	}

    	// Restrict "overflow" and "display" styles during box animations
    	if ( isBox && elem.nodeType === 1 ) {

    		// Support: IE <=9 - 11, Edge 12 - 15
    		// Record all 3 overflow attributes because IE does not infer the shorthand
    		// from identically-valued overflowX and overflowY and Edge just mirrors
    		// the overflowX value there.
    		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

    		// Identify a display type, preferring old show/hide data over the CSS cascade
    		restoreDisplay = dataShow && dataShow.display;
    		if ( restoreDisplay == null ) {
    			restoreDisplay = dataPriv.get( elem, "display" );
    		}
    		display = jQuery.css( elem, "display" );
    		if ( display === "none" ) {
    			if ( restoreDisplay ) {
    				display = restoreDisplay;
    			} else {

    				// Get nonempty value(s) by temporarily forcing visibility
    				showHide( [ elem ], true );
    				restoreDisplay = elem.style.display || restoreDisplay;
    				display = jQuery.css( elem, "display" );
    				showHide( [ elem ] );
    			}
    		}

    		// Animate inline elements as inline-block
    		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
    			if ( jQuery.css( elem, "float" ) === "none" ) {

    				// Restore the original display value at the end of pure show/hide animations
    				if ( !propTween ) {
    					anim.done( function() {
    						style.display = restoreDisplay;
    					} );
    					if ( restoreDisplay == null ) {
    						display = style.display;
    						restoreDisplay = display === "none" ? "" : display;
    					}
    				}
    				style.display = "inline-block";
    			}
    		}
    	}

    	if ( opts.overflow ) {
    		style.overflow = "hidden";
    		anim.always( function() {
    			style.overflow = opts.overflow[ 0 ];
    			style.overflowX = opts.overflow[ 1 ];
    			style.overflowY = opts.overflow[ 2 ];
    		} );
    	}

    	// Implement show/hide animations
    	propTween = false;
    	for ( prop in orig ) {

    		// General show/hide setup for this element animation
    		if ( !propTween ) {
    			if ( dataShow ) {
    				if ( "hidden" in dataShow ) {
    					hidden = dataShow.hidden;
    				}
    			} else {
    				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
    			}

    			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
    			if ( toggle ) {
    				dataShow.hidden = !hidden;
    			}

    			// Show elements before animating them
    			if ( hidden ) {
    				showHide( [ elem ], true );
    			}

    			/* eslint-disable no-loop-func */

    			anim.done( function() {

    			/* eslint-enable no-loop-func */

    				// The final step of a "hide" animation is actually hiding the element
    				if ( !hidden ) {
    					showHide( [ elem ] );
    				}
    				dataPriv.remove( elem, "fxshow" );
    				for ( prop in orig ) {
    					jQuery.style( elem, prop, orig[ prop ] );
    				}
    			} );
    		}

    		// Per-property setup
    		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
    		if ( !( prop in dataShow ) ) {
    			dataShow[ prop ] = propTween.start;
    			if ( hidden ) {
    				propTween.end = propTween.start;
    				propTween.start = 0;
    			}
    		}
    	}
    }

    function propFilter( props, specialEasing ) {
    	var index, name, easing, value, hooks;

    	// camelCase, specialEasing and expand cssHook pass
    	for ( index in props ) {
    		name = camelCase( index );
    		easing = specialEasing[ name ];
    		value = props[ index ];
    		if ( Array.isArray( value ) ) {
    			easing = value[ 1 ];
    			value = props[ index ] = value[ 0 ];
    		}

    		if ( index !== name ) {
    			props[ name ] = value;
    			delete props[ index ];
    		}

    		hooks = jQuery.cssHooks[ name ];
    		if ( hooks && "expand" in hooks ) {
    			value = hooks.expand( value );
    			delete props[ name ];

    			// Not quite $.extend, this won't overwrite existing keys.
    			// Reusing 'index' because we have the correct "name"
    			for ( index in value ) {
    				if ( !( index in props ) ) {
    					props[ index ] = value[ index ];
    					specialEasing[ index ] = easing;
    				}
    			}
    		} else {
    			specialEasing[ name ] = easing;
    		}
    	}
    }

    function Animation( elem, properties, options ) {
    	var result,
    		stopped,
    		index = 0,
    		length = Animation.prefilters.length,
    		deferred = jQuery.Deferred().always( function() {

    			// Don't match elem in the :animated selector
    			delete tick.elem;
    		} ),
    		tick = function() {
    			if ( stopped ) {
    				return false;
    			}
    			var currentTime = fxNow || createFxNow(),
    				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

    				// Support: Android 2.3 only
    				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
    				temp = remaining / animation.duration || 0,
    				percent = 1 - temp,
    				index = 0,
    				length = animation.tweens.length;

    			for ( ; index < length; index++ ) {
    				animation.tweens[ index ].run( percent );
    			}

    			deferred.notifyWith( elem, [ animation, percent, remaining ] );

    			// If there's more to do, yield
    			if ( percent < 1 && length ) {
    				return remaining;
    			}

    			// If this was an empty animation, synthesize a final progress notification
    			if ( !length ) {
    				deferred.notifyWith( elem, [ animation, 1, 0 ] );
    			}

    			// Resolve the animation and report its conclusion
    			deferred.resolveWith( elem, [ animation ] );
    			return false;
    		},
    		animation = deferred.promise( {
    			elem: elem,
    			props: jQuery.extend( {}, properties ),
    			opts: jQuery.extend( true, {
    				specialEasing: {},
    				easing: jQuery.easing._default
    			}, options ),
    			originalProperties: properties,
    			originalOptions: options,
    			startTime: fxNow || createFxNow(),
    			duration: options.duration,
    			tweens: [],
    			createTween: function( prop, end ) {
    				var tween = jQuery.Tween( elem, animation.opts, prop, end,
    						animation.opts.specialEasing[ prop ] || animation.opts.easing );
    				animation.tweens.push( tween );
    				return tween;
    			},
    			stop: function( gotoEnd ) {
    				var index = 0,

    					// If we are going to the end, we want to run all the tweens
    					// otherwise we skip this part
    					length = gotoEnd ? animation.tweens.length : 0;
    				if ( stopped ) {
    					return this;
    				}
    				stopped = true;
    				for ( ; index < length; index++ ) {
    					animation.tweens[ index ].run( 1 );
    				}

    				// Resolve when we played the last frame; otherwise, reject
    				if ( gotoEnd ) {
    					deferred.notifyWith( elem, [ animation, 1, 0 ] );
    					deferred.resolveWith( elem, [ animation, gotoEnd ] );
    				} else {
    					deferred.rejectWith( elem, [ animation, gotoEnd ] );
    				}
    				return this;
    			}
    		} ),
    		props = animation.props;

    	propFilter( props, animation.opts.specialEasing );

    	for ( ; index < length; index++ ) {
    		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
    		if ( result ) {
    			if ( isFunction( result.stop ) ) {
    				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
    					result.stop.bind( result );
    			}
    			return result;
    		}
    	}

    	jQuery.map( props, createTween, animation );

    	if ( isFunction( animation.opts.start ) ) {
    		animation.opts.start.call( elem, animation );
    	}

    	// Attach callbacks from options
    	animation
    		.progress( animation.opts.progress )
    		.done( animation.opts.done, animation.opts.complete )
    		.fail( animation.opts.fail )
    		.always( animation.opts.always );

    	jQuery.fx.timer(
    		jQuery.extend( tick, {
    			elem: elem,
    			anim: animation,
    			queue: animation.opts.queue
    		} )
    	);

    	return animation;
    }

    jQuery.Animation = jQuery.extend( Animation, {

    	tweeners: {
    		"*": [ function( prop, value ) {
    			var tween = this.createTween( prop, value );
    			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
    			return tween;
    		} ]
    	},

    	tweener: function( props, callback ) {
    		if ( isFunction( props ) ) {
    			callback = props;
    			props = [ "*" ];
    		} else {
    			props = props.match( rnothtmlwhite );
    		}

    		var prop,
    			index = 0,
    			length = props.length;

    		for ( ; index < length; index++ ) {
    			prop = props[ index ];
    			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
    			Animation.tweeners[ prop ].unshift( callback );
    		}
    	},

    	prefilters: [ defaultPrefilter ],

    	prefilter: function( callback, prepend ) {
    		if ( prepend ) {
    			Animation.prefilters.unshift( callback );
    		} else {
    			Animation.prefilters.push( callback );
    		}
    	}
    } );

    jQuery.speed = function( speed, easing, fn ) {
    	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
    		complete: fn || !fn && easing ||
    			isFunction( speed ) && speed,
    		duration: speed,
    		easing: fn && easing || easing && !isFunction( easing ) && easing
    	};

    	// Go to the end state if fx are off
    	if ( jQuery.fx.off ) {
    		opt.duration = 0;

    	} else {
    		if ( typeof opt.duration !== "number" ) {
    			if ( opt.duration in jQuery.fx.speeds ) {
    				opt.duration = jQuery.fx.speeds[ opt.duration ];

    			} else {
    				opt.duration = jQuery.fx.speeds._default;
    			}
    		}
    	}

    	// Normalize opt.queue - true/undefined/null -> "fx"
    	if ( opt.queue == null || opt.queue === true ) {
    		opt.queue = "fx";
    	}

    	// Queueing
    	opt.old = opt.complete;

    	opt.complete = function() {
    		if ( isFunction( opt.old ) ) {
    			opt.old.call( this );
    		}

    		if ( opt.queue ) {
    			jQuery.dequeue( this, opt.queue );
    		}
    	};

    	return opt;
    };

    jQuery.fn.extend( {
    	fadeTo: function( speed, to, easing, callback ) {

    		// Show any hidden elements after setting opacity to 0
    		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

    			// Animate to the value specified
    			.end().animate( { opacity: to }, speed, easing, callback );
    	},
    	animate: function( prop, speed, easing, callback ) {
    		var empty = jQuery.isEmptyObject( prop ),
    			optall = jQuery.speed( speed, easing, callback ),
    			doAnimation = function() {

    				// Operate on a copy of prop so per-property easing won't be lost
    				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

    				// Empty animations, or finishing resolves immediately
    				if ( empty || dataPriv.get( this, "finish" ) ) {
    					anim.stop( true );
    				}
    			};
    			doAnimation.finish = doAnimation;

    		return empty || optall.queue === false ?
    			this.each( doAnimation ) :
    			this.queue( optall.queue, doAnimation );
    	},
    	stop: function( type, clearQueue, gotoEnd ) {
    		var stopQueue = function( hooks ) {
    			var stop = hooks.stop;
    			delete hooks.stop;
    			stop( gotoEnd );
    		};

    		if ( typeof type !== "string" ) {
    			gotoEnd = clearQueue;
    			clearQueue = type;
    			type = undefined;
    		}
    		if ( clearQueue && type !== false ) {
    			this.queue( type || "fx", [] );
    		}

    		return this.each( function() {
    			var dequeue = true,
    				index = type != null && type + "queueHooks",
    				timers = jQuery.timers,
    				data = dataPriv.get( this );

    			if ( index ) {
    				if ( data[ index ] && data[ index ].stop ) {
    					stopQueue( data[ index ] );
    				}
    			} else {
    				for ( index in data ) {
    					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
    						stopQueue( data[ index ] );
    					}
    				}
    			}

    			for ( index = timers.length; index--; ) {
    				if ( timers[ index ].elem === this &&
    					( type == null || timers[ index ].queue === type ) ) {

    					timers[ index ].anim.stop( gotoEnd );
    					dequeue = false;
    					timers.splice( index, 1 );
    				}
    			}

    			// Start the next in the queue if the last step wasn't forced.
    			// Timers currently will call their complete callbacks, which
    			// will dequeue but only if they were gotoEnd.
    			if ( dequeue || !gotoEnd ) {
    				jQuery.dequeue( this, type );
    			}
    		} );
    	},
    	finish: function( type ) {
    		if ( type !== false ) {
    			type = type || "fx";
    		}
    		return this.each( function() {
    			var index,
    				data = dataPriv.get( this ),
    				queue = data[ type + "queue" ],
    				hooks = data[ type + "queueHooks" ],
    				timers = jQuery.timers,
    				length = queue ? queue.length : 0;

    			// Enable finishing flag on private data
    			data.finish = true;

    			// Empty the queue first
    			jQuery.queue( this, type, [] );

    			if ( hooks && hooks.stop ) {
    				hooks.stop.call( this, true );
    			}

    			// Look for any active animations, and finish them
    			for ( index = timers.length; index--; ) {
    				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
    					timers[ index ].anim.stop( true );
    					timers.splice( index, 1 );
    				}
    			}

    			// Look for any animations in the old queue and finish them
    			for ( index = 0; index < length; index++ ) {
    				if ( queue[ index ] && queue[ index ].finish ) {
    					queue[ index ].finish.call( this );
    				}
    			}

    			// Turn off finishing flag
    			delete data.finish;
    		} );
    	}
    } );

    jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
    	var cssFn = jQuery.fn[ name ];
    	jQuery.fn[ name ] = function( speed, easing, callback ) {
    		return speed == null || typeof speed === "boolean" ?
    			cssFn.apply( this, arguments ) :
    			this.animate( genFx( name, true ), speed, easing, callback );
    	};
    } );

    // Generate shortcuts for custom animations
    jQuery.each( {
    	slideDown: genFx( "show" ),
    	slideUp: genFx( "hide" ),
    	slideToggle: genFx( "toggle" ),
    	fadeIn: { opacity: "show" },
    	fadeOut: { opacity: "hide" },
    	fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
    	jQuery.fn[ name ] = function( speed, easing, callback ) {
    		return this.animate( props, speed, easing, callback );
    	};
    } );

    jQuery.timers = [];
    jQuery.fx.tick = function() {
    	var timer,
    		i = 0,
    		timers = jQuery.timers;

    	fxNow = Date.now();

    	for ( ; i < timers.length; i++ ) {
    		timer = timers[ i ];

    		// Run the timer and safely remove it when done (allowing for external removal)
    		if ( !timer() && timers[ i ] === timer ) {
    			timers.splice( i--, 1 );
    		}
    	}

    	if ( !timers.length ) {
    		jQuery.fx.stop();
    	}
    	fxNow = undefined;
    };

    jQuery.fx.timer = function( timer ) {
    	jQuery.timers.push( timer );
    	jQuery.fx.start();
    };

    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
    	if ( inProgress ) {
    		return;
    	}

    	inProgress = true;
    	schedule();
    };

    jQuery.fx.stop = function() {
    	inProgress = null;
    };

    jQuery.fx.speeds = {
    	slow: 600,
    	fast: 200,

    	// Default speed
    	_default: 400
    };


    // Based off of the plugin by Clint Helfers, with permission.
    // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function( time, type ) {
    	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
    	type = type || "fx";

    	return this.queue( type, function( next, hooks ) {
    		var timeout = window.setTimeout( next, time );
    		hooks.stop = function() {
    			window.clearTimeout( timeout );
    		};
    	} );
    };


    ( function() {
    	var input = document.createElement( "input" ),
    		select = document.createElement( "select" ),
    		opt = select.appendChild( document.createElement( "option" ) );

    	input.type = "checkbox";

    	// Support: Android <=4.3 only
    	// Default value for a checkbox should be "on"
    	support.checkOn = input.value !== "";

    	// Support: IE <=11 only
    	// Must access selectedIndex to make default options select
    	support.optSelected = opt.selected;

    	// Support: IE <=11 only
    	// An input loses its value after becoming a radio
    	input = document.createElement( "input" );
    	input.value = "t";
    	input.type = "radio";
    	support.radioValue = input.value === "t";
    } )();


    var boolHook,
    	attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend( {
    	attr: function( name, value ) {
    		return access( this, jQuery.attr, name, value, arguments.length > 1 );
    	},

    	removeAttr: function( name ) {
    		return this.each( function() {
    			jQuery.removeAttr( this, name );
    		} );
    	}
    } );

    jQuery.extend( {
    	attr: function( elem, name, value ) {
    		var ret, hooks,
    			nType = elem.nodeType;

    		// Don't get/set attributes on text, comment and attribute nodes
    		if ( nType === 3 || nType === 8 || nType === 2 ) {
    			return;
    		}

    		// Fallback to prop when attributes are not supported
    		if ( typeof elem.getAttribute === "undefined" ) {
    			return jQuery.prop( elem, name, value );
    		}

    		// Attribute hooks are determined by the lowercase version
    		// Grab necessary hook if one is defined
    		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
    			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
    				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
    		}

    		if ( value !== undefined ) {
    			if ( value === null ) {
    				jQuery.removeAttr( elem, name );
    				return;
    			}

    			if ( hooks && "set" in hooks &&
    				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
    				return ret;
    			}

    			elem.setAttribute( name, value + "" );
    			return value;
    		}

    		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
    			return ret;
    		}

    		ret = jQuery.find.attr( elem, name );

    		// Non-existent attributes return null, we normalize to undefined
    		return ret == null ? undefined : ret;
    	},

    	attrHooks: {
    		type: {
    			set: function( elem, value ) {
    				if ( !support.radioValue && value === "radio" &&
    					nodeName( elem, "input" ) ) {
    					var val = elem.value;
    					elem.setAttribute( "type", value );
    					if ( val ) {
    						elem.value = val;
    					}
    					return value;
    				}
    			}
    		}
    	},

    	removeAttr: function( elem, value ) {
    		var name,
    			i = 0,

    			// Attribute names can contain non-HTML whitespace characters
    			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
    			attrNames = value && value.match( rnothtmlwhite );

    		if ( attrNames && elem.nodeType === 1 ) {
    			while ( ( name = attrNames[ i++ ] ) ) {
    				elem.removeAttribute( name );
    			}
    		}
    	}
    } );

    // Hooks for boolean attributes
    boolHook = {
    	set: function( elem, value, name ) {
    		if ( value === false ) {

    			// Remove boolean attributes when set to false
    			jQuery.removeAttr( elem, name );
    		} else {
    			elem.setAttribute( name, name );
    		}
    		return name;
    	}
    };

    jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
    	var getter = attrHandle[ name ] || jQuery.find.attr;

    	attrHandle[ name ] = function( elem, name, isXML ) {
    		var ret, handle,
    			lowercaseName = name.toLowerCase();

    		if ( !isXML ) {

    			// Avoid an infinite loop by temporarily removing this function from the getter
    			handle = attrHandle[ lowercaseName ];
    			attrHandle[ lowercaseName ] = ret;
    			ret = getter( elem, name, isXML ) != null ?
    				lowercaseName :
    				null;
    			attrHandle[ lowercaseName ] = handle;
    		}
    		return ret;
    	};
    } );




    var rfocusable = /^(?:input|select|textarea|button)$/i,
    	rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend( {
    	prop: function( name, value ) {
    		return access( this, jQuery.prop, name, value, arguments.length > 1 );
    	},

    	removeProp: function( name ) {
    		return this.each( function() {
    			delete this[ jQuery.propFix[ name ] || name ];
    		} );
    	}
    } );

    jQuery.extend( {
    	prop: function( elem, name, value ) {
    		var ret, hooks,
    			nType = elem.nodeType;

    		// Don't get/set properties on text, comment and attribute nodes
    		if ( nType === 3 || nType === 8 || nType === 2 ) {
    			return;
    		}

    		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

    			// Fix name and attach hooks
    			name = jQuery.propFix[ name ] || name;
    			hooks = jQuery.propHooks[ name ];
    		}

    		if ( value !== undefined ) {
    			if ( hooks && "set" in hooks &&
    				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
    				return ret;
    			}

    			return ( elem[ name ] = value );
    		}

    		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
    			return ret;
    		}

    		return elem[ name ];
    	},

    	propHooks: {
    		tabIndex: {
    			get: function( elem ) {

    				// Support: IE <=9 - 11 only
    				// elem.tabIndex doesn't always return the
    				// correct value when it hasn't been explicitly set
    				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
    				// Use proper attribute retrieval(#12072)
    				var tabindex = jQuery.find.attr( elem, "tabindex" );

    				if ( tabindex ) {
    					return parseInt( tabindex, 10 );
    				}

    				if (
    					rfocusable.test( elem.nodeName ) ||
    					rclickable.test( elem.nodeName ) &&
    					elem.href
    				) {
    					return 0;
    				}

    				return -1;
    			}
    		}
    	},

    	propFix: {
    		"for": "htmlFor",
    		"class": "className"
    	}
    } );

    // Support: IE <=11 only
    // Accessing the selectedIndex property
    // forces the browser to respect setting selected
    // on the option
    // The getter ensures a default option is selected
    // when in an optgroup
    // eslint rule "no-unused-expressions" is disabled for this code
    // since it considers such accessions noop
    if ( !support.optSelected ) {
    	jQuery.propHooks.selected = {
    		get: function( elem ) {

    			/* eslint no-unused-expressions: "off" */

    			var parent = elem.parentNode;
    			if ( parent && parent.parentNode ) {
    				parent.parentNode.selectedIndex;
    			}
    			return null;
    		},
    		set: function( elem ) {

    			/* eslint no-unused-expressions: "off" */

    			var parent = elem.parentNode;
    			if ( parent ) {
    				parent.selectedIndex;

    				if ( parent.parentNode ) {
    					parent.parentNode.selectedIndex;
    				}
    			}
    		}
    	};
    }

    jQuery.each( [
    	"tabIndex",
    	"readOnly",
    	"maxLength",
    	"cellSpacing",
    	"cellPadding",
    	"rowSpan",
    	"colSpan",
    	"useMap",
    	"frameBorder",
    	"contentEditable"
    ], function() {
    	jQuery.propFix[ this.toLowerCase() ] = this;
    } );




    	// Strip and collapse whitespace according to HTML spec
    	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
    	function stripAndCollapse( value ) {
    		var tokens = value.match( rnothtmlwhite ) || [];
    		return tokens.join( " " );
    	}


    function getClass( elem ) {
    	return elem.getAttribute && elem.getAttribute( "class" ) || "";
    }

    function classesToArray( value ) {
    	if ( Array.isArray( value ) ) {
    		return value;
    	}
    	if ( typeof value === "string" ) {
    		return value.match( rnothtmlwhite ) || [];
    	}
    	return [];
    }

    jQuery.fn.extend( {
    	addClass: function( value ) {
    		var classes, elem, cur, curValue, clazz, j, finalValue,
    			i = 0;

    		if ( isFunction( value ) ) {
    			return this.each( function( j ) {
    				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
    			} );
    		}

    		classes = classesToArray( value );

    		if ( classes.length ) {
    			while ( ( elem = this[ i++ ] ) ) {
    				curValue = getClass( elem );
    				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

    				if ( cur ) {
    					j = 0;
    					while ( ( clazz = classes[ j++ ] ) ) {
    						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
    							cur += clazz + " ";
    						}
    					}

    					// Only assign if different to avoid unneeded rendering.
    					finalValue = stripAndCollapse( cur );
    					if ( curValue !== finalValue ) {
    						elem.setAttribute( "class", finalValue );
    					}
    				}
    			}
    		}

    		return this;
    	},

    	removeClass: function( value ) {
    		var classes, elem, cur, curValue, clazz, j, finalValue,
    			i = 0;

    		if ( isFunction( value ) ) {
    			return this.each( function( j ) {
    				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
    			} );
    		}

    		if ( !arguments.length ) {
    			return this.attr( "class", "" );
    		}

    		classes = classesToArray( value );

    		if ( classes.length ) {
    			while ( ( elem = this[ i++ ] ) ) {
    				curValue = getClass( elem );

    				// This expression is here for better compressibility (see addClass)
    				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

    				if ( cur ) {
    					j = 0;
    					while ( ( clazz = classes[ j++ ] ) ) {

    						// Remove *all* instances
    						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
    							cur = cur.replace( " " + clazz + " ", " " );
    						}
    					}

    					// Only assign if different to avoid unneeded rendering.
    					finalValue = stripAndCollapse( cur );
    					if ( curValue !== finalValue ) {
    						elem.setAttribute( "class", finalValue );
    					}
    				}
    			}
    		}

    		return this;
    	},

    	toggleClass: function( value, stateVal ) {
    		var type = typeof value,
    			isValidValue = type === "string" || Array.isArray( value );

    		if ( typeof stateVal === "boolean" && isValidValue ) {
    			return stateVal ? this.addClass( value ) : this.removeClass( value );
    		}

    		if ( isFunction( value ) ) {
    			return this.each( function( i ) {
    				jQuery( this ).toggleClass(
    					value.call( this, i, getClass( this ), stateVal ),
    					stateVal
    				);
    			} );
    		}

    		return this.each( function() {
    			var className, i, self, classNames;

    			if ( isValidValue ) {

    				// Toggle individual class names
    				i = 0;
    				self = jQuery( this );
    				classNames = classesToArray( value );

    				while ( ( className = classNames[ i++ ] ) ) {

    					// Check each className given, space separated list
    					if ( self.hasClass( className ) ) {
    						self.removeClass( className );
    					} else {
    						self.addClass( className );
    					}
    				}

    			// Toggle whole class name
    			} else if ( value === undefined || type === "boolean" ) {
    				className = getClass( this );
    				if ( className ) {

    					// Store className if set
    					dataPriv.set( this, "__className__", className );
    				}

    				// If the element has a class name or if we're passed `false`,
    				// then remove the whole classname (if there was one, the above saved it).
    				// Otherwise bring back whatever was previously saved (if anything),
    				// falling back to the empty string if nothing was stored.
    				if ( this.setAttribute ) {
    					this.setAttribute( "class",
    						className || value === false ?
    						"" :
    						dataPriv.get( this, "__className__" ) || ""
    					);
    				}
    			}
    		} );
    	},

    	hasClass: function( selector ) {
    		var className, elem,
    			i = 0;

    		className = " " + selector + " ";
    		while ( ( elem = this[ i++ ] ) ) {
    			if ( elem.nodeType === 1 &&
    				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
    					return true;
    			}
    		}

    		return false;
    	}
    } );




    var rreturn = /\r/g;

    jQuery.fn.extend( {
    	val: function( value ) {
    		var hooks, ret, valueIsFunction,
    			elem = this[ 0 ];

    		if ( !arguments.length ) {
    			if ( elem ) {
    				hooks = jQuery.valHooks[ elem.type ] ||
    					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

    				if ( hooks &&
    					"get" in hooks &&
    					( ret = hooks.get( elem, "value" ) ) !== undefined
    				) {
    					return ret;
    				}

    				ret = elem.value;

    				// Handle most common string cases
    				if ( typeof ret === "string" ) {
    					return ret.replace( rreturn, "" );
    				}

    				// Handle cases where value is null/undef or number
    				return ret == null ? "" : ret;
    			}

    			return;
    		}

    		valueIsFunction = isFunction( value );

    		return this.each( function( i ) {
    			var val;

    			if ( this.nodeType !== 1 ) {
    				return;
    			}

    			if ( valueIsFunction ) {
    				val = value.call( this, i, jQuery( this ).val() );
    			} else {
    				val = value;
    			}

    			// Treat null/undefined as ""; convert numbers to string
    			if ( val == null ) {
    				val = "";

    			} else if ( typeof val === "number" ) {
    				val += "";

    			} else if ( Array.isArray( val ) ) {
    				val = jQuery.map( val, function( value ) {
    					return value == null ? "" : value + "";
    				} );
    			}

    			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

    			// If set returns undefined, fall back to normal setting
    			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
    				this.value = val;
    			}
    		} );
    	}
    } );

    jQuery.extend( {
    	valHooks: {
    		option: {
    			get: function( elem ) {

    				var val = jQuery.find.attr( elem, "value" );
    				return val != null ?
    					val :

    					// Support: IE <=10 - 11 only
    					// option.text throws exceptions (#14686, #14858)
    					// Strip and collapse whitespace
    					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
    					stripAndCollapse( jQuery.text( elem ) );
    			}
    		},
    		select: {
    			get: function( elem ) {
    				var value, option, i,
    					options = elem.options,
    					index = elem.selectedIndex,
    					one = elem.type === "select-one",
    					values = one ? null : [],
    					max = one ? index + 1 : options.length;

    				if ( index < 0 ) {
    					i = max;

    				} else {
    					i = one ? index : 0;
    				}

    				// Loop through all the selected options
    				for ( ; i < max; i++ ) {
    					option = options[ i ];

    					// Support: IE <=9 only
    					// IE8-9 doesn't update selected after form reset (#2551)
    					if ( ( option.selected || i === index ) &&

    							// Don't return options that are disabled or in a disabled optgroup
    							!option.disabled &&
    							( !option.parentNode.disabled ||
    								!nodeName( option.parentNode, "optgroup" ) ) ) {

    						// Get the specific value for the option
    						value = jQuery( option ).val();

    						// We don't need an array for one selects
    						if ( one ) {
    							return value;
    						}

    						// Multi-Selects return an array
    						values.push( value );
    					}
    				}

    				return values;
    			},

    			set: function( elem, value ) {
    				var optionSet, option,
    					options = elem.options,
    					values = jQuery.makeArray( value ),
    					i = options.length;

    				while ( i-- ) {
    					option = options[ i ];

    					/* eslint-disable no-cond-assign */

    					if ( option.selected =
    						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
    					) {
    						optionSet = true;
    					}

    					/* eslint-enable no-cond-assign */
    				}

    				// Force browsers to behave consistently when non-matching value is set
    				if ( !optionSet ) {
    					elem.selectedIndex = -1;
    				}
    				return values;
    			}
    		}
    	}
    } );

    // Radios and checkboxes getter/setter
    jQuery.each( [ "radio", "checkbox" ], function() {
    	jQuery.valHooks[ this ] = {
    		set: function( elem, value ) {
    			if ( Array.isArray( value ) ) {
    				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
    			}
    		}
    	};
    	if ( !support.checkOn ) {
    		jQuery.valHooks[ this ].get = function( elem ) {
    			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
    		};
    	}
    } );




    // Return jQuery for attributes-only inclusion


    support.focusin = "onfocusin" in window;


    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    	stopPropagationCallback = function( e ) {
    		e.stopPropagation();
    	};

    jQuery.extend( jQuery.event, {

    	trigger: function( event, data, elem, onlyHandlers ) {

    		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
    			eventPath = [ elem || document ],
    			type = hasOwn.call( event, "type" ) ? event.type : event,
    			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

    		cur = lastElement = tmp = elem = elem || document;

    		// Don't do events on text and comment nodes
    		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
    			return;
    		}

    		// focus/blur morphs to focusin/out; ensure we're not firing them right now
    		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
    			return;
    		}

    		if ( type.indexOf( "." ) > -1 ) {

    			// Namespaced trigger; create a regexp to match event type in handle()
    			namespaces = type.split( "." );
    			type = namespaces.shift();
    			namespaces.sort();
    		}
    		ontype = type.indexOf( ":" ) < 0 && "on" + type;

    		// Caller can pass in a jQuery.Event object, Object, or just an event type string
    		event = event[ jQuery.expando ] ?
    			event :
    			new jQuery.Event( type, typeof event === "object" && event );

    		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
    		event.isTrigger = onlyHandlers ? 2 : 3;
    		event.namespace = namespaces.join( "." );
    		event.rnamespace = event.namespace ?
    			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
    			null;

    		// Clean up the event in case it is being reused
    		event.result = undefined;
    		if ( !event.target ) {
    			event.target = elem;
    		}

    		// Clone any incoming data and prepend the event, creating the handler arg list
    		data = data == null ?
    			[ event ] :
    			jQuery.makeArray( data, [ event ] );

    		// Allow special events to draw outside the lines
    		special = jQuery.event.special[ type ] || {};
    		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
    			return;
    		}

    		// Determine event propagation path in advance, per W3C events spec (#9951)
    		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
    		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

    			bubbleType = special.delegateType || type;
    			if ( !rfocusMorph.test( bubbleType + type ) ) {
    				cur = cur.parentNode;
    			}
    			for ( ; cur; cur = cur.parentNode ) {
    				eventPath.push( cur );
    				tmp = cur;
    			}

    			// Only add window if we got to document (e.g., not plain obj or detached DOM)
    			if ( tmp === ( elem.ownerDocument || document ) ) {
    				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
    			}
    		}

    		// Fire handlers on the event path
    		i = 0;
    		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
    			lastElement = cur;
    			event.type = i > 1 ?
    				bubbleType :
    				special.bindType || type;

    			// jQuery handler
    			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
    				dataPriv.get( cur, "handle" );
    			if ( handle ) {
    				handle.apply( cur, data );
    			}

    			// Native handler
    			handle = ontype && cur[ ontype ];
    			if ( handle && handle.apply && acceptData( cur ) ) {
    				event.result = handle.apply( cur, data );
    				if ( event.result === false ) {
    					event.preventDefault();
    				}
    			}
    		}
    		event.type = type;

    		// If nobody prevented the default action, do it now
    		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

    			if ( ( !special._default ||
    				special._default.apply( eventPath.pop(), data ) === false ) &&
    				acceptData( elem ) ) {

    				// Call a native DOM method on the target with the same name as the event.
    				// Don't do default actions on window, that's where global variables be (#6170)
    				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

    					// Don't re-trigger an onFOO event when we call its FOO() method
    					tmp = elem[ ontype ];

    					if ( tmp ) {
    						elem[ ontype ] = null;
    					}

    					// Prevent re-triggering of the same event, since we already bubbled it above
    					jQuery.event.triggered = type;

    					if ( event.isPropagationStopped() ) {
    						lastElement.addEventListener( type, stopPropagationCallback );
    					}

    					elem[ type ]();

    					if ( event.isPropagationStopped() ) {
    						lastElement.removeEventListener( type, stopPropagationCallback );
    					}

    					jQuery.event.triggered = undefined;

    					if ( tmp ) {
    						elem[ ontype ] = tmp;
    					}
    				}
    			}
    		}

    		return event.result;
    	},

    	// Piggyback on a donor event to simulate a different one
    	// Used only for `focus(in | out)` events
    	simulate: function( type, elem, event ) {
    		var e = jQuery.extend(
    			new jQuery.Event(),
    			event,
    			{
    				type: type,
    				isSimulated: true
    			}
    		);

    		jQuery.event.trigger( e, null, elem );
    	}

    } );

    jQuery.fn.extend( {

    	trigger: function( type, data ) {
    		return this.each( function() {
    			jQuery.event.trigger( type, data, this );
    		} );
    	},
    	triggerHandler: function( type, data ) {
    		var elem = this[ 0 ];
    		if ( elem ) {
    			return jQuery.event.trigger( type, data, elem, true );
    		}
    	}
    } );


    // Support: Firefox <=44
    // Firefox doesn't have focus(in | out) events
    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    //
    // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
    // focus(in | out) events fire after focus & blur events,
    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
    // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    if ( !support.focusin ) {
    	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

    		// Attach a single capturing handler on the document while someone wants focusin/focusout
    		var handler = function( event ) {
    			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
    		};

    		jQuery.event.special[ fix ] = {
    			setup: function() {
    				var doc = this.ownerDocument || this,
    					attaches = dataPriv.access( doc, fix );

    				if ( !attaches ) {
    					doc.addEventListener( orig, handler, true );
    				}
    				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
    			},
    			teardown: function() {
    				var doc = this.ownerDocument || this,
    					attaches = dataPriv.access( doc, fix ) - 1;

    				if ( !attaches ) {
    					doc.removeEventListener( orig, handler, true );
    					dataPriv.remove( doc, fix );

    				} else {
    					dataPriv.access( doc, fix, attaches );
    				}
    			}
    		};
    	} );
    }
    var location = window.location;

    var nonce = Date.now();

    var rquery = ( /\?/ );



    // Cross-browser xml parsing
    jQuery.parseXML = function( data ) {
    	var xml;
    	if ( !data || typeof data !== "string" ) {
    		return null;
    	}

    	// Support: IE 9 - 11 only
    	// IE throws on parseFromString with invalid input.
    	try {
    		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
    	} catch ( e ) {
    		xml = undefined;
    	}

    	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
    		jQuery.error( "Invalid XML: " + data );
    	}
    	return xml;
    };


    var
    	rbracket = /\[\]$/,
    	rCRLF = /\r?\n/g,
    	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    	rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams( prefix, obj, traditional, add ) {
    	var name;

    	if ( Array.isArray( obj ) ) {

    		// Serialize array item.
    		jQuery.each( obj, function( i, v ) {
    			if ( traditional || rbracket.test( prefix ) ) {

    				// Treat each array item as a scalar.
    				add( prefix, v );

    			} else {

    				// Item is non-scalar (array or object), encode its numeric index.
    				buildParams(
    					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
    					v,
    					traditional,
    					add
    				);
    			}
    		} );

    	} else if ( !traditional && toType( obj ) === "object" ) {

    		// Serialize object item.
    		for ( name in obj ) {
    			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
    		}

    	} else {

    		// Serialize scalar item.
    		add( prefix, obj );
    	}
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function( a, traditional ) {
    	var prefix,
    		s = [],
    		add = function( key, valueOrFunction ) {

    			// If value is a function, invoke it and use its return value
    			var value = isFunction( valueOrFunction ) ?
    				valueOrFunction() :
    				valueOrFunction;

    			s[ s.length ] = encodeURIComponent( key ) + "=" +
    				encodeURIComponent( value == null ? "" : value );
    		};

    	// If an array was passed in, assume that it is an array of form elements.
    	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

    		// Serialize the form elements
    		jQuery.each( a, function() {
    			add( this.name, this.value );
    		} );

    	} else {

    		// If traditional, encode the "old" way (the way 1.3.2 or older
    		// did it), otherwise encode params recursively.
    		for ( prefix in a ) {
    			buildParams( prefix, a[ prefix ], traditional, add );
    		}
    	}

    	// Return the resulting serialization
    	return s.join( "&" );
    };

    jQuery.fn.extend( {
    	serialize: function() {
    		return jQuery.param( this.serializeArray() );
    	},
    	serializeArray: function() {
    		return this.map( function() {

    			// Can add propHook for "elements" to filter or add form elements
    			var elements = jQuery.prop( this, "elements" );
    			return elements ? jQuery.makeArray( elements ) : this;
    		} )
    		.filter( function() {
    			var type = this.type;

    			// Use .is( ":disabled" ) so that fieldset[disabled] works
    			return this.name && !jQuery( this ).is( ":disabled" ) &&
    				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
    				( this.checked || !rcheckableType.test( type ) );
    		} )
    		.map( function( i, elem ) {
    			var val = jQuery( this ).val();

    			if ( val == null ) {
    				return null;
    			}

    			if ( Array.isArray( val ) ) {
    				return jQuery.map( val, function( val ) {
    					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    				} );
    			}

    			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    		} ).get();
    	}
    } );


    var
    	r20 = /%20/g,
    	rhash = /#.*$/,
    	rantiCache = /([?&])_=[^&]*/,
    	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

    	// #7653, #8125, #8152: local protocol detection
    	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    	rnoContent = /^(?:GET|HEAD)$/,
    	rprotocol = /^\/\//,

    	/* Prefilters
    	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
    	 * 2) These are called:
    	 *    - BEFORE asking for a transport
    	 *    - AFTER param serialization (s.data is a string if s.processData is true)
    	 * 3) key is the dataType
    	 * 4) the catchall symbol "*" can be used
    	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
    	 */
    	prefilters = {},

    	/* Transports bindings
    	 * 1) key is the dataType
    	 * 2) the catchall symbol "*" can be used
    	 * 3) selection will start with transport dataType and THEN go to "*" if needed
    	 */
    	transports = {},

    	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    	allTypes = "*/".concat( "*" ),

    	// Anchor tag for parsing the document origin
    	originAnchor = document.createElement( "a" );
    	originAnchor.href = location.href;

    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports( structure ) {

    	// dataTypeExpression is optional and defaults to "*"
    	return function( dataTypeExpression, func ) {

    		if ( typeof dataTypeExpression !== "string" ) {
    			func = dataTypeExpression;
    			dataTypeExpression = "*";
    		}

    		var dataType,
    			i = 0,
    			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

    		if ( isFunction( func ) ) {

    			// For each dataType in the dataTypeExpression
    			while ( ( dataType = dataTypes[ i++ ] ) ) {

    				// Prepend if requested
    				if ( dataType[ 0 ] === "+" ) {
    					dataType = dataType.slice( 1 ) || "*";
    					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

    				// Otherwise append
    				} else {
    					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
    				}
    			}
    		}
    	};
    }

    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

    	var inspected = {},
    		seekingTransport = ( structure === transports );

    	function inspect( dataType ) {
    		var selected;
    		inspected[ dataType ] = true;
    		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
    			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
    			if ( typeof dataTypeOrTransport === "string" &&
    				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

    				options.dataTypes.unshift( dataTypeOrTransport );
    				inspect( dataTypeOrTransport );
    				return false;
    			} else if ( seekingTransport ) {
    				return !( selected = dataTypeOrTransport );
    			}
    		} );
    		return selected;
    	}

    	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
    }

    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend( target, src ) {
    	var key, deep,
    		flatOptions = jQuery.ajaxSettings.flatOptions || {};

    	for ( key in src ) {
    		if ( src[ key ] !== undefined ) {
    			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
    		}
    	}
    	if ( deep ) {
    		jQuery.extend( true, target, deep );
    	}

    	return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses( s, jqXHR, responses ) {

    	var ct, type, finalDataType, firstDataType,
    		contents = s.contents,
    		dataTypes = s.dataTypes;

    	// Remove auto dataType and get content-type in the process
    	while ( dataTypes[ 0 ] === "*" ) {
    		dataTypes.shift();
    		if ( ct === undefined ) {
    			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
    		}
    	}

    	// Check if we're dealing with a known content-type
    	if ( ct ) {
    		for ( type in contents ) {
    			if ( contents[ type ] && contents[ type ].test( ct ) ) {
    				dataTypes.unshift( type );
    				break;
    			}
    		}
    	}

    	// Check to see if we have a response for the expected dataType
    	if ( dataTypes[ 0 ] in responses ) {
    		finalDataType = dataTypes[ 0 ];
    	} else {

    		// Try convertible dataTypes
    		for ( type in responses ) {
    			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
    				finalDataType = type;
    				break;
    			}
    			if ( !firstDataType ) {
    				firstDataType = type;
    			}
    		}

    		// Or just use first one
    		finalDataType = finalDataType || firstDataType;
    	}

    	// If we found a dataType
    	// We add the dataType to the list if needed
    	// and return the corresponding response
    	if ( finalDataType ) {
    		if ( finalDataType !== dataTypes[ 0 ] ) {
    			dataTypes.unshift( finalDataType );
    		}
    		return responses[ finalDataType ];
    	}
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert( s, response, jqXHR, isSuccess ) {
    	var conv2, current, conv, tmp, prev,
    		converters = {},

    		// Work with a copy of dataTypes in case we need to modify it for conversion
    		dataTypes = s.dataTypes.slice();

    	// Create converters map with lowercased keys
    	if ( dataTypes[ 1 ] ) {
    		for ( conv in s.converters ) {
    			converters[ conv.toLowerCase() ] = s.converters[ conv ];
    		}
    	}

    	current = dataTypes.shift();

    	// Convert to each sequential dataType
    	while ( current ) {

    		if ( s.responseFields[ current ] ) {
    			jqXHR[ s.responseFields[ current ] ] = response;
    		}

    		// Apply the dataFilter if provided
    		if ( !prev && isSuccess && s.dataFilter ) {
    			response = s.dataFilter( response, s.dataType );
    		}

    		prev = current;
    		current = dataTypes.shift();

    		if ( current ) {

    			// There's only work to do if current dataType is non-auto
    			if ( current === "*" ) {

    				current = prev;

    			// Convert response if prev dataType is non-auto and differs from current
    			} else if ( prev !== "*" && prev !== current ) {

    				// Seek a direct converter
    				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

    				// If none found, seek a pair
    				if ( !conv ) {
    					for ( conv2 in converters ) {

    						// If conv2 outputs current
    						tmp = conv2.split( " " );
    						if ( tmp[ 1 ] === current ) {

    							// If prev can be converted to accepted input
    							conv = converters[ prev + " " + tmp[ 0 ] ] ||
    								converters[ "* " + tmp[ 0 ] ];
    							if ( conv ) {

    								// Condense equivalence converters
    								if ( conv === true ) {
    									conv = converters[ conv2 ];

    								// Otherwise, insert the intermediate dataType
    								} else if ( converters[ conv2 ] !== true ) {
    									current = tmp[ 0 ];
    									dataTypes.unshift( tmp[ 1 ] );
    								}
    								break;
    							}
    						}
    					}
    				}

    				// Apply converter (if not an equivalence)
    				if ( conv !== true ) {

    					// Unless errors are allowed to bubble, catch and return them
    					if ( conv && s.throws ) {
    						response = conv( response );
    					} else {
    						try {
    							response = conv( response );
    						} catch ( e ) {
    							return {
    								state: "parsererror",
    								error: conv ? e : "No conversion from " + prev + " to " + current
    							};
    						}
    					}
    				}
    			}
    		}
    	}

    	return { state: "success", data: response };
    }

    jQuery.extend( {

    	// Counter for holding the number of active queries
    	active: 0,

    	// Last-Modified header cache for next request
    	lastModified: {},
    	etag: {},

    	ajaxSettings: {
    		url: location.href,
    		type: "GET",
    		isLocal: rlocalProtocol.test( location.protocol ),
    		global: true,
    		processData: true,
    		async: true,
    		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

    		/*
    		timeout: 0,
    		data: null,
    		dataType: null,
    		username: null,
    		password: null,
    		cache: null,
    		throws: false,
    		traditional: false,
    		headers: {},
    		*/

    		accepts: {
    			"*": allTypes,
    			text: "text/plain",
    			html: "text/html",
    			xml: "application/xml, text/xml",
    			json: "application/json, text/javascript"
    		},

    		contents: {
    			xml: /\bxml\b/,
    			html: /\bhtml/,
    			json: /\bjson\b/
    		},

    		responseFields: {
    			xml: "responseXML",
    			text: "responseText",
    			json: "responseJSON"
    		},

    		// Data converters
    		// Keys separate source (or catchall "*") and destination types with a single space
    		converters: {

    			// Convert anything to text
    			"* text": String,

    			// Text to html (true = no transformation)
    			"text html": true,

    			// Evaluate text as a json expression
    			"text json": JSON.parse,

    			// Parse text as xml
    			"text xml": jQuery.parseXML
    		},

    		// For options that shouldn't be deep extended:
    		// you can add your own custom options here if
    		// and when you create one that shouldn't be
    		// deep extended (see ajaxExtend)
    		flatOptions: {
    			url: true,
    			context: true
    		}
    	},

    	// Creates a full fledged settings object into target
    	// with both ajaxSettings and settings fields.
    	// If target is omitted, writes into ajaxSettings.
    	ajaxSetup: function( target, settings ) {
    		return settings ?

    			// Building a settings object
    			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

    			// Extending ajaxSettings
    			ajaxExtend( jQuery.ajaxSettings, target );
    	},

    	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
    	ajaxTransport: addToPrefiltersOrTransports( transports ),

    	// Main method
    	ajax: function( url, options ) {

    		// If url is an object, simulate pre-1.5 signature
    		if ( typeof url === "object" ) {
    			options = url;
    			url = undefined;
    		}

    		// Force options to be an object
    		options = options || {};

    		var transport,

    			// URL without anti-cache param
    			cacheURL,

    			// Response headers
    			responseHeadersString,
    			responseHeaders,

    			// timeout handle
    			timeoutTimer,

    			// Url cleanup var
    			urlAnchor,

    			// Request state (becomes false upon send and true upon completion)
    			completed,

    			// To know if global events are to be dispatched
    			fireGlobals,

    			// Loop variable
    			i,

    			// uncached part of the url
    			uncached,

    			// Create the final options object
    			s = jQuery.ajaxSetup( {}, options ),

    			// Callbacks context
    			callbackContext = s.context || s,

    			// Context for global events is callbackContext if it is a DOM node or jQuery collection
    			globalEventContext = s.context &&
    				( callbackContext.nodeType || callbackContext.jquery ) ?
    					jQuery( callbackContext ) :
    					jQuery.event,

    			// Deferreds
    			deferred = jQuery.Deferred(),
    			completeDeferred = jQuery.Callbacks( "once memory" ),

    			// Status-dependent callbacks
    			statusCode = s.statusCode || {},

    			// Headers (they are sent all at once)
    			requestHeaders = {},
    			requestHeadersNames = {},

    			// Default abort message
    			strAbort = "canceled",

    			// Fake xhr
    			jqXHR = {
    				readyState: 0,

    				// Builds headers hashtable if needed
    				getResponseHeader: function( key ) {
    					var match;
    					if ( completed ) {
    						if ( !responseHeaders ) {
    							responseHeaders = {};
    							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
    								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
    							}
    						}
    						match = responseHeaders[ key.toLowerCase() ];
    					}
    					return match == null ? null : match;
    				},

    				// Raw string
    				getAllResponseHeaders: function() {
    					return completed ? responseHeadersString : null;
    				},

    				// Caches the header
    				setRequestHeader: function( name, value ) {
    					if ( completed == null ) {
    						name = requestHeadersNames[ name.toLowerCase() ] =
    							requestHeadersNames[ name.toLowerCase() ] || name;
    						requestHeaders[ name ] = value;
    					}
    					return this;
    				},

    				// Overrides response content-type header
    				overrideMimeType: function( type ) {
    					if ( completed == null ) {
    						s.mimeType = type;
    					}
    					return this;
    				},

    				// Status-dependent callbacks
    				statusCode: function( map ) {
    					var code;
    					if ( map ) {
    						if ( completed ) {

    							// Execute the appropriate callbacks
    							jqXHR.always( map[ jqXHR.status ] );
    						} else {

    							// Lazy-add the new callbacks in a way that preserves old ones
    							for ( code in map ) {
    								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
    							}
    						}
    					}
    					return this;
    				},

    				// Cancel the request
    				abort: function( statusText ) {
    					var finalText = statusText || strAbort;
    					if ( transport ) {
    						transport.abort( finalText );
    					}
    					done( 0, finalText );
    					return this;
    				}
    			};

    		// Attach deferreds
    		deferred.promise( jqXHR );

    		// Add protocol if not provided (prefilters might expect it)
    		// Handle falsy url in the settings object (#10093: consistency with old signature)
    		// We also use the url parameter if available
    		s.url = ( ( url || s.url || location.href ) + "" )
    			.replace( rprotocol, location.protocol + "//" );

    		// Alias method option to type as per ticket #12004
    		s.type = options.method || options.type || s.method || s.type;

    		// Extract dataTypes list
    		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

    		// A cross-domain request is in order when the origin doesn't match the current origin.
    		if ( s.crossDomain == null ) {
    			urlAnchor = document.createElement( "a" );

    			// Support: IE <=8 - 11, Edge 12 - 15
    			// IE throws exception on accessing the href property if url is malformed,
    			// e.g. http://example.com:80x/
    			try {
    				urlAnchor.href = s.url;

    				// Support: IE <=8 - 11 only
    				// Anchor's host property isn't correctly set when s.url is relative
    				urlAnchor.href = urlAnchor.href;
    				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
    					urlAnchor.protocol + "//" + urlAnchor.host;
    			} catch ( e ) {

    				// If there is an error parsing the URL, assume it is crossDomain,
    				// it can be rejected by the transport if it is invalid
    				s.crossDomain = true;
    			}
    		}

    		// Convert data if not already a string
    		if ( s.data && s.processData && typeof s.data !== "string" ) {
    			s.data = jQuery.param( s.data, s.traditional );
    		}

    		// Apply prefilters
    		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

    		// If request was aborted inside a prefilter, stop there
    		if ( completed ) {
    			return jqXHR;
    		}

    		// We can fire global events as of now if asked to
    		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
    		fireGlobals = jQuery.event && s.global;

    		// Watch for a new set of requests
    		if ( fireGlobals && jQuery.active++ === 0 ) {
    			jQuery.event.trigger( "ajaxStart" );
    		}

    		// Uppercase the type
    		s.type = s.type.toUpperCase();

    		// Determine if request has content
    		s.hasContent = !rnoContent.test( s.type );

    		// Save the URL in case we're toying with the If-Modified-Since
    		// and/or If-None-Match header later on
    		// Remove hash to simplify url manipulation
    		cacheURL = s.url.replace( rhash, "" );

    		// More options handling for requests with no content
    		if ( !s.hasContent ) {

    			// Remember the hash so we can put it back
    			uncached = s.url.slice( cacheURL.length );

    			// If data is available and should be processed, append data to url
    			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
    				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

    				// #9682: remove data so that it's not used in an eventual retry
    				delete s.data;
    			}

    			// Add or update anti-cache param if needed
    			if ( s.cache === false ) {
    				cacheURL = cacheURL.replace( rantiCache, "$1" );
    				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
    			}

    			// Put hash and anti-cache on the URL that will be requested (gh-1732)
    			s.url = cacheURL + uncached;

    		// Change '%20' to '+' if this is encoded form body content (gh-2658)
    		} else if ( s.data && s.processData &&
    			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
    			s.data = s.data.replace( r20, "+" );
    		}

    		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    		if ( s.ifModified ) {
    			if ( jQuery.lastModified[ cacheURL ] ) {
    				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
    			}
    			if ( jQuery.etag[ cacheURL ] ) {
    				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
    			}
    		}

    		// Set the correct header, if data is being sent
    		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
    			jqXHR.setRequestHeader( "Content-Type", s.contentType );
    		}

    		// Set the Accepts header for the server, depending on the dataType
    		jqXHR.setRequestHeader(
    			"Accept",
    			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
    				s.accepts[ s.dataTypes[ 0 ] ] +
    					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
    				s.accepts[ "*" ]
    		);

    		// Check for headers option
    		for ( i in s.headers ) {
    			jqXHR.setRequestHeader( i, s.headers[ i ] );
    		}

    		// Allow custom headers/mimetypes and early abort
    		if ( s.beforeSend &&
    			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

    			// Abort if not done already and return
    			return jqXHR.abort();
    		}

    		// Aborting is no longer a cancellation
    		strAbort = "abort";

    		// Install callbacks on deferreds
    		completeDeferred.add( s.complete );
    		jqXHR.done( s.success );
    		jqXHR.fail( s.error );

    		// Get transport
    		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

    		// If no transport, we auto-abort
    		if ( !transport ) {
    			done( -1, "No Transport" );
    		} else {
    			jqXHR.readyState = 1;

    			// Send global event
    			if ( fireGlobals ) {
    				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
    			}

    			// If request was aborted inside ajaxSend, stop there
    			if ( completed ) {
    				return jqXHR;
    			}

    			// Timeout
    			if ( s.async && s.timeout > 0 ) {
    				timeoutTimer = window.setTimeout( function() {
    					jqXHR.abort( "timeout" );
    				}, s.timeout );
    			}

    			try {
    				completed = false;
    				transport.send( requestHeaders, done );
    			} catch ( e ) {

    				// Rethrow post-completion exceptions
    				if ( completed ) {
    					throw e;
    				}

    				// Propagate others as results
    				done( -1, e );
    			}
    		}

    		// Callback for when everything is done
    		function done( status, nativeStatusText, responses, headers ) {
    			var isSuccess, success, error, response, modified,
    				statusText = nativeStatusText;

    			// Ignore repeat invocations
    			if ( completed ) {
    				return;
    			}

    			completed = true;

    			// Clear timeout if it exists
    			if ( timeoutTimer ) {
    				window.clearTimeout( timeoutTimer );
    			}

    			// Dereference transport for early garbage collection
    			// (no matter how long the jqXHR object will be used)
    			transport = undefined;

    			// Cache response headers
    			responseHeadersString = headers || "";

    			// Set readyState
    			jqXHR.readyState = status > 0 ? 4 : 0;

    			// Determine if successful
    			isSuccess = status >= 200 && status < 300 || status === 304;

    			// Get response data
    			if ( responses ) {
    				response = ajaxHandleResponses( s, jqXHR, responses );
    			}

    			// Convert no matter what (that way responseXXX fields are always set)
    			response = ajaxConvert( s, response, jqXHR, isSuccess );

    			// If successful, handle type chaining
    			if ( isSuccess ) {

    				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    				if ( s.ifModified ) {
    					modified = jqXHR.getResponseHeader( "Last-Modified" );
    					if ( modified ) {
    						jQuery.lastModified[ cacheURL ] = modified;
    					}
    					modified = jqXHR.getResponseHeader( "etag" );
    					if ( modified ) {
    						jQuery.etag[ cacheURL ] = modified;
    					}
    				}

    				// if no content
    				if ( status === 204 || s.type === "HEAD" ) {
    					statusText = "nocontent";

    				// if not modified
    				} else if ( status === 304 ) {
    					statusText = "notmodified";

    				// If we have data, let's convert it
    				} else {
    					statusText = response.state;
    					success = response.data;
    					error = response.error;
    					isSuccess = !error;
    				}
    			} else {

    				// Extract error from statusText and normalize for non-aborts
    				error = statusText;
    				if ( status || !statusText ) {
    					statusText = "error";
    					if ( status < 0 ) {
    						status = 0;
    					}
    				}
    			}

    			// Set data for the fake xhr object
    			jqXHR.status = status;
    			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

    			// Success/Error
    			if ( isSuccess ) {
    				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
    			} else {
    				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
    			}

    			// Status-dependent callbacks
    			jqXHR.statusCode( statusCode );
    			statusCode = undefined;

    			if ( fireGlobals ) {
    				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
    					[ jqXHR, s, isSuccess ? success : error ] );
    			}

    			// Complete
    			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

    			if ( fireGlobals ) {
    				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

    				// Handle the global AJAX counter
    				if ( !( --jQuery.active ) ) {
    					jQuery.event.trigger( "ajaxStop" );
    				}
    			}
    		}

    		return jqXHR;
    	},

    	getJSON: function( url, data, callback ) {
    		return jQuery.get( url, data, callback, "json" );
    	},

    	getScript: function( url, callback ) {
    		return jQuery.get( url, undefined, callback, "script" );
    	}
    } );

    jQuery.each( [ "get", "post" ], function( i, method ) {
    	jQuery[ method ] = function( url, data, callback, type ) {

    		// Shift arguments if data argument was omitted
    		if ( isFunction( data ) ) {
    			type = type || callback;
    			callback = data;
    			data = undefined;
    		}

    		// The url can be an options object (which then must have .url)
    		return jQuery.ajax( jQuery.extend( {
    			url: url,
    			type: method,
    			dataType: type,
    			data: data,
    			success: callback
    		}, jQuery.isPlainObject( url ) && url ) );
    	};
    } );


    jQuery._evalUrl = function( url ) {
    	return jQuery.ajax( {
    		url: url,

    		// Make this explicit, since user can override this through ajaxSetup (#11264)
    		type: "GET",
    		dataType: "script",
    		cache: true,
    		async: false,
    		global: false,
    		"throws": true
    	} );
    };


    jQuery.fn.extend( {
    	wrapAll: function( html ) {
    		var wrap;

    		if ( this[ 0 ] ) {
    			if ( isFunction( html ) ) {
    				html = html.call( this[ 0 ] );
    			}

    			// The elements to wrap the target around
    			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

    			if ( this[ 0 ].parentNode ) {
    				wrap.insertBefore( this[ 0 ] );
    			}

    			wrap.map( function() {
    				var elem = this;

    				while ( elem.firstElementChild ) {
    					elem = elem.firstElementChild;
    				}

    				return elem;
    			} ).append( this );
    		}

    		return this;
    	},

    	wrapInner: function( html ) {
    		if ( isFunction( html ) ) {
    			return this.each( function( i ) {
    				jQuery( this ).wrapInner( html.call( this, i ) );
    			} );
    		}

    		return this.each( function() {
    			var self = jQuery( this ),
    				contents = self.contents();

    			if ( contents.length ) {
    				contents.wrapAll( html );

    			} else {
    				self.append( html );
    			}
    		} );
    	},

    	wrap: function( html ) {
    		var htmlIsFunction = isFunction( html );

    		return this.each( function( i ) {
    			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
    		} );
    	},

    	unwrap: function( selector ) {
    		this.parent( selector ).not( "body" ).each( function() {
    			jQuery( this ).replaceWith( this.childNodes );
    		} );
    		return this;
    	}
    } );


    jQuery.expr.pseudos.hidden = function( elem ) {
    	return !jQuery.expr.pseudos.visible( elem );
    };
    jQuery.expr.pseudos.visible = function( elem ) {
    	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
    };




    jQuery.ajaxSettings.xhr = function() {
    	try {
    		return new window.XMLHttpRequest();
    	} catch ( e ) {}
    };

    var xhrSuccessStatus = {

    		// File protocol always yields status code 0, assume 200
    		0: 200,

    		// Support: IE <=9 only
    		// #1450: sometimes IE returns 1223 when it should be 204
    		1223: 204
    	},
    	xhrSupported = jQuery.ajaxSettings.xhr();

    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    support.ajax = xhrSupported = !!xhrSupported;

    jQuery.ajaxTransport( function( options ) {
    	var callback, errorCallback;

    	// Cross domain only allowed if supported through XMLHttpRequest
    	if ( support.cors || xhrSupported && !options.crossDomain ) {
    		return {
    			send: function( headers, complete ) {
    				var i,
    					xhr = options.xhr();

    				xhr.open(
    					options.type,
    					options.url,
    					options.async,
    					options.username,
    					options.password
    				);

    				// Apply custom fields if provided
    				if ( options.xhrFields ) {
    					for ( i in options.xhrFields ) {
    						xhr[ i ] = options.xhrFields[ i ];
    					}
    				}

    				// Override mime type if needed
    				if ( options.mimeType && xhr.overrideMimeType ) {
    					xhr.overrideMimeType( options.mimeType );
    				}

    				// X-Requested-With header
    				// For cross-domain requests, seeing as conditions for a preflight are
    				// akin to a jigsaw puzzle, we simply never set it to be sure.
    				// (it can always be set on a per-request basis or even using ajaxSetup)
    				// For same-domain requests, won't change header if already provided.
    				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
    					headers[ "X-Requested-With" ] = "XMLHttpRequest";
    				}

    				// Set headers
    				for ( i in headers ) {
    					xhr.setRequestHeader( i, headers[ i ] );
    				}

    				// Callback
    				callback = function( type ) {
    					return function() {
    						if ( callback ) {
    							callback = errorCallback = xhr.onload =
    								xhr.onerror = xhr.onabort = xhr.ontimeout =
    									xhr.onreadystatechange = null;

    							if ( type === "abort" ) {
    								xhr.abort();
    							} else if ( type === "error" ) {

    								// Support: IE <=9 only
    								// On a manual native abort, IE9 throws
    								// errors on any property access that is not readyState
    								if ( typeof xhr.status !== "number" ) {
    									complete( 0, "error" );
    								} else {
    									complete(

    										// File: protocol always yields status 0; see #8605, #14207
    										xhr.status,
    										xhr.statusText
    									);
    								}
    							} else {
    								complete(
    									xhrSuccessStatus[ xhr.status ] || xhr.status,
    									xhr.statusText,

    									// Support: IE <=9 only
    									// IE9 has no XHR2 but throws on binary (trac-11426)
    									// For XHR2 non-text, let the caller handle it (gh-2498)
    									( xhr.responseType || "text" ) !== "text"  ||
    									typeof xhr.responseText !== "string" ?
    										{ binary: xhr.response } :
    										{ text: xhr.responseText },
    									xhr.getAllResponseHeaders()
    								);
    							}
    						}
    					};
    				};

    				// Listen to events
    				xhr.onload = callback();
    				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

    				// Support: IE 9 only
    				// Use onreadystatechange to replace onabort
    				// to handle uncaught aborts
    				if ( xhr.onabort !== undefined ) {
    					xhr.onabort = errorCallback;
    				} else {
    					xhr.onreadystatechange = function() {

    						// Check readyState before timeout as it changes
    						if ( xhr.readyState === 4 ) {

    							// Allow onerror to be called first,
    							// but that will not handle a native abort
    							// Also, save errorCallback to a variable
    							// as xhr.onerror cannot be accessed
    							window.setTimeout( function() {
    								if ( callback ) {
    									errorCallback();
    								}
    							} );
    						}
    					};
    				}

    				// Create the abort callback
    				callback = callback( "abort" );

    				try {

    					// Do send the request (this may raise an exception)
    					xhr.send( options.hasContent && options.data || null );
    				} catch ( e ) {

    					// #14683: Only rethrow if this hasn't been notified as an error yet
    					if ( callback ) {
    						throw e;
    					}
    				}
    			},

    			abort: function() {
    				if ( callback ) {
    					callback();
    				}
    			}
    		};
    	}
    } );




    // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
    jQuery.ajaxPrefilter( function( s ) {
    	if ( s.crossDomain ) {
    		s.contents.script = false;
    	}
    } );

    // Install script dataType
    jQuery.ajaxSetup( {
    	accepts: {
    		script: "text/javascript, application/javascript, " +
    			"application/ecmascript, application/x-ecmascript"
    	},
    	contents: {
    		script: /\b(?:java|ecma)script\b/
    	},
    	converters: {
    		"text script": function( text ) {
    			jQuery.globalEval( text );
    			return text;
    		}
    	}
    } );

    // Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter( "script", function( s ) {
    	if ( s.cache === undefined ) {
    		s.cache = false;
    	}
    	if ( s.crossDomain ) {
    		s.type = "GET";
    	}
    } );

    // Bind script tag hack transport
    jQuery.ajaxTransport( "script", function( s ) {

    	// This transport only deals with cross domain requests
    	if ( s.crossDomain ) {
    		var script, callback;
    		return {
    			send: function( _, complete ) {
    				script = jQuery( "<script>" ).prop( {
    					charset: s.scriptCharset,
    					src: s.url
    				} ).on(
    					"load error",
    					callback = function( evt ) {
    						script.remove();
    						callback = null;
    						if ( evt ) {
    							complete( evt.type === "error" ? 404 : 200, evt.type );
    						}
    					}
    				);

    				// Use native DOM manipulation to avoid our domManip AJAX trickery
    				document.head.appendChild( script[ 0 ] );
    			},
    			abort: function() {
    				if ( callback ) {
    					callback();
    				}
    			}
    		};
    	}
    } );




    var oldCallbacks = [],
    	rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup( {
    	jsonp: "callback",
    	jsonpCallback: function() {
    		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
    		this[ callback ] = true;
    		return callback;
    	}
    } );

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

    	var callbackName, overwritten, responseContainer,
    		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
    			"url" :
    			typeof s.data === "string" &&
    				( s.contentType || "" )
    					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
    				rjsonp.test( s.data ) && "data"
    		);

    	// Handle iff the expected data type is "jsonp" or we have a parameter to set
    	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

    		// Get callback name, remembering preexisting value associated with it
    		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
    			s.jsonpCallback() :
    			s.jsonpCallback;

    		// Insert callback into url or form data
    		if ( jsonProp ) {
    			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
    		} else if ( s.jsonp !== false ) {
    			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
    		}

    		// Use data converter to retrieve json after script execution
    		s.converters[ "script json" ] = function() {
    			if ( !responseContainer ) {
    				jQuery.error( callbackName + " was not called" );
    			}
    			return responseContainer[ 0 ];
    		};

    		// Force json dataType
    		s.dataTypes[ 0 ] = "json";

    		// Install callback
    		overwritten = window[ callbackName ];
    		window[ callbackName ] = function() {
    			responseContainer = arguments;
    		};

    		// Clean-up function (fires after converters)
    		jqXHR.always( function() {

    			// If previous value didn't exist - remove it
    			if ( overwritten === undefined ) {
    				jQuery( window ).removeProp( callbackName );

    			// Otherwise restore preexisting value
    			} else {
    				window[ callbackName ] = overwritten;
    			}

    			// Save back as free
    			if ( s[ callbackName ] ) {

    				// Make sure that re-using the options doesn't screw things around
    				s.jsonpCallback = originalSettings.jsonpCallback;

    				// Save the callback name for future use
    				oldCallbacks.push( callbackName );
    			}

    			// Call if it was a function and we have a response
    			if ( responseContainer && isFunction( overwritten ) ) {
    				overwritten( responseContainer[ 0 ] );
    			}

    			responseContainer = overwritten = undefined;
    		} );

    		// Delegate to script
    		return "script";
    	}
    } );




    // Support: Safari 8 only
    // In Safari 8 documents created via document.implementation.createHTMLDocument
    // collapse sibling forms: the second one becomes a child of the first one.
    // Because of that, this security measure has to be disabled in Safari 8.
    // https://bugs.webkit.org/show_bug.cgi?id=137337
    support.createHTMLDocument = ( function() {
    	var body = document.implementation.createHTMLDocument( "" ).body;
    	body.innerHTML = "<form></form><form></form>";
    	return body.childNodes.length === 2;
    } )();


    // Argument "data" should be string of html
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function( data, context, keepScripts ) {
    	if ( typeof data !== "string" ) {
    		return [];
    	}
    	if ( typeof context === "boolean" ) {
    		keepScripts = context;
    		context = false;
    	}

    	var base, parsed, scripts;

    	if ( !context ) {

    		// Stop scripts or inline event handlers from being executed immediately
    		// by using document.implementation
    		if ( support.createHTMLDocument ) {
    			context = document.implementation.createHTMLDocument( "" );

    			// Set the base href for the created document
    			// so any parsed elements with URLs
    			// are based on the document's URL (gh-2965)
    			base = context.createElement( "base" );
    			base.href = document.location.href;
    			context.head.appendChild( base );
    		} else {
    			context = document;
    		}
    	}

    	parsed = rsingleTag.exec( data );
    	scripts = !keepScripts && [];

    	// Single tag
    	if ( parsed ) {
    		return [ context.createElement( parsed[ 1 ] ) ];
    	}

    	parsed = buildFragment( [ data ], context, scripts );

    	if ( scripts && scripts.length ) {
    		jQuery( scripts ).remove();
    	}

    	return jQuery.merge( [], parsed.childNodes );
    };


    /**
     * Load a url into a page
     */
    jQuery.fn.load = function( url, params, callback ) {
    	var selector, type, response,
    		self = this,
    		off = url.indexOf( " " );

    	if ( off > -1 ) {
    		selector = stripAndCollapse( url.slice( off ) );
    		url = url.slice( 0, off );
    	}

    	// If it's a function
    	if ( isFunction( params ) ) {

    		// We assume that it's the callback
    		callback = params;
    		params = undefined;

    	// Otherwise, build a param string
    	} else if ( params && typeof params === "object" ) {
    		type = "POST";
    	}

    	// If we have elements to modify, make the request
    	if ( self.length > 0 ) {
    		jQuery.ajax( {
    			url: url,

    			// If "type" variable is undefined, then "GET" method will be used.
    			// Make value of this field explicit since
    			// user can override it through ajaxSetup method
    			type: type || "GET",
    			dataType: "html",
    			data: params
    		} ).done( function( responseText ) {

    			// Save response for use in complete callback
    			response = arguments;

    			self.html( selector ?

    				// If a selector was specified, locate the right elements in a dummy div
    				// Exclude scripts to avoid IE 'Permission Denied' errors
    				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

    				// Otherwise use the full result
    				responseText );

    		// If the request succeeds, this function gets "data", "status", "jqXHR"
    		// but they are ignored because response was set above.
    		// If it fails, this function gets "jqXHR", "status", "error"
    		} ).always( callback && function( jqXHR, status ) {
    			self.each( function() {
    				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
    			} );
    		} );
    	}

    	return this;
    };




    // Attach a bunch of functions for handling common AJAX events
    jQuery.each( [
    	"ajaxStart",
    	"ajaxStop",
    	"ajaxComplete",
    	"ajaxError",
    	"ajaxSuccess",
    	"ajaxSend"
    ], function( i, type ) {
    	jQuery.fn[ type ] = function( fn ) {
    		return this.on( type, fn );
    	};
    } );




    jQuery.expr.pseudos.animated = function( elem ) {
    	return jQuery.grep( jQuery.timers, function( fn ) {
    		return elem === fn.elem;
    	} ).length;
    };




    jQuery.offset = {
    	setOffset: function( elem, options, i ) {
    		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
    			position = jQuery.css( elem, "position" ),
    			curElem = jQuery( elem ),
    			props = {};

    		// Set position first, in-case top/left are set even on static elem
    		if ( position === "static" ) {
    			elem.style.position = "relative";
    		}

    		curOffset = curElem.offset();
    		curCSSTop = jQuery.css( elem, "top" );
    		curCSSLeft = jQuery.css( elem, "left" );
    		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
    			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

    		// Need to be able to calculate position if either
    		// top or left is auto and position is either absolute or fixed
    		if ( calculatePosition ) {
    			curPosition = curElem.position();
    			curTop = curPosition.top;
    			curLeft = curPosition.left;

    		} else {
    			curTop = parseFloat( curCSSTop ) || 0;
    			curLeft = parseFloat( curCSSLeft ) || 0;
    		}

    		if ( isFunction( options ) ) {

    			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
    			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
    		}

    		if ( options.top != null ) {
    			props.top = ( options.top - curOffset.top ) + curTop;
    		}
    		if ( options.left != null ) {
    			props.left = ( options.left - curOffset.left ) + curLeft;
    		}

    		if ( "using" in options ) {
    			options.using.call( elem, props );

    		} else {
    			curElem.css( props );
    		}
    	}
    };

    jQuery.fn.extend( {

    	// offset() relates an element's border box to the document origin
    	offset: function( options ) {

    		// Preserve chaining for setter
    		if ( arguments.length ) {
    			return options === undefined ?
    				this :
    				this.each( function( i ) {
    					jQuery.offset.setOffset( this, options, i );
    				} );
    		}

    		var rect, win,
    			elem = this[ 0 ];

    		if ( !elem ) {
    			return;
    		}

    		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    		// Support: IE <=11 only
    		// Running getBoundingClientRect on a
    		// disconnected node in IE throws an error
    		if ( !elem.getClientRects().length ) {
    			return { top: 0, left: 0 };
    		}

    		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
    		rect = elem.getBoundingClientRect();
    		win = elem.ownerDocument.defaultView;
    		return {
    			top: rect.top + win.pageYOffset,
    			left: rect.left + win.pageXOffset
    		};
    	},

    	// position() relates an element's margin box to its offset parent's padding box
    	// This corresponds to the behavior of CSS absolute positioning
    	position: function() {
    		if ( !this[ 0 ] ) {
    			return;
    		}

    		var offsetParent, offset, doc,
    			elem = this[ 0 ],
    			parentOffset = { top: 0, left: 0 };

    		// position:fixed elements are offset from the viewport, which itself always has zero offset
    		if ( jQuery.css( elem, "position" ) === "fixed" ) {

    			// Assume position:fixed implies availability of getBoundingClientRect
    			offset = elem.getBoundingClientRect();

    		} else {
    			offset = this.offset();

    			// Account for the *real* offset parent, which can be the document or its root element
    			// when a statically positioned element is identified
    			doc = elem.ownerDocument;
    			offsetParent = elem.offsetParent || doc.documentElement;
    			while ( offsetParent &&
    				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
    				jQuery.css( offsetParent, "position" ) === "static" ) {

    				offsetParent = offsetParent.parentNode;
    			}
    			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

    				// Incorporate borders into its offset, since they are outside its content origin
    				parentOffset = jQuery( offsetParent ).offset();
    				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
    				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
    			}
    		}

    		// Subtract parent offsets and element margins
    		return {
    			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
    			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
    		};
    	},

    	// This method will return documentElement in the following cases:
    	// 1) For the element inside the iframe without offsetParent, this method will return
    	//    documentElement of the parent window
    	// 2) For the hidden or detached element
    	// 3) For body or html element, i.e. in case of the html node - it will return itself
    	//
    	// but those exceptions were never presented as a real life use-cases
    	// and might be considered as more preferable results.
    	//
    	// This logic, however, is not guaranteed and can change at any point in the future
    	offsetParent: function() {
    		return this.map( function() {
    			var offsetParent = this.offsetParent;

    			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
    				offsetParent = offsetParent.offsetParent;
    			}

    			return offsetParent || documentElement;
    		} );
    	}
    } );

    // Create scrollLeft and scrollTop methods
    jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
    	var top = "pageYOffset" === prop;

    	jQuery.fn[ method ] = function( val ) {
    		return access( this, function( elem, method, val ) {

    			// Coalesce documents and windows
    			var win;
    			if ( isWindow( elem ) ) {
    				win = elem;
    			} else if ( elem.nodeType === 9 ) {
    				win = elem.defaultView;
    			}

    			if ( val === undefined ) {
    				return win ? win[ prop ] : elem[ method ];
    			}

    			if ( win ) {
    				win.scrollTo(
    					!top ? val : win.pageXOffset,
    					top ? val : win.pageYOffset
    				);

    			} else {
    				elem[ method ] = val;
    			}
    		}, method, val, arguments.length );
    	};
    } );

    // Support: Safari <=7 - 9.1, Chrome <=37 - 49
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
    // getComputedStyle returns percent when specified for top/left/bottom/right;
    // rather than make the css module depend on the offset module, just check for it here
    jQuery.each( [ "top", "left" ], function( i, prop ) {
    	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
    		function( elem, computed ) {
    			if ( computed ) {
    				computed = curCSS( elem, prop );

    				// If curCSS returns percentage, fallback to offset
    				return rnumnonpx.test( computed ) ?
    					jQuery( elem ).position()[ prop ] + "px" :
    					computed;
    			}
    		}
    	);
    } );


    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
    	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
    		function( defaultExtra, funcName ) {

    		// Margin is only for outerHeight, outerWidth
    		jQuery.fn[ funcName ] = function( margin, value ) {
    			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
    				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

    			return access( this, function( elem, type, value ) {
    				var doc;

    				if ( isWindow( elem ) ) {

    					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
    					return funcName.indexOf( "outer" ) === 0 ?
    						elem[ "inner" + name ] :
    						elem.document.documentElement[ "client" + name ];
    				}

    				// Get document width or height
    				if ( elem.nodeType === 9 ) {
    					doc = elem.documentElement;

    					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
    					// whichever is greatest
    					return Math.max(
    						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
    						elem.body[ "offset" + name ], doc[ "offset" + name ],
    						doc[ "client" + name ]
    					);
    				}

    				return value === undefined ?

    					// Get width or height on the element, requesting but not forcing parseFloat
    					jQuery.css( elem, type, extra ) :

    					// Set width or height on the element
    					jQuery.style( elem, type, value, extra );
    			}, type, chainable ? margin : undefined, chainable );
    		};
    	} );
    } );


    jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
    	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
    	function( i, name ) {

    	// Handle event binding
    	jQuery.fn[ name ] = function( data, fn ) {
    		return arguments.length > 0 ?
    			this.on( name, null, data, fn ) :
    			this.trigger( name );
    	};
    } );

    jQuery.fn.extend( {
    	hover: function( fnOver, fnOut ) {
    		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
    	}
    } );




    jQuery.fn.extend( {

    	bind: function( types, data, fn ) {
    		return this.on( types, null, data, fn );
    	},
    	unbind: function( types, fn ) {
    		return this.off( types, null, fn );
    	},

    	delegate: function( selector, types, data, fn ) {
    		return this.on( types, selector, data, fn );
    	},
    	undelegate: function( selector, types, fn ) {

    		// ( namespace ) or ( selector, types [, fn] )
    		return arguments.length === 1 ?
    			this.off( selector, "**" ) :
    			this.off( types, selector || "**", fn );
    	}
    } );

    // Bind a function to a context, optionally partially applying any
    // arguments.
    // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
    // However, it is not slated for removal any time soon
    jQuery.proxy = function( fn, context ) {
    	var tmp, args, proxy;

    	if ( typeof context === "string" ) {
    		tmp = fn[ context ];
    		context = fn;
    		fn = tmp;
    	}

    	// Quick check to determine if target is callable, in the spec
    	// this throws a TypeError, but we will just return undefined.
    	if ( !isFunction( fn ) ) {
    		return undefined;
    	}

    	// Simulated bind
    	args = slice.call( arguments, 2 );
    	proxy = function() {
    		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
    	};

    	// Set the guid of unique handler to the same of original handler, so it can be removed
    	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    	return proxy;
    };

    jQuery.holdReady = function( hold ) {
    	if ( hold ) {
    		jQuery.readyWait++;
    	} else {
    		jQuery.ready( true );
    	}
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    jQuery.isFunction = isFunction;
    jQuery.isWindow = isWindow;
    jQuery.camelCase = camelCase;
    jQuery.type = toType;

    jQuery.now = Date.now;

    jQuery.isNumeric = function( obj ) {

    	// As of jQuery 3.0, isNumeric is limited to
    	// strings and numbers (primitives or objects)
    	// that can be coerced to finite numbers (gh-2662)
    	var type = jQuery.type( obj );
    	return ( type === "number" || type === "string" ) &&

    		// parseFloat NaNs numeric-cast false positives ("")
    		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    		// subtraction forces infinities to NaN
    		!isNaN( obj - parseFloat( obj ) );
    };




    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.

    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if ( typeof undefined === "function" && undefined.amd ) {
    	undefined( "jquery", [], function() {
    		return jQuery;
    	} );
    }




    var

    	// Map over jQuery in case of overwrite
    	_jQuery = window.jQuery,

    	// Map over the $ in case of overwrite
    	_$ = window.$;

    jQuery.noConflict = function( deep ) {
    	if ( window.$ === jQuery ) {
    		window.$ = _$;
    	}

    	if ( deep && window.jQuery === jQuery ) {
    		window.jQuery = _jQuery;
    	}

    	return jQuery;
    };

    // Expose jQuery and $ identifiers, even in AMD
    // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if ( !noGlobal ) {
    	window.jQuery = window.$ = jQuery;
    }




    return jQuery;
    } );
    });

    var toastr = createCommonjsModule(function (module) {
    /*
     * Toastr
     * Copyright 2012-2015
     * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
     * All Rights Reserved.
     * Use, reproduction, distribution, and modification of this code is subject to the terms and
     * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
     *
     * ARIA Support: Greta Krafsig
     *
     * Project: https://github.com/CodeSeven/toastr
     */
    /* global define */
    (function (define) {
        define(['jquery'], function ($) {
            return (function () {
                var $container;
                var listener;
                var toastId = 0;
                var toastType = {
                    error: 'error',
                    info: 'info',
                    success: 'success',
                    warning: 'warning'
                };

                var toastr = {
                    clear: clear,
                    remove: remove,
                    error: error,
                    getContainer: getContainer,
                    info: info,
                    options: {},
                    subscribe: subscribe,
                    success: success,
                    version: '2.1.4',
                    warning: warning
                };

                var previousToast;

                return toastr;

                ////////////////

                function error(message, title, optionsOverride) {
                    return notify({
                        type: toastType.error,
                        iconClass: getOptions().iconClasses.error,
                        message: message,
                        optionsOverride: optionsOverride,
                        title: title
                    });
                }

                function getContainer(options, create) {
                    if (!options) { options = getOptions(); }
                    $container = $('#' + options.containerId);
                    if ($container.length) {
                        return $container;
                    }
                    if (create) {
                        $container = createContainer(options);
                    }
                    return $container;
                }

                function info(message, title, optionsOverride) {
                    return notify({
                        type: toastType.info,
                        iconClass: getOptions().iconClasses.info,
                        message: message,
                        optionsOverride: optionsOverride,
                        title: title
                    });
                }

                function subscribe(callback) {
                    listener = callback;
                }

                function success(message, title, optionsOverride) {
                    return notify({
                        type: toastType.success,
                        iconClass: getOptions().iconClasses.success,
                        message: message,
                        optionsOverride: optionsOverride,
                        title: title
                    });
                }

                function warning(message, title, optionsOverride) {
                    return notify({
                        type: toastType.warning,
                        iconClass: getOptions().iconClasses.warning,
                        message: message,
                        optionsOverride: optionsOverride,
                        title: title
                    });
                }

                function clear($toastElement, clearOptions) {
                    var options = getOptions();
                    if (!$container) { getContainer(options); }
                    if (!clearToast($toastElement, options, clearOptions)) {
                        clearContainer(options);
                    }
                }

                function remove($toastElement) {
                    var options = getOptions();
                    if (!$container) { getContainer(options); }
                    if ($toastElement && $(':focus', $toastElement).length === 0) {
                        removeToast($toastElement);
                        return;
                    }
                    if ($container.children().length) {
                        $container.remove();
                    }
                }

                // internal functions

                function clearContainer (options) {
                    var toastsToClear = $container.children();
                    for (var i = toastsToClear.length - 1; i >= 0; i--) {
                        clearToast($(toastsToClear[i]), options);
                    }
                }

                function clearToast ($toastElement, options, clearOptions) {
                    var force = clearOptions && clearOptions.force ? clearOptions.force : false;
                    if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
                        $toastElement[options.hideMethod]({
                            duration: options.hideDuration,
                            easing: options.hideEasing,
                            complete: function () { removeToast($toastElement); }
                        });
                        return true;
                    }
                    return false;
                }

                function createContainer(options) {
                    $container = $('<div/>')
                        .attr('id', options.containerId)
                        .addClass(options.positionClass);

                    $container.appendTo($(options.target));
                    return $container;
                }

                function getDefaults() {
                    return {
                        tapToDismiss: true,
                        toastClass: 'toast',
                        containerId: 'toast-container',
                        debug: false,

                        showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                        showDuration: 300,
                        showEasing: 'swing', //swing and linear are built into jQuery
                        onShown: undefined,
                        hideMethod: 'fadeOut',
                        hideDuration: 1000,
                        hideEasing: 'swing',
                        onHidden: undefined,
                        closeMethod: false,
                        closeDuration: false,
                        closeEasing: false,
                        closeOnHover: true,

                        extendedTimeOut: 1000,
                        iconClasses: {
                            error: 'toast-error',
                            info: 'toast-info',
                            success: 'toast-success',
                            warning: 'toast-warning'
                        },
                        iconClass: 'toast-info',
                        positionClass: 'toast-top-right',
                        timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                        titleClass: 'toast-title',
                        messageClass: 'toast-message',
                        escapeHtml: false,
                        target: 'body',
                        closeHtml: '<button type="button">&times;</button>',
                        closeClass: 'toast-close-button',
                        newestOnTop: true,
                        preventDuplicates: false,
                        progressBar: false,
                        progressClass: 'toast-progress',
                        rtl: false
                    };
                }

                function publish(args) {
                    if (!listener) { return; }
                    listener(args);
                }

                function notify(map) {
                    var options = getOptions();
                    var iconClass = map.iconClass || options.iconClass;

                    if (typeof (map.optionsOverride) !== 'undefined') {
                        options = $.extend(options, map.optionsOverride);
                        iconClass = map.optionsOverride.iconClass || iconClass;
                    }

                    if (shouldExit(options, map)) { return; }

                    toastId++;

                    $container = getContainer(options, true);

                    var intervalId = null;
                    var $toastElement = $('<div/>');
                    var $titleElement = $('<div/>');
                    var $messageElement = $('<div/>');
                    var $progressElement = $('<div/>');
                    var $closeElement = $(options.closeHtml);
                    var progressBar = {
                        intervalId: null,
                        hideEta: null,
                        maxHideTime: null
                    };
                    var response = {
                        toastId: toastId,
                        state: 'visible',
                        startTime: new Date(),
                        options: options,
                        map: map
                    };

                    personalizeToast();

                    displayToast();

                    handleEvents();

                    publish(response);

                    if (options.debug && console) {
                        console.log(response);
                    }

                    return $toastElement;

                    function escapeHtml(source) {
                        if (source == null) {
                            source = '';
                        }

                        return source
                            .replace(/&/g, '&amp;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#39;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;');
                    }

                    function personalizeToast() {
                        setIcon();
                        setTitle();
                        setMessage();
                        setCloseButton();
                        setProgressBar();
                        setRTL();
                        setSequence();
                        setAria();
                    }

                    function setAria() {
                        var ariaValue = '';
                        switch (map.iconClass) {
                            case 'toast-success':
                            case 'toast-info':
                                ariaValue =  'polite';
                                break;
                            default:
                                ariaValue = 'assertive';
                        }
                        $toastElement.attr('aria-live', ariaValue);
                    }

                    function handleEvents() {
                        if (options.closeOnHover) {
                            $toastElement.hover(stickAround, delayedHideToast);
                        }

                        if (!options.onclick && options.tapToDismiss) {
                            $toastElement.click(hideToast);
                        }

                        if (options.closeButton && $closeElement) {
                            $closeElement.click(function (event) {
                                if (event.stopPropagation) {
                                    event.stopPropagation();
                                } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                                    event.cancelBubble = true;
                                }

                                if (options.onCloseClick) {
                                    options.onCloseClick(event);
                                }

                                hideToast(true);
                            });
                        }

                        if (options.onclick) {
                            $toastElement.click(function (event) {
                                options.onclick(event);
                                hideToast();
                            });
                        }
                    }

                    function displayToast() {
                        $toastElement.hide();

                        $toastElement[options.showMethod](
                            {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                        );

                        if (options.timeOut > 0) {
                            intervalId = setTimeout(hideToast, options.timeOut);
                            progressBar.maxHideTime = parseFloat(options.timeOut);
                            progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                            if (options.progressBar) {
                                progressBar.intervalId = setInterval(updateProgress, 10);
                            }
                        }
                    }

                    function setIcon() {
                        if (map.iconClass) {
                            $toastElement.addClass(options.toastClass).addClass(iconClass);
                        }
                    }

                    function setSequence() {
                        if (options.newestOnTop) {
                            $container.prepend($toastElement);
                        } else {
                            $container.append($toastElement);
                        }
                    }

                    function setTitle() {
                        if (map.title) {
                            var suffix = map.title;
                            if (options.escapeHtml) {
                                suffix = escapeHtml(map.title);
                            }
                            $titleElement.append(suffix).addClass(options.titleClass);
                            $toastElement.append($titleElement);
                        }
                    }

                    function setMessage() {
                        if (map.message) {
                            var suffix = map.message;
                            if (options.escapeHtml) {
                                suffix = escapeHtml(map.message);
                            }
                            $messageElement.append(suffix).addClass(options.messageClass);
                            $toastElement.append($messageElement);
                        }
                    }

                    function setCloseButton() {
                        if (options.closeButton) {
                            $closeElement.addClass(options.closeClass).attr('role', 'button');
                            $toastElement.prepend($closeElement);
                        }
                    }

                    function setProgressBar() {
                        if (options.progressBar) {
                            $progressElement.addClass(options.progressClass);
                            $toastElement.prepend($progressElement);
                        }
                    }

                    function setRTL() {
                        if (options.rtl) {
                            $toastElement.addClass('rtl');
                        }
                    }

                    function shouldExit(options, map) {
                        if (options.preventDuplicates) {
                            if (map.message === previousToast) {
                                return true;
                            } else {
                                previousToast = map.message;
                            }
                        }
                        return false;
                    }

                    function hideToast(override) {
                        var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
                        var duration = override && options.closeDuration !== false ?
                            options.closeDuration : options.hideDuration;
                        var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
                        if ($(':focus', $toastElement).length && !override) {
                            return;
                        }
                        clearTimeout(progressBar.intervalId);
                        return $toastElement[method]({
                            duration: duration,
                            easing: easing,
                            complete: function () {
                                removeToast($toastElement);
                                clearTimeout(intervalId);
                                if (options.onHidden && response.state !== 'hidden') {
                                    options.onHidden();
                                }
                                response.state = 'hidden';
                                response.endTime = new Date();
                                publish(response);
                            }
                        });
                    }

                    function delayedHideToast() {
                        if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                            intervalId = setTimeout(hideToast, options.extendedTimeOut);
                            progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                            progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        }
                    }

                    function stickAround() {
                        clearTimeout(intervalId);
                        progressBar.hideEta = 0;
                        $toastElement.stop(true, true)[options.showMethod](
                            {duration: options.showDuration, easing: options.showEasing}
                        );
                    }

                    function updateProgress() {
                        var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                        $progressElement.width(percentage + '%');
                    }
                }

                function getOptions() {
                    return $.extend({}, getDefaults(), toastr.options);
                }

                function removeToast($toastElement) {
                    if (!$container) { $container = getContainer(); }
                    if ($toastElement.is(':visible')) {
                        return;
                    }
                    $toastElement.remove();
                    $toastElement = null;
                    if ($container.children().length === 0) {
                        $container.remove();
                        previousToast = undefined;
                    }
                }

            })();
        });
    }(typeof undefined === 'function' && undefined.amd ? undefined : function (deps, factory) {
        if (module.exports) { //Node
            module.exports = factory(jquery);
        } else {
            window.toastr = factory(window.jQuery);
        }
    }));
    });
    var toastr_1 = toastr.error;

    class Gemeente {
        constructor(id, niscode, naam) {
            this.id = id;
            this.niscode = niscode;
            this.naam = naam;
        }
    }
    class Straat {
        constructor(straat) {
            if (straat) {
                this.id = straat.id;
                this.naam = straat.naam || straat.label;
            }
            else {
                this.id = null;
                this.naam = '';
            }
        }
    }
    class Huisnummer {
        constructor(nummer) {
            if (nummer) {
                this.id = nummer.id;
                this.naam = nummer.naam || nummer.label;
            }
            else {
                this.id = null;
                this.naam = '';
            }
        }
    }

    let CrabService = class CrabService {
        constructor(http) {
            this.http = http;
            this.landen = [];
            this.provincies = [];
            this.gemeenten = [];
            this.crabpyUrl = 'https://geo.onroerenderfgoed.be';
            this.http.configure(x => {
                x.withBaseUrl(this.crabpyUrl);
                x.withHeader('Accept', 'application/json');
                x.withHeader('X-Requested-With', '');
                x.withInterceptor({
                    responseError(res) {
                        toastr_1(res.content.message);
                        return res;
                    }
                });
            });
        }
        getLanden() {
            if (this.landen && this.landen.length > 0) {
                return new Promise(resolve => {
                    resolve(this.landen);
                });
            }
            else {
                return this.crabGet('crab/landen').then(response => {
                    if (response.isSuccess) {
                        this.landen = response.content;
                        this.landen.sort(this.compare);
                        return this.landen;
                    }
                    return undefined;
                }).catch(error => {
                    console.debug(error);
                });
            }
        }
        getProvincies() {
            if (this.provincies && this.provincies.length > 0) {
                return new Promise(resolve => {
                    resolve(this.provincies);
                });
            }
            else {
                return this.crabGet('crab/gewesten/2/provincies').then(response => {
                    if (response.isSuccess) {
                        this.provincies = response.content;
                        this.provincies.sort(this.compare);
                        return this.provincies;
                    }
                    return undefined;
                }).catch(error => {
                    console.debug(error);
                });
            }
        }
        getGemeentenByProvincie(provincie) {
            return this.crabGet(`crab/provincies/${provincie}/gemeenten`).then(response => {
                if (response.isSuccess) {
                    const gemeenten = response.content.map(el => {
                        return new Gemeente(el.id, el.niscode, el.naam);
                    });
                    gemeenten.sort(this.compare);
                    return gemeenten;
                }
                return undefined;
            }).catch(error => {
                console.debug(error);
            });
        }
        getGemeenten() {
            if (this.gemeenten && this.gemeenten.length > 0) {
                return new Promise(resolve => {
                    resolve(this.gemeenten);
                });
            }
            else {
                return this.crabGet('crab/gewesten/2/gemeenten').then(responses => {
                    if (responses.isSuccess) {
                        let tempL;
                        tempL = JSON.parse(responses.response);
                        tempL.sort(this.compare);
                        tempL.forEach(el => {
                            this.gemeenten.push(new Gemeente(el.id, el.niscode, el.naam));
                        });
                        return this.gemeenten;
                    }
                    return undefined;
                }).catch(error => {
                    console.debug(error);
                });
            }
        }
        getDeelgemeenten(gemeente) {
            return this.crabGet(`crab/gemeenten/${gemeente}/deelgemeenten`)
                .then(deelgemeenten => {
                if (deelgemeenten.isSuccess) {
                    return deelgemeenten.content;
                }
                else {
                    return [];
                }
            });
        }
        getPostcodes(gemeente) {
            return this.crabGet(`crab/gemeenten/${gemeente}/postkantons`)
                .then(postcodes => {
                if (postcodes.isSuccess) {
                    return postcodes.content;
                }
                else {
                    return [];
                }
            });
        }
        getStraten(gemeente) {
            return this.crabGet(`crab/gemeenten/${gemeente}/straten`)
                .then(straten => {
                if (straten.isSuccess) {
                    const tempL = [];
                    straten.content.forEach(element => {
                        tempL.push(new Straat(element));
                    });
                    return tempL;
                }
                else {
                    return [];
                }
            });
        }
        getHuisnrs(straat) {
            return this.crabGet(`crab/straten/${straat}/huisnummers`)
                .then(huisnrs => {
                if (huisnrs.isSuccess) {
                    const data = huisnrs.content.sort((a, b) => {
                        return parseInt(a.label, 0) - parseInt(b.label, 0);
                    });
                    const tempL = [];
                    data.forEach(element => {
                        tempL.push(new Huisnummer(element));
                    });
                    return tempL;
                }
                else {
                    return [];
                }
            });
        }
        suggestLocatie(value) {
            if (value === '') {
                return Promise.resolve([]);
            }
            return this.crabGet('geolocation/?locatie=' + value.toLowerCase() + '*')
                .then(response => {
                if (response.isSuccess) {
                    return response.content;
                }
                else {
                    return [];
                }
            });
        }
        geolocate(value) {
            return this.crabGet('geolocation/' + value)
                .then(response => {
                if (response.isSuccess) {
                    return response.content;
                }
                else {
                    return null;
                }
            });
        }
        /**
         * Compare function for sorting of 'gemeenten'
         * @param a gemeente
         * @param b gemeente
         */
        compare(a, b) {
            if (a.naam < b.naam) {
                return -1;
            }
            else if (a.naam > b.naam) {
                return 1;
            }
            else {
                return 0;
            }
        }
        crabGet(endpoint) {
            return this.http.get(endpoint);
        }
    };
    CrabService = __decorate([
        aureliaFramework_2(aureliaHttpClient_1),
        __metadata("design:paramtypes", [aureliaHttpClient_1])
    ], CrabService);

    exports.Zoneerder = class Zoneerder {
        constructor(crabService) {
            this.crabService = crabService;
            this.disabled = false;
            this.suggest = { suggest: (value) => this.crabService.suggestLocatie(value) };
        }
        onMapLoaded($event) {
            console.debug('tab-locatie::onMapLoaded', $event, this.map.getMapInfo());
        }
        resize() {
            if (this.map) {
                this.map.updateMapSize();
            }
        }
        locatieChanged() {
            this.zoomToCrab(this.locatie);
        }
        zoomToCrab(locatie) {
            this.crabService.geolocate(locatie.id)
                .then(geolocationresponse => {
                const extent = this.map.transformBoundingboxToMapExtent(geolocationresponse.boundingbox);
                this.map.zoomToExtent(extent);
            });
        }
    };
    __decorate([
        aureliaFramework_1,
        __metadata("design:type", Object)
    ], exports.Zoneerder.prototype, "locatie", void 0);
    __decorate([
        aureliaFramework_1,
        __metadata("design:type", Boolean)
    ], exports.Zoneerder.prototype, "disabled", void 0);
    exports.Zoneerder = __decorate([
        aureliaFramework_2(CrabService),
        __metadata("design:paramtypes", [CrabService])
    ], exports.Zoneerder);

    Object.defineProperty(exports, '__esModule', { value: true });

});
