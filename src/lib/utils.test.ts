import { describe, it, expect } from "vitest";
import {
  toArray,
  serialize,
  deserialize,
  validateParams,
  updateSearchParams,
} from "./utils";

describe("utils", () => {
  describe("toArray", () => {
    it("should convert single value to array", () => {
      expect(toArray("test")).toEqual(["test"]);
    });

    it("should return empty array for undefined", () => {
      expect(toArray(undefined)).toEqual([]);
    });

    it("should return original array", () => {
      expect(toArray(["test"])).toEqual(["test"]);
    });
  });

  describe("serialize/deserialize", () => {
    it("should serialize and deserialize objects", () => {
      const obj = { test: true, nested: { value: 42 } };
      const serialized = serialize(obj);
      expect(deserialize(serialized)).toEqual(obj);
    });

    it("should handle special characters", () => {
      const obj = { test: "special chars: ?&=" };
      const serialized = serialize(obj);
      expect(deserialize(serialized)).toEqual(obj);
    });
  });

  describe("validateParams", () => {
    it("should throw on empty key", () => {
      expect(() => validateParams("", ["value"])).toThrow(
        "Key cannot be empty"
      );
    });

    it("should throw on undefined values", () => {
      expect(() => validateParams("key", undefined)).toThrow(
        "Values cannot be undefined"
      );
    });
  });

  describe("updateSearchParams", () => {
    it("should update params correctly", () => {
      const params = new URLSearchParams();
      const updated = updateSearchParams(params, "key", ["value1", "value2"]);
      expect(updated.getAll("key")).toEqual(["value1", "value2"]);
    });

    it("should replace existing values", () => {
      const params = new URLSearchParams("key=old");
      const updated = updateSearchParams(params, "key", ["new"]);
      expect(updated.get("key")).toBe("new");
    });
  });
});
