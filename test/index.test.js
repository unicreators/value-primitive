const assert = require('assert');
const primitive = require('../');

describe('primitive.test.js', function () {

    it('string', () => {        
        assert(primitive.string('str1') === 'str1');
        assert(primitive.string(2) === undefined);
        assert(primitive.string(3, 'def3') === 'def3');
        assert(primitive.string({}) === undefined);
        assert(primitive.string({}, 'def5') === 'def5');
        assert(primitive.string(null) === undefined);
        assert(primitive.string(null, 'def7') === 'def7');
    });

    it('boolean', () => {        
        assert(primitive.boolean(1) === true);
        assert(primitive.boolean(0) === false);
        assert(primitive.boolean('3') === undefined);
        assert(primitive.boolean('4', false) === false);       
        assert(primitive.boolean('true') === true);
        assert(primitive.boolean('false') === false);
        assert(primitive.boolean({}) === undefined);
        assert(primitive.boolean({}, true) === true);
        assert(primitive.boolean(null) === undefined);
        assert(primitive.boolean(null, false) === false);
    });

    it('int', () => {        
        assert(primitive.int(1) === 1);
        assert(primitive.int(2, 20) === 2);
        assert(primitive.int('3') === 3);
        assert(primitive.int('4', 40) === 4);
        assert(primitive.int('-5') === -5);
        assert(primitive.int('-6', 60) === -6);
        assert(primitive.int('7s') === undefined);
        assert(primitive.int('8s', 80) === 80);
        assert(primitive.int({}) === undefined);
        assert(primitive.int({}, 100) === 100);
        assert(primitive.int(null) === undefined);
        assert(primitive.int(null, 120) === 120);
    });

    it('float', () => {        
        assert(primitive.float(1) === 1);
        assert(primitive.float(2, 20.02) === 2);
        assert(primitive.float('3.03') === 3.03);
        assert(primitive.float('4.04', 40.04) === 4.04);
        assert(primitive.float('-5.05') === -5.05);
        assert(primitive.float('-6.06', 60.06) === -6.06);
        assert(primitive.float('7s') === undefined);
        assert(primitive.float('8s', 80.08) === 80.08);
        assert(primitive.float({}) === undefined);
        assert(primitive.float({}, 100.10) === 100.10);
        assert(primitive.float(null) === undefined);
        assert(primitive.float(null, 120.02) === 120.02);
        assert(primitive.float(2.12345678, undefined, 3) === 2.123);
        assert(primitive.float(2.12345678, undefined, 4) === 2.1235);
    });

    it('date', () => {       
        let v1 = new Date(), eq = (d1, d2) => d1 && d2 && d1.getTime() === d2.getTime(); 
        
        let v2 = primitive.date(v1);
        assert(v2);
        assert(eq(v2, v1));
        
        let v3 = primitive.date(0);
        assert(v3);
        assert(eq(v3, new Date(0)));

        let v4 = primitive.date(3, v1);
        assert(v4);
        assert(eq(v4, new Date(3)));

        let v5 = primitive.date(v1.toISOString());
        assert(v5);
        assert(eq(v5, v1));

        let v6 = primitive.date('1515565366801');
        assert(v6 === undefined);

        let v7 = primitive.date('v3', v1);
        assert(v7)
        assert(eq(v7, v1));

        let v8 = primitive.date({});
        assert(v8 === undefined);

        let v9 = primitive.date({}, v1);
        assert(v9);
        assert(eq(v9, v1));

        let v10 = primitive.date(null);        
        assert(v10 === undefined);

        let v11 = primitive.date(null, v1);
        assert(v11);
        assert(eq(v11, v1));
    });


});
