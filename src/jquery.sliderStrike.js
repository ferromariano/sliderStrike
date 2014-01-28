(function($){
  $.fn.sliderStrike = function( $config ) {

    this.sliderStrike = {};
    this.sliderStrike.config = {
      size: {
        width: this.width(),
        height: this.height(),
        outWidth: this.outerWidth(true),
        outHeight: this.outerHeight(true)
      },
      part: {
        'element': this,
      }
    };
    this.sliderStrike.getPart = function($part) { return this.config.part[ $part ]; }
    this.sliderStrike.setPart = function($part, $obj) { return this.config.part[ $part ] = $obj; }
    this.sliderStrike.getStyleContent = function() {
      return { width:    this.getPart('items').outerWidth(),
               height:   this.getPart('items').outerHeight(),
               overflow: 'hidden',
               margin:    this.getPart('element').css('margin'),
               padding:   this.getPart('element').css('padding'),
      };
    }
    this.sliderStrike.getStyleElement = function() {
      return { width:  this.getPart('items').outerWidth() * this.getPart('items').length,
               height: this.getPart('items').outerHeight(),
               padding: 0,
               margin: 0,
               position: 'relative',
               left:     0 //this.getPart('contenedor').css('padding-left'),
      };
    }

    this.sliderStrike.getStyleItem = function() {
      return { width: this.config.size.width,
               height: this.config.size.height,
               display: 'block',
               'float': 'left',
               border: '1px solid'
      };
    }

    this.sliderStrike.inicio = function() {
      this.getPart('element')
        .addClass('slider_strike_element')

      this.setPart('contenedor', $('<div></div>') )
        .attr( { class: 'sliderStrike_contenedor' } )
        .insertAfter( this.getPart('element') )
        .append(      this.getPart('element') )
        .addClass('slider_strike_content');
      
      this.setPart('items', this.getPart('element').children() )
        .css( this.getStyleItem() )
        .addClass('slider_strike_item')
      this.getPart('contenedor').css( this.getStyleContent() )
      this.getPart('element').css( this.getStyleElement() );




      this.setPart('actions', $('<div></div>') )
        .addClass('slider_strike_actions')
        .appendTo( this.getPart('contenedor') );

      this.setPart('btn_siguiente', $('<a><em>Siguiente</em></a>') )
        .attr('href', '#')
        .bind('click', $.proxy( this.event_siguiente, this ) )
        .addClass('slider_strike_btn_siguiente')
        .appendTo( this.getPart('actions') );

      this.setPart('btn_anterior', $('<a><em>Anterior</em></a>') )
        .attr('href', '#')
        .bind('click', $.proxy( this.event_anterior, this ) )
        .addClass('slider_strike_btn_anterior')
        .appendTo( this.getPart('actions') );

      this.config.actual = 1;

      this.callback_inicio();
    };

    this.sliderStrike.callback_inicio =  function() {};
    this.sliderStrike.callback_ = function() {};

    this.sliderStrike.event_siguiente =  function(e) { 
      e.preventDefault(); 
      this.event_mover( ( this.config.actual + 1 ) );
    };
    this.sliderStrike.event_anterior  =  function(e) { 
      e.preventDefault();
      this.event_mover( ( this.config.actual - 1 ) );
    };

    this.sliderStrike.event_mover = function($n) {
      if( $n <= 0 ) return;
      if( $n >  this.getPart('items').length ) return;
      if( this.getPart('contenedor').hasClass('slider_strike_in_move') ) return;


      this.action_mover( this.getPart('items').eq( $n - 1 ) );
      this.config.actual = $n;

    }

    this.sliderStrike.action_mover = function( $obj ) {
      this.getPart('contenedor').addClass('slider_strike_in_move');
      this.getPart('element')
        .animate( {'left': ( $obj.position().left * -1 )}, 
                  3000, 
                  $.proxy(function() { 
                    this.getPart('contenedor').removeClass('slider_strike_in_move'); 
                  }, this)
                  
        );
    }

    this.sliderStrike.inicio();
    return this.sliderStrike;
  }
})( jQuery );