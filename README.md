Comprobador (para perezosos) de premios en la Lotería de Navidad
----------------------------------------------------------------

Cada año en mi casa hay varias decenas de participaciones de la Lotería de
Navidad entre las regaladas y las compradas. Cuando llega el día 22 de
diciembre, por la tarde me toca hacer una hoja de cálculo con cada número,
cantidad jugada y premio, que tengo que comprobar a mano en alguna web.

Este año he decidido ser más práctico y aprovechar las bondades de la
programación para automatizar esta tarea que no está pagada con dinero. No, en
serio, no está pagada, si lo estuviese al menos uno de estos años me habría
tocado algún premio y ahora estaría en el Caribe bebiendo piña colada debajo de
una palmera y no escribiendo esto.

Antes de empezar con el script busqué un API que me permitiese hacer una
pequeña cantidad de consultas de forma gratuita. Afortunadamente no me costó
nada dar con el API que [El País][1] ha preparado para ese día. Esta gente
siempre aprovecha su web para ir un paso por delante de los demás en el uso de
la tecnología web, solo tenéis que fijaros en los días de elecciones y la
cantidad de código que se curran para unos simples gráficos.

Como pegamento para mi idea he usado [Python 3][2] y su magnífica librería
estándar.  Este lenguaje es una maravilla y cada día me da más alegrías. Para
guardar la lista de números he usado un simple fichero de texto, pero eso mejor
te lo explico en las instrucciones de uso.

### ¿Cómo usar este script?

El proyecto incluye un fichero llamado *"mis_numeros.txt"* con varios números
de ejemplo  Lo único que tienes que hacer es borrar el contenido y añadir tus
números. El formato es muy sencillo, tan solo tienes que añadir un número, dos
puntos y la cantidad que juegas.

Si el dinero que juegas contiene céntimos, tienes que usar un punto como
separador, ya que es lo que usa [Python][2] para los cálculos (y no me apetece
cambiar todos los puntos). Es decir, que si juegas *"un euro y cincuenta
céntimos"* lo que tienes que escribir en el fichero es *"1.50"*. Como ya
supondrás no puedes usar el punto para marcar los miles.

El script utiliza un [shebang][3] que permite ejecutarlo en sistemas Unix
modernos que tengan [Python 3.4][2] instalado simplemente con el comando
`./comprobar.py`. En el caso de Windows lo puedes ejecutar desde el terminal
con `python3.4 comprobar.py`. Es posible que también funcione con otras
versiones de [Python 3][2], pero no lo he probado.

**No me hago reponsable de los fallos que pueda tener el script, ni el API. Tú
eres el único responsable de comprobar adecuadamente tus números.**

### Reporte de bugs y modificaciones

En esta misma web tienes un [tracker][4] en el que reportar bugs, que no
deberían ser muchos porque el código no puede ser más pequeño, pero
conociéndome seguro que he olvidado algo.

Si quieres modificar el código, solo necesitas tener [mercurial][7] instalado,
hacerte una cuenta en [bitbucket][6] y crear un [pull request][5].

### Bugs conocidos

Si tu terminal no soporta correctamente utf8 verás un error del tipo
`UnicodeEncodeError`. Lo puedes solucionar editando el fichero *"comprobar.py"*
con cualquier editor de texto y quitando todos los caracteres no soportados,
como los acentos y los *€*.

### Licencia

> Copyright (c) 2012-2014 Juan Francisco Cantero Hurtado <iam@juanfra.info>
> 
> Permission to use, copy, modify, and distribute this software for any
> purpose with or without fee is hereby granted, provided that the above
> copyright notice and this permission notice appear in all copies.
> 
> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
> WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
> MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
> ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
> WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
> ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
> OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

### Agradecimientos

A [El País][1] por su API que este año me va a quitar mucho trabajo.

A la gente de [#python][8] en [FreeNode][9], en especial a kevlarman, por
recordarme que existe `max()`.

A todas las personas que han convertido Internet en un libro de referencia
rápida para cualquier lenguaje de programación.

A Alberto Fernández por las mejoras al script.

[1]: http://www.elpais.com
[2]: http://www.python.org
[3]: http://en.wikipedia.org/wiki/Shebang_(Unix)
[4]: http://bitbucket.org/juanfra684/loteria-navidad/issues
[5]: http://bitbucket.org/juanfra684/loteria-navidad/pull-requests
[6]: https://bitbucket.org/
[7]: http://mercurial.selenic.com/
[8]: irc://chat.freenode.net/#python
[9]: http://freenode.net
