setTimeout(function () {
  $("#subscribeModal").modal("show");
}, 2e3);
var options = {
    chart: {
      height: 360,
      type: "bar",
      stacked: !0,
      toolbar: { show: !1 },
      zoom: { enabled: !0 },
    },
    plotOptions: {
      bar: { horizontal: !1, columnWidth: "15%", endingShape: "rounded" },
    },
    dataLabels: { enabled: !1 },
    series: [
      {
        name: "Series A",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: "Series B",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: "Series C",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#556ee6", "#f1b44c", "#34c38f"],
    legend: { position: "bottom" },
    fill: { opacity: 1 },
  },
  chart = new ApexCharts(
    document.querySelector("#stacked-column-chart"),
    options
  );
chart.render();
options = {
  chart: { height: 200, type: "radialBar", offsetY: -10 },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: { fontSize: "13px", color: void 0, offsetY: 60 },
        value: {
          offsetY: 22,
          fontSize: "16px",
          color: void 0,
          formatter: function (e) {
            return e + "%";
          },
        },
      },
    },
  },
  colors: ["#556ee6"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.15,
      inverseColors: !1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  stroke: { dashArray: 4 },
  series: [67],
  labels: ["Series A"],
};
// var bodyParser = require("body-parser");
// var urlencodeParser = bodyParser.urlencoded({ extended: false });
// var axios = require("axios");
async function readURL(input) {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  var form = new FormData();

  form.append("profile", document.getElementById("file-input").files[0]);

  $.ajax({
    method: "POST",
    url:
      "http://localhost:3000/api/v1/users/edit_profile?id=" +
      getCookie("email"),
    data: form,
    contentType: false,
    processData: false,
    cache: false,
    success: function (res) {
      alert("Profile updated successfully");
      console.log(res);

      document.cookie = "profile=" + res.profile;
      window.location.href = "/";
    },
    error: function (error) {
      // $(".alert").css("display","block");
      // $("#status").html(error.status+" ");
      // $("#msg").html(error.responseText);
      console.log(error);
    },
  });
  //  var url = input.value;
  //   var ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
  //   if (
  //     input.files &&
  //     input.files[0] &&
  //     (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")
  //   ) {
  //     var reader = new FileReader();

  //     reader.onload = function (e) {
  //       $("#img").attr("src", e.target.result);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  // var formData = new FormData();
  // const profile = document.getElementById("file-input");
  // formData.append("profile", profile.files[0]);
  // try {
  //   const response = await fetch(
  //     "http://localhost:3000/api/v1/users/edit_profile?id=61fd6f12fbdac1c720f8b3e7",
  //     {
  //       body: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         boundary: "—-WebKitFormBoundaryfgtsKTYLsT7PNUVD",
  //       },
  //       method: "post",
  //     }
  //   );
  //   console.log(response);
  //   //  res.redirect("/");

  //   //res.json("Hello");
  // } catch (ex) {
  //   console.log(ex);
  //   // res.redirect("/");
  // }
  //   } else {
  //     $("#img").attr("src", "/assets/no_preview.png");
  //   }
}
