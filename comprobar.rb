#!/usr/bin/env ruby

require "net/http"
require "json"

def http_get(url)
  Net::HTTP.get URI url
end

dict_jugados = {}

File.readlines("mis_numeros.txt").each do |linea|
  linea.strip!
  next if linea.start_with? "#" # soporte para comentarios
  linea.tr! ",", "."
  linea.tr! "=", ":"
  linea.delete! " "
  next if linea.empty?
  numero, jugado = linea.split ":"
  dict_jugados.store numero, jugado
end

url_estado = "https://api.elpais.com/ws/LoteriaNavidadPremiados?s=1"
estado_json = JSON.parse http_get(url_estado).sub! /^info=/, ""

print "MENSAJE DEL SERVIDOR: "
case estado_json["status"]
when 0
  puts "El sorteo no ha comenzado aún. Todos los números aparecerán como no premiados."
when 1
  puts "El sorteo ha empezado. La lista de números premiados se va cargando poco a poco. Un número premiado podría llegar a tardar unos minutos en aparecer."
when 2
  puts "El sorteo ha terminado y la lista de números y premios debería ser la correcta aunque, tomada al oído, no podemos estar seguros de ella."
when 3
  puts "El sorteo ha terminado y existe una lista oficial en PDF."
when 4
  puts "El sorteo ha terminado y la lista de números y premios está basada en la oficial. De todas formas, recuerda que la única lista oficial es la que publica la ONLAE y deberías comprobar todos tus números contra ella."
else
  puts "ERROR DESCONOCIDO"
end

def consultar_premio(numero)
  # convierte a int porque el API no soporta consultas que empiecen por 0
  premio_json = JSON.parse http_get("https://api.elpais.com/ws/LoteriaNavidadPremiados?n=#{numero.to_i}").sub! /^busqueda=/, ""
  return premio_json["premio"].to_i
end

puts "+--------+--------+--------+"
puts "| NÚMERO | JUGADO | GANADO |"
puts "+--------+--------+--------+"
dict_jugados.each_pair do |numero, jugado|
  premio_decimo = consultar_premio numero
  puts "|  #{numero.to_s.ljust 5, "0"} | #{jugado.to_s.rjust 6, " "} | #{((jugado.to_i * premio_decimo) / 20).to_s.rjust 6," "} |"
end
puts "+--------+--------+--------+"
