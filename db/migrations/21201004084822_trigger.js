exports.up = async function (knex) {
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
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON hibernated
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON vessel
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON vessel_type
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);

  //inventory
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_inv_mat_weekly
    AFTER INSERT ON inv_mat_weekly
    EXECUTE PROCEDURE delete_old_rows_inv_mat_weekly();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_inv_mat_monthly
    AFTER INSERT ON inv_mat_monthly
    EXECUTE PROCEDURE delete_old_rows_inv_mat_monthly();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_inv_hop_daily
    AFTER INSERT ON inv_hop_daily
    EXECUTE PROCEDURE delete_old_rows_inv_hop_daily();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_inv_hop_weekly
    AFTER INSERT ON inv_hop_weekly
    EXECUTE PROCEDURE delete_old_rows_inv_hop_weekly();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_inv_hop_monthly
    AFTER INSERT ON inv_hop_monthly
    EXECUTE PROCEDURE delete_old_rows_inv_hop_monthly();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_inv_last_brews
    AFTER INSERT ON inv_last_brews
    EXECUTE PROCEDURE delete_old_rows_inv_last_brews();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_orphan_sessions
    BEFORE INSERT ON session
    EXECUTE PROCEDURE delete_orphan_sessions();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_hibernate
    AFTER INSERT ON hibernated
    EXECUTE PROCEDURE delete_old_rows_hibernated();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_fin_injection_log
    AFTER INSERT ON fin_injection_log
    EXECUTE PROCEDURE delete_old_rows_fin_injection_log();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON fin_injection_log
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON fin_injection_bridge
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_fin_wad_add
    AFTER INSERT ON fin_wad_add
    EXECUTE PROCEDURE delete_old_rows_fin_wad_add();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_fin_trans_add
    AFTER INSERT ON fin_trans_add
    EXECUTE PROCEDURE delete_old_rows_fin_trans_add();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_fin_loss_add
    AFTER INSERT ON fin_loss_add
    EXECUTE PROCEDURE delete_old_rows_fin_wad_add();
  `);

  // craft inventory
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON craft_tied_inv
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON craft_trailer_inv
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON craft_floor_inv
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON craft_trailer_number
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);

  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_craft_tied_inv
    AFTER INSERT ON craft_tied_inv
    EXECUTE PROCEDURE delete_old_rows_craft_tied_inv();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_craft_trailer_inv
    AFTER INSERT ON craft_trailer_inv
    EXECUTE PROCEDURE delete_old_rows_craft_trailer_inv();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_craft_floor_inv
    AFTER INSERT ON craft_floor_inv
    EXECUTE PROCEDURE delete_old_rows_craft_floor_inv();
  `);
  await knex.raw(`
    CREATE TRIGGER trigger_delete_old_rows_craft_trailer_number
    AFTER INSERT ON craft_trailer_number
    EXECUTE PROCEDURE delete_old_rows_craft_trailer_number();
  `);
};

exports.down = function (knex) {};
