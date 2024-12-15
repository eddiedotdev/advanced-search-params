import { describe, it, expect, beforeEach, vi } from "vitest";
import { createSearchParamsCore } from "../search-params";

describe("createSearchParamsCore", () => {
  let searchParams: URLSearchParams;
  let navigate: (url: string) => void;
  let core: ReturnType<typeof createSearchParamsCore>;

  beforeEach(() => {
    searchParams = new URLSearchParams();
    navigate = vi.fn((url: string) => {
      const [, query] = url.split('?');
      searchParams.forEach((_, key) => {
        searchParams.delete(key);
      });
      new URLSearchParams(query).forEach((value, key) => {
        searchParams.append(key, value);
      });
    });
    core = createSearchParamsCore({
      pathname: "/test",
      searchParams,
      navigate,
    });
  });

  describe("get", () => {
    it("should return undefined for non-existent key", () => {
      expect(core.get("nonexistent")).toBeUndefined();
    });

    it("should return single value", () => {
      searchParams.set("key", "value");
      expect(core.get("key")).toBe("value");
    });

    it("should return array for multiple values", () => {
      searchParams.append("key", "value1");
      searchParams.append("key", "value2");
      expect(core.get("key")).toEqual(["value1", "value2"]);
    });

    it("should parse JSON when parse option is true", () => {
      const obj = { test: true };
      searchParams.set("key", JSON.stringify(obj));
      expect(core.get("key", { parse: true })).toEqual(obj);
    });

    it("should handle parse errors gracefully", () => {
      searchParams.set("key", "invalid json");
      expect(core.get("key", { parse: true })).toBeUndefined();
    });
  });

  describe("set", () => {
    it("should set single value", () => {
      core.set("key", "value");
      expect(searchParams.get("key")).toBe("value");
      expect(navigate).toHaveBeenCalledWith("/test?key=value");
    });

    it("should set multiple values", () => {
      core.set("key", ["value1", "value2"]);
      expect(searchParams.getAll("key")).toEqual(["value1", "value2"]);
    });

    it("should serialize objects when serialize option is true", () => {
      const obj = { test: true };
      core.set("key", obj, { serialize: true });
      expect(decodeURIComponent(searchParams.get("key")!)).toBe(
        JSON.stringify(obj)
      );
    });
  });

  describe("add", () => {
    it("should add value while preserving existing values", () => {
      searchParams.set("key", "value1");
      core.add("key", "value2");
      expect(core.get("key")).toEqual(["value1", "value2"]);
    });

    it("should deduplicate values", () => {
      core.add("key", ["value", "value"]);
      expect(core.get("key", { forceArray: true })).toEqual(["value"]);
    });
  });

  describe("matches", () => {
    it("should return true for matching single value", () => {
      searchParams.set("key", "value");
      expect(core.matches("key", "value")).toBe(true);
    });

    it("should return true for matching value in array", () => {
      searchParams.append("key", "value1");
      searchParams.append("key", "value2");
      expect(core.matches("key", "value1")).toBe(true);
    });

    it("should handle parsed values when parse option is true", () => {
      const obj = { test: true };
      searchParams.set("key", JSON.stringify(obj));
      expect(core.matches("key", obj, { parse: true })).toBe(true);
    });
  });

  describe("getWithDefault", () => {
    it("should return default value when key does not exist", () => {
      const defaultValue = "default";
      expect(core.getWithDefault("nonexistent", defaultValue)).toBe(
        defaultValue
      );
    });

    it("should return parsed default value with parse option", () => {
      const defaultValue = { test: true };
      expect(
        core.getWithDefault("nonexistent", defaultValue, { parse: true })
      ).toEqual(defaultValue);
    });
  });

  describe("setMany", () => {
    it("should set multiple key-value pairs", () => {
      core.setMany({
        key1: ["value1"],
        key2: ["value2", "value3"],
      });
      expect(core.get("key1")).toBe("value1");
      expect(core.get("key2")).toEqual(["value2", "value3"]);
    });

    it("should handle serialization for all values", () => {
      const params = {
        key1: { test: true },
        key2: [{ test: false }],
      };
      core.setMany(params as any, { serialize: true });
      expect(core.get("key1", { parse: true })).toEqual(params.key1);
      expect(core.get("key2", { parse: true, forceArray: true })).toEqual(
        params.key2
      );
    });
  });
});
