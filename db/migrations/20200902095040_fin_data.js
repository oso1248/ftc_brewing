exports.up = function (knex) {
  return knex.schema
    .createTable('brnd_brw', (tbl) => {
      tbl.increments();
      tbl.string('brand', 25).notNullable().unique();
      tbl.string('hop_std', 10).notNullable();
      tbl.string('hop_crft', 10).notNullable();
      tbl.string('hop_dry', 10).notNullable();
      tbl.string('supr_sac', 10).notNullable();
      tbl.string('active', 10).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('brnd_fin', (tbl) => {
      tbl.increments();
      tbl.string('brand', 25).notNullable().unique();
      tbl.string('injection', 5).notNullable();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('active', 10).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('brnd_pck', (tbl) => {
      tbl.increments();
      tbl.string('brand', 25).notNullable().unique();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('active', 10).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('fin_smpl', (tbl) => {
      tbl.increments();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('alc', 25).notNullable().defaultTo('pending');
      tbl.string('iron', 25).notNullable().defaultTo('pending');
      tbl.string('co2o2', 25).notNullable().defaultTo('pending');
      tbl.string('cc', 25).notNullable().defaultTo('pending');
      tbl.string('taste', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('fin_params', (tbl) => {
      tbl.increments();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      tbl.string('og_relctrl', 25);
      tbl.string('og_ftrctrl', 25);
      tbl.string('og_sp', 25);
      tbl.string('og_losl', 25);
      tbl.string('og_losh', 25);

      tbl.string('alc_relctrl', 25);
      tbl.string('alc_ftrctrl', 25);
      tbl.string('alc_sp', 25);
      tbl.string('alc_losl', 25);
      tbl.string('alc_losh', 25);

      tbl.string('cal_relctrl', 25);
      tbl.string('cal_ftrctrl', 25);
      tbl.string('cal_sp', 25);
      tbl.string('cal_losl', 25);
      tbl.string('cal_losh', 25);

      tbl.string('crb_relctrl', 25);
      tbl.string('crb_ftrctrl', 25);
      tbl.string('crb_sp', 25);
      tbl.string('crb_losl', 25);
      tbl.string('crb_losh', 25);

      tbl.string('rdf_relctrl', 25);
      tbl.string('rdf_ftrctrl', 25);
      tbl.string('rdf_sp', 25);
      tbl.string('rdf_losl', 25);
      tbl.string('rdf_losh', 25);

      tbl.string('co2_relctrl', 25);
      tbl.string('co2_ftrctrl', 25);
      tbl.string('co2_sp', 25);
      tbl.string('co2_losl', 25);
      tbl.string('co2_losh', 25);

      tbl.string('cc_relctrl', 25);
      tbl.string('cc_ftrctrl', 25);
      tbl.string('cc_sp', 25);
      tbl.string('cc_losl', 25);
      tbl.string('cc_losh', 25);

      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('sch_smpl', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('alc', 25).notNullable().defaultTo('pending');
      tbl.string('cc', 25).notNullable().defaultTo('pending');
      tbl.string('taste', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('sch_params', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('cc', 25).notNullable().defaultTo('pending');
      tbl.string('acp', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('chp_smpl', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('alc', 25).notNullable().defaultTo('pending');
      tbl.string('gc', 25).notNullable().defaultTo('pending');
      tbl.string('taste', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('chp_params', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('param_d', 25).notNullable().defaultTo('pending');
      tbl.string('param_p', 25).notNullable().defaultTo('pending');
      tbl.string('param_aa', 25).notNullable().defaultTo('pending');
      tbl.string('param_abw', 25).notNullable().defaultTo('pending');
      tbl.string('param_rdf', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('rel_post', (tbl) => {
      tbl.increments();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      // tbl.integer('pck_id')
      //   .unsigned()
      //   .notNullable()
      //   .references('id')
      //   .inTable('brnd_pck')
      //   .onDelete('CASCADE')
      //   .onUpdate('CASCADE')
      tbl.string('tk_fbt', 25).notNullable().defaultTo('pending');
      tbl.string('lines', 25).notNullable().defaultTo('pending');
      tbl.string('tk_lin', 25).notNullable().defaultTo('pending');
      tbl.string('tk_dft', 25).notNullable().defaultTo('pending');
      tbl.string('recover', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('rel_pre', (tbl) => {
      tbl.increments();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      // tbl.integer('pck_id')
      //   .unsigned()
      //   .notNullable()
      //   .references('id')
      //   .inTable('brnd_pck')
      //   .onDelete('CASCADE')
      //   .onUpdate('CASCADE')
      tbl.string('tk_fbt', 25).notNullable().defaultTo('pending');
      tbl.string('lines', 25).notNullable().defaultTo('pending');
      tbl.string('tk_lin', 25).notNullable().defaultTo('pending');
      tbl.string('tk_dft', 25).notNullable().defaultTo('pending');
      tbl.string('recover', 25).notNullable().defaultTo('pending');
      tbl.string('ctrl', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('fltr_post', (tbl) => {
      tbl.increments();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      // tbl.integer('brw_id')
      //   .unsigned()
      //   .notNullable()
      //   .references('id')
      //   .inTable('brnd_brw')
      //   .onDelete('CASCADE')
      //   .onUpdate('CASCADE')
      tbl.string('tk_sch', 25).notNullable().defaultTo('pending');
      tbl.string('lines', 25).notNullable().defaultTo('pending');
      tbl.string('tk_trp', 25).notNullable().defaultTo('pending');
      tbl.string('tk_fbt', 25).notNullable().defaultTo('pending');
      tbl.string('recover', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('fltr_pre', (tbl) => {
      tbl.increments();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      // tbl.integer('brw_id')
      //   .unsigned()
      //   .notNullable()
      //   .references('id')
      //   .inTable('brnd_brw')
      //   .onDelete('CASCADE')
      //   .onUpdate('CASCADE')
      tbl.string('tk_sch', 25).notNullable().defaultTo('pending');
      tbl.string('lines', 25).notNullable().defaultTo('pending');
      tbl.string('tk_trp', 25).notNullable().defaultTo('pending');
      tbl.string('tk_fbt', 25).notNullable().defaultTo('pending');
      tbl.string('tk_fill', 25).notNullable().defaultTo('pending');
      tbl.string('inj', 25).notNullable().defaultTo('pending');
      tbl.string('ctrl', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('csx_post', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('tk_chp', 25).notNullable().defaultTo('pending');
      tbl.string('tk_uni', 25).notNullable().defaultTo('pending');
      tbl.string('lines', 25).notNullable().defaultTo('pending');
      tbl.string('seps', 25).notNullable().defaultTo('pending');
      tbl.string('tk_sch', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('csx_pre', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('tk_chp', 25).notNullable().defaultTo('pending');
      tbl.string('tk_uni', 25).notNullable().defaultTo('pending');
      tbl.string('lines', 25).notNullable().defaultTo('pending');
      tbl.string('cooler', 25).notNullable().defaultTo('pending');
      tbl.string('seps', 25).notNullable().defaultTo('pending');
      tbl.string('acp', 25).notNullable().defaultTo('pending');
      tbl.string('tk_sch', 25).notNullable().defaultTo('pending');
      tbl.string('tk_fill', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('acx_post', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('tk_vf', 25).notNullable().defaultTo('pending');
      tbl.string('lines', 25).notNullable().defaultTo('pending');
      tbl.string('tk_chp', 25).notNullable().defaultTo('pending');
      tbl.string('tk_uni', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('acx_pre', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('tk_vf', 25).notNullable().defaultTo('pending');
      tbl.string('lines', 25).notNullable().defaultTo('pending');
      tbl.string('tk_chp', 25).notNullable().defaultTo('pending');
      tbl.string('tk_fill', 25).notNullable().defaultTo('pending');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('methods_cold', (tbl) => {
      tbl.increments();
      tbl.string('method', 25).notNullable();
      tbl.string('object', 25).notNullable();
      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('methods_cold')
    .dropTableIfExists('acx_pre')
    .dropTableIfExists('acx_post')
    .dropTableIfExists('csx_pre')
    .dropTableIfExists('csx_post')
    .dropTableIfExists('fltr_pre')
    .dropTableIfExists('fltr_post')
    .dropTableIfExists('rel_pre')
    .dropTableIfExists('rel_post')
    .dropTableIfExists('chp_params')
    .dropTableIfExists('chp_smpl')
    .dropTableIfExists('sch_params')
    .dropTableIfExists('sch_smpl')
    .dropTableIfExists('fin_params')
    .dropTableIfExists('fin_smpl')
    .dropTableIfExists('brnd_pck')
    .dropTableIfExists('brnd_fin')
    .dropTableIfExists('brnd_brw');
};
