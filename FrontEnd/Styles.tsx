import { Dimensions, StyleSheet } from "react-native";

const ScreenWidth = Dimensions.get("window").width;

const s = StyleSheet.create({

  v1: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 20,
    paddingRight: 24,
    backgroundColor: "#fff7ed",
    borderBottomWidth: 1,
    borderBottomColor: "#fcd5ce",
    shadowColor: "#f87171",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  v6: {
    flex: 1,
    marginRight: 16,
    marginLeft: 12,
    backgroundColor: "#fffbeb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: "#fde68a",
    shadowColor: "#fcd34d",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  b1t1: {
    fontSize: 38,
    fontWeight: "900",
    color: "#0c4a6e",
    textShadowColor: "#bae6fd",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },

  b1t2: {
    fontSize: 27,
    fontWeight: "900",
    color: "#dc2626",
    textShadowColor: "#fecaca",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
    textAlign: "center",
  },

  v8: {
    width: 30,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },


  v2: {
    width: ScreenWidth * 0.43,
    minHeight: 140,
    backgroundColor: "#fff7ed",
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#fcd5ce",
    shadowColor: "#f87171",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    justifyContent: "flex-start",
  },

  colStyle: {
    justifyContent: "space-between",
    paddingHorizontal: ScreenWidth * 0.05,
  },

  t1: {
    fontSize: 21,
    fontWeight: "800",
    color: "#9c4221",
    marginBottom: 10,
    letterSpacing: 0.5,
    lineHeight: 28,
    includeFontPadding: false,
    textAlignVertical: "top",
  },

  t2: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7c2d12",
    letterSpacing: 0.35,
    lineHeight: 26,
    includeFontPadding: false,
    textAlignVertical: "top",
  },

  v5: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#fde68a",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fef3c7",
  },

  b2: {
    width: ScreenWidth * 0.4,
    height: "75%",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fbbf24",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    shadowColor: "#fbbf24",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

  b3: {
    width: ScreenWidth * 0.4,
    height: "75%",
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ea580c",
    borderColor: "#ea580c",
    shadowColor: "#ea580c",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 5,
  },

  t3: {
    fontWeight: "800",
    color: "#fff",
    fontSize: 17,
    letterSpacing: 0.8,
    includeFontPadding: false,
    textAlignVertical: "center",
  },

  sav1: {
    flex: 1,
    backgroundColor: "#fff7ed",
  },

  v3: {
    paddingVertical: 18,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#fcd5ce",
    backgroundColor: "#ffedd5",
  },

  v4: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  i1: {
    fontWeight: "800",
    fontSize: 32,
    color: "#9c4221",
    paddingBottom: 14,
    borderBottomWidth: 3,
    borderBottomColor: "#fb923c",
    letterSpacing: 0.7,
    lineHeight: 40,
    includeFontPadding: false,
    textAlignVertical: "top",
  },

  i2: {
    fontWeight: "500",
    fontSize: 20,
    color: "#7c2d12",
    paddingTop: 22,
    lineHeight: 36,
    letterSpacing: 0.4,
    includeFontPadding: false,
    textAlignVertical: "top",
    minHeight: 220,
  },

  sav2: {
    flex: 1,
    backgroundColor: "#fff7ed",
  },

  v7: {
    width: ScreenWidth * 0.43,
    minHeight: 140,
    backgroundColor: "#d1fae5", // light green to indicate selection
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#10b981", // emerald green border
    shadowColor: "#059669", // darker green shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 7,
    justifyContent: "flex-start",
  },


});

export default s;
