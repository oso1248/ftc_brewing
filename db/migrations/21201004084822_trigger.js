const tableName = 'mtl_commodity';

exports.up = async function(knex) {
  //users
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON brewery 
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
//commodities
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtl_uom
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtl_type
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtl_location
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtl_enviro
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtl_container
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtl_supplier
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtl_commodity
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
//fin_data
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON brnd_brw
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON brnd_fin
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON brnd_pck
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON fin_smpl
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON fin_params
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON sch_smpl
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON sch_params
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON chp_smpl
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON chp_params
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON rel_post
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON rel_pre
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON fltr_post
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON fltr_pre
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON csx_post
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON csx_pre
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON acx_post
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON acx_pre
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
//inventory
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON inv_mat_weekly
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
//matrix
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtx_hop_std
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtx_hop_dry
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtx_sac_supr
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON mtx_material
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {

};
