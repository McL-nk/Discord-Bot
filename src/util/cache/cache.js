class Cache{
    //The class constructor stuff
    /**
     * 
     * @param {object} s The schema used by the cache
     */
    constructor(s) {
        this.cache = {}
        this.schema = s


        if (!s || s == null || s == undefined) {
            if (!this.schema || !this.schema == null || !this.schema == undefined) {
                throw new Error('[Error]: Schema is undefined')
            }
        }
    }


    /**
     * Loads info into cache from the database
     * 
     */
    async Load() {
        let b = await this.schema.find();
        for (const c of b) 
        {
          this.cache[c._id] = c
        }

        return "Cache loaded!"
    }

    /**
     * Reloads all cache data form the database
     * 
     */
    async Reload() {
        this.cache = {}
        let b = await this.schema.find()
        for (const c of b) 
        {
            this.cache[c._id] = c
        }
   
        return "Cache reloaded!"
    }

    /**
     * Update the cache and database
     * @param {Object} data Data to update in cache and database
     */

    async Update({data}) {
     
       if(!data._id) return "ERROR: _id Parameter missing from data object"

       if(!this.cache[data._id]) return "No object in cache with that id exists"

       this.cachce[data._id] = data

       this.schema.replaceOne({_id: data._id}, this.cache[data._id], {upsert: true, new: true})
    }

    /**
     * Returns the entire cache (not reccommemded due to the sheer size )
     * @returns {object} the entire cache object
     */
    async GetAll() {
        return this.cache
    }

    /**
     * Gets a item from the cache
     * @param {String} x Object ID
     * @returns {object} A item from the cache (or database if not found)
     */
    async Get(x) {
        if(!x) return "You must provide a Object ID to update the cache"

        return this.cache[x]
    }
}

module.exports = Cache