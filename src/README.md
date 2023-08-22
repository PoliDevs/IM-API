# Base de datos

>A continuación se detalla el modelo de relacionamiento de las tablas en la base de datos. Este relacionamiento se puede visualizar en el documento esquemático imenu_er.drawio.

La tecnología elegida para la administración de los datos es la tecnología de bases relacionales de `MySql`. 

## Concepto general

El actual backend de una base de datos relacional que está desarrollado para suministrar el servicio a un `cliente`, que llega a un establecimiento gastronómico o llama al mismo para realizar un pedido, pueda a través de la lectura de un código **QR** acceder al menú del establecimiento y a posterior seleccionar los platos o menús que el cliente quiera consumir (ver modelos de comercialización).
Por otro lado, el `usuario` interno, el local gastronómico, accede a una pantalla de uso interno donde puede revisar el estado de los pedidos que van ingresando al sistema iMenú.

Vamos a tener en cuenta que existirán distintos tipos de planes para los usuarios, estos planes van integrando distintas soluciones digitales que van completando y potenciando la app web a la que llamaremos **iMenú**.

También iMenú funciona como un centralizador de pedidos que llegan por otras aplicaciones de terceros que deben sumarse a los pedidos propios y administrarlo con el orden que decida la cocina y el local. También se tendrá en cuenta la visualización necesaria para los **riders**.

iMenú puede aplicarse a locales gastronómicos de un solo site, de más de uno o aplicarse a una cadena de locales con diversas ubicaciones como  también pueden estar encuadradas en el modelo de franquicia.

## Flujo conceptual

Para comprender el flujo debemos separa en el uso `cliente` y en el uso `interno`, para el consumidor y el local gastronómico respectivamente. También podrán sumarse otros entornos de uso o capas del negocio separados de estos dos flujos, como ser, el flujo de logística, el flujo de cocina, de proveedores, de riders y otros.

### Flujo cliente

Vamos a considerar tres opciones para el uso de iMenú desde el cliente, estas tres opciones se llamarán de entornos, en donde el cliente se relaciona con el local gastronómico a través de iMenú.
`Local:` el cliente se dirige al local gastronómico y una vez que está ubicado en una mesa pincha el **QR** y tiene acceso al menú con el que podrá realizar el pedido y pagarlo a la espera de retirar de la barra o que se lo entregue un mozo, estas opciones quedan libradas a conveniencia del mismo local.
Al pinchar el `QR` iMenú le recomienda el ingreso a través del usuario de Gmail o darse de alta con un email y Password, en el caso que haga su alta tendrá que ir a la casilla de correos y seguir el link enviado. Volviendo a entrar a la app. En el caso que el cliente no desee ingresar con Google o dar de alta se le solicitará un nombre para poder relacionarlo con el número de pedido. Siempre recomendaremos por la mejor experiencia del cliente que se registre o logueo con Google.
Ingresando a iMenú podrá ver el menú cargado y si la tienda está abierta o si el plan de contratación del local lo permite, hacer el pedido, pagarlo y esperar para su retiro. Al momento de realizar toda la transacción este recibirá un email con los datos del pedido.
Si el cliente se levanta de la mesa y otra persona lee el QR, esta última podría ver lo que se está preparando y podría acercarse al mostrador y reclamar por el pedido, mientras el verdadero cliente no llega. Por esta razón es que, si o si le pedimos un nombre, para asociar *mesa-pedido-cliente*. Eventualmente quien entrega el pedido podrá corroborar la veracidad de todos estos datos solicitando al cliente el email recibido desde iMenú.
Si el cliente cierra el navegador perdiendo todo el trackeo de su pedido, puede volver a escanear el QR y lo llevará a visualizar el estado actual del mismo.

`Delivery:` el cliente realiza un pedido a través de la línea de delivery, ya sea que solicitará su entrega o lo retira del establecimiento. Para cualquiera de los dos casos la persona que recibe el pedido, por cualquier medio, podremos brindar su propio QR de caja. Así ingresa el pedido, pero le debe agregar el nombre y el tipo de entrega/retiro.

`Terceros:` el cliente realiza un pedido en la plataforma de un tercero requiriendo de los productos que se encuentran en el local. Estos pedidos ingresan a través del consumo de una API que deberá de proveer el tercero. Esto pedidos generan un número de pedido, pero conservan el pedido original de tercero. Estos pedidos se diferenciarán en la vista de *pedidos* mostrando el logo de la empresa de tercero.

Sólo para los clientes que está en el local podrán hacer un seguimiento del pedido. Pero todos los que hayan ingresado un email para la mejora de la experiencia del consumidor.



### Flujo de uso interno
Para este flujo vamos a diferenciar dos situaciones, por un lado, cuando el cliente nunca tuvo contacto con iMenú y el quiere realizar la prueba por lo que debe darse de alta. Por otro lado, tenemos el caso donde el usuario ya está registrado y quiere acceder al sistema. Siempre que un usuario se loguea el sistema registra quien es el usuario y qué nivel tiene dentro de la organización, esto le permitirá acceder a los niveles que le corresponde solamente.

`Flujo primera vez:` suponemos un usuario del sistema adquiere el link de iMenú o descarga su versión mobile. Cuando ingresa le pide en un signup simple ingresar con su usuario de Google o con un email y contraseña determinada para su alta como usuario, como es el primer usuario el sistema determina que podría ser un responsable del comercio. Si esto no fuese así, siempre podrá solicitar al soporte de iMenú para que apague el usuario correspondiente a través de un formulario de confirmación de identidad.

Completado el alta, recibe un email que deberá pinchar y completar la validación de este usuario, al realizar el alta debe identificar su nivel dentro de la organización, por ejemplo, en este caso *gerente*. Terminado esto indica si es una franquicia, luego avanza a una pantalla que pregunta datos sobre el negocio y queda latente a la espera de completar datos sobre el comercio. Independientemente que sea una franquicia o no cada gerente dará de alta a cada comercio en la localización correspondiente. Cuando se completa la parte institucional el gerente debe ingresar a *colaboradores* y dar de alta a sus trabajadores del comercio, indicando el nivel dentro de la organización. Este proceso dispara un email que le llega a cada colaborador y este deberá seguir el link para completar su alta y los datos que le solicitará el sistema.

`Flujo estándar de trabajo:` cualquier colaborador que hay completado su alta podrá ingresar a iMenú, a partir de su nivel podrá acceder a ciertas vistas o pantallas como por ejemplo:
	> Gerente: puede ingresar a todas las vistas del sistema, las operativas funcionales y a las de estadísticas y finanzas.
	>Jefe o supervisor de cocina o salón y mozos: al ingresar sólo pueden visualizar la vista que muestra los estados de los pedidos y el historial de los mismos.
De acuerdo con las decisiones de la gerencia se les permitirán a los colaboradores, otros perfiles más completos. Por ejemplo, el gerente o jefes son los autorizados a la carga del menú, de las imágenes del establecimiento, de la apertura y cierre de la tienda del apagado y encendido de los distintos platos o menús, de la baja o alta de colaboradores de menor nivel organizacional.
Con esta mínima configuración el sistema está preparado para su explotación.
Otras configuraciones están orientadas al control de inventarios con el ingreso y egreso de mercancías, proveedores, insumos y otros.



