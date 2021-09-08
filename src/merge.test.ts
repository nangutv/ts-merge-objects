import { merge } from './merge'

describe('merge', () => {
    it('can merge two objects', () => {
        const result = merge({a: 1}, {b: 2})
        expect(result).toEqual({ a: 1, b: 2 })
    })

    it('can deep merge two objects', () => {
        const result = merge({a: 1, b: { name: 'Tom' }}, {b: { name: 'Jerry' }})
        expect(result).toEqual({ a: 1, b: { name: 'Jerry' }})

        const result2 = merge({
            "glossary":{
               "title":"example glossary",
               "GlossDiv":{
                  "title":"S",
                  "GlossList":{
                     "GlossEntry":{
                        "ID":"SGML",
                        "SortAs":"SGML",
                        "GlossTerm":"Standard Generalized Markup Language",
                        "Acronym":"SGML",
                        "Abbrev":"ISO 8879:1986",
                        "GlossDef":{
                           "para":"A meta-markup language, used to create markup languages such as DocBook.",
                           "GlossSeeAlso":[
                              "GML",
                              "XML"
                           ]
                        },
                        "GlossSee":"markup"
                     }
                  }
               }
            }
         }, {
            "glossary":{
               "GlossDiv":{
                  "GlossList":{
                     "GlossEntry":{
                        "ID":"XML",
                     }
                  }
               }
            }
         })

         expect(result2).toEqual({
            "glossary":{
               "title":"example glossary",
               "GlossDiv":{
                  "title":"S",
                  "GlossList":{
                     "GlossEntry":{
                        "ID":"XML",
                        "SortAs":"SGML",
                        "GlossTerm":"Standard Generalized Markup Language",
                        "Acronym":"SGML",
                        "Abbrev":"ISO 8879:1986",
                        "GlossDef":{
                           "para":"A meta-markup language, used to create markup languages such as DocBook.",
                           "GlossSeeAlso":[
                              "GML",
                              "XML"
                           ]
                        },
                        "GlossSee":"markup"
                     }
                  }
               }
            }
         })
    })

    it('should overwrite arrays instead of merging them', () => {
        const result = merge({a: [1,2]}, {a: [3,4]})
        expect(result).toEqual({ a: [3,4]})
    })

    it('throws when some arg is not an object', () => {
        expect(() => {
            merge(null as any, {a: [3,4]})
        }).toThrow('Wrong arguments - they are not objects')

        expect(() => {
            merge([1,2,3] as any, [3,4] as any)
        }).toThrow('Wrong arguments - they are not objects')
    })
})
