//////////////////////////////
///  yichen

const is = require('is-type-of');

const call = (fn, val, def = val) => is.function(fn) ? fn(val) : def;
const to = (val, def = undefined, expect, ...handlers) => {
    if (call(expect, val, false)) return val;
    for (const handler of handlers) if (call(handler.match, val, true)) return (handler.handle || handler)(val, def);
    return def;
}

module.exports = {

    string(val, def = undefined) { return to(val, def, is.string); },

    boolean(val, def = undefined) {
        return to(val, def, is.boolean,
            {
                match: (v) => is.string(v), handle: (v, d) => {
                    switch (v.trim().toLowerCase()) {
                        case 'true': return true;
                        case 'false': return false;
                        default: return d;
                    }
                }
            },
            { match: (v) => is.int(v), handle: (v) => !!v });
    },

    int(val, def = undefined) {
        return to(val, def, is.int,
            {
                match: (v) => is.string(v) && (/^(\-|\+)?([0-9]+|Infinity)$/.test(v)),
                handle: (v, d) => isNaN((v = parseInt(v, 10))) ? d : v
            });
    },

    float(val, def = undefined, fixed = undefined) {
        let handle = (v, d) => isNaN((v = parseFloat(v))) ? d : v;
        let r = to(val, def, is.double,
            { match: (v) => is.string(v) && (/^((\-|\+)?|(\.\d+))(\d+(\.\d+)?|(\d+\.)|Infinity)$/.test(v)), handle },
            { match: (v) => is.int(v), handle });
        return (is.nullOrUndefined(r) == false && !is.nullOrUndefined(fixed)
            && isNaN(fixed = parseInt(fixed)) == false) ? parseFloat(r.toFixed(fixed)) : r;
    },

    date(val, def = undefined) {
        return to(val, def, is.date,
            { match: (v) => is.int(v), handle: (v) => new Date(v) },
            {
                match: (v) => is.string(v), handle: (v, d) =>
                    isNaN(v = Date.parse(v)) ? d : new Date(v)
            });
    },

    to

};
