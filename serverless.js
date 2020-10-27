module.exports = {
    service: 'upload',
    functions: {
      uploadImage: {
        events: [
          {
            http: 'post /upload',
          },
        ],
      }
    },
    resources: {},
};