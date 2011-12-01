
class Siesta 
  
  constructor: (options = {}) ->
    proto   = options.proto || "https"
    host    = options.host  || @host
    port    = options.port  || if proto is "https" then "443" else  "80"     
    @cors   = options.cors  || @cors # || (( jqueryVersion >= 1.4) ? 'auto' : false) # autodetect?
    @apiUrl = proto + "://" + host + ":" + port


  request: (path, data, callback) ->
    if (@cors) 
      @requestCORS path, data, callback
    else 
      @requestJSONP path, data, callback

  requestCORS: (path, data = {}, callback) ->
    self = this
    try 
      $.ajax
        url: @apiUrl + path
        dataType: 'json'
        data: data
        traditional: true
        success: (response) ->
          callback null, response
        error: (xhr, textStatus, err) ->
        # err will be undefined if this is an HTTP error
          if not err? 
            err = 
              error: true
              code: xhr.status
            try 
              err.message = JSON.parse(responseText).message
            catch e 
              err.message = xhr.statusText

            callback err
          else 
            if window.console
              console.error path, xhr, textStatus, err
            if self.cors is "auto"
              # Fall back to JSONP if CORS fails
              self.cors = false
              self.requestJSONP path, data, callback
            else 
              callback err
    catch err 
      if self.cors is "auto"
        # Fall back to JSONP if CORS fails
        self.cors = false
        self.requestJSONP path, data, callback
      else 
        throw err

  requestJSONP: (path, data = {}, callback) ->
    data = $.param(data, true) + '&callback=?'
    $.ajax
      url: @apiUrl + path
      dataType: 'json'
      data: data
      success: (response) ->
        if response.error
          error = new Error response.message
          error.code = response.code
          callback error
        else 
          callback null, response.data
      error: (xhr, ajaxOptions, err) ->
        callback err

# todo: handle custom callbacks for every callback jquery/prototype offers, jq in the actual status

@Siesta = Siesta
