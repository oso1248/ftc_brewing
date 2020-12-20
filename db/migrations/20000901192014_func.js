exports.up = async function(knex) {
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
  `)
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
  `)
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
  `)
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
  `)
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
  `)
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
  `)

}

exports.down = async function(knex) {
  await knex.raw(`
    DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
  `)
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_mat_weekly() CASCADE;
  `)
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_hop_daily() CASCADE;
  `)
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_hop_weekly() CASCADE;
  `)
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_old_rows_inv_last_brews() CASCADE;
  `)
  await knex.raw(`
    DROP FUNCTION IF EXISTS delete_orphan_sessions() CASCADE;
  `)
}
