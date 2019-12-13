const ENV_CREDENTIALS = {
  dev: {
    user: "x-dev-user",
    password: "J99Hf2i3eY#2pqBj234tD2@H$%",
    base: "http://apitest.aladvantage.com/alaservices/v1/"
  },
  prod: {
    user: "x-prod-user",
    password: "7U*hg%53^D*@bq-d@k8f2L$^fd4j",
    base: ""
  },
  test: {
    user: "x-test-user",
    password: "M9hf^%2HHf3^$(sn@Kd23p#hsq",
    base: "http://apitest.aladvantage.com/alaservices/v1/"
  }
};

const { dev, test, prod } = ENV_CREDENTIALS;

export { dev, test, prod };
