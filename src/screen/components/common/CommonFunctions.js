const pluck = (collection, key) => {
  return collection?.map(o => o[key]);
}
const getUniqItems = (data) => {
  var lookup = {};
  var items = data;
  var result = [];

  for (var item, i = 0; item = items[i++];) {
    var name = item.id;

    if (!(name in lookup)) {
      lookup[name] = 1;
      result.push(name);
    }
  }
  return result;
}
const getColourFromText = (text) => {
  if (text.length === 0) {
    return "hsl(0,0,100%)";
  }

  var sanitized = text.replace(/[^A-Za-z]/, '');
  var letters = sanitized.split('');

  //Determine the hue
  var hue = Math.floor((letters[0].toLowerCase().charCodeAt() - 96) / 26 * 360);
  var ord = '';
  for (var i in letters) {
    ord = letters[i].charCodeAt();
    if ((ord >= 65 && ord <= 90) || (ord >= 97 && ord <= 122)) {
      hue += ord - 64;
    }
  }

  hue = hue % 360;

  //Determine the saturation
  var vowels = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u'];
  var count_cons = 0;

  //Count the consonants
  for (i in letters) {
    if (vowels.indexOf(letters[i]) == -1) {
      count_cons++;
    }
  }

  //Determine what percentage of the string is consonants and weight to 95% being fully saturated.
  var saturation = count_cons / letters.length / 0.95 * 100;
  if (saturation > 100) saturation = 100;

  //Determine the luminosity
  var ascenders = ['t', 'd', 'b', 'l', 'f', 'h', 'k'];
  var descenders = ['q', 'y', 'p', 'g', 'j'];
  var luminosity = 50;
  var increment = 1 / letters.length * 50;

  for (i in letters) {
    if (ascenders.indexOf(letters[i]) != -1) {
      luminosity += increment;
    } else if (descenders.indexOf(letters[i]) != -1) {
      luminosity -= increment * 2;
    }
  }
  if (luminosity > 50) luminosity = 50;
  return `hsl(${hue}, ${saturation}%, ${55}%)`;
}

async function delayOneSecond() {
  // Use a Promise to introduce a 1-second delay
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(); // Resolve the Promise after 1 second
      }, 3000); // 1000 milliseconds = 1 second
  });
}
async function tokenRefresh() {
  if (!opener.parent.fetchTriggered) {
      opener.parent.fetchTriggered = true;
      const apiUrl = '/Services/UserService.asmx/GetToken';
      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      };

      try {
          const response = await fetch(apiUrl, requestOptions);

          if (!response.ok) {
              console.log('Request failed with status' + response.status);
          }

          const data = await response.json();
          opener.parent.application.context.renewToken(data);
          opener.parent.fetchTriggered = false;
      } catch (error) {
          console.error('Request error:', error);
          opener.parent.fetchTriggered = false;
      }
  }
}
const fetchWithTokenRetry = async (url, options) => {
  try {
      const response = await fetch(url, options);
      if (response.ok) {
          return response;
      }

      if (response.status === 401) {
          await tokenRefresh();

          if (opener.parent.fetchTriggered) {
              await delayOneSecond();
          }

          const renewedOptions = {
              ...options,
              headers: {
                  ...options.headers,
                  Authorization: 'Bearer ' + JSON.parse(localStorage.jStorage)[opener.parent.application.context.get_apiTokenKey()],
              },
          };
          return fetch(url, renewedOptions);
      }

      console.log('Request failed with status' + response.status);
  } catch (error) {
      console.error('Request error:', error);
  }
};

function NumberConversion (value) {
    return Math.abs(Number(value)) >= 1.0e+9
    ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + "B"
    : Math.abs(Number(value)) >= 1.0e+6
    ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + "M"
    : Math.abs(Number(value)) >= 1.0e+3
    ? (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(value));
  }


  export {
    pluck,
  getUniqItems,
  getColourFromText,
  fetchWithTokenRetry,
  NumberConversion
};