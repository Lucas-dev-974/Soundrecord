module.exports = {
    setClass(groups, theClass, toRemove){
        if(groups.length > 0){
            Array.from(groups).forEach(element => {
                if(toRemove)
                    element.classList.remove(toRemove)
                element.classList.add(theClass)
            });
        }
    },

    Array2Object: function(entry_datas, name_field, value_field){
        let out_datas = {}
        entry_datas.forEach(data => { out_datas[data[name_field]] = data[value_field] })
        return out_datas
    }
}