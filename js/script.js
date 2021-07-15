$(document).ready(function(){
    // alert($(window).width());
    if(parseInt($(window).width()) < 500){
        $("#title_name").attr("class", "display-3");
        $("slogan").attr("style", "margin-left:60px;");
        $("#kasus").addClass("divider");
        $("#content").attr("style", "margin-left:15px; margin-right:15px;");
        $("#myChart").attr("height", "300px");
    }
    $.get("API/api.php?type=dataID", function(data){
        let jsonData = JSON.parse(data);
        $("#sembuh").append(jsonData[0].sembuh);
        $("#positif").append(jsonData[0].positif);
        $("#dirawat").append(jsonData[0].dirawat);
        $("#meninggal").append(jsonData[0].meninggal);
    });
    $.get("API/api.php?type=berita", function(data){
        let jsonData = JSON.parse(data);
        $.each(jsonData['pageProps']['posts'], function(index, elem){
            $("#list_berita")
            .append(`
                <div class="card dividerberita">
                    <div class="card-body">
                        <h6 class="card-title text-mono"><a href="https://kawalcovid19.id/content/${elem['id']}/${elem['slug']}" class="text-decoration-none text-light" target="_blank">👉🏻 ${elem['title']['rendered']}</a></h6>
                        <p class="card-text text-mono text-muted font-italic" style="font-size:14px;">${elem['excerpt']['rendered'].replace("<p>", "").replace("</p>", "").replace("\r\n", "")}</p>
                    </div>
                    <div class="card-footer text-muted">
                        Tanggal Posting : ${new Date(elem['date_gmt']).toGMTString()}
                    </div>
                </div>
            `);
        });
    });
    $.get("API/api.php?type=allCountry", function(data){
        let jsonData = JSON.parse(data);
        $.each(jsonData, function(index, elem){
            $("#pilih_negara")
            .append(`
                <option value="${elem['attributes']['Country_Region']}" data-lastupdate="${elem['attributes']['Last_Update']}" data-terkonfirmasi="${elem['attributes']['Confirmed']}" data-meninggal="${elem['attributes']['Deaths']}" data-sembuh="${elem['attributes']['Recovered']}" data-aktif="${elem['attributes']['Active']}">${elem['attributes']['Country_Region']}</option>
            `);
        });
        let date = new Date(parseInt($("#pilih_negara").find(':selected').data('lastupdate')));
        $("#last_update").append(date.getDate()+
  "/"+(date.getMonth()+1)+
  "/"+date.getFullYear()+
  " "+date.getHours()+
  ":"+date.getMinutes()+
  ":"+date.getSeconds());
        let ctx = document.getElementById('myChart');
        let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                        labels: ['Kasus Terkonfirmasi', 'Meninggal', 'Sembuh', 'Aktif'],
                        datasets: [{
                                label: `Kasus Covid-19 di Negara Indonesia`,
                                data: [$("#pilih_negara").find(':selected').data('terkonfirmasi'), $("#pilih_negara").find(':selected').data('meninggal'), $("#pilih_negara").find(':selected').data('sembuh'), $("#pilih_negara").find(':selected').data('aktif')],
                                backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                        }]
                },
                options: {
                        scales: {
                                y: {
                                        beginAtZero: true
                                }
                        }
                }
        });
        $("#pilih_negara").on('change', function(){
            let date = new Date(parseInt($(this).find(':selected').data('lastupdate')));
            $("#last_update").html(date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+date.getFullYear()+
                " "+date.getHours()+
                ":"+date.getMinutes()+
                ":"+date.getSeconds());
            myChart.data.datasets[0].label = `Kasus Covid-19 di Negara ${$("#pilih_negara").find(':selected').val()}`;
            myChart.data.datasets[0].data = [$(this).find(':selected').data('terkonfirmasi'), $(this).find(':selected').data('meninggal'), $(this).find(':selected').data('sembuh'), $(this).find(':selected').data('aktif')]
            myChart.update();
        });
    });
});