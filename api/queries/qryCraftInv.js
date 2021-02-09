const db = require('../dbConfig');

async function com(data) {
  let [{ id }] = await db('mtl_commodity').select('id').where('commodity', data.com_id);
  data.com_id = id;
  return data;
}

// tied
async function addTied(data) {
  await com(data);

  return db.raw(`
    DO $$
    BEGIN
      FOR i IN 1..${data.count} LOOP
        INSERT INTO craft_tied_inv (com_id, user_tied)
        VALUES (${data.com_id}, '${data.user_tied}');
      END LOOP;
    END; $$
  `);
}
function getTied() {
  return db.raw(`
    SELECT com.id AS com_id, com.commodity, COUNT(com.commodity) AS count
    FROM craft_tied_inv AS inv
    JOIN mtl_commodity AS com ON com.id = inv.com_id
    WHERE inv.user_loaded IS NULL
    GROUP BY com.id, com.commodity
    ORDER BY com.commodity
  `);
}
async function tiedInvDelete(data) {
  return db.raw(`
    DELETE 
    FROM craft_tied_inv 
    WHERE id = any (array(
            SELECT id 
            FROM craft_tied_inv
            WHERE com_id = ${data.com_id} AND user_loaded IS NULL
            ORDER BY created_at DESC
            LIMIT ${data.count}));
  `);
}

// trailer
function getTrailerLast() {
  return db.raw(`
    SELECT id
    FROM (
      SELECT id, user_receive
      FROM craft_trailer_number
      ORDER BY id DESC
      LIMIT 1	
      ) AS trl
    WHERE trl.user_receive IS NULL
  `);
}
async function addTrailer(data) {
  let [{ id }] = await db('craft_trailer_number').insert(data, ['id']);
  return id;
}
function getTrailerInv(id) {
  return db.raw(`
    SELECT com.id AS com_id, com.commodity, COUNT(com.commodity) AS count, con.container, inv.trailer_id
    FROM craft_trailer_inv AS inv
    JOIN mtl_commodity AS com ON com.id = inv.com_id
    JOIN mtl_container AS con ON com.container_id = con.id
    WHERE inv.trailer_id = ${id} AND inv.user_receive IS NULL
    GROUP BY com.id, com.commodity, con.container, inv.trailer_id
  `);
}
function getTrailerIds() {
  return db('craft_trailer_number as num').join().select('num.id', 'num.user_create', 'num.user_receive', 'num.created_at', 'num.updated_at');
}
async function trailerInvAdd(data) {
  await com(data);
  return db.raw(`
    DO $$
    DECLARE _loadCount bigint := ${data.count};
    DECLARE _tiedCount bigint;
    DECLARE _remainder bigint;
    BEGIN
      SELECT INTO _tiedCount COUNT(*)
      FROM craft_tied_inv AS inv
      WHERE inv.com_id = ${data.com_id} AND inv.user_loaded IS NULL;
      
      _remainder := _loadCount - _tiedCount;

      FOR i IN 1.._loadCount LOOP
        INSERT INTO craft_trailer_inv (trailer_id, com_id, user_load)
        VALUES (${data.trailer_id}, ${data.com_id}, '${data.user_load}');
      END LOOP;
    
      IF EXISTS
        (SELECT com.id
        FROM mtl_commodity AS com
        JOIN mtl_container AS con ON con.id = com.container_id
        WHERE com.id = ${data.com_id} AND con.container = 'Super Sack')

      THEN
        IF _tiedCount >= _loadCount
        THEN
          UPDATE craft_tied_inv
          SET user_loaded = '${data.user_load}'
          WHERE id = any (array(
            SELECT id 
            FROM craft_tied_inv
            WHERE com_id = ${data.com_id} AND user_loaded IS NULL
            ORDER BY created_at ASC
            LIMIT _loadCount));

        ELSE
          UPDATE craft_tied_inv
          SET user_loaded = '${data.user_load}'
          WHERE id = any (array(
            SELECT id 
            FROM craft_tied_inv
            WHERE com_id = ${data.com_id} AND user_loaded IS NULL
            ORDER BY created_at ASC
            LIMIT _loadCount));
            
          FOR i IN 1.._remainder LOOP
            INSERT INTO craft_tied_inv (com_id, user_tied, user_loaded)
            VALUES (${data.com_id}, '${data.user_load}', '${data.user_load}');
          END LOOP;
          
        END IF;
      END IF;
    END$$;

  `);
}
async function trailerInvDelete(data) {
  return db.raw(`
    DO $$
    BEGIN

      DELETE 
      FROM craft_trailer_inv 
      WHERE id = any (array(
              SELECT id 
              FROM craft_trailer_inv
              WHERE com_id = ${data.com_id}
              ORDER BY created_at DESC
              LIMIT ${data.count}));
      
      IF EXISTS
        (SELECT com_id
        FROM craft_tied_inv AS inv
        WHERE inv.com_id = ${data.com_id} AND inv.user_loaded IS NOT NULL)		 
      THEN
        UPDATE craft_tied_inv
        SET user_loaded = NULL 
        WHERE id = any (array(
            SELECT id 
            FROM craft_tied_inv
            WHERE com_id = ${data.com_id} AND user_loaded IS NOT NULL
            ORDER BY updated_at DESC
            LIMIT ${data.count}));			
      END IF;

    END$$;
  `);
}
function getTrailerCount(id) {
  return db.raw(`
    SELECT COUNT(com.com_id) AS total
    FROM craft_trailer_inv AS com
    WHERE trailer_id = ${id.trailer_id}
  `);
}

