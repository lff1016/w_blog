function serializeArray2obj(arr) {
    let res = {}
    const formData = arr.serializeArray()
    formData.forEach(item => {
        res[item.name] = item.value
    })
    return res
}
