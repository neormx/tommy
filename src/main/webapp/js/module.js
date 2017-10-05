(function(_window, _$, _angular, module) {'use strict';
  /**
   * Convenient Type to wrap interpolated message parameters.
   * @param content message content.
   * @param entity optional related entity.
   */
  _window.Msg = function(content, entity) {
    this.content = content;
    this.entity = entity;
  };
  /**
   * Encapsulates common ui.router functionalities. These functionalities are
   * not exposed as an angular element because they are often needed in places
   * (time) when angular is just setting up.
   * @param {Object} window window reference.
   * @param {Object} $ jquery reference.
   * @param {Object} angular angular reference.
   */
  _window.$uiRouter = (function(window, $, angular) {
    var $this = new Object();
    /**
     * A basic ui.router states constructor.
     * @param {String} id state name.
     * @param {String} module name of the owner module.
     * @param {String} moduleTemplate optional - template module.
     * @param {String} template optional - custom template url.
     */
    $this.State = function(id, module, moduleTemplate, template) {
      var path = (moduleTemplate || module).replace(/_/g,'/') + '/';
      this.id = id;
      this.url = '/' + id;
      this.templateUrl = path + (template || id) +'.html';
      this.controller = module + '.' + id + '.controller';
    };
    /**
     * Common ui.router states param contructor.
     * @param {Object} data payload data.
     * @param {Boolean} isNotBrowserRefresh if <code>true</code> states that
     * the loading of the state is authentical by user request as opposed to a
     * browser refresh when it will be <code>false</code>.
     */
    $this.StateParam = function(data, isNotBrowserRefresh) {
      this.isNotBrowserRefresh = isNotBrowserRefresh || false;
      this.data = data || null;
    };
    /**
     * Saves or recovers a previous state data. This method assumes that the
     * state param definition is an instance of <code>StateParam</code>.
     * @param {Object} $stateParams state params.
     * @param {Object} $sessionStorage session storage service.
     * @param {Object} str name for storing state data.
     * @returns {Integer} 1 if state loading is not a browser refresh and data
     * is saved on $sessionStorage; 0 if state loading is due to a browser
     * refresh and data is recovered from $sessionStorage; -1 if it is not a
     * browser refresh but data was not found on $sessionStorage to recover
     * from there.
     */
    $this.saveOrRecoverStateData = function($stateParams,$sessionStorage,str) {
      if ($stateParams.isNotBrowserRefresh) {
        $sessionStorage[str] = angular.toJson($stateParams.data);
        return 1;
      } else if ($sessionStorage[str]) {
        $stateParams.data = angular.fromJson($sessionStorage[str]);
        return 0;
      }
      return -1;
    };
    /**
     * Saves current state data. This method assumes that the
     * state param definition is an instance of <code>StateParam</code>.
     * @param {Object} $stateParams state params.
     * @param {Object} $sessionStorage session storage service.
     * @param {Object} storage name for storing state data.
     */
    $this.saveStateData = function($stateParams, $sessionStorage, storage) {
      $sessionStorage[storage] = angular.toJson($stateParams.data);
    };
    /**
     * Toogles aspect on stored cache for future searches.
     * @param {String} aspect aspect name.
     * @param {boolean} enable whether to add or remove such aspect.
     * @param {Object} params $stateParams.
     * @param {Object} session $sessionStorage.
     * @param {String} storage controller's cache name.
     * @param {String} backstor optional - aspects back storage. If present,
     * this method will try to update aspects variable in this alternative
     * storage name.
     */
    $this.toogleAspect=function(aspect,enable,params,session,storage,backstor) {
        var index, cache = params.data;
        if (cache.aspects) {
          index = cache.aspects.indexOf(aspect);
          if (enable) {
            if (index < 0) {
              cache.aspects.push(aspect);
            }
          } else if (index >= 0) {
            cache.aspects.splice(index, 1);
          }
          $this.saveStateData(params, session, storage);
          if (backstor && session[backstor]) {
            storage = angular.fromJson(session[backstor]);
            if (storage.aspects) {
              index = storage.aspects.indexOf(aspect);
              if (enable) {
                if (index < 0) {
                  storage.aspects.push(aspect);
                }
              } else if (index >= 0) {
                storage.aspects.splice(index, 1);
              }
              session[backstor] = angular.toJson(storage);
            }
          }
        }
    };
    /**
     * Constructs an identifier entity.
     * @param code identifier's code.
     */
    $this.Identifier = function (code) {
      this.code = code;
    };
    /**
     * Constructs a composite entity.
     * @param code composite's code.
     */
    $this.Composite = function (code) {
      this.core = new $this.Identifier(code);
    };
    /**
     * Convenient ui.router save or restore state data factory.
     * @param {String} storage name to storage state data.
     * @returns {Array} factory dependencies.
     */
    $this.saveOrRecoverStateDataFactory = function(storage) {
      /**
       * This factory handler.
       * @param {Object} $sessionStorage session storage service.
       * @param {Object} $stateParams state params.
       * @param {Object} $timeout timeout service.
       * @param {Object} $log log service.
       */
      var handler = function($sessionStorage, $stateParams, $timeout, $log) {
        var saveOrRecover = $this.saveOrRecoverStateData;
        if (saveOrRecover($stateParams, $sessionStorage, storage) < 0){
          $log.warn('"' + storage + '" storage property not found!');
          //TODO: redirect to home.
        } else {
          window.triggerGotFocus($, $timeout);
        }
      };
      var dependencies = new Array();
      dependencies.push('$sessionStorage');
      dependencies.push('$stateParams');
      dependencies.push('$timeout');
      dependencies.push('$log');
      dependencies.push(handler);
      return dependencies;
    };
    /**
     * Convenient ui.router save state data factory.
     * @param {String} storage name to storage state data.
     * @returns {Array} factory dependencies.
     */
    $this.saveStateDataFactory = function(storage) {
      /**
       * This factory handler.
       * @param {Object} $sessionStorage session storage service.
       * @param {Object} $stateParams state params.
       */
      var handler = function($sessionStorage, $stateParams) {
        $this.saveStateData($stateParams, $sessionStorage, storage);
      };
      var dependencies = new Array();
      dependencies.push('$sessionStorage');
      dependencies.push('$stateParams');
      dependencies.push(handler);
      return dependencies;
    };
    /**
     * Resolves an empty object as entity.
     */
    $this.emptyEntityResolver = function() {
      var handler = function() {
        return new Object();
      };
      var dependencies = new Array();
      dependencies.push(handler);
      return dependencies;
    };
    return $this;
  })(_window, _$, _angular);
  /**
   * Default onRun module phase factory
   * @param {Object} $ jquery reference.
   * @param {Object} module module name.
   * @param {Object} labels moduleLabels.
   * @returns {Array} angular dependencies.
   */
  _window.defaultOnRunFactory = function($, module, labels) {
    /**
     * synchronizes menu selection with current module.
     */
    var synchronizeMenu = function() {
      var ulID = $('#' + module).parent().attr('id');
      $('li[data-target="#' + ulID + '"]').click();
    };
    /**
     * This phase handler.
     * @param {Object} $rootScope root scope.
     * @param {Object} $log logging service.
     * @param {Object} Message messages service.
     */
    var handler = function($rootScope, $log, Message) {
      /**
       * Invoked when a state change error occurs.
       * @param {Event} e change state event.
       * @param {Object} toSte on going state.
       * @param {Object} toPrms on going state params.
       * @param {Object} fromSte on coming state.
       * @param {Object} fromPrms on coming state params.
       * @param {Object} err error occurred.
       */
      var onStateChangeError = function(e,toSte,toPrms,fromSte,fromPrms,err) {
        Message.error($rootScope.messages.error);
        $log.warn(err);
      };
      $rootScope.$on('$stateChangeError', onStateChangeError);
      $rootScope.moduleLabels = labels;
      synchronizeMenu();
    };
    var dependencies = new Array();
    dependencies.push('$rootScope');
    dependencies.push('$log');
    dependencies.push('Message');
    dependencies.push(handler);
    return dependencies;
  };
  /**
   * Common ngResource functionalities.
   * @type undefined
   */
  var ngResource = (function() {
    var $this = new Object();
    /**
     * Creates an action given the parameters.
     * @param {String} method HTTP method.
     * @param {String} url end point address.
     * @param {Array} isArray whether response will be an array.
     * @returns {undefined}
     */
    $this.Action = function(method, url, isArray) {
      this.url = url;
      this.method = method;
      this.isArray = isArray;
    };
    /**
     * Constructs common $resource query actions.
     * @param {String} url the action end point.
     */
    $this.QueryAction = function(url) {
      return new $this.Action('GET', url, true);
    };
    /**
     * Constructs common $resource GET actions.
     * @param {String} url the action end point.
     */
    $this.GetAction = function(url) {
      return new $this.Action('GET', url, false);
    };
    /**
     * Constructs common $resource POST actions.
     * @param {String} url the action end point.
     */
    $this.PostAction = function(url) {
      return new $this.Action('POST', url, false);
    };
    /**
     * Constructs common $resource PUT actions.
     * @param {String} url the action end point.
     */
    $this.PutAction = function(url) {
      return new $this.Action('PUT', url, false);
    };
    return $this;
  })();
  /**
   * Encapsulates common ui.grid functions.
   * @param uiRouter ui.router common functionalities.
   * @param angular angular reference.
   */
  var uiGrid = (function(uiRouter, angular) {
    var $this = new Object();
    /**
     * Builds common row template for opening a row when click on it.
     * @param {String} open optionl - name of the function to open row. If
     * not present, <code>row</code> will be used instead.
     * @returns {String} cell template for <code>active</code> properties.
     */
    $this.openRowTemplate = function(open) {
      var t = '<div ng-click="grid.appScope.'+(open||'open')+'(row.entity)"';
      t += ' ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns';
      t += ' track by col.colDef.name" class="ui-grid-cell" ng-class="{\'';
      t += 'ui-grid-row-header-cell\':col.isRowHeader}" ui-grid-cell></div>';
      return t;
    };
    /**
     * Builds common cell template for <code>active</code> properties.
     * @param {String} activeFieldPath optionl - path to the active property.
     * If not present, <code>COL_FIELD</code> will be used instead.
     * @returns {String} cell template for <code>active</code> properties.
     */
    $this.activeCellTemplate = function(activeFieldPath) {
      var t = '<div class="ui-grid-cell-contents"><i class="fa {{';
      t += (activeFieldPath ? 'row.entity.' + activeFieldPath : 'COL_FIELD');
      t += ' ? \'fa-check text-success\' : \'fa-times text-danger\'}}';
      t += '" aria-hidden="true"></i></div>';
      return t;
    };
    /**
     * Synchronizes grid pagination with current rows found count.
     * @param {Object} grid grid configuration object.
     * @param {Integer} count current rows found count.
     * @param {Array} sizes copy of standard grid sizes.
     */
    $this.syncPagination = function(grid, count, sizes) {
      grid.totalItems = count;
      sizes = grid.paginationPageSizes = sizes;
      if (sizes.indexOf(grid.paginationPageSize) < 0) {
        sizes.push(grid.paginationPageSize);
      }
      if (count > sizes[sizes.length-1]) {
        sizes.push(count);
      }
    };
    /**
     * Default implementation for opening a row.
     * @param {Object} entity entity reference to open.
     * @param {Object} api ui.grid api.
     * @param {Object} $state state service.
     * @param {Object} stateId state id to opening goes.
     */
    $this.onOpenRow = function(entity, api, $state, stateId) {
      //an empty array of aspects is added here for use of subclasses if needed
      var args = { index : -1, records : new Array(), aspects : new Array() };
      var rows = api.core.getVisibleRows(api.grid);
      for(var i = 0; i<rows.length; i++) {
        args.records.push(new uiRouter.Identifier(rows[i].entity.code));
        if (args.index<0 && angular.equals(rows[i].entity.code, entity.code)) {
          args.index = i;
        }
      }
      $state.go(stateId, new uiRouter.StateParam(args, true));
    };
    /**
     * Common options.
     */
    $this.options =  {
      data : 'view.records',
      enableColumnMenus : false,
      enableColumnResizing : true,
      useExternalPagination : true,
      paginationPageSizes : [25, 50, 100, 200, 500],
      paginationPageSize : 100,
      exporterOlderExcelCompatibility : true
    };
    return $this;
  })(_window.$uiRouter, _angular);
  /**
   * Yes/No filter factory for boolean values.
   * @type Array
   */
  var yesNoFactory = (function() {
    /**
     * This filter handler.
     */
    var handler = function() {
      /**
       * Filter function.
       * @param value testing value.
       * @returns {String} Sí or No depending on boolean input.
       */
      var filter = function(value) {
        return value ? 'Sí' : 'No';
      };
      return filter;
    };
    var dependencies = new Array();
    dependencies.push(handler);
    return dependencies;
  })();
  /**
   * Message service factory.
   * @type Array
   */
  var messageServiceFactory = (function() {
    /**
     * Factory handler
     * @param notify notify service.
     */
    var handler = function(notify) {
      /**
       * Builds a function to delegate message rendering to notify service.
       * @param {String} classes css classes to style notify alert.
       * @returns {Function} delegate to invoke notify service with given
       * css classes.
       */
      var notifier = function(classes) {
        /**
         * The actual delegate function.
         * @param {String} message message to show.
         */
        return function(message) {
          notify({
            message : message,
            classes : classes
          });
        };
      };
      /**
       * This service skeleton.
       * @type Object
       */
      var service = new Object();
      /**
       * Notifies an advice message.
       * @param {String} message success text.
       */
      service.advice = notifier('alert-info');
      /**
       * Notifies a success message.
       * @param {String} message success text.
       */
      service.success = notifier('alert-success');
      /**
       * Notifies a warning message.
       * @param {String} message success text.
       */
      service.warning = notifier('alert-warning');
      /**
       * Notifies an error message.
       * @param {String} message success text.
       */
      service.error = notifier('alert-danger');
      return service;
    };
    var dependencies = new Array();
    dependencies.push('notify');
    dependencies.push(handler);
    return dependencies;
  })();
  /**
   * Error interceptor factory.
   * @param window window reference.
   * @param angular angular reference.
   */
  var errorsInterceptorFactory = (function(window, angular) {
      /**
       * Factory handler
       * @param $log logger service.
       * @param $injector injector service.
       * @param BUSINESS_ERROR_CODE business error code.
       * @param EXCEPTIONS_HEADER header carring exception name.
       * @param EXCEPTION_ENTITY_HEADER header carring exception entity.
       */
      var handler = function($log, $injector, BUSINESS_ERROR_CODE,
              EXCEPTIONS_HEADER, EXCEPTION_ENTITY_HEADER) {
          /**
           * This service skeleton.
           * @type Object
           */
          var service = new Object();
          /**
           * Executes on response error.
           * @param {Object} rejection rejected response object.
           */
          service.responseError = function(rejection) {
              var prms, entity, Message = $injector.get('Message');
              var msg = rejection.headers(EXCEPTIONS_HEADER);
              var $rootScope = $injector.get('$rootScope');
              if (rejection.status === BUSINESS_ERROR_CODE) {
                  msg = $rootScope.messages.validation[msg];
                  entity = rejection.headers(EXCEPTION_ENTITY_HEADER);
                  if (entity && entity !== null) {
                    entity = angular.fromJson(entity);
                    prms = new window.Msg(rejection.data, entity);
                  } else {
                    prms = new window.Msg(rejection.data);
                  }
                  Message.warning(msg(prms));
              } else {
                  $log.error(rejection.data);
                  Message.error($rootScope.messages.error);
              }
          };
          return service;
      };
      var dependencies = new Array();
      dependencies.push('$log');
      dependencies.push('$injector');
      dependencies.push('BUSINESS_ERROR_CODE');
      dependencies.push('EXCEPTIONS_HEADER');
      dependencies.push('EXCEPTION_ENTITY_HEADER');
      dependencies.push(handler);
      return dependencies;
  })(_window, _angular);
  /**
   * Executes on Config phase.
   * @type undefined
   */
  var onConfig = (function() {
    /**
     * This phase handler.
     * @param {Object} $httpProvider http provider.
     */
    var handler = function($httpProvider) {
        $httpProvider.interceptors.push('ErrorsInterceptor');
    };
    var dependencies = new Array();
    dependencies.push('$httpProvider');
    dependencies.push(handler);
    return dependencies;
  })();
  /**
   * Executes on Run phase.
   * @type undefined
   */
  var onRun = (function() {
    /**
     * This phase handler.
     * @param {Object} $rootScope root scope.
     * @param {Object} $interpolate interpolate service.
     */
    var handler = function($rootScope, $interpolate) {
      //context's container reference.
      $rootScope.CONTEXTS = new Object();
      $rootScope.messages = {
        validation : { 
          required : 'Este campo es requerido.',
          invalid : 'Atienda los comentarios en rojo antes de continuar.',
          number : 'Ingrese un número.',
          incompleteElement : 'Complete el elemento existente.',
          duplicateElement : $interpolate('Ya existe un elemento "{{content}}" en la lista.'),
          DuplicateEntityException : $interpolate('Ya existe un registro "{{content}}" {{entity.active===false ? "inactivo" : "activo"}} en el sistema.')
        },
        actions : {
          saved : $interpolate('Se ha guardado el registro "{{content}}" correctamente.')
        },
        info : {
          browsing : 'La navegación de registros es conforme a la selección hecha en la búsqueda.'
        },
        noData : 'No se encontraron registros coincidentes.',
        error : 'Su petición no pudo procesarse, por favor intente más tarde.'
      };
    };
    var dependencies = new Array();
    dependencies.push('$rootScope');
    dependencies.push('$interpolate');
    dependencies.push(handler);
    return dependencies;
  })();
  /**
   * This module dependencies.
   * @type Array
   */
  var dependencies = new Array();
  dependencies.push('ngResource');
  dependencies.push('ngMessages');
  dependencies.push('ngStorage');
  dependencies.push('ngSanitize');
  dependencies.push('ui.router');
  dependencies.push('ui.grid');
  dependencies.push('ui.grid.pagination');
  dependencies.push('ui.grid.resizeColumns');
  dependencies.push('ui.grid.exporter');
  dependencies.push('cgNotify');
  dependencies.push('cgBusy');
  dependencies.push('app');
  /**
   * This module definition.
   * @type type
   */
  var mod = _angular.module(module, dependencies);
  mod.constant('BUSINESS_ERROR_CODE', 422);
  mod.constant('EXCEPTIONS_HEADER', 'ApplicationException');
  mod.constant('EXCEPTION_ENTITY_HEADER', 'ProcessingEntity');
  mod.constant('$uiGrid', uiGrid);
  mod.constant('$ngResource', ngResource);
  mod.filter('YesNo', yesNoFactory);
  mod.factory('Message', messageServiceFactory);
  mod.factory('ErrorsInterceptor', errorsInterceptorFactory);
  mod.config(onConfig);
  mod.run(onRun);
})(window, $, angular, 'module');