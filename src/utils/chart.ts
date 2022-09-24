import groupArray from "group-array";

export function getChartData(
  data: { cases: any; deaths: any; recovered: any },
  count: number = 0
) {

  function getSlicedData(caseObj: {}) {
    const dataArr = Object.entries(caseObj);

    count = count || dataArr.length;
    const slicedCases = Object.fromEntries(
      dataArr?.slice(dataArr.length - count)
    );

    return { slices: slicedCases };
  }

  return {
    cases: getSlicedData(data?.cases)?.slices ?? {},
    deaths: getSlicedData(data?.deaths)?.slices ?? {},
    recovered: getSlicedData(data?.recovered)?.slices ?? {},
  };
}

export function getGroupedChartData(data: {
  cases: any;
  deaths: any;
  recovered: any;
}) {


  function groupData(data: {}) {
    let caseArray: any[] = [];

    Object.entries(data).map((c) => caseArray.push(c));

    caseArray = caseArray.map((c) => {
      let split = c[0].split("/");
      split.splice(1, 1);
      split = split.join("/");
      return Object.fromEntries([c, ["tag", split], ["date", c[0]]]);
    });

    const grouped = Object.values(groupArray(caseArray, "tag"));

    let groupedObject: any = {}

    grouped.forEach((gp) => {
      const m1 = gp.slice(-1)[0];
      groupedObject[m1.date] = m1[m1.date]
    });

    return {
      grouped: groupedObject,
    };
  }

  return {
    cases: groupData(data?.cases).grouped || {},
    deaths: groupData(data?.deaths).grouped || {},
    recovered: groupData(data?.recovered).grouped || {},
  };
}
