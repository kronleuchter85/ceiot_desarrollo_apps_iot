select DISTINCT m.DispositivoId 
    , max(m.fecha) 
    , max(m.valor) lastReading
    , d.nombre dispositivo 
    , d.ubicacion
    , e.nombre ElectrovalvulaId
    , e.ElectrovalvulaId 
from DAM.Dispositivos d 
join DAM.Mediciones m on m.DispositivoId = d.DispositivoId
join DAM.Electrovalvulas e on e.ElectrovalvulaId = d.ElectrovalvulaId
group by m.DispositivoId , d.nombre , d.ubicacion , e.nombre, e.ElectrovalvulaId



insert into DAM.Log_riegos (ElectrovalvulaId , valor , fecha) values (? , ? , ?)


select DISTINCT 
	m.medicionId
    , m.fecha
    , m.valor lastReading 
    , m.dispositivoId
from DAM.Mediciones m 
order by m.fecha DESC
limit 1


