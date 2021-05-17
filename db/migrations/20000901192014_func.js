exports.up = async function (knex) {
  // updated_at Function
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$;
  `);
  // commodity insert
  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_commodity() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      INSERT INTO mtx_hop_dry (com_id) VALUES (new.id);
      INSERT INTO mtx_hop_std (com_id) VALUES (new.id);
      INSERT INTO mtx_material (com_id) VALUES (new.id);
      INSERT INTO mtx_sac_supr (com_id) VALUES (new.id);
    RETURN NULL;
    END;
    $$;
  `);
  // brands
  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_brw_brand() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    DECLARE 
	    col_name TEXT;
    BEGIN
	    col_name  = new.brand;

      INSERT INTO csx_pre (brw_id) VALUES (new.id);
      INSERT INTO csx_post (brw_id) VALUES (new.id);
      INSERT INTO chp_params (brw_id) VALUES (new.id);
      INSERT INTO chp_smpl (brw_id) VALUES (new.id);
      INSERT INTO sch_params (brw_id) VALUES (new.id);
      INSERT INTO sch_smpl (brw_id) VALUES (new.id);
      INSERT INTO acx_pre (brw_id) VALUES (new.id);
      INSERT INTO acx_post (brw_id) VALUES (new.id);
      
      EXECUTE 'ALTER TABLE mtx_hop_dry ADD COLUMN "' || col_name || '" NUMERIC(50,2) NOT NULL DEFAULT 0';
      EXECUTE 'ALTER TABLE mtx_hop_std ADD COLUMN "' || col_name || '" NUMERIC(50,2) NOT NULL DEFAULT 0';
      EXECUTE 'ALTER TABLE mtx_material ADD COLUMN "' || col_name || '" NUMERIC(50,2) NOT NULL DEFAULT 0';
      EXECUTE 'ALTER TABLE mtx_sac_supr ADD COLUMN "' || col_name || '" NUMERIC(50,2) NOT NULL DEFAULT 0';
	  
    RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_fin_brand() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN

      INSERT INTO fin_smpl (fin_id) VALUES (new.id);
      INSERT INTO fin_params (fin_id) VALUES (new.id);
      INSERT INTO rel_pre (fin_id) VALUES (new.id);
      INSERT INTO rel_post (fin_id) VALUES (new.id);
      INSERT INTO fltr_pre (fin_id) VALUES (new.id);
      INSERT INTO fltr_post (fin_id) VALUES (new.id);
      
    RETURN NULL;
    END;
    $$;
  `);
  // inv_mat_weekly delete old records
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_inv_mat_weekly() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM inv_mat_weekly WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  // inv_mat_monthly delete old records
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_inv_mat_monthly() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM inv_mat_monthly WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  // inv_hop_daily delete old records
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_inv_hop_daily() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM inv_hop_daily WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  // inv_hop_weekly delete old records
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_inv_hop_weekly() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM inv_hop_weekly WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_inv_hop_monthly() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM inv_hop_monthly WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  // inv_last_brews delete old records
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_inv_last_brews() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM inv_last_brews WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  // session delete orphan sessions
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_orphan_sessions() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM session WHERE NOT sess :: text LIKE '%user%';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_hibernated() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM hibernated WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_fin_injection_log() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM fin_injection_log WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_fin_wad_add() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM fin_wad_add WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_fin_trans_add() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM fin_trans_add WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_fin_loss_add() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM fin_loss_add WHERE created_at < NOW() - INTERVAL '1095 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_craft_tied_inv() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM craft_tied_inv WHERE created_at < NOW() - INTERVAL '365 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_craft_trailer_inv() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM craft_trailer_inv WHERE created_at < NOW() - INTERVAL '365 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_craft_floor_inv() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM craft_floor_inv WHERE created_at < NOW() - INTERVAL '365 days';
      RETURN NULL;
    END;
    $$;
  `);
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_old_rows_craft_trailer_number() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      DELETE FROM craft_trailer_number WHERE created_at < NOW() - INTERVAL '365 days';
      RETURN NULL;
    END;
    $$;
  `);
};

exports.down = async function (knex) {
  await knex.raw(`
    DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS insert_commodity() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS insert_fin_brand() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS insert_brw_brand() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_mat_weekly() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_mat_monthly() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_hop_daily() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_hop_weekly() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_hop_monthly() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_last_brews() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_orphan_sessions() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_hibernated() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_fin_injection_log() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_fin_wad_add() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_fin_trans_add() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_fin_loss_add() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_craft_tied_inv() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_craft_trailer_inv() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_craft_floor_inv() CASCADE;
  `);
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_craft_trailer_number() CASCADE;
  `);
};
