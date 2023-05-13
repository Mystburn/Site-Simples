
		function mascara( o,f ) {
			v_obj 	= o;
			v_input = f;
			setTimeout("execmascara()",5);
		}

		function execmascara() {
			if(v_input == 'telefone')
			{
				v_obj.value=telefone( v_obj.value );
			}
			else if(v_input == 'sonumeros')
			{
				v_obj.value=sonumeros( v_obj.value );
			}
			else if(v_input == 'socaracteres')
			{
				v_obj.value=socaracteres( v_obj.value );
			}	
			else if(v_input == 'data')
			{
				v_obj.value=data( v_obj.value );
			}
			else if( v_input == 'dinheiro' )
			{
				v_obj.value=dinheiro( v_obj.value );
			}
			else if(v_input == 'cep')
			{
				v_obj.value=cep( v_obj.value );
			}
			else if(v_input == 'emailchars')
			{
				v_obj.value=emailchars( v_obj.value );		
			}			
		}

		function sonumeros(v) {
			v = v.replace(/\D/g,"");                 //Remove tudo o que não é dígito
			return v;
		}

		function socaracteres(v) {
			v = v.replace(/\W/g,"");                 //Remove tudo o que não é caracter
			return v;
		}

		function telefone(v){
			v = v.replace(/\D/g,"");                 //Remove tudo o que não é dígito
				if(v.length==8)
				{
					v=v.replace(/(\d{4})(\d)/,"$1-$2");
				}	
				else if(v.length==9)
				{
					v=v.replace(/(\d{5})(\d)/,"$1-$2");
				}
				else if(v.length==10)
				{
					v=v.replace(/^(\d\d)(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
					v=v.replace(/(\d{4})(\d)/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
				}
				else if(v.length==11)
				{
					v=v.replace(/^(\d\d)(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
					v=v.replace(/(\d{5})(\d)/,"$1-$2");    //Coloca hífen entre o quinto e o sexto dígitos
				}
				else if(v.length==12)
				{
					v=v.replace(/^(\d\d)(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
					v=v.replace(/(\d{6})(\d)/,"$1-$2");    //Coloca hífen entre o quinto e o sexto dígitos
				}		
			return v;
		}

		function data(v) {
			v=v.replace(/\D/g,"");                 			//Remove tudo o que não é dígito
			v=v.replace(/^(\d{2})(\d)/,"$1/$2")             //Coloca barra entre o segundo e o terceiro dígitos
			v=v.replace(/^(\d{2})\/(\d{2})(\d)/,"$1/$2/$3") //Coloca barra entre o quinto e o sexto dígitos
			return v;
		}

		function dinheiro( v ) {
		
		v = v.replace(/\D/g,"");				
		v = new String(Number(v));				
		
			var len = v.length;

			if (0 == len)
			{
				v = "0.00";
			}		
			if (1 == len)
			{
				v = v.replace(/(\d)/,"0,0$1");
			}
			else if (2 == len)
			{
				v = v.replace(/(\d)/,"0,$1");
			}
			else if (len > 2 && len < 6 ) 
			{
				v = v.replace(/(\d{2})$/,',$1');				
			}		
			else if( len >= 6 )
			{
				v = formatBR( v , 2 );
			}	

			return v;
		}

		function cep(v) {
			v = v.replace(/\D/g,"");                 //Remove tudo o que não é dígito
			v = v.replace(/(\d{5})(\d)/,"$1-$2");    //Coloca hífen entre o quinto e so sexto dígitos
			
			return v;
		}

		function emailchars(v) {
			v = v.replace(/[&]/g,"e"); 				
			v = v.replace(/['!%¨*(),¹²³£¢¬°ºª§#$^&|+=?'"<>\{\}\[\]\\\/]/gi, '',""); 	
			return v;
		}		
		
		function trim_( str ) {
			str_out = new String( str );
			return str_out.trim();
		}

		function formatBR(value, decimais) {

			decimais = decimais || 2;
			var mi = value.length - parseInt(decimais);
			var sm = parseInt(mi / 3);
			var regx = "", repl = "";

			for (var i = 0; i < sm; i++) 
			{
				regx = regx.concat('([0-9]{3})');
				repl = repl.concat('.$' + (i + 1));
			}

			regx = regx.concat('([0-9]{' + decimais + '})') + "$";
			repl = repl.concat(',$' + (sm + 1));
			value = value.toString().replace(new RegExp(regx, 'g'), repl);
			return (mi % 3) === 0 ? value.substr(1) : value;
		}
		
		function specialceil_( vlr ) {
			var valor;
			
			if( typeof( vlr ) === 'number' ) 
			{
				valor = new String( vlr );
			}
			else
			{
				valor = vlr;	
			}

			if( valor.length == 1 || valor.length == 2 )
			{
				return valor;
			}
			else if( valor.length >= 3 )
			{
				u 		= parseInt( valor.substring( 2 , 3 ) );
				valor 	= parseFloat( valor.substring( 0 , 3 ) );
					
					if( u >=5 ) 
					{
						
						valor+= (10 - u );
					}
					else
					{
						valor-= u;
					}
				
				r = new String( valor );
					
				return r.substring( 0 , 2 );
					
			}
		}			
		
		function converteFloatMoeda( valor_ , casas ) {

			var valor, v;
			
			if( typeof valor_ === 'number' )
			{
				valor = new String( valor_ );
			}
			else
			{
				valor = valor_;
			}			
			
			if( valor.indexOf( "." ) == -1 )
			{
				valor = valor + ".00";
			}
			
			v = valor.split( "." );		
			d = specialceil_( v[1] );
			
				var valor = v[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
				return valor + "," + d;
				
		}
		
		function converteMoedaFloat( valor ) {
			
			var valor = new String( valor );
			
			  if( valor === "" )
			  {
				 valor = 0.0;
			  }
			  else
			  {
					if( valor.indexOf( '.' ) != -1 && valor.indexOf( ',' ) == -1 )
					{
						valor = parseFloat( valor );						
					} 
					else if( valor.indexOf( '.' ) == -1 && valor.indexOf( ',' ) == -1 )
					{
						valor = parseFloat( valor );						
					}
					else if( valor.indexOf( '.' ) == -1 && valor.indexOf( ',' ) != -1 )
					{
						valor = valor.replace( ",", "." );
						valor = parseFloat( valor );
					}					
					else if( valor.indexOf( '.' ) != -1 && valor.indexOf( ',' ) != -1 )
					{
						valor = valor.replace( /\./g, "" );
						valor = valor.replace( ",", "." );
						valor = parseFloat( valor );
					}										
			  }
			  
			return parseFloat( valor );
		}			
		
		function myparseFloat( nbr ) {
			if( typeof nbr !== 'number' )
			{
				var nbr_ = new String( nbr );
				return parseFloat( nbr_ );
			}
			else
			{
				return parseFloat( nbr );
			}
		}			
		
		function myparseFloat2( nbr ) {
			var nbr_ = new String( nbr );
			return parseFloat( nbr ).toFixed(2);
		}		
		
		function empty( string ) {
			return string=="" | string===undefined | parseFloat( string ) == 0 | string===null;
		}		

		function obj_( name ) {
			return document.getElementById(name);
		}	
		