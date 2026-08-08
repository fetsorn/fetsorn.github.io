# Consultation

<script type="text/javascript">
  (function () {
    let push = function (api, args) {
      api.q.push(args);
    };

    window.Cal =
      window.Cal ||
      function () {
        if (!Cal.loaded) {
          Cal.ns = {};

          Cal.q = Cal.q || [];

          document.head.appendChild(document.createElement("script")).src = "https://app.cal.com/embed/embed.js";

          Cal.loaded = true;
        }

        if (arguments[0] === "init") {
          const api = function () {
            push(api, arguments);
          };

          const namespace = arguments[1];

          api.q = api.q || [];

          if (typeof namespace === "string") {
            Cal.ns[namespace] = Cal.ns[namespace] || api;

            push(Cal.ns[namespace], arguments);

            push(Cal, ["initNamespace", namespace]);
          } else push(Cal, arguments);

          return;
        }

        push(Cal, arguments);
      };
  })();

  Cal("init", { origin: "https://app.cal.com" });

  Cal("inline", {
    elementOrSelector: "#my-cal-inline",
    calLink: "fetsorn/1-hour-meeting",
    config: {
      theme: "dark",
    },
  });
</script>

<div
  style="width: 100%; height: 100%; overflow: scroll"
  id="my-cal-inline"
></div>
