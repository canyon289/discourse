import { moduleForWidget, widgetTest } from "helpers/widget-test";

moduleForWidget("actions-summary");

widgetTest("listing actions", {
  template: '{{mount-widget widget="actions-summary" args=args}}',
  beforeEach() {
    this.set("args", {
      actionsSummary: [
        { id: 1, action: "off_topic", description: "very off topic" },
        { id: 2, action: "spam", description: "suspicious message" }
      ]
    });
  },
  async test(assert) {
    assert.equal(find(".post-actions .post-action").length, 2);

    await click(".post-action:eq(0) .action-link a");
    assert.equal(
      find(".post-action:eq(0) img.avatar").length,
      1,
      "clicking it shows the user"
    );
  }
});

widgetTest("post deleted", {
  template: '{{mount-widget widget="actions-summary" args=args}}',
  beforeEach() {
    this.set("args", {
      deleted_at: "2016-01-01",
      deletedByUsername: "eviltrout",
      deletedByAvatarTemplate: "/images/avatar.png"
    });
  },
  test(assert) {
    assert.ok(
      find(".post-action .d-icon-far-trash-alt").length === 1,
      "it has the deleted icon"
    );
    assert.ok(
      find(".avatar[title=eviltrout]").length === 1,
      "it has the deleted by avatar"
    );
  }
});