// receive trailer
function trailerGet() {
  return db.raw(`
    SELECT id
    FROM craft_trailer_number
    WHERE user_receive IS NULL
    ORDER BY id DESC
  `);
}
function trailerReceive(data) {
  return db.raw(`
    DO $$
    BEGIN

      UPDATE craft_trailer_number
      SET user_receive = '${data.username}'
      WHERE id = ${data.trailer_id};

      UPDATE craft_trailer_inv
      SET user_receive = '${data.username}'
      WHERE trailer_id = ${data.trailer_id};

      INSERT INTO craft_floor_inv(com_id)
      SELECT com_id
      FROM craft_trailer_inv AS trl
      JOIN mtl_commodity AS com ON  trl.com_id = com.id
      JOIN mtl_container AS con ON com.container_id = con.id
      WHERE con.container = 'Super Sack' AND trl.trailer_id = ${data.trailer_id};

    END$$;
  `);
}

// 3rd floor
function getFloorInv() {
  return db.raw(`
    SELECT com.id AS com_id, com.commodity, COUNT(com.commodity) AS count
    FROM craft_floor_inv AS inv
    JOIN mtl_commodity AS com ON com.id = inv.com_id
    WHERE inv.user_used IS NULL
    GROUP BY com.id, com.commodity
    ORDER BY com.commodity
  `);
}
async function addFloorInv(data) {
  await com(data);
  return db.raw(`
    DO $$
    BEGIN
      FOR i IN 1..${data.count} LOOP
        INSERT INTO craft_floor_inv (com_id)
        VALUES (${data.com_id});
      END LOOP;
    END; $$
  `);
}
function useFloorInv(data) {
  return db.raw(`
    UPDATE craft_floor_inv
    SET user_used = '${data.username}'
    WHERE id = any(array(
      SELECT id
      FROM craft_floor_inv
      WHERE com_id = ${data.com_id} AND user_used IS NULL
      ORDER BY created_at ASC
      LIMIT ${data.count}));
  `);
}

// material inventory less tied
function getUnTiedInv(data) {
  return db.raw(`
    SELECT A.commodity, COALESCE(A.sum, 0) - COALESCE(B.count, 0) AS count
    FROM
      (SELECT com.id, com.commodity,SUM(inv.total_count)
      FROM inv_mat_weekly AS inv
      JOIN mtl_commodity AS com ON com.id = inv.com_id
      JOIN mtl_container AS con ON con.id = com.container_id
      WHERE inv.created_at >= '${data.start}' AND con.container = 'Super Sack'
      GROUP BY com.id, com.commodity) AS A
    FULL JOIN
      (SELECT com.id, COUNT(inv.com_id)
      FROM craft_tied_inv AS inv
      JOIN mtl_commodity AS com ON com.id = inv.com_id
      JOIN mtl_container AS con ON con.id = com.container_id
      WHERE inv.user_loaded IS NULL  OR inv.created_at >= '${data.start}'
      GROUP BY com.id) AS B ON B.id = A.id
    ORDER BY A.commodity
  `);
}
module.exports = {
  addTied,
  getTied,
  tiedInvDelete,
  addTrailer,
  getTrailerLast,
  getTrailerInv,
  getTrailerIds,
  trailerInvAdd,
  trailerInvDelete,
  getTrailerCount,
  trailerGet,
  trailerReceive,
  getFloorInv,
  getUnTiedInv,
  addFloorInv,
  useFloorInv,
};
