module.exports = {
    setClass(groups, theClass, toRemove){
        if(groups.length > 0){
            Array.from(groups).forEach(element => {
                if(toRemove)
                    element.classList.remove(toRemove)
                element.classList.add(theClass)
            });
        }
    }
}