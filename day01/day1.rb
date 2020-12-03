

r=[];ex.each{|x| ex.each{|y| ex.each{|z| if x+y+z==2020 then r << x*y*z end}}};r.uniq.first

puts r

r=[];ex.each{|x| ex.each{|y| if x+y==2020 then r<<x*y end}};r.uniq.first

puts r