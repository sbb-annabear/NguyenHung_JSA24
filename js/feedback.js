const ratingStars = document.querySelectorAll("#rating span");
      let selectedRating = 0;

      ratingStars.forEach((star) => {
        star.addEventListener("click", () => {
          selectedRating = parseInt(star.dataset.value);
          ratingStars.forEach((s) =>
            s.classList.toggle(
              "active",
              parseInt(s.dataset.value) <= selectedRating,
            ),
          );
        });
      });

      const form = document.getElementById("feedbackForm");
      const formMessage = document.getElementById("formMessage");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        formMessage.style.display = "none";

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const topic = form.topic.value;
        const message = form.message.value.trim();

        if (!name || !email || !topic || !message || selectedRating === 0) {
          showMessage(
            "Vui lòng điền đầy đủ thông tin và chọn đánh giá!",
            false,
          );
          return;
        }

        const feedback = {
          name,
          email,
          topic,
          message,
          rating: selectedRating,
          date: new Date().toISOString(),
        };
        const list = JSON.parse(localStorage.getItem("feedbacks") || "[]");
        list.unshift(feedback);
        localStorage.setItem("feedbacks", JSON.stringify(list));

        form.reset();
        selectedRating = 0;
        ratingStars.forEach((s) => s.classList.remove("active"));
        showMessage("Cảm ơn bạn! Ý kiến đã được gửi.", true);
      });

      function showMessage(msg, success) {
        formMessage.textContent = msg;
        formMessage.className = `message-box ${success ? "success" : "error"}`;
        formMessage.style.display = "block";
      }