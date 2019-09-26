export default {
    chartData: (source, options) => {
        let dataSet = [];
        if (options.series[0].type == "liquidFill") {
            let yNum = 0;
            source.data[0].forEach((val, index) => {
                if (val == source.yAxis) {
                    yNum = index;
                }
            });
            let series = JSON.parse(JSON.stringify(options.series[0]));
            options.series = [];
            source.data.forEach((item, index) => {
                if (index > 0) {
                    series.data[0] = item[yNum];
                    options.series.push(JSON.parse(JSON.stringify(series)));
                }
            });
            return options;
        } else if (options.series[0].type == "radar") {
            let numList = [];
            let sNum = 0;
            options.radar.indicator.forEach(item => {
                source.data[0].forEach((val, index) => {
                    if (val == item.field) {
                        numList.push(index);
                    }
                    if (val == source.series) {
                        sNum = index;
                    }
                });
            })
            let series = JSON.parse(JSON.stringify(options.series));
            options.series = [];
            options.legend.data = [];
            let pnum = 0;
            source.data.forEach((item, index) => {
                if (index > 0) {
                    if (pnum >= series.length) {
                        pnum = 0;
                    }
                    series[pnum].name = item[sNum] ? item[sNum] : "";
                    options.legend.data.push(item[sNum]);
                    series[pnum].data = [
                        []
                    ];
                    numList.forEach(num => {
                        series[pnum].data[0].push(item[num]);
                    })
                    options.series.push(JSON.parse(JSON.stringify(series[pnum])));
                    pnum++;
                }
            });
            return options;
        } else {
            if (source.series.length > 0) {
                if (source.series.length > 1) {
                    let xNum = 0;
                    source.data[0].forEach((val, index) => {
                        if (val == source.xAxis) {
                            xNum = index;
                        }
                    });
                    let product = JSON.parse(JSON.stringify(source.series));
                    let xAxis = [];
                    source.data.forEach((item, index) => {
                        if (index > 0) {
                            xAxis.push(item[xNum]);
                        }
                    });
                    xAxis.forEach(item => {
                        let list = [item];
                        product.forEach(num => {
                            list.push("");
                        })
                        dataSet.push(list);
                    })
                    source.data.forEach(item => {
                        xAxis.forEach((x, xm) => {
                            product.forEach((y, ym) => {
                                let sNum = 0;
                                source.data[0].forEach((val, index) => {
                                    if (val == y) {
                                        sNum = index;
                                    }
                                });
                                if (item[xNum] == x) {
                                    dataSet[xm][ym + 1] = item[sNum];
                                }
                            })
                        })
                    });
                    let series = JSON.parse(JSON.stringify(options.series));
                    options.series = [];
                    let pnum = 0;
                    product.forEach((item, index) => {
                        if (pnum >= series.length) {
                            pnum = 0;
                        }
                        series[pnum].name = item;
                        if (series[0].type == "pie") {
                            series[pnum].encode = {
                                itemName: "product",
                                value: item
                            }
                        }
                        options.series.push(JSON.parse(JSON.stringify(series[pnum])));
                        pnum++;
                    });
                    product.unshift("product");
                    dataSet.unshift(product);
                    options.dataset.source = dataSet;
                    return options;
                } else {
                    let xNum = 0;
                    let yNum = 0;
                    let sNum = 0;
                    source.data[0].forEach((val, index) => {
                        if (val == source.xAxis) {
                            xNum = index;
                        }
                        if (val == source.yAxis) {
                            yNum = index;
                        }
                        if (val == source.series) {
                            sNum = index;
                        }
                    });
                    let product = [];
                    let xAxis = [];
                    source.data.forEach((item, index) => {
                        if (index > 0) {
                            product.push(item[sNum]);
                            xAxis.push(item[xNum]);
                        }
                    });
                    product = Array.from(new Set(product));
                    xAxis = Array.from(new Set(xAxis));
                    xAxis.forEach(item => {
                        let list = [item];
                        product.forEach(num => {
                            list.push("");
                        })
                        dataSet.push(list);
                    })
                    source.data.forEach(item => {
                        xAxis.forEach((x, xm) => {
                            product.forEach((y, ym) => {
                                if (item[xNum] == x && item[sNum] == y) {
                                    dataSet[xm][ym + 1] = item[yNum];
                                }
                            })
                        })
                    });
                    let series = JSON.parse(JSON.stringify(options.series));
                    options.series = [];
                    let pnum = 0;
                    product.forEach((item, index) => {
                        if (pnum >= series.length) {
                            pnum = 0;
                        }
                        series[pnum].name = item;
                        if (series[0].type == "pie") {
                            series[pnum].encode = {
                                itemName: "product",
                                value: item
                            }
                        }
                        options.series.push(JSON.parse(JSON.stringify(series[pnum])));
                        pnum++;
                    });
                    product.unshift("product");
                    dataSet.unshift(product);
                    options.dataset.source = dataSet;
                    return options;
                }
            } else {
                let xNum = 0;
                let yNum = 0;
                source.data[0].forEach((val, index) => {
                    if (val == source.xAxis) {
                        xNum = index;
                    }
                    if (val == source.yAxis) {
                        yNum = index;
                    }
                });
                source.data.forEach((item, index) => {
                    if (index > 0) {
                        dataSet.push([item[xNum], item[yNum]])
                    }
                });
                let series = options.series[0];
                options.series = [];
                if (series.type == "pie") {
                    series.encode = {
                        itemName: "product",
                        value: "test"
                    }
                }
                options.series.push(series);
                dataSet.unshift(["product", "test"]);
                options.dataset.source = dataSet;
                return options;
            }
        }
    }
}