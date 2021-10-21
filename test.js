function integrated(n1, func) {
    var res = n1 * 2;
    func(res.toString());
}
integrated(12, function (res) { console.log(res); });
