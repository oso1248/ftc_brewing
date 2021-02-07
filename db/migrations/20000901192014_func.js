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
