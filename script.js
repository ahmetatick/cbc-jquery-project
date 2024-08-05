const API_URL = "http://universities.hipolabs.com";

function create_card(country, domain, name, web_page, two_code) {
  const card_html = `
<div
class="card"
style="width: 18rem"
>
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">
        ${country}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${domain}</li>
      <li class="list-group-item"><a href="${web_page}" target="_blank">${web_page}</a></li>
      <li class="list-group-item">${two_code}</li>
    </ul>
</div>
`;
  return card_html;
}

function mapping_f(data) {
  if (data.length) {
    $.map(data, function (value) {
      const item = create_card(
        value.country,
        value.domains[0],
        value.name,
        value.web_pages[0],
        value.alpha_two_code
      );
      $(".featured-universities").append(item);
    });
  } else {
    $(".featured-universities").append(
      `<h1 class="text-center">NOT FOUND!</h1>`
    );
  }
}

$(document).ready(function () {
  $.get(`${API_URL}/search?country=canada`, function (data) {
    mapping_f(data);
  });

  $("#toggle-button").click(function () {
    let country_input = $.trim($("#country-input").val()) || "";
    let name_input = $.trim($("#name-input").val()) || "";

    country_input = country_input.split(" ").join("+");

    $(".featured-universities").empty();
    $("#heading-text").text("Search Results");

    // to prevent data overload

    if (country_input || name_input) {
      $.get(
        `${API_URL}/search?country=${country_input}&name=${name_input}`,
        function (data) {
          mapping_f(data);
        }
      );
    } else {
      mapping_f({});
    }
  });
});
