const report_posts = [];

export function getAllReports()
{
    return report_posts;
}

export function createReport(newReportData)
{
    newReportData.id = report_posts.length + 1;
    report_posts.push(newReportData);

    console.log('New Report added: ', newReportData.title);
}



