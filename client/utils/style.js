import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputText: {
    fontSize: 24,
    marginBottom: 20,
    borderBottomWidth: 2,
    padding: 10,
    textAlign: "center",
  },
  colorBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  selectedColorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
    alignSelf: "center",
  },
  buttonRow: {
    flex: 1,
    position: "absolute",
    top: 50,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  hamburgerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
    height: 50,
  },
  hamburgerMenu: {
    position: "absolute",
    top: 100,
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 5,
  },
  hamburgerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  hamburgerButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  hamburgerButtonText: {
    fontSize: 16,
  },
  menuOption: {
    marginTop: 15,
  },
  hamburgerBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  hamburgerIcon: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  colorPicker: {
    flexWrap: "wrap",
    columnGap: 20,
    maxHeight: 400,
  },
  colorText: {
    backgroundColor: "white",
    fontSize: 20,
    marginBottom: 20,
    padding: 20,
    alignSelf: "center",
  },
  colorButton: {
    alignSelf: "center",
    backgroundColor: "white",
  },
  rounded: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default styles;
