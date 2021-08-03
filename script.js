// jQuery tolong carikan saya element yang classnya search-button,
// ketika di-klik, jalankan fungsi ini.
$(".search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?&apikey=349e0b0c&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      console.log(movies);
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });

      // jQuery, tolong carikan saya element yang classnya movie-container,
      // lalu isi htmlnya ganti pake cards yang sudah ditumpuk di atas.
      $(".movie-container").html(cards);

      // Ketika tombol show details di-klik.
      // jQuery tolong carikan saya element yang classnya modal-detail-button,
      // Lalu ketika tombolnya onclick, kita jalankan function berikut.
      $(".modal-detail-button").on("click", function () {
        console.log($(this).data("imdbid"));
        $.ajax({
          url: "http://www.omdbapi.com/?&apikey=349e0b0c&i=" + $(this).data("imdbid"),
          success: (m) => {
            console.log(m);
            const movieDetail = showMovieDetail(m);
            $(".modal-body").html(movieDetail);
          },
          error: (error) => {
            console.log(error.responseText);
          },
        });
      });

      // End of running ajax
    },
    error: (error) => {
      console.log(error.responseText);
    },
  });
});

//
//

function showCards(m) {
  return `<div class="col-md-4 my-3">
                    <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="" />
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                        data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                    </div>
                </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-flud">
                    <div class="row">
                        <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid" />
                        </div>
                        <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                            <h4>${m.Title} (${m.Year})</h4>
                            </li>
                            <li class="list-group-item">
                            <strong>Director : </strong> ${m.Director}
                            </li>
                            <li class="list-group-item">
                            <strong>Actors : </strong> ${m.Actors}
                            </li>
                            <li class="list-group-item">
                            <strong>Writer : </strong> ${m.Writer}
                            </li>
                            <li class="list-group-item">
                            <strong>Plot : </strong> <br /> ${m.Plot}
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>`;
}
