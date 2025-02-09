!(function (
  split1,
  reverse1,
  join1,
  mix1,
  window,
  localStorage,
  split2,
  reverse2,
  join2,
  mix2,
  toDecimal,
  splitInternal,
  substringInternal,
  split3,
  reverse3,
  join3,
  mix3,
  parseInt,
  jQuery,
  document,
  split4,
  reverse4,
  join4,
  mix4,
  getServerDate,
  sourceBaseNumber,
  playerBaseNumber,
  shiftNumber,
  decrypt,
) {
  var secondInMillisecond = 1e3;
  let minuteInMillisecond = 60 * secondInMillisecond,
    hourInMillisecond = 60 * minuteInMillisecond,
    gts_faketools,
    gts_faketoolsUtility,
    gts_gameUiHelper,
    gts_gameApi,
    gts_UrlInfo,
    storageGetOption,
    storageSetOption,
    storageGetJsonOption,
    storageGetArrayOption,
    storageGetNumberOption,
    storageGetArrayNumberOption,
    ruleEvaluator,
    gts_gameLang,
    startStopTimeout,
    settingKeysPremium,
    settingKeysCircusTuma,
    settingKeysArena,
    settingKeysExpedition,
    settingKeysDungeon,
    settingKeysUnderworld,
    settingKeysHealth,
    settingKeysEvent,
    settingKeysGeneral,
    settingKeysAuction,
    settingKeysSmeltery,
    settingKeysQuest,
    licenseProp;
  var iconGold = () =>
      gts_controlBuilder.createLabel(null, "gts-icon icon_gold"),
    auctionItemsSectionId = "auctionItemsSection",
    shopItemsSectionId = "shopItemsSection",
    auctionSectionMovingData = null,
    shopSectionMovingData = null,
    storageIsOptionEnabled = (e, t) => "true" == storageGetOption(e, t || !1),
    storageSetJsonOption = (e, t) => storageSetOption(e, JSON.stringify(t)),
    isPast = (e) => new Date().getTime() > e,
    storageSetNextTime = (e, t) =>
      storageSetOption(e, new Date().getTime() + 1e3 * t),
    updateContainerCssClass = (e, t, n) => {
      jQuery(e).toggleClass(t, n);
    },
    getObject = (e) => window[join1(reverse3(split2(e)))],
    expeditionData = [],
    dungeonData = [],
    playerLevel = 1,
    currentCountry;
  let isAutoPerformExp,
    defaultExpeditionLocation,
    expeditionCountryLocation,
    isCurrentCountryIsForExpedition,
    isAutoPerformDun,
    defaultDungeonLocation,
    dungeonCountryLocation,
    isCurrentCountryIsForDungeon,
    isAutoWearUWCostumeEnabled,
    isWorking,
    isBotRunning,
    isTraveling,
    isInUnderworld,
    isOnVacation,
    serverSpeed,
    allowUseClotheToTravelToExpeditionCountry,
    allowUseClotheToTravelToDungeonCountry,
    isAutoOutbidFood,
    underworldCostumeCooldown,
    hasExpeditionPoint,
    hasDungeonPoint,
    getMethodFunc,
    gts_mainWorkflow,
    isGoToWorkIfPossibleCalled,
    isBuyFoodFromMarketCalled,
    isTravelToCountryIfPossibleCalled,
    isTravelToSelectExpeditionCountryCalled,
    isTravelToSelectDungeonCountryCalled,
    isAutoSellPackagesFuncCalled,
    isPutOnWeaponIfNeedFuncCalled;
  var gts_main = {
    getCurrentCountry: function (e) {
      var t = document.getElementById("submenu2"),
        n = Array.from(t.querySelectorAll("a"))
          .filter((e) => e.getAttribute("href").match(/mod=location\&loc=\d/))
          .map((e) => parseInt(e.getAttribute("href").match(/\&loc=(\d)/)[1])),
        i = n.length,
        o = n.pop(),
        r = Array.from(t.querySelectorAll("span"))
          .filter((e) => e.id.match(/location_inactive_\d/))
          .map((e) => parseInt(e.id.match(/location_inactive_(\d)/)[1])),
        a = r.length,
        s = r.pop(),
        l = i + a,
        u =
          l == autoSettingsData.italy.locations.length
            ? "italy"
            : l == autoSettingsData.africa.locations.length
              ? "africa"
              : l == autoSettingsData.germania.locations.length
                ? 9 == o || 9 == s
                  ? "germania"
                  : "britannia"
                : void 0;
      u && (storageSetOption(settingKeysGeneral.currentCountry, u), e(u));
    },
    compareVersions: function (e, t) {
      const n = e.split(".").map(Number),
        i = t.split(".").map(Number),
        o = Math.max(n.length, i.length);
      for (let e = 0; e < o; e++) {
        const t = n[e] || 0,
          o = i[e] || 0;
        if (t > o) return 1;
        if (t < o) return -1;
      }
      return 0;
    },
    buildCircusTumaContent: function (e, t) {
      this.removeChildren(e);
      let n = gts_controlBuilder.createLink(
        "Check this video".gts_translate(),
        "https://www.youtube.com/watch?v=lMt06dY5j18",
        "video-link margin-l-5",
      );
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(
            "Configuration for automating Circus Provinciarum".gts_translate(),
          ),
          n,
        ]),
      );
      var i = this.createElement("div");
      this.buildMultipleSelectionControl(settingKeysCircusTuma.players, i);
      var o = this.createElement("span", null, "icon-copy", "❏");
      (o.title = "Copy to clipboard".gts_translate()),
        jQuery(o).on("click", () => {
          gts_faketools.storage.copyOptionToClipboard(
            settingKeysCircusTuma.players,
          );
        }),
        e.appendChild(
          this.createRow(
            "Attack players cross server".gts_translate(),
            [i],
            "label-for-list",
            [o],
          ),
        );
      let r = gts_controlBuilder.createToggle(
        settingKeysCircusTuma.attackSameServerEnabled,
        "Enable attacking same server".gts_translate(),
      );
      var a = this.createElement("div");
      this.buildMultipleSelectionControl(
        settingKeysCircusTuma.sameServerPlayers,
        a,
      );
      var s = this.createElement("span", null, "icon-copy", "❏");
      (s.title = "Copy to clipboard".gts_translate()),
        jQuery(s).on("click", () => {
          gts_faketools.storage.copyOptionToClipboard(
            settingKeysCircusTuma.sameServerPlayers,
          );
        }),
        e.appendChild(
          this.createRow(
            "Same server attack list".gts_translate(),
            [...r, a],
            "label-for-list",
            [s],
          ),
        );
      var l = this.createInput(null, "textbox");
      l.className = "input-gold";
      var u = parseInt(
        document.getElementById("header_values_level").textContent,
      );
      (l.value = storageGetOption(settingKeysCircusTuma.goldRaided, 500 * u)),
        jQuery(l).on("change", function () {
          storageSetOption(settingKeysCircusTuma.goldRaided, this.value);
        });
      var g = this.createRow(
        "Add player to attack list if raid over".gts_translate(),
        [l, iconGold()],
      );
      (g.className += " gold-raided"), e.appendChild(g);
      var d = gts_controlBuilder.createToggle(
        settingKeysCircusTuma.reattackIfDefenderPointsZero,
      );
      e.appendChild(
        this.createRow(
          "Add player to attack list if defender points is zero".gts_translate(),
          [d],
        ),
      );
      var c = this.createInput(null, "checkbox");
      (c.checked =
        "true" ===
        storageGetOption(settingKeysCircusTuma.autoIgnorePlayer, "false")),
        jQuery(c).on("change", function () {
          storageSetOption(
            settingKeysCircusTuma.autoIgnorePlayer,
            this.checked,
          );
        }),
        e.appendChild(
          this.createRow("Auto ignore player if lose".gts_translate(), [c]),
        );
      var m = this.createInput(null, "checkbox");
      (m.checked =
        "true" ===
        storageGetOption(settingKeysCircusTuma.attackFiveTimesEnabled, "true")),
        jQuery(m).on("change", function () {
          storageSetOption(
            settingKeysCircusTuma.attackFiveTimesEnabled,
            this.checked,
          );
        }),
        e.appendChild(
          this.createRow("Limit 5 attacks per day".gts_translate(), [m]),
        ),
        t ||
          ((m.disabled = !0),
          storageSetOption(settingKeysCircusTuma.attackFiveTimesEnabled, !1),
          jQuery(m).after(
            jQuery("<span>")
              .addClass("red-text")
              .html("Available only for Premium License".gts_translate()),
          ));
      var p = this.createInput(null, "checkbox");
      (p.checked =
        "true" ===
        storageGetOption(settingKeysCircusTuma.doNotRunIfNoQuest, "false")),
        jQuery(p).on("change", function () {
          storageSetOption(
            settingKeysCircusTuma.doNotRunIfNoQuest,
            this.checked,
          );
        }),
        e.appendChild(
          this.createRow("Pause if no suiable quest".gts_translate(), [p]),
        ),
        t ||
          ((p.disabled = !0),
          storageSetOption(settingKeysCircusTuma.doNotRunIfNoQuest, !1),
          jQuery(p).after(
            jQuery("<span>")
              .addClass("red-text")
              .html("Available only for Premium License".gts_translate()),
          ));
      var y = this.createInput(null, "checkbox");
      (y.checked =
        "true" ===
        storageGetOption(settingKeysCircusTuma.runUntilGetChest, "false")),
        jQuery(y).on("change", function () {
          storageSetOption(
            settingKeysCircusTuma.runUntilGetChest,
            this.checked,
          );
        }),
        e.appendChild(
          this.createRow("Pause after get treasure box".gts_translate(), [y]),
        ),
        t ||
          ((y.disabled = !0),
          storageSetOption(settingKeysCircusTuma.runUntilGetChest, !1),
          jQuery(y).after(
            jQuery("<span>")
              .addClass("red-text")
              .html("Available only for Premium License".gts_translate()),
          ));
      var f = this.createElement("div");
      this.buildMultipleSelectionControl(
        settingKeysCircusTuma.ignorePlayers,
        f,
      );
      var h = this.createElement("span", null, "icon-copy", "❏");
      (h.title = "Copy to clipboard".gts_translate()),
        jQuery(h).on("click", () => {
          gts_faketools.storage.copyOptionToClipboard(
            settingKeysCircusTuma.ignorePlayers,
          );
        }),
        e.appendChild(
          this.createRow(
            "Ignore players".gts_translate(),
            [f],
            "label-for-list",
            [h],
          ),
        );
      var v = this.createElement("div");
      this.buildMultipleSelectionControl(
        settingKeysCircusTuma.servers,
        v,
        this.validServerFilter,
      ),
        e.appendChild(
          this.createRow(
            "Attack servers".gts_translate(),
            [v],
            "label-for-list",
          ),
        );
      var _ = this.createElement("div");
      this.buildMultipleSelectionControl(
        settingKeysCircusTuma.ignoreServers,
        _,
        this.validServerFilter,
      ),
        e.appendChild(
          this.createRow(
            "Ignore servers".gts_translate(),
            [_],
            "label-for-list",
          ),
        ),
        e.appendChild(this.createRowHeader("Climbing League".gts_translate()));
      let w = gts_controlBuilder.createToggle(
        settingKeysCircusTuma.climbLeagueEnabled,
        null,
        !1,
        () => {
          storageSetOption(settingKeysCircusTuma.climbCheckingTime, 0);
        },
      );
      e.appendChild(this.createRow("Auto climb league".gts_translate(), [w]));
      let b = gts_controlBuilder.createToggle(
        settingKeysCircusTuma.allowAttackAlly,
        null,
        !1,
        () => {
          storageSetOption(settingKeysCircusTuma.climbCheckingTime, 0);
        },
      );
      e.appendChild(this.createRow("Allow attack ally".gts_translate(), [b]));
      let k = gts_controlBuilder.createDropdown(
        settingKeysCircusTuma.lostTimesForIgnore,
        3,
        ignoreAfterLostTimes,
        "name",
        "value",
        (e) => {
          storageSetOption(settingKeysCircusTuma.climbCheckingTime, 0);
        },
      );
      e.appendChild(
        this.createRow(
          "Ignore player if today attack lost - win >= x times".gts_translate(),
          [k],
        ),
      );
    },
    buildPlayerList: function (e, t, n) {
      for (var i = this, o = 0; o < t.length; o++) {
        var r = t[o];
        r &&
          (function (t) {
            var o = i.buildPlayerItem(t, function (n) {
              jQuery(o).prev().focus(), o.remove();
              var i = storageGetJsonOption(e);
              (i = i.filter(function (e) {
                return e != t && e;
              })),
                storageSetJsonOption(e, i),
                n.stopPropagation();
            });
            n.insertBefore(o, n.lastChild);
          })(r);
      }
    },
    wait: function () {
      setTimeout(() => {
        if (
          getObject("slootekaf_stg") &&
          getObject("repleHiUemag_stg") &&
          getObject("ofnIlrU_stg")
        ) {
          (gts_faketools = getObject("slootekaf_stg")),
            (gts_gameUiHelper = getObject("repleHiUemag_stg")),
            (gts_UrlInfo = getObject("ofnIlrU_stg")),
            (ruleEvaluator = getObject("rotaulavEelur_stg")),
            (gts_gameApi = getObject("ipAemag_stg")),
            (gts_gameLang = window.gts_gameLang),
            (translate_method = getObject("dohtem")),
            (randomId = getObject("dImodnar"));
          var e = gts_faketools.storage;
          (storageGetOption = e.getOption.bind(e)),
            (storageSetOption = e.setOption.bind(e)),
            (storageGetJsonOption = e.getJsonOption.bind(e)),
            (storageGetArrayOption = e.getArrayOption.bind(e)),
            (storageGetArrayNumberOption = e.getArrayNumberOption.bind(e)),
            (storageGetNumberOption = e.getNumberOption.bind(e)),
            (gts_faketoolsUtility = gts_faketools.utility),
            (settingKeysPremium = settingKeys.premium),
            (settingKeysCircusTuma = settingKeys.circusTuma),
            (settingKeysArena = settingKeys.arena),
            (settingKeysExpedition = settingKeys.expedition),
            (settingKeysDungeon = settingKeys.dungeon),
            (settingKeysUnderworld = settingKeys.underworld),
            (settingKeysHealth = settingKeys.health),
            (settingKeysEvent = settingKeys.event),
            (settingKeysGeneral = settingKeys.general),
            (settingKeysAuction = settingKeys.auction),
            (settingKeysSmeltery = settingKeys.smeltery),
            (settingKeysQuest = settingKeys.quest),
            (licenseProp = settingKeys.general.key),
            gts_main.start();
        } else gts_main.wait();
      }, 100);
    },
    buildPremiumContent: async function (e) {
      var t = this;
      this.removeChildren(e);
      let n = gts_controlBuilder.createLink(
        "Check this video".gts_translate(),
        "https://www.youtube.com/watch?v=lMt06dY5j18",
        "video-link margin-l-5",
      );
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(
            "All features are listed in this section is Premium Feature.".gts_translate(),
          ),
          n,
        ]),
      ),
        e.appendChild(this.createRowHeader("Auto saving gold".gts_translate()));
      var i = this.createInput(null, "checkbox"),
        o = storageIsOptionEnabled(settingKeys.auction.packGoldEnabled, !0);
      (i.checked = o),
        jQuery(i).on("change", function () {
          storageSetOption(settingKeys.auction.packGoldEnabled, this.checked),
            storageSetOption(settingKeys.auction.enabledPackGoldTime, -1),
            (a = 0);
        });
      var r = [i],
        a = storageGetNumberOption(
          settingKeys.auction.enabledPackGoldTime,
          "0",
        ),
        s = new Date().getTime();
      if (a > s) {
        var l = this.createElement("label", null, null, "");
        r.push(l);
        let e = Math.round((a - s) / 1e3);
        var u = setInterval(() => {
          if (--e <= 0 || a <= 0)
            return clearInterval(u), void jQuery(l).text("");
          let t =
            "Note: Currently auto hide gold is turned off temporary and will be turned on automatically after {numberOfSeconds} seconds. You can stop the progress by manually turn on/off the checkbox.".gts_translate(
              { numberOfSeconds: e },
            );
          jQuery(l).text(t);
        }, 1e3);
      }
      e.appendChild(this.createRow("Auto hide gold".gts_translate(), r));
      var g = (t) => {
          var n = [
            packGoldLocation.auctionHouse,
            packGoldLocation.guildMarket,
            packGoldLocation.guildBank,
            packGoldLocation.training,
            packGoldLocation.publicMarket,
            packGoldLocation.shop,
          ];
          for (var i of n) jQuery(e).toggleClass(i + "-selected", !1);
          jQuery(e).toggleClass(t + "-selected", !0);
        },
        d = this.createElement("ul", null, "food"),
        c = storageGetOption(
          settingKeys.auction.packGoldLocation,
          packGoldLocation.auctionHouse,
        );
      g(c);
      var m = document.createElement("li"),
        p = document.createElement("input");
      m.appendChild(p),
        (p.type = "radio"),
        (p.checked = c == packGoldLocation.auctionHouse),
        (p.name = "locationToPackGold"),
        (p.id = "rdoAutionHouse"),
        jQuery(p).on("click", function () {
          g(packGoldLocation.auctionHouse),
            this.checked &&
              storageSetOption(
                settingKeys.auction.packGoldLocation,
                packGoldLocation.auctionHouse,
              );
        });
      var y = document.createElement("label");
      (y.htmlFor = p.id),
        (y.textContent = "Auction house".gts_translate()),
        m.appendChild(y),
        d.appendChild(m);
      var f = document.createElement("li"),
        h = document.createElement("input");
      f.appendChild(h),
        (h.type = "radio"),
        (h.checked = c == packGoldLocation.guildMarket),
        (h.name = "locationToPackGold"),
        (h.id = "rdoGuildMarket"),
        jQuery(h).on("click", function () {
          g(packGoldLocation.guildMarket),
            this.checked &&
              storageSetOption(
                settingKeys.auction.packGoldLocation,
                packGoldLocation.guildMarket,
              );
        });
      var v = document.createElement("label");
      (v.htmlFor = h.id),
        (v.textContent = "Guild market".gts_translate()),
        f.appendChild(v),
        d.appendChild(f);
      var _ = document.createElement("li"),
        w = document.createElement("input");
      _.appendChild(w),
        (w.type = "radio"),
        (w.checked = c == packGoldLocation.guildBank),
        (w.name = "locationToPackGold"),
        (w.id = "rdoGuildBank"),
        jQuery(w).on("click", function () {
          g(packGoldLocation.guildBank),
            this.checked &&
              storageSetOption(
                settingKeys.auction.packGoldLocation,
                packGoldLocation.guildBank,
              );
        });
      var b = document.createElement("label");
      (b.htmlFor = w.id),
        (b.textContent = "Guild bank".gts_translate()),
        _.appendChild(b),
        d.appendChild(_);
      var k = document.createElement("li"),
        O = document.createElement("input");
      k.appendChild(O),
        (O.type = "radio"),
        (O.checked = c == packGoldLocation.training),
        (O.name = "locationToPackGold"),
        (O.id = "rdoTraining"),
        jQuery(O).on("click", function () {
          g(packGoldLocation.training),
            this.checked &&
              storageSetOption(
                settingKeys.auction.packGoldLocation,
                packGoldLocation.training,
              );
        });
      var I = document.createElement("label");
      (I.htmlFor = O.id),
        (I.textContent = "Training".gts_translate()),
        k.appendChild(I),
        d.appendChild(k);
      var C = document.createElement("li"),
        S = document.createElement("input");
      C.appendChild(S),
        (S.type = "radio"),
        (S.checked = c == packGoldLocation.publicMarket),
        (S.name = "locationToPackGold"),
        (S.id = "rdoPublicMarket"),
        jQuery(S).on("click", function () {
          g(packGoldLocation.publicMarket),
            this.checked &&
              storageSetOption(
                settingKeys.auction.packGoldLocation,
                packGoldLocation.publicMarket,
              );
        });
      var x = document.createElement("label");
      (x.htmlFor = S.id),
        (x.textContent = "Public market".gts_translate()),
        C.appendChild(x),
        d.appendChild(C);
      var T = document.createElement("li"),
        K = document.createElement("input");
      T.appendChild(K),
        (K.type = "radio"),
        (K.checked = c == packGoldLocation.shop),
        (K.name = "locationToPackGold"),
        (K.id = "rdoShop"),
        jQuery(K).on("click", function () {
          g(packGoldLocation.shop),
            this.checked &&
              storageSetOption(
                settingKeys.auction.packGoldLocation,
                packGoldLocation.shop,
              );
        });
      var A = document.createElement("label");
      (A.htmlFor = K.id),
        (A.textContent = "Shop".gts_translate()),
        T.appendChild(A),
        d.appendChild(T),
        e.appendChild(this.createRow("Hide gold in".gts_translate(), [d]));
      var U = this.createInput(null, "textbox");
      (U.className = "input-gold"),
        (U.value = storageGetOption(
          settingKeys.auction.packGoldAmount,
          "30000",
        )),
        jQuery(U).on("change", function () {
          storageSetOption(settingKeys.auction.packGoldAmount, this.value);
        }),
        e.appendChild(
          this.createRow(
            "Hide gold once over".gts_translate(),
            [U, iconGold()],
            null,
            null,
            "packing-gold-threshold",
          ),
        );
      var P = this.createElement("select"),
        E = storageGetOption(settingKeysPremium.statToTrain, 0);
      for (var G of characterStats) {
        ((Ue = t.createElement("option", null, null, G.name)).value = G.value),
          (Ue.selected = t.isEqual(G.value, E)),
          P.appendChild(Ue);
      }
      jQuery(P).on("change", function () {
        var e = t.getSelectedValue(this);
        null != e &&
          (storageSetOption(settingKeysPremium.minGoldToTrain, 0),
          storageSetOption(settingKeysPremium.statToTrain, e));
      }),
        e.appendChild(
          this.createRow(
            "Training attribute".gts_translate(),
            [P],
            null,
            null,
            "hide training-config",
          ),
        );
      var D = gts_controlBuilder.createNumberInput(
        settingKeysPremium.keepAmountOfGoldOnHand,
        1e4,
      );
      e.appendChild(
        this.createRow(
          "Keep amount of gold on hand".gts_translate(),
          [D, iconGold()],
          null,
          null,
          "hide guild-bank-config",
        ),
      );
      var N,
        F = this.createInput(null, "textbox");
      F.placeholder =
        "Copy & Paste seller profile's url here and press Enter".gts_translate();
      var B = (e, t) => {
          var n = this.createElement(
              "li",
              e.sellerId,
              "seller-item",
              e.sellerName,
            ),
            i = this.createElement("i", null, "remove");
          (i.onclick = () => {
            storageSetOption(settingKeysPremium.publicMarketSellers, "[]"),
              N.remove();
          }),
            n.appendChild(i),
            N.appendChild(n);
        },
        M = () => {
          var e = F.value;
          if (e) {
            var t = storageGetJsonOption(
              settingKeysPremium.publicMarketSellers,
            );
            jQuery.get(e, (e) => {
              (N = this.createElement("ul", null, "public-market-sellers")),
                jQuery(F).parent().prepend(N);
              var n = preventJQueryLoadResource(e)
                  .find(".player_name_bg > div")[0]
                  .innerText.trim(),
                i = { sellerId: F.value.match(/\&p=(\d+)/)[1], sellerName: n };
              t.push(i),
                storageSetOption(
                  settingKeysPremium.publicMarketSellers,
                  JSON.stringify(t),
                ),
                B(i),
                (F.value = "");
            });
          }
        };
      let q = jQuery(F);
      q.on("blur", M),
        q.on("keypress", (e) => {
          F.value;
          13 == e.keyCode && M();
        });
      var R = storageGetJsonOption(settingKeysPremium.publicMarketSellers);
      R.length &&
        ((N = this.createElement("ul", null, "public-market-sellers")),
        R.forEach(B)),
        e.appendChild(
          this.createRow(
            "Only buy from player".gts_translate(),
            [N, F],
            null,
            null,
            "hide public-market-config",
          ),
        );
      var j = gts_controlBuilder.createLabel("min "),
        Q = gts_controlBuilder.createInput(
          settingKeysPremium.minGoldPackCanBuy,
          "textbox",
          "30000",
          "input-gold",
        ),
        L = gts_controlBuilder.createLabel("max "),
        H = gts_controlBuilder.createHtmlLabel(" , "),
        W = gts_controlBuilder.createInput(
          settingKeysPremium.maxGoldPackCanBuy,
          "textbox",
          "9000000",
          "input-gold",
        ),
        J = this.createRow(
          "Gold packing range".gts_translate(),
          [j, Q, iconGold(), H, L, W, , iconGold()],
          null,
          null,
          "hide guild-market-config shop-config",
          "Bot will buy any items which has amount of gold in the configuration range".gts_translate(),
        );
      e.appendChild(J);
      let X = gts_controlBuilder.createDropdown(
        settingKeysPremium.guildPackSorting,
        guildPackSorting[2].value,
        guildPackSorting,
        "name",
        "value",
      );
      e.appendChild(
        this.createRow(
          "Guild package sorting".gts_translate(),
          [X],
          null,
          null,
          "hide guild-market-config",
        ),
      );
      var V = this.createInput(null, "checkbox");
      (V.checked = storageIsOptionEnabled(
        settingKeysPremium.autoPutGoldPackBackToGM,
        !0,
      )),
        jQuery(V).on("change", function () {
          storageSetOption(
            settingKeysPremium.autoPutGoldPackBackToGM,
            this.checked,
          );
        });
      var Y = this.createElement("select"),
        $ = storageGetOption(
          settingKeysPremium.packDuration,
          marketDuration.twoHours,
        ),
        z = { 1: 2, 2: 8, 3: 24 };
      for (var Z in z) {
        var ee = z[Z];
        ((Ue = t.createElement(
          "option",
          null,
          null,
          "{numberOfHours} hours".gts_translate({ numberOfHours: ee }),
        )).value = Z),
          (Ue.selected = t.isEqual(Z, $)),
          Y.appendChild(Ue);
      }
      jQuery(Y).on("change", function () {
        var e = t.getSelectedValue(this);
        null != e && storageSetOption(settingKeysPremium.packDuration, e);
      });
      var te = this.createElement("ul", null, "gold-packs"),
        ne = storageGetJsonOption(settingKeysPremium.boughtGoldPacks);
      for (Z = 0; Z < ne.length; Z++)
        ((e) => {
          var t = this.createElement("li");
          let n = { itemName: e.itemName, playerName: e.seller };
          var i = "Bot bought {itemName} from {playerName}".gts_translate(n),
            o = this.createElement(
              "span",
              null,
              "failed",
              "Failed".gts_translate(),
            );
          gts_faketoolsUtility.showTooltip(o, [
            { text: e.errorMessage, color: "#ff0000" },
          ]);
          var r = this.createElement("span", null, null, i),
            a = this.createElement("span", null, "gold-amount", e.packAmount),
            s = this.createElement("i", null, "icon_gold"),
            l = this.createElement("a", null, "remove", "remove");
          (l.onclick = () => {
            t.remove();
            var n = storageGetJsonOption(settingKeysPremium.boughtGoldPacks);
            (n = n.filter(function (t) {
              return t && t.id != e.id;
            })),
              storageSetOption(
                settingKeysPremium.boughtGoldPacks,
                JSON.stringify(n),
              );
          }),
            a.appendChild(s),
            e.isError && t.appendChild(o),
            t.appendChild(a),
            t.appendChild(r),
            t.appendChild(l),
            te.appendChild(t);
        })(ne[Z]);
      if (0 == ne.length) {
        var ie = this.createElement("li", null, "no-bought-pack");
        (ie.textContent =
          "There is no pack need to put back in Guild Market".gts_translate()),
          te.appendChild(ie);
      }
      var oe = this.createRow(
        "Packs bought from Guild Market".gts_translate(),
        [
          V,
          document.createTextNode(
            "Enable this option for auto put all gold packs in queue below to Guild Market with selected duration".gts_translate(),
          ),
          Y,
          te,
        ],
        null,
        null,
        "hide guild-market-config",
      );
      e.appendChild(oe);
      var re = this.createInput(null, "checkbox");
      (re.checked =
        "true" ===
        storageGetOption(settingKeysPremium.autoRepackExpiringItem, "true")),
        jQuery(e).toggleClass("repack-enabled", re.checked),
        jQuery(re).on("change", function () {
          storageSetOption(
            settingKeysPremium.autoRepackExpiringItem,
            this.checked,
          ),
            storageSetOption(settingKeysPremium.timeToTriggerAutoRepack, "0"),
            jQuery(e).toggleClass("repack-enabled", this.checked);
        });
      var ae = this.createElement("select"),
        se = storageGetOption(settingKeysPremium.dayLeftShouldRepack, 4);
      for (var le of [1, 2, 3, 4]) {
        ((Ue = t.createElement(
          "option",
          null,
          null,
          1 == le
            ? "1 day".gts_translate()
            : "{numberOfDay} days".gts_translate({ numberOfDay: le }),
        )).value = le),
          (Ue.selected = t.isEqual(le, se)),
          ae.appendChild(Ue);
      }
      jQuery(ae).on("change", function () {
        var e = t.getSelectedValue(this);
        null != e &&
          storageSetOption(settingKeysPremium.dayLeftShouldRepack, e),
          storageSetOption(settingKeysPremium.timeToTriggerAutoRepack, "0");
      }),
        e.appendChild(
          this.createRow("Auto reset timer of expiring items".gts_translate(), [
            re,
            document.createTextNode(
              "By enable this option, the Bot will sell upcoming expired items from Packages to Guild Market with 2 gold and cancel to reset expiration time. It requires player must in a Guild and the items cooldown less than".gts_translate(),
            ),
            ae,
          ]),
        );
      var ue = gts_faketoolsUtility.unique(
          storageGetOption(
            settingKeysPremium.selectedItemTypeForRepack,
            defaultSelectedItemTypeForRepack,
          )
            .split(",")
            .filter((e) => e),
        ),
        ge = this.createElement("ul", null, "repack-item-types");
      for (var de of itemTypes)
        if (de.value != goldItemType) {
          var ce = document.createElement("li"),
            me = document.createElement("input");
          ce.appendChild(me),
            (me.type = "checkbox"),
            (me.checked = ue.indexOf(de.value) > -1),
            (me.id = "chkRepack" + de.name.replace(" ", "")),
            (function (e) {
              jQuery(me).on("click", function () {
                var t = gts_faketoolsUtility.unique(
                  storageGetOption(
                    settingKeysPremium.selectedItemTypeForRepack,
                    defaultSelectedItemTypeForRepack,
                  )
                    .split(",")
                    .filter((e) => e)
                    .map((e) => parseInt(e)),
                );
                this.checked ? t.push(e) : t.splice(t.indexOf(e), 1),
                  storageSetOption(
                    settingKeysPremium.selectedItemTypeForRepack,
                    t,
                  ),
                  storageSetOption(
                    settingKeysPremium.timeToTriggerAutoRepack,
                    "0",
                  );
              });
            })(parseInt(de.value));
          var pe = document.createElement("label");
          (pe.htmlFor = me.id),
            (pe.textContent = de.name),
            ce.appendChild(pe),
            ge.appendChild(ce);
        }
      var ye = storageGetOption(
          settingKeysPremium.selectedItemQualityForRepack,
          defaultSelectedItemQualityForRepack,
        )
          .split(",")
          .filter((e) => e),
        fe = this.createElement("ul", null, "repack-item-types");
      for (let e of itemQualities)
        if (!(e.value < 2)) {
          var he = document.createElement("li"),
            ve = document.createElement("input");
          he.appendChild(ve),
            (ve.type = "checkbox"),
            (ve.checked = ye.indexOf(e.value) > -1),
            (ve.id = "chkRepack_Quality_" + e.name.replace(" ", "")),
            (function (e) {
              jQuery(ve).on("click", function () {
                var t = storageGetOption(
                  settingKeysPremium.selectedItemQualityForRepack,
                  defaultSelectedItemQualityForRepack,
                )
                  .split(",")
                  .filter(function (e) {
                    return e;
                  })
                  .map(function (e) {
                    return parseInt(e);
                  });
                this.checked ? t.push(e) : (t = t.filter((t) => t != e)),
                  storageSetOption(
                    settingKeysPremium.selectedItemQualityForRepack,
                    t,
                  ),
                  storageSetOption(
                    settingKeysPremium.timeToTriggerAutoRepack,
                    "0",
                  );
              });
            })(e.value);
          var _e = document.createElement("label");
          (_e.htmlFor = ve.id),
            (_e.textContent = e.name),
            he.appendChild(_e),
            fe.appendChild(he);
        }
      var we =
          "true" ==
          storageGetOption(
            settingKeysPremium.shouldRepackUnderworldItems,
            "true",
          ),
        be = document.createElement("li"),
        ke = document.createElement("input");
      be.appendChild(ke),
        (ke.type = "checkbox"),
        (ke.checked = we),
        (ke.id = "chkRepack_UnderworldItems"),
        jQuery(ke).on("click", function () {
          storageSetOption(
            settingKeysPremium.shouldRepackUnderworldItems,
            this.checked,
          ),
            storageSetOption(settingKeysPremium.timeToTriggerAutoRepack, "0");
        });
      var Oe = document.createElement("label");
      (Oe.htmlFor = ke.id),
        (Oe.textContent = "Underworld Items".gts_translate()),
        be.appendChild(Oe),
        fe.appendChild(be);
      var Ie = document.createElement("li");
      let Ce = gts_controlBuilder.createToggle(
        settingKeysPremium.shouldRepackItemHasUnknownScroll,
        "Has unknown scroll".gts_translate(),
        !1,
        () => storageSetOption(settingKeysPremium.timeToTriggerAutoRepack, "0"),
      );
      if (
        (Ie.appendChild(Ce[0]),
        Ie.appendChild(Ce[1]),
        fe.appendChild(Ie),
        e.appendChild(
          this.createRow(
            "Item types should repack".gts_translate(),
            [ge, fe],
            null,
            null,
            "hide repack-item-types-row",
          ),
        ),
        gts_faketoolsUtility.getPlayerLevel() > 4)
      ) {
        var Se = (t) => {
          jQuery(e).toggleClass("auto-repair-on", t);
        };
        e.appendChild(
          this.createRowHeader("Auto repairing items".gts_translate()),
        );
        var xe = storageGetOption(settingKeysPremium.autoRepairItem, "");
        ("true" != xe && "false" != xe) ||
          ((xe = "true" == xe ? "1,2" : ""),
          storageSetOption(settingKeysPremium.autoRepairItem, xe));
        var Te = gts_controlBuilder.createCheckboxList(
          "chkAutoRepairItem",
          dolls,
          "name",
          "value",
          null,
          settingKeysPremium.autoRepairItem,
          () => {
            Se(
              storageGetOption(settingKeysPremium.autoRepairItem, "").length >
                0,
            );
          },
        );
        Se(xe.length > 0),
          e.appendChild(
            this.createRow("Auto repair item".gts_translate(), [Te]),
          );
        var Ke = this.createElement("select");
        e.appendChild(
          this.createRow(
            "Repair when conditioning below x%".gts_translate(),
            [Ke],
            null,
            null,
            "hide auto-repair-config",
          ),
        );
        var Ae = storageGetOption(
          settingKeysPremium.repairConditioningThrehold,
          "10",
        );
        "0" == Ae &&
          ((Ae = "1"),
          storageSetOption(settingKeysPremium.repairConditioningThrehold, Ae));
        for (Z = 0; Z <= 50; Z += 10) {
          let e = 0 == Z ? Z + 1 : Z;
          var Ue;
          ((Ue = this.createElement("option", null, null, e + "%")).value = e),
            (Ue.selected = this.isEqual(e, Ae)),
            Ke.appendChild(Ue);
        }
        jQuery(Ke).on("change", function () {
          null != (Ae = gts_main.getSelectedValue(this)) &&
            storageSetOption(settingKeysPremium.repairConditioningThrehold, Ae);
        });
        var Pe,
          Ee = storageGetJsonOption(settingKeysGeneral.materialNames),
          Ge = [],
          De = storageGetJsonOption(
            settingKeysPremium.ignoreMaterials,
            JSON.parse(defaultIgnoreUWMaterials),
          );
        for (var Ne in Ee)
          Ge.push({ text: Ee[Ne], value: Ne, icon: !0 }),
            !Pe && De.indexOf(parseInt(Ne)) < 0 && (Pe = Ne);
        var Fe = gts_faketoolsUtility.buildDropDown(Ge, Pe, (e) => {
            Pe = e.value;
          }),
          Be = this.createElement("ul", null, "ignore-materials"),
          Me = gts_faketools.dom.createButton(
            "Add to ignore list".gts_translate(),
            () => {
              var e = storageGetJsonOption(
                settingKeysPremium.ignoreMaterials,
                JSON.parse(defaultIgnoreUWMaterials),
              );
              e.push(parseInt(Pe)),
                e.sort((e, t) => e - t),
                storageSetOption(
                  settingKeysPremium.ignoreMaterials,
                  JSON.stringify(gts_faketools.array.unique(e)),
                ),
                qe(Be);
            },
          );
        Me.className += " ml-5";
        var qe = (e) => {
          t.removeChildren(e);
          var n = storageGetJsonOption(
            settingKeysPremium.ignoreMaterials,
            JSON.parse(defaultIgnoreUWMaterials),
          );
          for (var i of n) {
            var o = Ee[i];
            o &&
              (function (n, i) {
                var o = t.buildPlayerItem(n, function (e) {
                  jQuery(o).prev().focus(),
                    o.remove(),
                    jQuery(".dropdown-item .item-i-18-" + i)
                      .parent()
                      .show();
                  var t = storageGetJsonOption(
                    settingKeysPremium.ignoreMaterials,
                  );
                  (t = t.filter(function (e) {
                    return e != i && e;
                  })).sort(),
                    storageSetOption(
                      settingKeysPremium.ignoreMaterials,
                      JSON.stringify(gts_faketools.array.unique(t)),
                    ),
                    e.stopPropagation();
                });
                e.appendChild(o);
              })(o, i);
          }
          setTimeout(() => {
            for (var e of (jQuery(".dropdown-item").show(), n))
              jQuery(".dropdown-item .item-i-18-" + e)
                .parent()
                .hide();
          }, 100);
        };
        qe(Be),
          e.appendChild(
            this.createRow(
              "Repair item without using listed materials".gts_translate(),
              [Fe, Me, Be],
              null,
              null,
              "",
            ),
          );
        let n = gts_controlBuilder.createDropdown(
          settingKeys.workbench.maxQuality,
          1,
          itemQualities,
          "name",
          "value",
        );
        e.appendChild(
          this.createRow(
            "Max quality can be used for repairing".gts_translate(),
            [n],
          ),
        ),
          e.appendChild(
            this.createRowHeader(
              "Auto outbiding in Auction House ".gts_translate(),
            ),
          );
        var Re = itemFilterTypes.strength,
          je = gts_faketoolsUtility.buildDropDown(
            auctionHouseFilterConditions,
            Re,
            (e) => {
              (Re = e.value),
                jQuery(Qe).toggle(e.value != itemFilterTypes.hasUnknownScroll);
            },
            "mr-5",
          ),
          Qe = this.createInput("", "textbox", "mr-5"),
          Le = this.createElement("ul", null, "auction-item-filters"),
          He = this.createElement("label", "", "color-red"),
          We = () => {
            storageSetOption(settingKeysPremium.nextTimeCheckAuctionHouse, 0),
              storageSetOption(
                settingKeysPremium.nextTimeCheckAuctionHouse2,
                0,
              );
          },
          Je = gts_faketools.dom.createButton(
            "Add Filter".gts_translate(),
            () => {
              var e = auctionHouseFilterConditions.filter(
                (e) => e.value == Re,
              )[0];
              if (Re != itemFilterTypes.hasUnknownScroll) {
                var t = (function (e, t) {
                  return mercenaryFilterTypes.indexOf(e.value) > -1
                    ? Number.isInteger(parseInt(t))
                      ? ""
                      : "Filter value should be a number".gts_translate()
                    : "";
                })(e, Qe.value);
                if (((He.textContent = t), t)) return;
              }
              var n = storageGetJsonOption(
                  settingKeysPremium.auctionHouseItemFilters,
                ),
                i = n.find((t) => t.condition.value == e.value);
              i &&
              (mercenaryFilterTypes.indexOf(e.value) > -1 ||
                e.value == itemFilterTypes.damage)
                ? (i.value = Qe.value)
                : (i &&
                    i.condition.value == itemFilterTypes.hasUnknownScroll) ||
                  n.push({
                    condition: e,
                    value: Qe.value.toLowerCase(),
                    id: gts_faketoolsUtility.randomId(),
                  }),
                storageSetOption(
                  settingKeysPremium.auctionHouseItemFilters,
                  JSON.stringify(gts_faketools.array.unique(n)),
                ),
                Xe(Le, settingKeysPremium.auctionHouseItemFilters, We),
                We();
            },
          ),
          Xe = (e, n, i) => {
            t.removeChildren(e);
            var o = storageGetJsonOption(n);
            for (var r of o)
              !(function (o) {
                var r =
                  [
                    itemFilterTypes.itemName,
                    itemFilterTypes.itemNameWord,
                  ].indexOf(o.condition.value) < 0
                    ? o.value
                    : `"${o.value}"`;
                let a = auctionHouseFilterConditions.find(
                  (e) => e.value == o.condition.value,
                );
                var s = `${(a && a.text) || o.condition.text} <b style="color: red;">${r}</b>`,
                  l = t.buildPlayerItem(s, (e) => {
                    jQuery(l).prev().focus(), l.remove();
                    var t = storageGetJsonOption(n);
                    (t = t.filter((e) => e.id != o.id && e)),
                      storageSetOption(n, JSON.stringify(t)),
                      e.stopPropagation(),
                      i && i(o.id, t.length);
                  });
                e.appendChild(l);
              })(r);
          };
        Xe(Le, settingKeysPremium.auctionHouseItemFilters, We);
        var Ve = this.createInput("chkAutoBidMatchedItem", "checkbox");
        (Ve.checked =
          "true" ===
          storageGetOption(settingKeysPremium.autoBidMatchedItem, "true")),
          jQuery(Ve).on("change", function () {
            storageSetOption(
              settingKeysPremium.autoBidMatchedItem,
              this.checked,
            ),
              !this.checked &&
                storageSetOption(
                  settingKeys.auction.isOutbidingInVeryShort,
                  !1,
                );
          });
        var Ye = this.createElement(
          "label",
          null,
          null,
          "Auto bid matched items".gts_translate(),
        );
        (Ye.htmlFor = Ve.id),
          storageGetOption(
            settingKeysPremium.itemTypesForAHFiltering,
            "1,2,3,4,5,6,8,9,15",
          );
        var $e = gts_controlBuilder.createCheckboxList(
          "chkItemTypeForAHFiltering",
          itemTypesForAuctionHouseFiltering,
          "name",
          "value",
          null,
          settingKeysPremium.itemTypesForAHFiltering,
          We,
        );
        e.appendChild(
          this.createRow(
            "Auction house item filters".gts_translate(),
            [je, Qe, Je, He, Ve, Ye, Le, $e],
            null,
            null,
          ),
        );
        let i = gts_controlBuilder.createToggle(
          settingKeysAuction.onlyOutbidOthersInVeryShort,
          "Only outbid other players in very short".gts_translate(),
        );
        var ze = gts_controlBuilder.createDropdown(
          settingKeysAuction.outbidDuration,
          auctionState.short,
          auctionStateOptions,
          "text",
          "value",
        );
        e.appendChild(
          this.createRow("Auction bidding duration".gts_translate(), [
            ze,
            ...i,
          ]),
        );
        var Ze = gts_controlBuilder.createInput(
          settingKeysAuction.maxOutbidItemPrice,
          "textbox",
          5e4,
          "input-gold",
        );
        if (
          (e.appendChild(
            this.createRow(
              "Max bidding item price".gts_translate(),
              [Ze, iconGold()],
              null,
              null,
              "",
            ),
          ),
          playerLevel > 4)
        ) {
          var et = this.createInput(null, "checkbox");
          (et.checked =
            "true" ===
            storageGetOption(settingKeysHealth.autoBuyFood, "false")),
            jQuery(et).on("change", function () {
              storageSetOption(settingKeysHealth.autoBuyFood, this.checked),
                storageSetOption(
                  settingKeysHealth.checkingAvailableFoodTimer,
                  0,
                );
            });
          var tt = [et],
            nt = this.createElement(
              "span",
              null,
              null,
              "Buy any food which has ratio of life points per gold greater than".gts_translate(),
            ),
            it = this.createInput(null, "textbox");
          (it.className = "gts-input-small"),
            (it.value = storageGetOption(
              settingKeysHealth.goldPerLifePointRatio,
              "4",
            )),
            jQuery(it).on("change", function () {
              storageSetOption(
                settingKeysHealth.goldPerLifePointRatio,
                this.value,
              );
            });
          let t = jQuery("<div>").append(
            gts_controlBuilder.createToggle(
              settingKeys.health.ignoreLargeFood,
              "Only buy small size food".gts_translate(),
              !0,
            ),
          );
          tt.push(nt), tt.push(it), tt.push(t[0]);
          var ot = this.createRow(
            "Auto buying food in Auction House".gts_translate(),
            tt,
          );
          e.appendChild(ot);
        }
        e.appendChild(this.createRowHeader("Auto smelting".gts_translate()));
        let o = jQuery('<ul class="smelting-rules">'),
          r = storageGetJsonOption(settingKeysPremium.smeltingRules, []),
          a = itemTypeWithIcons
            .filter((e) => itemTypesForSmelting.indexOf(e.value) >= 0)
            .reduce((e, t) => ((e[t.value] = !0), e), {}),
          s = qualityFilterConditions
            .filter((e) => e.value < itemQuality.orange)
            .reduce((e, t) => ((e[t.value] = !0), e), {}),
          l = {
            mainFilterProp: itemFilterTypes.itemName,
            mainFilterValue: "",
            qualities: s,
            isActive: !0,
            hasUnknownScroll: void 0,
            selectedItemTypes: a,
          },
          u = (e, t, n) => {
            let i = jQuery('<li class="smelting-rule">'),
              o = jQuery('<div class="main-smelting-rule-row">'),
              r = jQuery('<div class="item-types-smelting-rule-row">'),
              a = gts_controlBuilder.createRawToggle(
                "",
                e.isActive,
                "",
                (n) => {
                  (e.isActive = n), t(e);
                },
              );
            gts_faketoolsUtility.showTooltip(a, [
              {
                text: "Turn on to active this rule".gts_translate(),
                color: "#00ff00",
              },
            ]);
            let s = gts_faketoolsUtility.buildDropDown(
                autoSmeltingFilterConditions,
                e.mainFilterProp,
                (n) => {
                  e.mainFilterProp = n.value;
                  let i = gts_BoolOperators.indexOf(e.mainFilterProp) > -1;
                  i && (e.mainFilterValue = ""),
                    jQuery(l)[i ? "hide" : "show"](),
                    t(e);
                },
              ),
              l = gts_controlBuilder._createInput(
                null,
                "textbox",
                "main-filter-value",
                e.mainFilterValue,
                (n) => {
                  (e.mainFilterValue = n), t(e);
                },
              );
            jQuery(l)[
              gts_BoolOperators.indexOf(e.mainFilterProp) > -1 ? "hide" : "show"
            ]();
            var u = gts_faketoolsUtility.buildDropDown(
              hasUnknownScrollFilters,
              e.hasUnknownScroll,
              (n) => {
                (e.hasUnknownScroll = n.value), t(e);
              },
            );
            let g = gts_controlBuilder.createLabel("Level <="),
              d = gts_controlBuilder._createInput(
                null,
                "number",
                "input-gold",
                e.level,
                (n) => {
                  (e.level = n), t(e);
                },
              );
            d.min = 1;
            var c = gts_controlBuilder._createElement(
              "span",
              null,
              "btn-delete",
              "x",
            );
            gts_faketoolsUtility.showTooltip(c, [
              { text: "Remove this rule".gts_translate(), color: "#00ff00" },
            ]),
              jQuery(c).on("click", () => {
                i.remove(), n(e);
              }),
              o
                .append(a)
                .append(s)
                .append(l)
                .append(u)
                .append(g)
                .append(d)
                .append(c),
              itemTypeWithIcons
                .filter((e) => itemTypesForSmelting.indexOf(e.value) >= 0)
                .map((n) => {
                  let i = jQuery(
                    `<span class="item-type"><i class="item-type-icon ${n.icon}"></i></span>`,
                  );
                  (e.selectedItemTypes = e.selectedItemTypes || {}),
                    i.toggleClass("active", !!e.selectedItemTypes[n.value]),
                    gts_faketoolsUtility.showTooltip(i[0], [
                      { text: n.tooltip, color: "#00ff00" },
                    ]),
                    ((n, i) =>
                      i.on("click", () => {
                        let o = e.selectedItemTypes || {},
                          r = !o[n.value],
                          a =
                            1 ==
                            itemTypeWithIcons.filter((e) => o[e.value]).length;
                        (!r && a) ||
                          ((o[n.value] = r),
                          (e.selectedItemTypes = o),
                          i.toggleClass("active", r),
                          t(e));
                      }))(n, i),
                    r.append(i);
                });
            let m = jQuery('<span class="item-type separator"></span>');
            return (
              r.append(m),
              qualityFilterConditions.map((n) => {
                let i = jQuery(
                  `<span class="item-type with-quality"><span class="quality" style="background-color: ${n.color}"></span></span>`,
                );
                (e.qualities = e.qualities || {}),
                  i.toggleClass("active", !!e.qualities[n.value]),
                  ((n, i) =>
                    i.on("click", () => {
                      let o = e.qualities || {},
                        r = !o[n.value],
                        a =
                          1 ==
                          qualityFilterConditions.filter((e) => o[e.value])
                            .length;
                      (!r && a) ||
                        ((o[n.value] = r),
                        (e.qualities = o),
                        i.toggleClass("active", r),
                        t(e));
                    }))(n, i),
                  r.append(i);
              }),
              r.append(m.clone()),
              hammerQualities.map((n) => {
                let i = jQuery(
                  `<span class="item-type"><i class="item-type-icon ${n.icon}"></i></span>`,
                );
                (e.selectedHammerTypes = e.selectedHammerTypes || {}),
                  i.toggleClass("active", !!e.selectedHammerTypes[n.value]),
                  gts_faketoolsUtility.showTooltip(i[0], [
                    { text: n.tooltip, color: "#00ff00" },
                  ]),
                  ((n, i) =>
                    i.on("click", () => {
                      let o = e.selectedHammerTypes || {},
                        r = !o[n.value],
                        a =
                          1 ==
                          itemTypeWithIcons.filter((e) => o[e.value]).length;
                      (!r && a) ||
                        ((o[n.value] = r),
                        (e.selectedHammerTypes = o),
                        i.toggleClass("active", r),
                        t(e));
                    }))(n, i),
                  r.append(i);
              }),
              i.append(o).append(r),
              i
            );
          },
          g = () => {
            let e = jQuery('<li class="smelting-rule emtpy">');
            return (
              e.text(
                "Please add at least one active rule for auto smelting.".gts_translate(),
              ),
              e
            );
          },
          d = (e, t) => {
            o.empty(),
              0 == e.length
                ? o.append(g())
                : e.map((n) => {
                    o.append(
                      u(n, t, (n) => {
                        var i = e.findIndex(
                          (e) => e.id == n.id || null == e.id,
                        );
                        i > -1 && e.splice(i, 1), t(n);
                      }),
                    );
                  });
          },
          c = (e) => {
            d(e, (t, n) => {
              if (t && !n) {
                let e = storageGetJsonOption(
                  settingKeys.smeltery.itemsForSmelt,
                );
                storageSetJsonOption(
                  settingKeys.smeltery.itemsForSmelt,
                  e.filter((e) => e.ruleId != t.id),
                );
              }
              storageSetJsonOption(
                settingKeysPremium.smeltingRules,
                e.sort((e, t) =>
                  e.isActive && !t.isActive
                    ? -1
                    : !e.isActive && t.isActive
                      ? 1
                      : 0,
                ),
              ),
                t.isActive &&
                  !n &&
                  gts_faketoolsUtility.resetAutoSmeltingState(),
                0 == e.length && (o.empty(), o.append(g()));
            });
          };
        c(r);
        let m = gts_controlBuilder.createButton(
          "New Rule".gts_translate(),
          () => {
            let e = jQuery.extend(
              !0,
              { id: gts_faketoolsUtility.randomId() },
              l,
            );
            r.push(e),
              storageSetJsonOption(settingKeysPremium.smeltingRules, r),
              storageSetOption(
                settingKeysPremium.nextTimeCheckItemForSmelting,
                0,
              ),
              c(r),
              (o[0].scrollTop = o[0].scrollHeight);
          },
        );
        e.appendChild(
          this.createRow("Auto smelting item filters".gts_translate(), [
            o[0],
            m,
          ]),
        );
        let p = gts_controlBuilder.createCheckboxList(
          "chkSmeltingInventory",
          bagData,
          "name",
          "value",
          "",
          settingKeysPremium.inventoriesForAutoSmelting,
          () => {
            storageSetOption(settingKeysSmeltery.nextTryForSmelt, 0);
          },
        );
        e.appendChild(
          this.createRow("Auto smelting inventory".gts_translate(), [p]),
        );
      }
      var rt = gts_controlBuilder.createToggle(
        settingKeysPremium.repairBeforeSmelt,
        "",
      );
      e.appendChild(
        this.createRow("Repair before smelt item".gts_translate(), [rt]),
      );
      var at = gts_controlBuilder.createToggle(
        settingKeysPremium.storeResourcesAfterSmelted,
        "",
        !0,
      );
      e.appendChild(
        this.createRow("Store smelted resources".gts_translate(), [at]),
      );
      var st = gts_controlBuilder.createToggle(
        settingKeysPremium.storeResourcesEveryHour,
        "",
        !1,
        () => storageSetNextTime(settingKeysPremium.storeResourcesTime, 0),
      );
      e.appendChild(
        this.createRow("Store resources every hour".gts_translate(), [st]),
      );
      let lt = gts_controlBuilder.createCheckboxList(
        "chkAutoUseBoostType",
        boostItemTypes,
        "text",
        "value",
        null,
        settingKeysPremium.autoUseBoostItems,
        (e) => {
          (e = e.map((e) => parseInt(e))).includes(
            boostItemTypeValues.damage,
          ) &&
            storageSetOption(settingKeysPremium.smallGrindstoneExpiredTime, 0),
            e.includes(boostItemTypeValues.healPoint) &&
              storageSetJsonOption(
                settingKeysPremium.healPointBoostExpiredTime,
                defaultHealPointBoostExpiredTime,
              );
        },
      );
      e.appendChild(
        this.createRowHeader(
          "Auto boosting Arena's statistics and equipments".gts_translate(),
        ),
      );
      let ut = gts_controlBuilder.createCheckboxList(
        gts_faketoolsUtility.makeUid,
        usingBoostConditions,
        "text",
        "value",
        null,
        settingKeysPremium.selectedUsingBoostConditions,
      );
      e.appendChild(this.createRow("Using boosts when".gts_translate(), [ut])),
        e.appendChild(
          this.createRow("Boosting category".gts_translate(), [lt]),
        );
      let gt = gts_controlBuilder.createDropdown(
          settingKeysPremium.jewelleryOilBoost,
          0,
          jewelleryBoostOilOptions,
          "text",
          "value",
          () => {
            storageSetJsonOption(
              settingKeysPremium.jewelleryOilBoostExpiredTime,
              defaultJewelleryBoostExpiredTime,
            );
          },
        ),
        dt = gts_controlBuilder.createCheckboxList(
          void 0,
          bagData,
          "name",
          "value",
          "",
          settingKeysPremium.jewelleryOilLookupBag,
          () => {
            storageSetJsonOption(
              settingKeysPremium.jewelleryOilBoostExpiredTime,
              defaultJewelleryBoostExpiredTime,
            );
          },
        ),
        ct = gts_controlBuilder.createLabel(
          "Bot will try to lookup and use the suitable God oils in the selected inventory below".gts_translate(),
          "new-line",
        );
      e.appendChild(
        this.createRow(
          "Boost God oils on jewellery".gts_translate(),
          [gt, ct, dt],
          null,
          null,
          null,
        ),
      );
      var mt = [
          {
            type: "minerva",
            imageUrl: "../cdn/img//ui/gods/minerva_s16.png",
            tooltip: "Blessing Intelligence".gts_translate(),
          },
          {
            type: "diana",
            imageUrl: "../cdn/img//ui/gods/diana_s16.png",
            tooltip: "Blessing Armour".gts_translate(),
          },
          {
            type: "mars",
            imageUrl: "../cdn/img//ui/gods/mars_s16.png",
            tooltip: "Blessing Damage".gts_translate(),
          },
          {
            type: "merkur",
            imageUrl: "../cdn/img//ui/gods/merkur_s16.png",
            tooltip: "Blessing Charisma".gts_translate(),
          },
          {
            type: "apollo",
            imageUrl: "../cdn/img//ui/gods/apollo_s16.png",
            tooltip: "Blessing Agility".gts_translate(),
          },
          {
            type: "vulcanus",
            imageUrl: "../cdn/img//ui/gods/vulcanus_s16.png",
            tooltip: "Blessing Dexterity".gts_translate(),
          },
        ],
        pt = gts_controlBuilder.createCheckboxList(
          void 0,
          mt,
          null,
          "type",
          "god-oils",
          settingKeysPremium.godBlessingLevel1,
        );
      let yt = gts_controlBuilder.createDropdown(
          settingKeysPremium.godBlessingLevel1Until,
          60,
          pointPercents.filter((e) => e.value > 0),
          "name",
          "value",
          () => {
            storageSetNextTime(settingKeysPremium.godBlessingLevel1Cooldown, 0);
          },
        ),
        ft = gts_controlBuilder.createLabel(
          "If points >".gts_translate(),
          "margin-r-5",
        );
      e.appendChild(
        this.createRow("God blessing level 1".gts_translate(), [pt, ft, yt]),
      ),
        e.appendChild(
          this.createRowHeader("Searching items in shop".gts_translate()),
        );
      let ht = !1,
        vt = 0,
        _t = !1,
        wt = () => !ht,
        bt =
          "Used <b>{usedClothes}/{maxClothes}</b> clothes | <b>{remainingClothes}</b> remaining clothes".gts_translate(),
        kt = gts_controlBuilder.createLabel(""),
        Ot = jQuery(
          gts_controlBuilder._createElement("span", null, "loading hide"),
        );
      var It = jQuery(`#${shopItemsSectionId} .gts-items-section-content`)[0];
      let Ct = jQuery('<div class="search-result-message">')[0],
        St = getMethodFunc(gts_faketoolsUtility, 133),
        xt = gts_controlBuilder.createButton("Search".gts_translate(), () => {
          if ((ht = !ht)) {
            Ct.textContent = "";
            let e = (e, t, n) => {
                vt = t;
                let i = storageGetNumberOption(
                  settingKeysPremium.maxUsedClothesForSearchingShop,
                );
                (kt.innerHTML = bt
                  .replace("{usedClothes}", vt)
                  .replace("{maxClothes}", i)
                  .replace("{remainingClothes}", e)),
                  (0 == e || n) &&
                    ((ht = !1),
                    (xt.disabled = !0),
                    (xt.textContent = "Search Completed")),
                  storageSetJsonOption(
                    settingKeysPremium.shopHighQualityItems,
                    [],
                  ),
                  gts_main.buildHighQualityItemsInShop(It, []);
              },
              t = (e, t) => {
                (_t = e.length > 0),
                  storageSetJsonOption(
                    settingKeysPremium.shopHighQualityItems,
                    e,
                  ),
                  gts_main.buildHighQualityItemsInShop(It, e),
                  (ht = !1),
                  t || ((xt.disabled = !1), (xt.textContent = "Continue")),
                  Ot.toggleClass("hide", !0),
                  (Ct.textContent = `${e.length} item(s) found. Check the "Shop items" box to see the result.`);
              };
            (xt.textContent = "Stop"),
              St && St(_t, t, e, wt, vt),
              Ot.toggleClass("hide", !1);
          } else (_t = !1), (xt.textContent = "Stopping"), (xt.disabled = !0);
        }),
        Tt = itemTypeWithIcons
          .filter((e) => itemTypesForSearchingShop.indexOf(e.value) >= 0)
          .reduce((e, t) => ((e[t.value] = !0), e), {}),
        Kt = {
          mainFilterProp: itemFilterTypes.itemName,
          mainFilterValue: "",
          level: 1,
          quality: -1,
          isActive: !0,
          noRuby: !1,
          selectedItemTypes: Tt,
        },
        At = () => {
          (ht = !1),
            (vt = 0),
            (_t = !1),
            (xt.disabled = !1),
            (xt.textContent = "Search".gts_translate()),
            (kt.innerHTML = ""),
            gts_faketools.storage.setOption(
              settingKeys.premium.nextTimeCheckShopHighQualityItems,
              0,
            );
        },
        Ut = gts_controlBuilder.createButton("New Rule".gts_translate(), () => {
          let e = storageGetJsonOption(
              settingKeysPremium.rulesForSearchingShop,
            ),
            t = jQuery.extend(!0, { id: gts_faketoolsUtility.randomId() }, Kt);
          e.push(t),
            storageSetJsonOption(settingKeysPremium.rulesForSearchingShop, e),
            Rt(e),
            At();
        }),
        Pt = jQuery('<div class="search-in-shop-actions">');
      Pt.append(Ut).append(xt).append(Ot).append(kt);
      let Et = jQuery('<div class="search-in-shop-settings">'),
        Gt = gts_controlBuilder.createLabel(
          "Number of clothes to use".gts_translate() + ": ",
        ),
        Dt = gts_controlBuilder.createNumberInput(
          settingKeysPremium.maxUsedClothesForSearchingShop,
          0,
        );
      Et.append(Gt).append(Dt);
      let Nt = (e, t, n) => {
          let i = jQuery('<li class="search-in-shop-rule">'),
            o = jQuery('<div class="main-shop-filter-row">'),
            r = jQuery('<div class="item-types-shop-filter-row">'),
            a = gts_controlBuilder.createRawToggle("", e.isActive, "", (n) => {
              (e.isActive = n), t(e);
            });
          gts_faketoolsUtility.showTooltip(a, [
            {
              text: "Turn on to active this rule".gts_translate(),
              color: "#00ff00",
            },
          ]);
          var s = gts_faketoolsUtility.buildDropDown(
            shopFilterConditions,
            e.mainFilterProp,
            (n) => {
              if (
                ((e.mainFilterProp = n.value),
                mercenaryFilterTypes.indexOf(e.mainFilterProp) > -1)
              ) {
                let t = {};
                (t[itemTypeValues.mercenary] = !0), (e.selectedItemTypes = t);
                var i = r.find(".item-type");
                i.removeClass("active"),
                  jQuery(i[i.length - 1]).addClass("active");
              }
              t(e);
            },
          );
          let l = gts_controlBuilder._createInput(
              null,
              "textbox",
              "main-filter-value",
              e.mainFilterValue,
              (n) => {
                (e.mainFilterValue = n), t(e);
              },
            ),
            u = gts_controlBuilder.createLabel("Level >=".gts_translate()),
            g = gts_controlBuilder._createInput(
              null,
              "number",
              "input-gold",
              e.level,
              (n) => {
                (e.level = n), t(e);
              },
            );
          g.min = 1;
          let d = gts_controlBuilder.createLabel("Quality >=".gts_translate());
          var c = gts_faketoolsUtility.buildDropDown(
              qualityFilterConditions,
              e.quality,
              (n) => {
                (e.quality = n.value), t(e);
              },
              "dropdown-color",
            ),
            m = gts_controlBuilder.createRawToggle(
              "No rubies".gts_translate(),
              e.noRuby,
              "",
              (n) => {
                (e.noRuby = n), t(e);
              },
            ),
            p = gts_controlBuilder._createElement(
              "span",
              null,
              "btn-delete",
              "x",
            );
          gts_faketoolsUtility.showTooltip(p, [
            { text: "Remove this rule".gts_translate(), color: "#00ff00" },
          ]),
            jQuery(p).on("click", () => {
              i.remove(), n(e);
            }),
            o
              .append(a)
              .append(s)
              .append(l)
              .append(u)
              .append(g)
              .append(d)
              .append(c)
              .append(m)
              .append(p);
          jQuery('<span class="item-type separator"></span>');
          return (
            itemTypeWithIcons
              .filter((e) => itemTypesForSearchingShop.indexOf(e.value) >= 0)
              .map((n) => {
                let i = jQuery(
                  `<span class="item-type"><i class="item-type-icon ${n.icon}"></i></span>`,
                );
                (e.selectedItemTypes = e.selectedItemTypes || {}),
                  i.toggleClass("active", !!e.selectedItemTypes[n.value]),
                  gts_faketoolsUtility.showTooltip(i[0], [
                    { text: n.tooltip, color: "#00ff00" },
                  ]),
                  ((n, i) =>
                    i.on("click", () => {
                      let o = e.selectedItemTypes || {},
                        r = !o[n.value],
                        a =
                          1 ==
                          itemTypeWithIcons.filter((e) => o[e.value]).length;
                      (!r && a) ||
                        ((o[n.value] = r),
                        (e.selectedItemTypes = o),
                        i.toggleClass("active", r),
                        t(e));
                    }))(n, i),
                  r.append(i);
              }),
            i.append(o).append(r),
            i
          );
        },
        Ft = () => {
          let e = jQuery('<li class="search-in-shop-rule emtpy">');
          return e.text("Add at least one rule to search item in shop."), e;
        },
        Bt = jQuery.extend(!0, { id: gts_faketoolsUtility.randomId() }, Kt, {
          quality: 2,
        }),
        Mt = storageGetJsonOption(settingKeysPremium.rulesForSearchingShop, [
          Bt,
        ]);
      xt.disabled = !Mt.some((e) => e.isActive);
      let qt = jQuery('<ul class="search-in-shop-rules">'),
        Rt = (e) => {
          ((e, t) => {
            if ((qt.empty(), 0 == e.length)) qt.append(Ft());
            else
              for (let n of e) {
                let i = Nt(n, t, (n) => {
                  var i = e.findIndex((e) => e.id == n.id || null == e.id);
                  i > -1 && e.splice(i, 1), t();
                });
                qt.append(i);
              }
          })(e, () => {
            storageSetJsonOption(settingKeysPremium.rulesForSearchingShop, e),
              At(),
              (xt.disabled = !e.some((e) => e.isActive)),
              0 == e.length && (qt.empty(), qt.append(Ft()));
          });
        };
      Rt(Mt),
        e.appendChild(
          this.createRow("Search item in shop".gts_translate(), [
            Et[0],
            qt[0],
            Pt[0],
            Ct,
          ]),
        ),
        e.appendChild(this.createRowHeader("Auto war guild".gts_translate()));
      var jt = getMethodFunc(gts_gameApi.guild, 138),
        Qt = jt && (await jt());
      Qt || (Qt = { data: [] }),
        Qt.data.splice(0, 0, {
          name: `---${"Select guild to war".gts_translate()}---`,
          value: "",
        });
      let Lt = storageGetOption(settingKeysPremium.warGuild),
        Ht = gts_controlBuilder.createDropdown(
          settingKeysPremium.warGuild,
          null,
          Qt.data,
          "name",
          "value",
          () => {
            !Lt && storageSetNextTime(settingKeysPremium.warGuildTime, 0);
          },
        );
      (Ht.disabled = !Qt.hasPermission),
        !Qt.hasPermission &&
          gts_faketoolsUtility.showTooltip(Ht, [
            {
              text: "You do not have permission to perform war guild".gts_translate(),
              color: "#00ff00",
              width: 290,
            },
          ]),
        e.appendChild(this.createRow("Auto war guild".gts_translate(), [Ht]));
      let Wt = [...Array(13).keys()].map((e) => ({
          name:
            0 == e
              ? "No delay".gts_translate()
              : "from 1 to {numOfMinutes} minutes".gts_translate({
                  numOfMinutes: 5 * e,
                }),
          value: 5 * e,
        })),
        Jt = gts_controlBuilder.createDropdown(
          settingKeysPremium.warGuildDelay,
          0,
          Wt,
          "name",
          "value",
          (e) => {
            let t = parseInt(e),
              n =
                t > 0
                  ? gts_faketoolsUtility.random(1, t) * minuteInMillisecond
                  : 0;
            storageSetOption(settingKeysPremium.warGuildExtendTime, n);
          },
        );
      e.appendChild(
        this.createRow("War guild random delay".gts_translate(), [Jt]),
      );
      let Xt = storageGetNumberOption(settingKeysPremium.autoWorkPlace, -1),
        Vt = gts_controlBuilder.createDropdown(
          settingKeysPremium.autoWorkPlace,
          -1,
          gts_workPlaces,
          "name",
          "id",
          (e) => {
            let t = Yt(e),
              n = gts_workPlaces.find((t) => t.id == e);
            storageSetOption(settingKeysPremium.workDuration, n.min),
              gts_controlBuilder.createDropdownItems($t, 1, t, "name", "value");
          },
        ),
        Yt = (e) => {
          let t = gts_workPlaces.find((t) => t.id == e),
            n = t.min,
            i = t.max;
          return [...Array(i - n + 1).keys()]
            .map((e) => e + n)
            .map((e) => ({
              name:
                1 == e
                  ? "1 hour".gts_translate()
                  : "{numberOfHours} hours".gts_translate({ numberOfHours: e }),
              value: e,
            }));
        };
      e.appendChild(this.createRowHeader("Auto work".gts_translate()));
      let $t = gts_controlBuilder.createDropdown(
          settingKeysPremium.workDuration,
          1,
          Yt(Xt),
          "name",
          "value",
        ),
        zt = gts_controlBuilder.createLabel(
          "with duration".gts_translate(),
          "margin-r-5",
        ),
        Zt = gts_controlBuilder.createToggle(
          settingKeysPremium.donateBankBeforeWork,
        );
      if (
        (e.appendChild(
          this.createRow(
            "Auto work after run out of all points".gts_translate(),
            [Vt, zt, $t],
          ),
        ),
        e.appendChild(
          this.createRow(
            "Donate guild bank before go to work".gts_translate(),
            [Zt],
          ),
        ),
        e.appendChild(
          this.createRowHeader("Miscellaneous settings".gts_translate()),
        ),
        playerLevel >= 4)
      ) {
        var en = [
            {
              type: "minerva",
              imageUrl: "../cdn/img//ui/gods/minerva_s16.png",
              tooltip: "Charisma Oil".gts_translate(),
            },
            {
              type: "diana",
              imageUrl: "../cdn/img//ui/gods/diana_s16.png",
              tooltip: "Dexterity Oil".gts_translate(),
            },
            {
              type: "mars",
              imageUrl: "../cdn/img//ui/gods/mars_s16.png",
              tooltip: "Agility Oil".gts_translate(),
            },
            {
              type: "merkur",
              imageUrl: "../cdn/img//ui/gods/merkur_s16.png",
              tooltip: "Intelligence Oil".gts_translate(),
            },
            {
              type: "apollo",
              imageUrl: "../cdn/img//ui/gods/apollo_s16.png",
              tooltip: "Damage Oil".gts_translate(),
            },
            {
              type: "vulcanus",
              imageUrl: "../cdn/img//ui/gods/vulcanus_s16.png",
              tooltip: "Armour Oil".gts_translate(),
            },
          ],
          tn = gts_controlBuilder.createCheckboxList(
            "chkGodOil",
            en,
            null,
            "type",
            "god-oils",
            settingKeysPremium.autoCollectGodOils,
          );
        let t = gts_controlBuilder.createDropdown(
            settingKeysPremium.godPointPercent,
            80,
            pointPercents.filter((e) => e.value > 0),
            "name",
            "value",
            () => {
              storageSetOption(settingKeysPremium.nextTimeCheckGodOils, 0);
            },
          ),
          n = gts_controlBuilder.createLabel(
            "If points >".gts_translate(),
            "margin-r-5",
          );
        e.appendChild(
          this.createRow("Auto collect god oils".gts_translate(), [tn, n, t]),
        );
      }
      var nn = gts_controlBuilder.createToggle(
        settingKeysPremium.enableHighlightUnderworldItem,
        "",
        !0,
      );
      e.appendChild(
        this.createRow("Highlight underworld items".gts_translate(), [nn]),
      );
      var on = gts_controlBuilder.createToggle(
        settingKeysPremium.autoThrowDice,
        "",
        !0,
      );
      e.appendChild(
        this.createRow("Auto throw free dice".gts_translate(), [on]),
      );
      let rn = gts_controlBuilder.createDropdown(
        settingKeysPremium.extraLoot,
        2,
        extraLootOptions,
        "text",
        "value",
      );
      e.appendChild(this.createRow("Extra loot action".gts_translate(), [rn]));
      var an = gts_controlBuilder.createToggle(
          settingKeysPremium.autoStartStopEnabled,
          "Enabled".gts_translate(),
          !1,
          () => {
            let e = getMethodFunc(gts_main, 132);
            e && e();
          },
        ),
        sn = gts_controlBuilder.createToggle(
          settingKeysPremium.donateGuildBankBeforeStop,
          "Donate guild bank before stop".gts_translate(),
          !1,
        );
      let ln = () => {
          let e = {},
            t = [];
          jQuery("ul.start-stop-settings input").each((n, i) => {
            n % 2 == 0
              ? ((e = { start: i.value }), t.push(e))
              : (e.stop = i.value);
          }),
            storageSetOption(
              settingKeysPremium.autoStartStopSettings,
              JSON.stringify(t),
            );
          let n = getMethodFunc(gts_main, 132);
          n && n();
        },
        un = (e) => {
          let t = jQuery("<li>"),
            n = gts_controlBuilder.createLabel("Start at".gts_translate()),
            i = gts_controlBuilder.createLabel("Stop at".gts_translate()),
            o = gts_controlBuilder.createButton("x");
          ((e) => {
            jQuery(o).on("click", () => {
              e.remove(), ln();
            });
          })(t);
          let r = jQuery('<input type="time">');
          r.val(e.start), r.on("change", ln);
          let a = jQuery('<input type="time">');
          return (
            a.val(e.stop),
            a.on("change", ln),
            t.append(n),
            t.append(r),
            t.append(i),
            t.append(a),
            t.append(o),
            t
          );
        },
        gn = [{ start: "08:00", stop: "12:00" }],
        dn = gts_controlBuilder.createButton("+"),
        cn = (() => {
          let e = storageGetJsonOption(
              settingKeysPremium.autoStartStopSettings,
              gn,
            ),
            t = jQuery('<ul class="start-stop-settings">');
          for (let n of e) {
            let e = un(n);
            t.append(e);
          }
          return t;
        })();
      jQuery(dn).on("click", () => {
        let e = un(gn[0]);
        cn.append(e), ln();
      }),
        e.appendChild(
          this.createRow("Schedule start/stop".gts_translate(), [
            ...an,
            ...sn,
            cn[0],
            dn,
          ]),
        );
    },
    buildEventContent: function (e) {
      var t = this,
        n = [],
        i = parseInt((playerId + "").substr(0, 6));
      (function (e) {
        if (!e) return null;
        var t = splitInternal(e, "-");
        if (3 != t.length && 4 != t.length) return null;
        var o = substringInternal(t[0], 2),
          r = parseInt(substringInternal(t[0], 0, 2)),
          a = toDecimal(t[1], r),
          s = playerBaseNumber * i * (2 << shiftNumber);
        a != toDecimal(t[2], r) - s ||
          s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(o, r) ||
          (4 == t.length &&
            toDecimal(t[3], r) == s &&
            n.push((i * gts_main.server).toString(19)),
          new Date(a));
      })(
        storageGetOption(
          join4(reverse3(mix4(split3("xdIPOu7fkPOYRC3UdXjgHXldN"), 14))),
          "",
        ).trim(),
      ),
        getServerDate();
      var o = n.indexOf((i * gts_main.server).toString(19)) > -1;
      this.removeChildren(e);
      let r = gts_controlBuilder.createLink(
        "Check this video".gts_translate(),
        "https://www.youtube.com/watch?v=lMt06dY5j18",
        "video-link margin-l-5",
      );
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(
            "Configuration for automating attack Event mobs".gts_translate(),
          ),
          r,
        ]),
      );
      var a = this.createInput(null, "checkbox");
      (a.checked =
        "true" === storageGetOption(settingKeysEvent.attackEventBoss, "false")),
        jQuery(a).on("change", function () {
          storageSetOption(settingKeysEvent.attackEventBoss, this.checked);
        });
      var s = this.createInput(null, "checkbox");
      (s.disabled = !o),
        (s.checked =
          "true" ===
          storageGetOption(settingKeysEvent.resetEventPoint, "false")),
        jQuery(s).on("change", function () {
          storageSetOption(settingKeysEvent.resetEventPoint, this.checked);
        });
      var l = this.createElement(
          "span",
          null,
          "red-text",
          "Available only for Premium License".gts_translate(),
        ),
        u = [s];
      !o && u.push(l);
      var g = this.createRow("Auto reset event points".gts_translate(), u);
      e.appendChild(g);
      for (var d = [], c = 1; c < 5; c++)
        !(function (e) {
          var n = t.createElement(
              "label",
              null,
              null,
              "Wave {round}".gts_translate({ round: e }) + ":",
            ),
            i = t.createInput(null, "textbox");
          (i.className = "gts-input-small"), (i.disabled = !o);
          var r = settingKeysEvent["stopPointWave" + e];
          (i.value = storageGetOption(r, "")),
            jQuery(i).on("change", function () {
              storageSetOption(r, this.value);
            }),
            d.push(n),
            d.push(i);
        })(c);
      !o && d.push(l.cloneNode(!0));
      var m = this.createRow("Event points stop at".gts_translate(), d);
      e.appendChild(m);
      var p = this.createInput(null, "checkbox");
      (p.disabled = !o),
        (p.checked =
          "true" ===
          storageGetOption(settingKeysEvent.shouldFollowLeaderScore, "false")),
        jQuery(p).on("change", function () {
          storageSetOption(
            settingKeysEvent.shouldFollowLeaderScore,
            this.checked,
          );
        });
      l = this.createElement(
        "span",
        null,
        "red-text",
        "Available only for Premium License".gts_translate(),
      );
      var y = [p];
      !o && y.push(l);
      var f = this.createRow("Follow leader score".gts_translate(), y);
      e.appendChild(f);
      var h = gts_controlBuilder.createDropdown(
        settingKeysEvent.eventMob,
        3,
        [
          { name: "Opponent #1", value: 1 },
          { name: "Opponent #2", value: 2 },
          { name: "Opponent #3", value: 3 },
          { name: "Boss", value: 4 },
        ],
        "name",
        "value",
      );
      e.appendChild(this.createRow("Opponent".gts_translate(), [h]));
    },
    buildLocationSelection: function (e, t, n) {
      if (this.countryData) {
        for (var i = [], o = 0; o < this.countryData.locations.length; o++) {
          var r = this.countryData.locations[o],
            a = n && r.dungeonLevels.some((e) => this.level >= e);
          if (n ? a : !(this.level < r.level)) {
            var s = this.createElement("option", null, null, r.name);
            i.push(r.id),
              (s.value = r.id),
              (s.selected = this.isEqual(r.id, t)),
              e.appendChild(s);
          }
        }
        if (!n) {
          var l = Array.from(
            document.getElementById("submenu2").querySelectorAll("a"),
          )
            .filter((e) => e.getAttribute("href").match(/mod=location\&loc=\d/))
            .map((e) => parseInt(e.getAttribute("href").match(/\&loc=(\d)/)[1]))
            .pop();
          if (i.indexOf(l) < 0) {
            var u = this.countryData.locations.filter((e) => e.id == l).pop();
            if (!u) return;
            ((s = this.createElement("option", null, null, u.name)).value =
              u.id),
              (s.selected = this.isEqual(u.id, t)),
              e.appendChild(s);
          }
        }
      }
    },
    initSettings: function () {
      (currentCountry = gts_gameUiHelper.getCurrentCountry()),
        (playerLevel = gts_faketoolsUtility.getPlayerLevel()),
        (isBotRunning = gts_faketoolsUtility.isRunning());
      let e = storageIsOptionEnabled(settingKeysExpedition.attackEarly2Level);
      if (
        ((expeditionData = gts_faketoolsUtility.getExpeditionLocations(
          autoSettingsData,
          playerLevel + (e ? 2 : 0),
        )),
        (dungeonData = gts_faketoolsUtility.getDungeonLocations(
          autoSettingsData,
          playerLevel,
        )),
        (defaultExpeditionLocation =
          gts_faketoolsUtility.getDefaultExpeditionLocation(
            expeditionData,
            playerLevel,
          )),
        (expeditionCountryLocation = storageGetOption(
          settingKeysExpedition.countryLocation,
          defaultExpeditionLocation,
        )),
        (isCurrentCountryIsForExpedition =
          expeditionCountryLocation.indexOf(currentCountry) > -1),
        !isTraveling)
      ) {
        var t = gts_gameUiHelper.getLastVisibleLocation();
        let e = expeditionData.find((e) => e.id == expeditionCountryLocation);
        isCurrentCountryIsForExpedition &&
          (!e || t < e.locationId) &&
          storageSetOption(
            settingKeysExpedition.countryLocation,
            expeditionData[expeditionData.length - (e ? 2 : 1)].id,
          );
      }
      (isAutoPerformExp =
        !isWorking &&
        isBotRunning &&
        isCurrentCountryIsForExpedition &&
        storageIsOptionEnabled(settingKeysExpedition.enabled)),
        playerLevel > 9 &&
          ((defaultDungeonLocation =
            gts_faketoolsUtility.getDefaultDungeonLocation(
              dungeonData,
              playerLevel,
            )),
          (dungeonCountryLocation =
            storageGetOption(
              settingKeysDungeon.countryLocation,
              defaultDungeonLocation,
            ) || defaultDungeonLocation),
          (isCurrentCountryIsForDungeon =
            dungeonCountryLocation.indexOf(currentCountry) > -1),
          (isAutoPerformDun =
            !isWorking &&
            isBotRunning &&
            isCurrentCountryIsForDungeon &&
            storageIsOptionEnabled(settingKeysDungeon.enabled))),
        (serverSpeed = gts_faketoolsUtility.getServerSpeed()),
        (isAutoWearUWCostumeEnabled = storageIsOptionEnabled(
          settingKeysUnderworld.autoWearUWCostume,
        )),
        (isAutoOutbidFood = storageIsOptionEnabled(
          settingKeysHealth.autoBuyFood,
        )),
        (allowUseClotheToTravelToExpeditionCountry = storageIsOptionEnabled(
          settingKeysExpedition.useClotheToTravel,
          !1,
        )),
        (allowUseClotheToTravelToDungeonCountry = storageIsOptionEnabled(
          settingKeysDungeon.useClotheToTravel,
          !1,
        )),
        (underworldCostumeCooldown = gts_gameUiHelper.getUWCD(gts_gameLang)),
        (getMethodFunc = window[translate_method + randomId]),
        storageIsOptionEnabled(settingKeysEvent.attackEventBoss) &&
          (storageSetOption(settingKeysEvent.eventMob, 4),
          storageSetOption(settingKeysEvent.attackEventBoss, !1));
    },
    buildHighQualityItemsInShop: function (e, t) {
      for (var n of (this.removeChildren(e),
      t || (t = storageGetJsonOption(settingKeysPremium.shopHighQualityItems)),
      t.sort((e, t) => (t.isMercenary ? 1 : 0) - (e.isMercenary ? 1 : 0)),
      t)) {
        var i = this.createElement("div", null, "auction_item_div");
        ((e) => {
          i.onclick = () => {
            window.location.href = gts_UrlInfo.link(
              jQuery.extend({ mod: "inventory" }, e),
            );
          };
        })(n.params);
        var o = this.createElement("div");
        o.style = "position: relative";
        var r = [n.class.split(" ")[0]];
        void 0 !== n.quality &&
          r.push("item-quality-" + qualityMap[n.quality + 1]);
        var a = this.createElement("div", null, r.join(" "));
        void 0 !== window.tooltips && window.tooltips.set(i, n.tooltip),
          o.appendChild(a),
          i.appendChild(o),
          e.appendChild(i);
      }
      return e;
    },
    createRowHeader: function (e) {
      var t = this.createElement("div", null, "row-header", e),
        n = this.createElement("div", null, "row-wrapper");
      return n.appendChild(t), n;
    },
    createAuctionItemsSection: function () {
      var e = gts_controlBuilder._createElement(
          "div",
          auctionItemsSectionId,
          "gts-items-section",
        ),
        t = gts_controlBuilder._createElement(
          "div",
          null,
          "gts-items-section-content gts-content-scroll",
        ),
        n = gts_controlBuilder._createElement(
          "i",
          null,
          "gts-icon-auction-house",
        ),
        i = storageGetJsonOption(
          settingKeysGeneral.auctionSectionPosition,
          { top: 100, left: 20 },
          !0,
        );
      jQuery(e).css(i);
      var o = gts_controlBuilder._createElement(
          "div",
          null,
          "gts-items-section-header",
        ),
        r = [
          {
            text: "This section shows all matched filter items in Auction House".gts_translate(),
            color: "#00ff00",
          },
        ];
      gts_faketoolsUtility.showTooltip(o, r);
      var a = gts_controlBuilder.createLabel();
      jQuery(o)
        .on("mousedown", (t) => {
          var n = jQuery(e);
          auctionSectionMovingData = {
            currentClientX: parseInt(n.css("left").replace("px", "")),
            currentClientY: parseInt(n.css("top").replace("px", "")),
            clientX: t.clientX,
            clientY: t.clientY,
          };
        })
        .on("mouseup", () => {
          var t = jQuery(e),
            n = {
              top: parseInt(t.css("top").replace("px", "")),
              left: parseInt(t.css("left").replace("px", "")),
            };
          storageSetOption(
            settingKeysGeneral.auctionSectionPosition,
            JSON.stringify(n),
          ),
            (auctionSectionMovingData = null);
        }),
        jQuery(document).on("mousemove", (t) => {
          if (auctionSectionMovingData) {
            var n = t.clientX - auctionSectionMovingData.clientX,
              i = t.clientY - auctionSectionMovingData.clientY;
            jQuery(e).css({
              left: auctionSectionMovingData.currentClientX + n,
              top: auctionSectionMovingData.currentClientY + i,
            });
          }
        }),
        o.append(n),
        o.append(a),
        e.append(o),
        e.append(t),
        this.buildAuctionMatchedItems(o, t, a),
        document.body.append(e);
    },
    getSelectedValue: function (e) {
      var t = void 0 === e.selectedIndex ? window.event.srcElement : e;
      return t.value || t.options[t.selectedIndex].value;
    },
    migrateOldSettings: function () {
      var e = storageGetOption(settingKeysHealth.bagOfFood, 512).split(",");
      e.length > 1 && storageSetOption(settingKeysHealth.bagOfFood, e[0]);
    },
    buildPlayerItem: function (e, t) {
      var n = this.createElement("li");
      (n.tabIndex = -1), (n.innerHTML = e);
      var i = this.createElement("i", null, "remove");
      return (
        (i.onclick = t),
        jQuery(n).on("keydown", (e) => {
          switch (e.keyCode) {
            case 8:
            case 46:
              t();
              break;
            case 37:
              jQuery(n).prev().focus();
              break;
            case 39:
              jQuery(n).next().focus();
          }
        }),
        n.appendChild(i),
        n
      );
    },
    buildQuestProContent: function (e, t) {
      this.removeChildren(e);
      let n = gts_controlBuilder.createLink(
        "Check this video".gts_translate(),
        "https://www.youtube.com/watch?v=uk6IoMVzmGs",
        "video-link margin-l-5",
      );
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(
            "Configuration for picking quest automatically.".gts_translate(),
          ),
          n,
        ]),
      );
      let i = gts_controlBuilder.createToggle(
        settingKeysQuest.checkMissionBeforeAttack,
        "",
        !0,
      );
      e.appendChild(
        this.createRow("Check mission before attack".gts_translate(), [i]),
      );
      let o = [0, 1, 2, 3, 4, 5].map((e) => ({ text: `${e}`, value: e })),
        r = gts_controlBuilder.createDropdown(
          settingKeysQuest.minFillupQuestCount,
          3,
          o,
        );
      e.appendChild(
        this.createRow(
          "Number of quest need to be filled up before attack".gts_translate(),
          [r],
        ),
      );
      var a = t
          ? this.createElement("div", null, "quest-rules")
          : this.createElement(
              "span",
              null,
              "red-text",
              "Buy premium license to make picking quests configurable.".gts_translate(),
            ),
        s = this.createRow(
          "Picking quest rules".gts_translate(),
          [a],
          "quest-rules-label",
        );
      e.appendChild(s);
      var l,
        u = storageGetJsonOption(settingKeys.quest.pickingRules),
        g = (e) =>
          unaryOperators.indexOf(e) > -1
            ? "unary-operator"
            : e == filterOperators.numberAttackLessThan
              ? "number-operator"
              : "",
        d = (e) => {
          (e = (e || []).filter((e) => e)),
            storageSetOption(settingKeys.quest.pickingRules, JSON.stringify(e));
        },
        c = (e, t) => {
          var n = ["condition-item", g(e.operator)],
            i = this.createElement("div", null, n.join(" ")),
            o = gts_faketoolsUtility.buildDropDown(
              filterOperatorOptions,
              e.operator,
              (t) => {
                (e.operator = t.value), d(u);
                var n = jQuery(i);
                n.removeClass("number-operator"),
                  n.removeClass("unary-operator"),
                  n.addClass(g(t.value));
              },
            );
          i.append(o);
          var r = this.createInput(null, "textbox", "condition-value");
          (r.value = e.value),
            jQuery(r).on("change", () => {
              l && clearTimeout(l),
                (e.value = r.value),
                (l = setTimeout(() => {
                  d(u);
                }, 300));
            }),
            i.append(r);
          var a = this.createElement("span", null, "icon-trash");
          return (
            (a.title = "remove this condition"),
            (a.innerHTML = "&#x1F5D1;"),
            ((e, n, i) => {
              jQuery(a).click(() => {
                t.conditions.splice(t.conditions.indexOf(i), 1),
                  d(u),
                  jQuery(n).remove();
              });
            })(0, i, e),
            i.append(a),
            i
          );
        },
        m = (e, t) => {
          var n = this.createElement("div", null, "rule-item"),
            i = this.createElement("div", null, "rule-order");
          if ((n.appendChild(i), t > 0)) {
            var o = this.createElement("span", null, "btn-up", "⇑");
            (o.title = "move this rule up"),
              i.appendChild(o),
              jQuery(o).on("click", () => {
                u.splice(t - 1, 0, u.splice(t, 1)[0]), d(u), (a.innerHTML = "");
                var e = 0;
                for (var n of u) a.appendChild(m(n, e++));
              });
          }
          var r = this.createElement("span", null, null, t + 1);
          i.appendChild(r);
          var s = this.createElement("div", null, "conditions"),
            l = this.createElement("div", null, "inner-conditions");
          s.appendChild(l);
          var g = gts_faketoolsUtility.buildDropDown(
            questOptions,
            e.type,
            (t) => {
              (e.type = t.value), d(u);
            },
          );
          for (var p of (l.append(g), e.conditions)) l.append(c(p, e));
          n.appendChild(s);
          var y = this.createElement("div", null, "rule-actions");
          n.appendChild(y);
          var f = this.createElement("span", null, null, null, "&#x1F5D1;");
          (f.title = "remove this rule"),
            jQuery(f).on("click", () => {
              u.splice(u.indexOf(e), 1), d(u), jQuery(n).remove();
            });
          var h = this.createElement("span", null, "btn-add", "+");
          return (
            (h.title = "Add more condition".gts_translate()),
            jQuery(h).on("click", () => {
              var t = { operator: filterOperators.contains, value: "" };
              e.conditions.push(t), l.appendChild(c(t, e));
            }),
            y.appendChild(f),
            y.appendChild(h),
            n
          );
        };
      if (t) {
        var p = 0;
        for (var y of u) y && a.appendChild(m(y, p++));
        var f = gts_faketools.dom.createButton(
          "Add rule".gts_translate(),
          () => {
            var e = {
              type: questType.arena,
              conditions: [{ operator: filterOperators.contains, value: "" }],
            };
            u.push(e), d(u), a.appendChild(m(e, u.length - 1));
          },
        );
        jQuery(s).find(".field-label").append(f);
      }
    },
    buildAuctionMatchedItems: function (e, t, n) {
      this.removeChildren(t);
      var i = storageGetJsonOption(settingKeys.auction.matchedItems);
      for (var o of (i.sort(
        (e, t) =>
          (e.isMercenary ? 1 : e.itemGold) - (t.isMercenary ? 1 : t.itemGold),
      ),
      i)) {
        var r = this.createElement("div", null, "auction_item_div"),
          a = this.createElement("div");
        a.style = "position: relative";
        var s = [o.class.split(" ")[0]];
        void 0 !== o.quality &&
          s.push("item-quality-" + qualityMap[o.quality + 1]);
        var l = this.createElement("div", null, s.join(" "));
        if (
          (void 0 !== window.tooltips && window.tooltips.set(a, o.tooltip),
          ((e) => {
            r.onclick = () => {
              window.location.href = e;
            };
          })(
            gts_UrlInfo.link({
              mod: "auction",
              qry: (o.itemName || "").split(" ")[0],
              itemType: o.itemType,
              itemId: o.itemId,
              ttype: o.ttype,
            }),
          ),
          a.appendChild(l),
          r.appendChild(a),
          o.isOutbid)
        ) {
          var u = gts_controlBuilder.createLink(
            "",
            "",
            "outbid quest_slot_button_finish",
          );
          gts_faketoolsUtility.showTooltip(u, [
            { text: "Outbid already", color: "#00ff00" },
          ]),
            r.appendChild(u);
        }
        t.appendChild(r);
      }
      var g = i.filter((e) => e.isOutbid).length,
        d = i.length,
        c = "Bidden {biddenCount} / {total} items"
          .replace("{biddenCount}", g)
          .replace("{total}", d);
      return (
        setTimeout(() => {
          n.innerText = c;
        }, 500),
        t
      );
    },
    removeChildren: function (e) {
      for (; e.firstChild; ) e.removeChild(e.firstChild);
    },
    initDefaultValue: function () {
      storageGetOption(
        settingKeysDungeon.bossText,
        gts_faketoolsUtility.getBossText(gts_main.lang),
      );
    },
    init: function () {
      this.initDefaultValue(), this.migrateOldSettings();
      let e = "true" == localStorage.getItem("shouldUpdate", "false"),
        t = storageGetOption(settingKeysGeneral.menuPosition, "bottom"),
        n = ["auto-settings", t, jQuery(".mmortl").length > 0 ? "rtl" : ""];
      e && n.push("new-version");
      var i = this.createElement("div", null, n.join(" ")),
        o = this.createElement("div", null, "gts-overlay"),
        r = this.createElement("div", null, "content close");
      if (
        (i.appendChild(this.buildMenu(r)),
        i.appendChild(r),
        document.body.append(i),
        !isTraveling)
      ) {
        this.createAuctionItemsSection(), this.createShopItemsSection();
        let e = getMethodFunc(gts_main, 132);
        e && e();
      }
      document.body.append(o),
        jQuery(document.body).on("click", function (e) {
          if (!(jQuery(e.target).closest(".dropdown-list").length > 0)) {
            var t = jQuery(r);
            t.toggleClass("close", !0),
              t.toggleClass("open", !1),
              (i.querySelector("h4").className = "collapsed");
          }
        }),
        jQuery(i).on("click", function (e) {
          e.stopPropagation();
        });
      var a = this.createElement("span", null, `gts-timer ${t}`);
      "bottom" == t ? i.appendChild(a) : document.body.append(a),
        (ignoreId = playerId);
      var s = this;
      setTimeout(() => {
        s.addMoreQuickActions();
      }, 1e3),
        storageIsOptionEnabled(settingKeysGeneral.animateItemColor, !0) &&
          jQuery(document.body).addClass("gts-animate-item-color");
      var l = gts_gameUiHelper.getPlayerLevel(),
        u = storageIsOptionEnabled(settingKeysPremium.storeResourcesEveryHour),
        g = storageGetNumberOption(settingKeysPremium.storeResourcesTime);
      l > 4 &&
        u &&
        isPast(g) &&
        (storageSetNextTime(
          settingKeysPremium.storeResourcesTime,
          hourInMillisecond / secondInMillisecond,
        ),
        gts_faketools.utility.sendAllResourcesToHorreum(!0));
      var d = jQuery("#content").find(
        'img[src*="' + eventResetPointImage + '"]',
      );
      window.location.href.indexOf("submod=serverQuest&") > 0 &&
        d.length &&
        d.on("click", function () {
          storageSetOption(settingKeysEvent.lastExecutedDate, "");
        });
    },
    workflow: {
      racs: function () {
        var e = gts_UrlInfo.link({
          mod: "arena",
          submod: "serverArena",
          aType: "2",
        });
        if (
          window.location.href.indexOf("mod=arena&submod=serverArena&aType=2") >
          -1
        ) {
          var t = storageGetNumberOption(settingKeysGeneral.delayInSeconds, 15),
            n = 1e3 * gts_faketoolsUtility.random(0, t);
          gts_faketoolsUtility.showTimer(
            "Provinciarum Arena".gts_translate(),
            n,
          ),
            (gts_main.isExecuting = !0),
            setTimeout(() => {
              var e =
                  document.getElementById("own2").children[0].children[0]
                    .children,
                t = getMethodFunc(gts_mainWorkflow, 8)(e, settingKeysArena, !0);
              t > -1
                ? gts_faketoolsUtility.startProvinciarumFightConfirmed(
                    document.querySelectorAll("div.attack")[t],
                  )
                : document.getElementsByName("actionButton")[0].click();
            }, n);
        } else window.location.href = e;
      },
      p93: async () => {
        gts_main.isExecuting = !0;
        var e = gts_UrlInfo.link({ mod: "overview", doll: 1 }),
          t = (e, t, n) => {
            var i = new Date().getTime();
            let o = {
              hpBoost8hTimer: i + (e || 5 * minuteInMillisecond),
              hpBoost4hTimer: i + (t || 5 * minuteInMillisecond),
              hpBoost2hTimer: i + (n || 5 * minuteInMillisecond),
            };
            storageSetJsonOption(
              settingKeysPremium.healPointBoostExpiredTime,
              o,
            ),
              gts_faketoolsUtility.reload();
          };
        if (window.location.href.indexOf("mod=overview") > -1 && 1 == dollId) {
          let e = storageGetJsonOption(
            settingKeysPremium.healPointBoostExpiredTime,
          );
          var n = e.hpBoost8hTimer || 0,
            i = e.hpBoost4hTimer || 0,
            o = e.hpBoost2hTimer || 0,
            r = new Date().getTime();
          if (n > r && i > r && o > r) gts_faketoolsUtility.reload();
          else {
            let d = [];
            if (
              (n < r &&
                d.push({
                  text: langData[gts_gameLang].healPoint.ginkgo.split(" ")[0],
                  basis: boostItemBasis.healPoint.ginkgo,
                  timerProperty: "hpBoost8hTimer",
                }),
              i < r &&
                d.push({
                  text: langData[gts_gameLang].healPoint.taigaroot.split(
                    " ",
                  )[0],
                  basis: boostItemBasis.healPoint.taigaroot,
                  timerProperty: "hpBoost4hTimer",
                }),
              o < r &&
                d.push({
                  text: langData[gts_gameLang].healPoint.hawthorn.split(" ")[0],
                  basis: boostItemBasis.healPoint.hawthorn,
                  timerProperty: "hpBoost2hTimer",
                }),
              0 == d.length)
            )
              return;
            var a = getMethodFunc(gts_faketoolsUtility, 43);
            let c = await a(1, 1);
            if (!c) return void t();
            let m = c.spot,
              p = c.bagId,
              y = gts_faketoolsUtility.cpsfrei;
            await y(!0);
            for (let t of d) {
              var s = await gts_gameApi.getPackagePage({}, 1, {
                  qry: t.text,
                  f: itemTypeValues.reinforcements,
                }),
                l = Array.from(
                  preventJQueryLoadResource(s)
                    .find(`[data-basis="${t.basis}"]`)
                    .closest(".packageItem"),
                );
              if (0 != l.length) {
                var u = l[0].querySelector("input").getAttribute("value"),
                  g = await gts_gameApi.moveItemFromPackageToInventory(
                    u,
                    p,
                    m.x + 1,
                    m.y + 1,
                    1,
                  );
                g &&
                  (g =
                    await gts_gameApi.overview.moveItemFromInventoryToDollAvatar(
                      p,
                      m.x + 1,
                      m.y + 1,
                    ));
              } else e[t.timerProperty] = r + 60 * minuteInMillisecond;
            }
            t(
              Math.max(e.hpBoost8hTimer - r, 0),
              Math.max(e.hpBoost4hTimer - r, 0),
              Math.max(e.hpBoost2hTimer - r, 0),
            );
          }
        } else window.location.href = e;
      },
      h44: async function () {
        var e,
          t,
          n,
          i = parseInt((playerId + "").substr(0, 6)),
          o = [];
        if (
          ((e = storageGetOption(
            join4(reverse1(mix4(split3("fkPOYRC3UdXjgHXldNxdIPOu7"), 32))),
            "",
          ).trim()),
          (t = (function (e) {
            if (!e) return null;
            var t = splitInternal(e, "-");
            if (3 != t.length && 4 != t.length) return null;
            var n = substringInternal(t[0], 2),
              r = parseInt(substringInternal(t[0], 0, 2)),
              a = toDecimal(t[1], r),
              s = playerBaseNumber * i * (2 << shiftNumber);
            return a != toDecimal(t[2], r) - s ||
              s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, r)
              ? null
              : (4 == t.length &&
                  toDecimal(t[3], r) == s &&
                  o.push((i * gts_main.server).toString(19)),
                new Date(a));
          })(e)),
          (n = getServerDate()),
          !(t && t > n && [].indexOf(e) < 0))
        )
          return;
        if (o.indexOf((i * gts_main.server).toString(19)) < 0) return;
        if (gts_main.isFixingItem) return;
        (gts_main.isFixingItem = !0),
          gts_faketoolsUtility.setStatusMessage(
            "Checking smelter state".gts_translate(),
          );
        var r = getMethodFunc(gts_mainWorkflow, 20);
        if (!r) return;
        let a = await gts_gameApi.smeltery.getStatus();
        for (
          var s = JSON.parse(a.match(/slotsData\s*=\s*(.*);/)[1]),
            l = [],
            u = [],
            g = 0;
          g < 6;
          g++
        ) {
          var d = s[g],
            c = d["forge_slots.state"],
            m = c.indexOf("finished") > -1,
            p = "closed" == c;
          "crafting" == c && u.push(d["forge_slots.finishedIn"]),
            (m || p) && l.push({ isFinished: m, isEmpty: p, index: g });
        }
        if (0 == l.length) {
          var y = u.sort((e, t) => e - t)[0],
            f = new Date().getTime() + 1e3 * y;
          return (
            storageSetOption(settingKeysSmeltery.nextTryForSmelt, f),
            storageSetOption(settingKeysSmeltery.minGoldToSmelt, 0),
            void setTimeout(() => {
              window.location.reload(!0);
            }, 10)
          );
        }
        var h =
          "true" ==
          storageGetOption(
            settingKeysPremium.storeResourcesAfterSmelted,
            "true",
          );
        for (let e of l)
          e.isFinished &&
            (h
              ? await gts_gameApi.smeltery.storeResources(e.index)
              : await gts_gameApi.smeltery.freeSlot(e.index));
        return await r(l.map((e) => e.index));
      },
      t90: function () {
        var e = gts_UrlInfo.link({ mod: "training" }),
          t = storageGetNumberOption(settingKeysPremium.minGoldToTrain, 0);
        if (!(gts_faketoolsUtility.getCurrentGold() < t))
          if (window.location.href.indexOf("mod=training") > -1) {
            var n = getMethodFunc(gts_faketoolsUtility, 35),
              i = n && n();
            if (i && i.trainUrl)
              return (
                jQuery.get(i.trainUrl, () => {
                  setTimeout(() => {
                    window.location.reload(!0);
                  }, 10);
                }),
                !0
              );
          } else window.location.href = e;
      },
      d37: async function () {
        var e = storageGetOption(
            settingKeysUnderworld.farmingMode,
            underworldFarmingMode.costume,
          ),
          t = getMethodFunc(gts_mainWorkflow, 97),
          n = getMethodFunc(gts_mainWorkflow, 98);
        return e == underworldFarmingMode.costume ? await t() : await n();
      },
      b42: async function () {
        var e = storageGetArrayOption(settingKeysPremium.godBlessingLevel1);
        if (0 == e.length) return;
        var t = storageGetNumberOption(
          settingKeysPremium.godBlessingLevel1Cooldown,
          0,
        );
        if (new Date().getTime() < t) return;
        gts_main.isExecuting = !0;
        let n = storageGetNumberOption(
          settingKeysPremium.godBlessingLevel1Until,
          80,
        );
        if (!(window.location.href.indexOf("mod=gods") > -1 && e.length > 0))
          return (window.location.href = gts_UrlInfo.link({ mod: "gods" })), !0;
        for (var i, o = 0; o < e.length; o++) {
          var r = e[o],
            a = jQuery("#" + r);
          let t = a
            .find(".god_points")
            .text()
            .match(/(\d+)\s\/\s(\d+)/);
          if (t && !(t.length < 3) && (100 * t[1]) / t[2] > n) {
            let e =
              a.find("[data-ticker-time-left]").data("ticker-time-left") || 0;
            if (e > 0) i = i ? Math.min(i, e) : e;
            else {
              var s = gts_UrlInfo.link({
                mod: "gods",
                submod: "activateBlessing",
                god: godTypeMap[r],
                rank: 1,
              });
              await jQuery.get(s),
                (e = (18 * hourInMillisecond) / serverSpeed),
                (i = i ? Math.min(i, e) : e);
            }
          }
        }
        storageSetOption(
          settingKeysPremium.godBlessingLevel1Cooldown,
          new Date().getTime() + (i || 18e5),
        );
      },
      o23: async (e) => {
        gts_main.isExecuting = !0;
        var t = gts_UrlInfo.link({ mod: "overview", doll: 1 });
        let n = `${e}BoostExpiredTime`;
        var i = (e, t, i, o) => {
          var r = new Date().getTime();
          let a = {
            boost8hTimer: r + (e || 5 * minuteInMillisecond),
            boost4hTimer: r + (t || 5 * minuteInMillisecond),
            boost2hTimer: r + (i || 5 * minuteInMillisecond),
            boost1hTimer: r + (o || 5 * minuteInMillisecond),
          };
          storageSetJsonOption(settingKeysPremium[n], a),
            gts_faketoolsUtility.reload();
        };
        if (window.location.href.indexOf("mod=overview") > -1 && 1 == dollId) {
          let t = storageGetJsonOption(settingKeysPremium[n]);
          var o = t.boost8hTimer || 0,
            r = t.boost4hTimer || 0,
            a = t.boost2hTimer || 0,
            s = t.boost1hTimer || 0,
            l = new Date().getTime();
          if (o > l && r > l && a > l && s > l) gts_faketoolsUtility.reload();
          else {
            let n = [];
            if (
              (o < l &&
                n.push({
                  text: langData[gts_gameLang][e].bottle.split(" ")[0],
                  basis: boostItemBasis[e].bottle,
                  timerProperty: "boost8hTimer",
                }),
              r < l &&
                n.push({
                  text: langData[gts_gameLang][e].flacon.split(" ")[0],
                  basis: boostItemBasis[e].flacon,
                  timerProperty: "boost4hTimer",
                }),
              a < l &&
                n.push({
                  text: langData[gts_gameLang][e].ampulla.split(" ")[0],
                  basis: boostItemBasis[e].ampulla,
                  timerProperty: "boost2hTimer",
                }),
              s < l &&
                n.push({
                  text: langData[gts_gameLang][e].flask.split(" ")[0],
                  basis: boostItemBasis[e].flask,
                  timerProperty: "boost1hTimer",
                }),
              0 == n.length)
            )
              return;
            let p =
              e == statisticNames[0]
                ? "Boosting strength".gts_translate()
                : e == statisticNames[1]
                  ? "Boosting dexterity".gts_translate()
                  : e == statisticNames[2]
                    ? "Boosting agility".gts_translate()
                    : e == statisticNames[3]
                      ? "Boosting constitution".gts_translate()
                      : e == statisticNames[4]
                        ? "Boosting charisma".gts_translate()
                        : "Boosting intelligence".gts_translate();
            gts_faketools.utility.setStatusMessage(p);
            var u = getMethodFunc(gts_faketoolsUtility, 43);
            let y = await u(1, 1, !0);
            if (!y) return void i();
            let f = y.spot,
              h = y.bagId,
              v = gts_faketoolsUtility.cpsfrei;
            await v(!0);
            for (let e of n) {
              let n = 1,
                i = void 0;
              do {
                var g = await gts_gameApi.getPackagePage({}, n++, {
                    qry: e.text,
                    f: itemTypeValues.reinforcements,
                  }),
                  d = preventJQueryLoadResource(g);
                if (!i) {
                  let e = d.find(".paging_numbers"),
                    t = e.length ? Array.from(e[0].children).pop() : null;
                  i = t ? parseInt(t.textContent) : 1;
                }
                var c = Array.from(
                  d.find(`[data-basis="${e.basis}"]`).closest(".packageItem"),
                );
                if (0 != c.length) {
                  var m = c[0].querySelector("input").getAttribute("value");
                  if (
                    await gts_gameApi.moveItemFromPackageToInventory(
                      m,
                      h,
                      f.x + 1,
                      f.y + 1,
                      1,
                      !0,
                    )
                  ) {
                    await gts_gameApi.overview.moveItemFromInventoryToDollAvatar(
                      h,
                      f.x + 1,
                      f.y + 1,
                    );
                    break;
                  }
                } else if (n > Math.min(i, 5)) {
                  t[e.timerProperty] = l + 60 * minuteInMillisecond;
                  break;
                }
              } while (n < Math.min(i, 5));
            }
            i(
              Math.max(t.boost8hTimer - l, 0),
              Math.max(t.boost4hTimer - l, 0),
              Math.max(t.boost2hTimer - l, 0),
              Math.max(t.boost1hTimer - l, 0),
            );
          }
        } else window.location.href = t;
      },
      m25: async function (e) {
        var t = Array.from(e.find(".contentboard_slot_active")).map((e) => {
            var t = gts_faketoolsUtility.getQuestIconName(
              e.querySelector(".quest_slot_icon").getAttribute("style"),
            );
            return t.indexOf("icon_grouparena") > -1
              ? questType.groupArena
              : t.indexOf("icon_arena") > -1
                ? questType.arena
                : t.indexOf("icon_items") > -1
                  ? questType.item
                  : t.indexOf("icon_combat") > -1
                    ? questType.combat
                    : t.indexOf("icon_expedition") > -1
                      ? questType.expedition
                      : t.indexOf("icon_dungeon") > -1
                        ? questType.dungeon
                        : questType.work;
          }),
          n = t.indexOf(questType.combat) > -1,
          i = n || t.indexOf(questType.arena) > -1,
          o = n || t.indexOf(questType.groupArena) > -1;
        if (
          (storageSetOption(settingKeys.quest.hasArenaQuest, i),
          storageSetOption(settingKeys.quest.hasTumaQuest, o),
          e.find(".quest_slot_button_finish, .quest_slot_button_restart")
            .length > 0)
        ) {
          var r = gts_UrlInfo.link({}),
            a = r.substring(0, r.indexOf("index")),
            s = Array.from(e.find(".quest_slot_button_finish")).map(
              (e) => a + e.getAttribute("href"),
            ),
            l = Array.from(e.find(".quest_slot_button_restart")).map(
              (e) => a + e.getAttribute("href"),
            ),
            u = s.concat(l);
          if (!u.length) return;
          let t = null;
          for (let e of u) t = await jQuery.get(e);
          (e = preventJQueryLoadResource(t)),
            storageSetOption(settingKeys.quest.enabled, !0),
            storageSetOption(settingKeys.quest.enableAutoTime, "0");
        }
        return e;
      },
      g46: async function () {
        var e,
          t,
          n,
          i = parseInt((playerId + "").substr(0, 6));
        if (
          ((e = storageGetOption(
            join4(reverse3(mix2(split1("C3UdXjgHXldNxdIPOu7fkPOYR"), 26))),
            "",
          ).trim()),
          (t = (function (e) {
            if (!e) return null;
            var t = splitInternal(e, "-");
            if (3 != t.length && 4 != t.length) return null;
            var n = substringInternal(t[0], 2),
              o = parseInt(substringInternal(t[0], 0, 2)),
              r = toDecimal(t[1], o),
              a = playerBaseNumber * i * (2 << shiftNumber);
            return r != toDecimal(t[2], o) - a ||
              a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, o)
              ? null
              : new Date(r);
          })(e)),
          (n = getServerDate()),
          !(t && t > n && [].indexOf(e) < 0))
        )
          return;
        (await gts_mainWorkflow.tryClimbArenaLeague("arena")) ||
          ((await gts_mainWorkflow.racss("arena"))
            ? gts_faketoolsUtility.reload()
            : gts_mainWorkflow.racs());
      },
      r81: function () {
        var e = gts_UrlInfo.link({ mod: "auction", itemType: 7 }),
          t = (e) => {
            storageSetOption(
              settingKeysHealth.checkingAvailableFoodTimer,
              new Date().getTime() + 60 * (e || 5) * 1e3,
            ),
              setTimeout(() => {
                location.reload(!0);
              }, 500);
          };
        if (window.location.href.indexOf("mod=auction&itemType=7") > -1) {
          var n = document.getElementById("auction_table");
          if (!n)
            return void setTimeout(() => {
              window.location.reload(!0);
            }, 10);
          for (
            var i = Array.from(n.querySelectorAll(".auction_bid_div")),
              o = Array.from(n.querySelectorAll(".auction_item_div")),
              r = gts_faketoolsUtility.getCurrentGold(),
              a = parseFloat(
                storageGetOption(settingKeysHealth.goldPerLifePointRatio, "0"),
              ),
              s = [],
              l = 0;
            l < i.length;
            l++
          ) {
            var u = i[l],
              g = o[l],
              d = parseInt(u.querySelector("[name=bid_amount]").value),
              c = parseInt(
                g
                  .querySelector("[data-content-type]")
                  .getAttribute("data-tooltip")
                  .replace(/ 0 /g, "")
                  .match(/\s(\d+)\s/)[1],
              ),
              m = u.firstElementChild.firstElementChild;
            c / d >= a &&
              (null == m || "br" == m.tagName.toLowerCase()) &&
              s.push({
                gold: d,
                ratio: c / d,
                btnBid: u.querySelector("[name=bid]"),
              });
          }
          if (0 == s.length) return void t(5);
          s.sort(function (e, t) {
            return t.gold - e.gold;
          });
          var p = s[s.length - 1].gold,
            y = s[Math.floor(s.length / 2)].gold;
          s.sort(function (e, t) {
            return t.ratio - e.ratio;
          }),
            isNaN(y) &&
              storageSetOption(
                settingKeysHealth.minimumGoldToBuyFood,
                isNaN(y) ? 0 : y,
              );
          var f = function (e) {
            if (r < p || e >= s.length)
              return (
                t(e >= s.length ? 5 : 1),
                void setTimeout(() => {
                  window.location.reload(!0);
                }, 1e3)
              );
            r > s[e].gold
              ? ((r -= s[e].gold),
                s[e].btnBid.click(),
                setTimeout(() => {
                  f(++e);
                }, 300))
              : f(++e);
          };
          f(0);
        } else window.location.href = e;
      },
      tryClimbArenaLeague: async (settingsName) => {
        let settings = settingKeys[settingsName];
        if (!gts_mainWorkflow.isClimbingLeagueEnabledFor(settingsName)) return;
        let isArena = "arena" == settingsName,
          queries = gts_UrlInfo.queries;
        if (isArena && ("arena" != queries.mod || queries.submod))
          return (
            (window.location.href = gts_UrlInfo.link({ mod: "arena" })), !0
          );
        if (
          "circusTuma" == settingsName &&
          ("arena" != queries.mod || "grouparena" != queries.submod)
        )
          return (
            (window.location.href = gts_UrlInfo.link({
              mod: "arena",
              submod: "grouparena",
            })),
            !0
          );
        {
          let attackButtons = Array.from(jQuery("#content .right tr .attack"));
          if (0 == attackButtons.length)
            return void storageSetNextTime(
              settings.climbCheckingTime,
              (5 * hourInMillisecond) / secondInMillisecond,
            );
          let todayClimbAttackData =
              gts_faketools.utility.getTodayClimbAttackData(settings),
            index = -1,
            currentPlayerId,
            allowAttackAlly = storageIsOptionEnabled(settings.allowAttackAlly),
            reg = isArena
              ? /startFight\(this,\s*(\d+)\)/
              : /startGroupFight\(this,\s*(\d+)\)/,
            ignorePlayers = storageGetJsonOption(settings.ignorePlayers).filter(
              (e) => !!e,
            ),
            lostTimesForIgnore = storageGetNumberOption(
              settings.lostTimesForIgnore,
              3,
            );
          for (let attackButton of attackButtons) {
            let $attackButton = jQuery(attackButton);
            index++;
            let isAlly = attackButton.innerHTML.indexOf("color:green") > -1;
            if (isAlly && !allowAttackAlly) continue;
            currentPlayerId = parseInt(
              $attackButton.attr("onclick").match(reg)[1],
            );
            let playerName = $attackButton
                .closest("tr")
                .find("a")
                .text()
                .trim(),
              currentDateAttackPlayer =
                todayClimbAttackData[currentPlayerId] || defaultAttackData,
              shouldIgnoreAfterLostTooMuch =
                currentDateAttackPlayer.lost - currentDateAttackPlayer.win >=
                lostTimesForIgnore;
            shouldIgnoreAfterLostTooMuch &&
              !ignorePlayers.includes(playerName) &&
              (ignorePlayers.push(playerName),
              (ignorePlayers = ignorePlayers.filter(
                (e, t) => e && ignorePlayers.indexOf(e) == t,
              )),
              storageSetJsonOption(settings.ignorePlayers, ignorePlayers));
            let isIgnorePlayer = ignorePlayers.includes(playerName);
            if (!(isIgnorePlayer || currentDateAttackPlayer.total > 4)) {
              var result = isArena
                ? await gts_gameApi.attackArenaPlayerByIdAsync(currentPlayerId)
                : await gts_gameApi.attackCircusPlayerByIdAsync(
                    currentPlayerId,
                  );
              if (result)
                return (
                  storageSetJsonOption(settings.currentAttackData, {
                    time: new Date().getTime(),
                    playerId: currentPlayerId,
                  }),
                  eval(result),
                  !0
                );
            }
          }
          storageSetNextTime(
            settings.climbCheckingTime,
            (10 * hourInMillisecond) / secondInMillisecond,
          );
        }
      },
      i126: function () {
        var e = parseInt((playerId + "").substr(0, 6)),
          t = [];
        if (
          ((n = storageGetOption(
            join2(reverse1(mix2(split3("gHXldNxdIPOu7fkPOYRC3UdXj"), 20))),
            "",
          ).trim()),
          (i = (function (n) {
            if (!n) return null;
            var i = splitInternal(n, "-");
            if (3 != i.length && 4 != i.length) return null;
            var o = substringInternal(i[0], 2),
              r = parseInt(substringInternal(i[0], 0, 2)),
              a = toDecimal(i[1], r),
              s = playerBaseNumber * e * (2 << shiftNumber);
            return a != toDecimal(i[2], r) - s ||
              s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(o, r)
              ? null
              : (4 == i.length &&
                  toDecimal(i[3], r) == s &&
                  t.push((e * gts_main.server).toString(19)),
                new Date(a));
          })(n)),
          (o = getServerDate()),
          i &&
            i > o &&
            [].indexOf(n) < 0 &&
            !(t.indexOf((e * gts_main.server).toString(19)) < 0))
        ) {
          var n,
            i,
            o,
            r = gts_UrlInfo.link({ mod: "quests" });
          if (window.location.href.indexOf("mod=quests") > -1) {
            var a = gts_UrlInfo.link({}),
              s = a.substring(0, a.indexOf("index")),
              l = Array.from(
                document.querySelectorAll(
                  ".quest_slot_button.quest_slot_button_finish",
                ),
              ).map((e) => s + e.getAttribute("href")),
              u = Array.from(
                document.querySelectorAll(".quest_slot_button_restart"),
              ).map((e) => s + e.getAttribute("href")),
              g = l.concat(u),
              d = function (e) {
                if (e > g.length - 1)
                  setTimeout(() => {
                    window.location.reload(!0);
                  }, 10);
                else {
                  var t = g[e++];
                  jQuery.get(t, (t) => {
                    setTimeout(() => {
                      d(e);
                    }, 500);
                  });
                }
              };
            g.length
              ? d(0)
              : (() => {
                  var e = storageIsOptionEnabled(settingKeysUnderworld.enabled),
                    t = storageIsOptionEnabled(settingKeysDungeon.enabled),
                    n = storageIsOptionEnabled(settingKeysArena.enabled),
                    i = storageIsOptionEnabled(settingKeysCircusTuma.enabled),
                    o = storageIsOptionEnabled(
                      settingKeysUnderworld.pauseArena,
                    ),
                    r = [questType.any, questType.combat];
                  (isAutoPerformExp || e || t) && r.push(questType.item),
                    (isAutoPerformExp || e) && r.push(questType.expedition),
                    t && r.push(questType.dungeon),
                    n && (!o || !isInUnderworld) && r.push(questType.arena),
                    i && r.push(questType.groupArena);
                  var a = storageGetJsonOption(settingKeys.quest.pickingRules);
                  a = a.filter((e) => e);
                  var l = Array.from(jQuery(".contentboard_slot_active")).map(
                      (e) => {
                        var t = gts_faketoolsUtility.getQuestIconName(
                          e
                            .querySelector(".quest_slot_icon")
                            .getAttribute("style"),
                        );
                        return t.indexOf("icon_grouparena") > -1
                          ? questType.groupArena
                          : t.indexOf("icon_arena") > -1
                            ? questType.arena
                            : null;
                      },
                    ),
                    u = l.indexOf(questType.arena) > -1,
                    g = l.indexOf(questType.groupArena) > -1;
                  storageSetOption(settingKeys.quest.hasArenaQuest, u),
                    storageSetOption(settingKeys.quest.hasTumaQuest, g);
                  var d = Array.from(
                    document.querySelectorAll(".contentboard_slot_inactive"),
                  )
                    .map((e) => {
                      var t = e.querySelector(".quest_slot_button");
                      if (!t) return null;
                      var n = gts_faketoolsUtility.getQuestIconName(
                          e
                            .querySelector(".quest_slot_icon")
                            .getAttribute("style"),
                        ),
                        i = e
                          .querySelector(".quest_slot_title")
                          .textContent.toLowerCase(),
                        o = e.querySelector(".quest_slot_reward_item > img"),
                        r = null,
                        l = !1;
                      if (o)
                        try {
                          var u = JSON.parse(jQuery(o).attr("data-tooltip"))[0];
                          (r = u[0][0]), (l = 250 == u[u.length - 1][2]);
                        } catch {}
                      var g = i.match(/(\d+)/),
                        d =
                          n.indexOf("icon_grouparena") > -1
                            ? questType.groupArena
                            : n.indexOf("icon_arena") > -1
                              ? questType.arena
                              : n.indexOf("icon_items") > -1
                                ? questType.item
                                : n.indexOf("icon_combat") > -1
                                  ? questType.combat
                                  : n.indexOf("icon_expedition") > -1
                                    ? questType.expedition
                                    : n.indexOf("icon_dungeon") > -1
                                      ? questType.dungeon
                                      : questType.work,
                        c = g ? parseInt(g[1]) : 0,
                        m = null == e.querySelector(".quest_slot_time"),
                        p = null != e.querySelector(".quest_slot_reward_xp"),
                        y = e.querySelectorAll(".quest_slot_reward_god"),
                        f = {};
                      for (var h of y) {
                        var v = h.querySelector("[src]").getAttribute("src"),
                          _ = parseInt(
                            h
                              .querySelector("[data-tooltip]")
                              .getAttribute("data-tooltip")
                              .match(/\d+/)[0],
                          ),
                          w = godImageMaps[v.match(/\/(\w+)\.png/)[1]];
                        f[w] = _;
                      }
                      for (
                        var b = a.filter(
                            (e) => e.type == d || e.type == questType.any,
                          ),
                          k = !1,
                          O = 999,
                          I = null,
                          C = 0;
                        C < b.length && !k;
                        C++
                      ) {
                        var S = b[C];
                        (k =
                          !S.conditions.length ||
                          S.conditions.every((e) => {
                            if (e.operator == filterOperators.contains) {
                              var t = new RegExp(e.value.trim(), "gi");
                              return !!i.match(t);
                            }
                            return e.operator == filterOperators.notContains
                              ? ((t = new RegExp(e.value.trim(), "gi")),
                                !i.match(t))
                              : e.operator ==
                                  filterOperators.numberAttackLessThan
                                ? c < e.value
                                : e.operator == filterOperators.hasNoTimer
                                  ? m
                                  : e.operator ==
                                        filterOperators.itemContains &&
                                      r &&
                                      !l
                                    ? ((t = new RegExp(e.value.trim(), "gi")),
                                      !!r.match(t))
                                    : e.operator ==
                                          filterOperators.itemNotContains &&
                                        r &&
                                        !l
                                      ? ((t = new RegExp(e.value.trim(), "gi")),
                                        !r.match(t))
                                      : e.operator ==
                                          filterOperators.rewardIsFood
                                        ? l
                                        : e.operator ==
                                            filterOperators.hasExperience
                                          ? p
                                          : e.operator ==
                                              filterOperators.hasApollo
                                            ? f.apollo > 0
                                            : e.operator ==
                                                filterOperators.hasVulcan
                                              ? f.vulcan > 0
                                              : e.operator ==
                                                  filterOperators.hasMars
                                                ? f.mars > 0
                                                : e.operator ==
                                                    filterOperators.hasMercury
                                                  ? f.mercury > 0
                                                  : e.operator ==
                                                      filterOperators.hasDiana
                                                    ? f.diana > 0
                                                    : e.operator ==
                                                        filterOperators.hasMinerva &&
                                                      f.minerva > 0;
                          })) && (I = S.type),
                          (O = a.indexOf(S));
                      }
                      return {
                        url: s + t.getAttribute("href"),
                        questType: I,
                        count: c,
                        title: i,
                        validToPick: k,
                        order: O,
                      };
                    })
                    .filter(
                      (e) => e && r.indexOf(e.questType) > -1 && e.validToPick,
                    )
                    .sort((e, t) =>
                      t.order > e.order
                        ? 1
                        : t.order < e.order
                          ? -1
                          : t.count > e.count
                            ? -1
                            : t.count < e.count
                              ? 1
                              : 0,
                    )
                    .pop();
                  if (d)
                    storageSetOption(settingKeys.quest.renewQuestCount, 0),
                      (window.location.href = d.url);
                  else {
                    var c = document
                        .querySelector("#quest_footer_reroll")
                        .querySelector("[type=button]"),
                      m = Array.from(
                        document.querySelectorAll(".quest_slot_button_cancel"),
                      ).length;
                    if (c && m < 5) {
                      var p = storageGetNumberOption(
                        settingKeys.quest.renewQuestCount,
                        "0",
                      );
                      return (
                        storageSetOption(
                          settingKeys.quest.renewQuestCount,
                          p + 1,
                        ),
                        void c.click()
                      );
                    }
                    storageSetOption(settingKeys.quest.enabled, !1);
                    var y = new Date().getTime() + 18e4;
                    storageSetOption(settingKeys.quest.enableAutoTime, y),
                      setTimeout(() => {
                        window.location.reload(!0);
                      }, 1e3);
                  }
                })();
          } else window.location.href = r;
        }
      },
      k1: function () {
        var e = parseInt((playerId + "").substr(0, 6));
        let t = expeditionCountryLocation.split("-")[1];
        var n,
          i,
          o,
          r = gts_UrlInfo.link({ mod: "location", loc: t });
        if (
          window.location.href.indexOf("mod=location") > -1 &&
          window.location.href.indexOf("loc=" + t) > -1
        ) {
          var a = storageGetNumberOption(settingKeysGeneral.delayInSeconds, 15),
            s = "true" == storageGetOption("nodelay", "false"),
            l = 1e3 * gts_faketoolsUtility.random(0, a);
          (gts_main.isExecuting = !0),
            gts_faketoolsUtility.showTimer("Expedition".gts_translate(), l) &&
              ((n = storageGetOption(
                join4(reverse4(mix4(split4("UdXjgHXldNxdIPOu7fkPOYRC3"), 24))),
                "",
              ).trim()),
              (i = (function (t) {
                if (!t) return null;
                var n = splitInternal(t, "-");
                if (3 != n.length && 4 != n.length) return null;
                var i = substringInternal(n[0], 2),
                  o = parseInt(substringInternal(n[0], 0, 2)),
                  r = toDecimal(n[1], o),
                  a = playerBaseNumber * e * (2 << shiftNumber);
                return r != toDecimal(n[2], o) - a ||
                  a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(i, o)
                  ? null
                  : new Date(r);
              })(n)),
              (o = getServerDate()),
              i && i > o && [].indexOf(n) < 0) &&
              setTimeout(
                () => {
                  var e = storageGetNumberOption(
                    settingKeysExpedition.opponent,
                    "1",
                  );
                  setTimeout(() => {
                    window.location.reload(!0);
                  }, 5e3);
                  var t = document.querySelectorAll(
                    ".expedition_button:not(:disabled)",
                  );
                  if (
                    (t.length < e && (e = t.length),
                    "true" ==
                      storageGetOption(
                        settingKeysExpedition.autoCollectAllBonuses,
                        "true",
                      ))
                  )
                    for (
                      var n = jQuery(".expedition_bonus_box"), i = 0;
                      i < n.length && i < e;
                      i++
                    ) {
                      if (
                        !(
                          4 ==
                          jQuery(n[i]).find(".expedition_bonus.active").length
                        )
                      ) {
                        e = i + 1;
                        break;
                      }
                    }
                  t[e - 1].click();
                },
                s ? 0 : l,
              );
        } else window.location.href = r;
      },
      setJewelleryBoostTimers: function () {
        var e = /data-ticker-time-left=\\\"(\d+)\\\"/;
        let t = (t) => {
          var n = jQuery(`[data-container-number=${t}][data-tooltip]`)
            .attr("data-tooltip")
            .match(e);
          return null != n ? parseInt(n[1]) : 0;
        };
        if (window.location.href.indexOf("mod=overview") > -1 && 1 == dollId) {
          var n = t(charItemContainerId.amulet),
            i = t(charItemContainerId.ring1),
            o = t(charItemContainerId.ring2);
          let e = settingKeysPremium.jewelleryOilBoostExpiredTime,
            r = storageGetJsonOption(e, defaultJewelleryBoostExpiredTime),
            a = new Date().getTime(),
            s = !1;
          n > 0 && ((s = !0), (r.amulet = a + n)),
            i > 0 && ((s = !0), (r.ring1 = a + i)),
            o > 0 && ((s = !0), (r.ring2 = a + o)),
            s && storageSetJsonOption(e, r);
        }
      },
      checkingRequestedPacks: function () {
        var e = storageGetNumberOption(
            settingKeysPremium.nextCheckingTime,
            "0",
          ),
          t = storageGetNumberOption(settingKeysPremium.messageFolder, "-1");
        if (!(t < 1)) {
          var n = gts_UrlInfo.link({
              mod: "messages",
              submod: "messageShow",
              folder: t,
            }),
            i = new Date().getTime(),
            o = Math.max(e - i, 0);
          if (o > 0)
            setTimeout(function () {
              window.location.reload(!0);
            }, o);
          else {
            if (
              window.location.href.indexOf(
                "mod=messages&submod=messageShow&folder=1",
              ) > -1
            )
              return (
                setTimeout(() => {
                  for (
                    var e = Array.from(
                        document.querySelectorAll(".message_box"),
                      ),
                      t = storageGetJsonOption(
                        settingKeysPremium.processedPacks,
                      ),
                      n = [],
                      i = gts_UrlInfo.ajaxLink({}),
                      o = 0;
                    o < e.length;
                    o++
                  ) {
                    var r = e[o].querySelector(".message_text").innerText,
                      a = e[o].id.match(/message(\d+)/)[1];
                    if (!(r.indexOf("#pack#") < 0 || t.indexOf(a) > -1)) {
                      var s = parseInt(r.match(/#pack#(\d+)#/)[1]);
                      n.push({ messageId: a, packAmount: s });
                    }
                  }
                  storageSetOption(
                    settingKeysPremium.nextCheckingTime,
                    new Date().getTime() + 12e4,
                  ),
                    storageSetOption(
                      settingKeysPremium.requestingPacks,
                      JSON.stringify(n),
                    );
                  var l = function (e) {
                    if (e > n.length - 1)
                      window.location.href = gts_UrlInfo.link({
                        mod: "guildMarket",
                      });
                    else {
                      var t = n[e++];
                      jQuery.post(
                        i,
                        {
                          mod: "messages",
                          submod: "deleteMessage",
                          messageId: t.messageId,
                          a: new Date().getTime(),
                        },
                        function () {
                          setTimeout(function () {
                            l(e);
                          }, 200);
                        },
                      );
                    }
                  };
                  n.length > 0 ? l(0) : window.location.reload(!0);
                }),
                !0
              );
            window.location.href = n;
          }
        }
      },
      v72: async function (e) {
        if (isTraveling || isInUnderworld || isWorking) return !1;
        if (isTravelToSelectExpeditionCountryCalled) return !0;
        let t = gts_gameUiHelper.getExpeditionPoints(),
          n = storageIsOptionEnabled(
            settingKeysUnderworld.isWearingUwCostumeNormal,
          )
            ? settingKeysExpedition.travelAtRestoredPointsForUwWearing
            : settingKeysExpedition.travelAtRestoredPointsForNonUwWearing,
          i = storageGetNumberOption(n, 40),
          o = gts_gameUiHelper.getMaxExpeditionPoints(),
          r = expeditionData.find(
            (e) => e.id == expeditionCountryLocation,
          ).country,
          a = travelCosts[`${currentCountry}-${r}`],
          s = gts_gameUiHelper.getCurrentGold();
        return (
          !!(
            r != currentCountry &&
            a < s &&
            !isInUnderworld &&
            (e || (i > 0 && t >= (i / 100) * o))
          ) &&
          ((isTravelToSelectExpeditionCountryCalled = !0),
          await gts_gameApi.travelToCountry(
            r,
            allowUseClotheToTravelToExpeditionCountry,
          ),
          gts_faketoolsUtility.reload(),
          !0)
        );
      },
      a49: function () {
        var e = storageGetJsonOption(settingKeysPremium.itemsNeedRepair);
        if (e.length > 0) {
          var t = e[0];
          if (window.location.href.indexOf("mod=overview&doll=" + t.doll) > 0) {
            var n = getMethodFunc(gts_faketoolsUtility, 105);
            if (
              ((e = n && n(t.doll, jQuery("#content"))),
              storageSetOption(
                settingKeysPremium.itemsNeedRepair,
                JSON.stringify(e),
              ),
              0 == e.length)
            )
              return !1;
            var i = getMethodFunc(gts_mainWorkflow, 102);
            if ((i && i(t.doll), 2 == t.doll)) {
              var o = gts_UrlInfo.link({ mod: "overview", doll: 1 });
              jQuery.get(o);
            }
          } else
            window.location.href = gts_UrlInfo.link({
              mod: "overview",
              doll: t.doll,
              isRepairing: !0,
            });
          return !0;
        }
      },
      x63: async () => {
        gts_faketoolsUtility.setStatusMessage(
          "Trying take off weapon".gts_translate(),
        );
        let e = getMethodFunc(gts_faketoolsUtility, 43),
          t = storageGetJsonOption(settingKeysPremium.doll1Items, []);
        if (!t.length) return;
        let n = t.find((e) => e.containerNumber == charItemContainerId.weapon);
        if (!n) return;
        let i = await e(n.measurementX, n.measurementY, !0);
        if (!i) return;
        let o = i.spot;
        (await gts_gameApi.moveItemFromCharToInventory(
          1,
          3,
          i.bagId,
          o.x + 1,
          o.y + 1,
        )) &&
          storageSetJsonOption(settingKeysUnderworld.weaponTakenOffData, {
            x: o.x + 1,
            y: o.y + 1,
            bagId: i.bagId,
          });
      },
      racss: async function (e) {
        if (
          !(
            "true" ==
            storageGetOption(settingKeys[e].attackSameServerEnabled, "false")
          )
        )
          return !1;
        var t = new Date().getTime();
        gts_faketools.storage.migrateOldDataArrayToJson(
          settingKeys[e].sameServerPlayers,
        );
        var n = storageGetJsonOption(settingKeys[e].sameServerPlayers).filter(
            (e) => e,
          ),
          i = storageGetJsonOption(settingKeys[e].sameServerAttackData, {}, !0),
          o = gts_faketoolsUtility.getServerDateFormated();
        i.date != o && (i = { date: o, data: [] });
        var r = {};
        for (var a of i.data) r[a.p.trim()] = !0;
        for (var s of n) r[s.trim()] || i.data.push({ p: s, s: 0, t: 0 });
        i.data = gts_faketools.array.shuffle(i.data);
        var l = i.data
          .filter((e) => e && e.t <= t && e.s < 5 && n.indexOf(e.p) > -1)
          .sort((e, t) => e.t - t.t);
        if (0 == l.length) return !1;
        let u = !1;
        var g = storageGetNumberOption(settingKeysGeneral.delayInSeconds, 15),
          d = 1e3 * gts_faketoolsUtility.random(0, g);
        for (var c of (gts_faketoolsUtility.showTimer(
          "arena" == e ? "Arena".gts_translate() : "Circus".gts_translate(),
          d,
        ),
        (gts_main.isExecuting = !0),
        d > 0 && (await gts_faketoolsUtility.wait(d / 1e3)),
        l)) {
          if (c.s < 5)
            if (
              ((c.t = t + 60 * gts_faketoolsUtility.random(15, 30) * 1e3),
              storageSetOption(
                settingKeys[e].sameServerAttackData,
                JSON.stringify(i),
              ),
              gts_faketoolsUtility.setStatusMessage(
                "Trying to attack {player} in {arenaCircusKey}".gts_translate({
                  player: c.p,
                  arenaCircusKey: "arena" == e ? "Arena" : "Circus Tuma",
                }),
              ),
              "arena" == e
                ? await gts_faketoolsUtility.attackArenaPlayerByNameAsync(c.p)
                : await gts_faketoolsUtility.attackCircusPlayerByNameAsync(c.p))
            ) {
              c.s++, (u = !0);
              break;
            }
        }
        return (
          storageSetOption(
            settingKeys[e].sameServerAttackData,
            JSON.stringify(i),
          ),
          u
        );
      },
      getItemForSmeltFromSelectedInventory: async (e) => {
        let t = storageGetArrayNumberOption(
          settingKeysPremium.inventoriesForAutoSmelting,
        );
        if (0 == t.length) return [];
        let n = storageGetJsonOption(settingKeysUnderworld.weaponTakenOffData),
          i = [];
        for (let o of t) {
          let t = await gts_gameApi.getInventoryInfo(o),
            r = gts_faketoolsUtility
              .getAllItems(preventJQueryLoadResource(`<div>${t}</div>`))
              .filter((e) => {
                let t = parseInt(
                  gts_gameUiHelper.getItemTypeFromBasis(
                    e.getAttribute("data-basis"),
                  ),
                );
                return (
                  itemTypesForSmelting.indexOf(t) > -1 &&
                  (!n ||
                    !n.bagId ||
                    n.bagId != o ||
                    (n.x != e.positionX && n.y != e.positionY))
                );
              });
          if ((i.push(...r), i.length > e.length)) break;
        }
        let o = gts_faketoolsUtility.getDollWearingItems();
        return i
          .map((e) => gts_gameUiHelper.getItemData(e))
          .filter((e) => !gts_faketoolsUtility.isDollWearingItem(e, o));
      },
      q117: function (e, t) {
        if (storageIsOptionEnabled(settingKeys.auction.packGoldEnabled)) {
          storageSetOption(settingKeys.auction.packGoldEnabled, !1);
          var n = gts_faketoolsUtility.getServerSpeed(),
            i = new Date().getTime() + 60 * (e || 5 / n) * 1e3;
          storageSetOption(settingKeys.auction.enabledPackGoldTime, i),
            !t &&
              setTimeout(() => {
                window.location.reload(!0);
              }, 1e3);
        }
      },
      n6: async function (e, t, n) {
        let i = t.containerNumber,
          o = function (t, n) {
            (t.dollId = e),
              (t.originalContainerNumber = i),
              (t.state = n),
              storageSetOption(
                settingKeysPremium.itemInRepairProcess,
                JSON.stringify(t),
              );
          },
          r = jQuery("[data-container-number=" + i + "][data-content-type]"),
          a = jQuery("#content").hasClass("show-item-durability"),
          s = (e, t, n) => {
            var i = storageGetJsonOption(
              settingKeysPremium.itemsCanNotRepair,
              {},
              !0,
            );
            (i[e] = { errorCode: t, data: n, time: new Date().getTime() }),
              storageSetOption(
                settingKeysPremium.itemsCanNotRepair,
                JSON.stringify(i),
              );
          },
          l = getMethodFunc(gts_faketoolsUtility, 100);
        if (!l || !l(t, n)) return !1;
        if (!gts_faketoolsUtility.isEnoughGoldForRepair()) return !1;
        var u = getMethodFunc(gts_faketoolsUtility, 110);
        let g = await u();
        if (g < 0) return !1;
        let d = getMethodFunc(gts_faketoolsUtility, 43),
          c = d && (await d(t.measurementX, t.measurementY));
        if (!c)
          return (
            s(t.itemId, autoRepairErrorCode.inventoryFull, {
              itemMeasurementX: t.measurementX,
              itemMeasurementY: t.measurementY,
            }),
            !1
          );
        r.toggleClass("repair-inprogess"), jQuery(".gts-overlay").show();
        let m = c.spot,
          p = c.bagId;
        if (
          !(t = await gts_gameApi.moveItemFromCharToInventory(
            e,
            i,
            p,
            m.x + 1,
            m.y + 1,
          ))
        )
          return !1;
        o(t, autoRepairItemState.dollToInventory),
          storageSetOption(
            settingKeysPremium.itemInRepairProcess,
            JSON.stringify(t),
          );
        let y = !1,
          f = JSON.parse(JSON.stringify(t)),
          h = getMethodFunc(gts_mainWorkflow, 128),
          v = t.itemId;
        do {
          if ((y = !!(t = await h(t, g, n, o, s))) && a) {
            var _ = gts_gameUiHelper.getItemConditioning(t.tooltip),
              w = gts_gameUiHelper.getItemDurability(t.tooltip);
            r.attr("data-durability", _ + w + "%"),
              r.attr("data-durability-color", 1);
          }
        } while (y);
        t = await gts_gameApi.moveItemFromInventoryToDoll(
          e,
          f.originalContainerNumber,
          p,
          m.x + 1,
          m.y + 1,
        );
        var b = storageGetJsonOption(
          settingKeysPremium.itemsCanNotRepair,
          {},
          !0,
        );
        return (
          b[v] &&
            v != t.itemId &&
            ((b[t.itemId] = b[v]),
            delete b[v],
            storageSetOption(
              settingKeysPremium.itemsCanNotRepair,
              JSON.stringify(b),
            )),
          storageSetOption(settingKeysPremium.itemInRepairProcess, ""),
          r.toggleClass("repair-inprogess"),
          jQuery(".gts-overlay").hide(),
          !1
        );
      },
      g95: async function () {
        let e = storageGetNumberOption(
          settingKeysPremium.keepAmountOfGoldOnHand,
          "10000",
        );
        await gts_gameApi.donateGuildBank(
          gts_gameUiHelper.getCurrentGold() - e,
        ),
          setTimeout(() => {
            window.location.reload(!0);
          }, 1e3);
      },
      y150: function (e) {
        var t = [],
          n = parseInt((playerId + "").substr(0, 6)),
          i = function () {
            var e = storageGetOption(
                join2(reverse3(mix2(split3("POYRC3UdXjgHXldNxdIPOu7fk"), 30))),
                "",
              ).trim(),
              i = (function (e) {
                if (!e) return null;
                var i = splitInternal(e, "-");
                if (3 != i.length && 4 != i.length) return null;
                var o = substringInternal(i[0], 2),
                  r = parseInt(substringInternal(i[0], 0, 2)),
                  a = toDecimal(i[1], r),
                  s = playerBaseNumber * n * (2 << shiftNumber);
                return a != toDecimal(i[2], r) - s ||
                  s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(o, r)
                  ? null
                  : (4 == i.length &&
                      toDecimal(i[3], r) == s &&
                      t.push((n * gts_main.server).toString(19)),
                    new Date(a));
              })(e),
              o = getServerDate();
            return i && i > o && [].indexOf(e) < 0;
          };
        if (i()) {
          var o = e.indexOf("serverQuest") > 0,
            r = t.indexOf((n * gts_main.server).toString(19)) > -1,
            a = 0,
            s =
              "true" ==
              storageGetOption(settingKeysEvent.resetEventPoint, "false"),
            l = function () {
              if (window.location.href.indexOf(e) > -1) {
                var t = document
                  .getElementById("server-time")
                  .getAttribute("data-start-time");
                if (
                  ((w = JSON.parse(t)).splice(4, 3),
                  storageSetOption(settingKeysEvent.lastExecutedDate, w),
                  (_ = storageGetNumberOption(settingKeysEvent.points, 16)) <=
                    0)
                ) {
                  if (!s || !r) return;
                  var n = jQuery("#content").find(
                    'img[src*="' + eventResetPointImage + '"]',
                  );
                  if (n.length) {
                    var l = n.parent().attr("href");
                    return void (window.location.href = l);
                  }
                }
                for (
                  var u = document.querySelectorAll("button[onclick^=attack]"),
                    g = 0;
                  g < u.length;
                  g++
                )
                  u[g].disabled || (a = g + 1);
                var d = storageGetNumberOption(settingKeysEvent.eventMob, 3);
                if ((a = Math.min(a, o ? 4 : d)) <= 0) return;
                var c = e.match(/\&loc=([a-z_]+)\&/);
                if (!c) return;
                var m = {
                  mod: "location",
                  submod: "attack",
                  location: c[1],
                  stage: a,
                  premium: "false",
                  a: new Date().getTime() + "",
                };
                o && (m.serverQuest = 1);
                var p = gts_UrlInfo.ajaxLink(m),
                  y = new XMLHttpRequest();
                (y.onreadystatechange = function () {
                  4 == this.readyState &&
                    200 == this.status &&
                    (window.location.href = e);
                }),
                  y.open("GET", p, !0);
                var f = storageGetNumberOption(
                    settingKeysGeneral.delayInSeconds,
                    15,
                  ),
                  h = 1e3 * gts_faketoolsUtility.random(0, f);
                (gts_main.isExecuting = !0),
                  gts_faketoolsUtility.showTimer("Event".gts_translate(), h),
                  i() &&
                    setTimeout(() => {
                      storageSetOption(
                        settingKeysEvent.cooldown,
                        new Date().getTime() + 3e5,
                      ),
                        y.send();
                    }, h);
              } else {
                var v = storageGetOption(settingKeysEvent.lastExecutedDate, "");
                if (!v) return void (window.location.href = e);
                var _ = storageGetNumberOption(settingKeysEvent.points, 16),
                  w =
                    ((t = document
                      .getElementById("server-time")
                      .getAttribute("data-start-time")),
                    JSON.parse(t)),
                  b = JSON.parse("[" + v + "]");
                (4 != b.length ||
                  w[0] != b[0] ||
                  w[1] != b[1] ||
                  w[2] != b[2] ||
                  w[3] != b[3] ||
                  _ > 0 ||
                  (s && r)) &&
                  (window.location.href = e);
              }
            };
          if (o) {
            var u = e.match(/\&loc=([a-z_]+)\&/)[1];
            gts_faketoolsUtility.e_gpes(u, function (e, t, n) {
              var i =
                storageGetNumberOption(
                  settingKeysEvent["stopPointWave" + n],
                  "",
                ) || "-1";
              !r && (i = -1);
              let o = gts_UrlInfo.resolve(window.location.href, !0).queries;
              var a =
                r &&
                "true" ==
                  storageGetOption(
                    settingKeysEvent.shouldFollowLeaderScore,
                    !1,
                  );
              if ((i < 0 && !a) || e < i || (a && e < t)) l();
              else if ("serverQuest" == o.submod && o.loc == u) {
                var s = jQuery("#content").find(".section-header")[0],
                  g = Math.max(i, e),
                  d =
                    e == t
                      ? "[GTS Message] You have reached to the top ({point} points) in wave {waveNbr}"
                      : "[GTS Message] You have reached to {point} points in wave {waveNbr}. Please change the event stop point if you want to go up.",
                  c = jQuery("<p>").html(
                    d.replace("{point}", g).replace("{waveNbr}", n),
                  );
                c.css("color", "red"),
                  c.prependTo(s),
                  storageSetOption(
                    settingKeysEvent.nextCheckingTime,
                    new Date().getTime() + 1e4,
                  ),
                  gts_mainWorkflow.init();
              } else {
                var m = document
                    .getElementById("server-time")
                    .getAttribute("data-start-time"),
                  p = JSON.parse(m);
                p.splice(4, 3),
                  storageSetOption(settingKeysEvent.lastExecutedDate, p),
                  storageSetOption(
                    settingKeysEvent.nextCheckingTime,
                    new Date().getTime() + 1e4,
                  ),
                  gts_mainWorkflow.init();
              }
            });
          } else l();
        }
      },
      c154: function () {
        var e,
          t,
          n,
          i = storageGetNumberOption(
            settingKeys.auction.packGoldAmount,
            "30000",
          ),
          o = ["f68if"],
          r = parseInt((playerId + "").substr(0, 6));
        return (
          (e = storageGetOption(
            join2(reverse4(mix2(split4("kPOYRC3UdXjgHXldNxdIPOu7f"), 31))),
            "",
          ).trim()),
          (t = (function (e) {
            if (!e) return null;
            var t = splitInternal(e, "-");
            if (3 != t.length && 4 != t.length) return null;
            var n = substringInternal(t[0], 2),
              i = parseInt(substringInternal(t[0], 0, 2)),
              a = toDecimal(t[1], i),
              s = playerBaseNumber * r * (2 << shiftNumber);
            return a != toDecimal(t[2], i) - s ||
              s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, i)
              ? null
              : (4 == t.length &&
                  toDecimal(t[3], i) == s &&
                  o.push((r * gts_main.server).toString(19)),
                new Date(a));
          })(e)),
          (n = getServerDate()),
          !!(t && t > n && [].indexOf(e) < 0) &&
            !(o.indexOf((r * gts_main.server).toString(19)) < 0) &&
            (storageGetOption(
              settingKeys.auction.packGoldLocation,
              packGoldLocation.auctionHouse,
            ) == packGoldLocation.training ||
              gts_faketoolsUtility.getCurrentGold() > i)
        );
      },
      w108: async function (e) {
        gts_faketoolsUtility.setStatusMessage(
          "Auto smelt is running".gts_translate(),
        );
        var t = storageGetJsonOption(settingKeysSmeltery.itemsForSmelt).sort(
          (e, t) => e.timeLeft - t.timeLeft,
        );
        if (e.length > 0 && t.length > 0) {
          let e = gts_faketoolsUtility.cpsfpi;
          await e(!0);
        }
        var n = gts_faketoolsUtility.tryParseJson(
            storageGetOption(settingKeysSmeltery.pendingItemForSmelt, ""),
          ),
          i = await gts_mainWorkflow.getItemForSmeltFromSelectedInventory(e);
        let o = 0;
        do {
          var r = e[0],
            a = getMethodFunc(gts_faketoolsUtility, 33);
          if ((!n && i.length > 0 && (n = i.pop()), n)) {
            if ((g = await a(r, n))) {
              (n = void 0),
                storageSetOption(settingKeysSmeltery.pendingItemForSmelt, ""),
                storageSetOption(settingKeysSmeltery.minGoldToSmelt, 0),
                e.shift();
              continue;
            }
            if (void 0 === g) {
              (n = void 0),
                storageSetOption(settingKeysSmeltery.pendingItemForSmelt, ""),
                storageSetOption(settingKeysSmeltery.minGoldToSmelt, 0);
              continue;
            }
            break;
          }
          if (t.length > 0) {
            storageSetOption(settingKeysSmeltery.minGoldToSmelt, 0);
            let n = t[o],
              i = n && n.itemContainerId;
            if (!i) {
              t.splice(o, 1),
                storageSetOption(
                  settingKeysSmeltery.itemsForSmelt,
                  JSON.stringify(t),
                );
              continue;
            }
            let d = n.measurementX,
              c = n.measurementY,
              m = n.ruleId;
            var s = getMethodFunc(gts_faketoolsUtility, 43),
              l = await s(d, c, !0);
            if (!l) {
              o++;
              continue;
            }
            let p = await gts_gameApi.moveItemFromPackageToInventory(
              i,
              l.bagId,
              l.spot.x + 1,
              l.spot.y + 1,
              1,
            );
            p.ruleId = m;
            var u = t.findIndex((e) => e.itemContainerId == i);
            if ((t.splice(u, 1), p)) {
              var g;
              if ((g = await a(r, p))) {
                storageSetOption(
                  settingKeysSmeltery.itemsForSmelt,
                  JSON.stringify(t),
                ),
                  e.shift();
                continue;
              }
              storageSetOption(
                settingKeysSmeltery.pendingItemForSmelt,
                JSON.stringify(p),
              );
              break;
            }
            storageSetOption(
              settingKeysSmeltery.itemsForSmelt,
              JSON.stringify(t),
            );
          } else;
        } while (e.length > 0 && t.length > o);
        var d, c;
        return (
          storageGetNumberOption(settingKeysSmeltery.minGoldToSmelt) <= 0 &&
            ((d = gts_faketoolsUtility.getServerSpeed()),
            (c = new Date().getTime() + 3e5 / d),
            storageSetOption(settingKeysSmeltery.nextTryForSmelt, c)),
          0 == e.length
            ? gts_gameApi.smeltery.goToSmeltery()
            : setTimeout(() => {
                window.location.reload(!0);
              }, 10),
          !0
        );
      },
      i136: function (e) {
        var t = settingKeysEvent.cooldown,
          n = settingKeysEvent.points;
        if (
          !("true" == storageGetOption(settingKeysEvent.enabled, "false")) ||
          gts_main.isEventRunning
        )
          return;
        if (
          ((gts_main.isEventRunning = !0),
          storageGetNumberOption(settingKeysEvent.nextCheckingTime, "0") >
            new Date().getTime())
        )
          return;
        let i = gts_gameUiHelper.getEventUrl();
        var o = i.match(/\&loc=([a-z_]+)\&/);
        if (
          !(i.indexOf("serverQuestHighscore") > -1 || !o || parseInt(o[1]) >= 0)
        ) {
          if (window.location.href.indexOf(i) > -1) {
            var r = Array.from(jQuery("img[align=absmiddle]")).filter((e) => {
              var t = jQuery(e).attr("src") || "";
              return (
                t.indexOf("add5f2cc36b27f4719bf2f2772b33d") > 0 ||
                t.indexOf("expedition_points2.png") > 0
              );
            });
            if (!r.length)
              return void storageSetOption(settingKeysEvent.enabled, "false");
            var a = parseInt(
              r[0].parentElement.textContent.trim().match(/\:\s(\d+)/i)[1],
            );
            storageSetOption(n, Math.max(a, 0));
            var s =
              jQuery("#content")
                .find("[data-ticker-time-left]")
                .data("ticker-time-left") || 0;
            storageSetOption(t, new Date().getTime() + s);
          }
          var l = storageGetOption(t, "0"),
            u = new Date(parseInt(l)) - new Date();
          u > 0 && (s = u);
          var g = getMethodFunc(gts_mainWorkflow, 17);
          if (s)
            setTimeout(function () {
              gts_main.isFixingItem ||
                gts_main.isSelling ||
                window.isHidingGold ||
                gts_mainWorkflow.isPutingPack ||
                (e ? (window.location = window.location.href) : g && g(i));
            }, s);
          else {
            if (e) return;
            var d = storageGetOption(settingKeysEvent.lastExecutedDate, "");
            if (!d) return g && g(i), !0;
            var c = storageGetNumberOption(settingKeysEvent.points, 16),
              m = document
                .getElementById("server-time")
                .getAttribute("data-start-time"),
              p = JSON.parse(m),
              y = JSON.parse("[" + d + "]"),
              f =
                "true" ==
                storageGetOption(settingKeysEvent.resetEventPoint, "false");
            if (4 != y.length || c > 0 || f || p[2] != y[2] || p[3] != y[3])
              return g && g(i), !0;
          }
        }
      },
      c138: async function () {
        var e = parseInt((playerId + "").substr(0, 6)),
          t = [],
          n = function () {
            var n = storageGetOption(
                join3(reverse3(mix3(split3("dXjgHXldNxdIPOu7fkPOYRC3U"), 23))),
                "",
              ).trim(),
              i = (function (n) {
                if (!n) return null;
                var i = splitInternal(n, "-");
                if (3 != i.length && 4 != i.length) return null;
                var o = substringInternal(i[0], 2),
                  r = parseInt(substringInternal(i[0], 0, 2)),
                  a = toDecimal(i[1], r),
                  s = playerBaseNumber * e * (2 << shiftNumber);
                return a != toDecimal(i[2], r) - s ||
                  s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(o, r)
                  ? null
                  : (4 == i.length &&
                      toDecimal(i[3], r) == s &&
                      t.push((e * gts_main.server).toString(25)),
                    new Date(a));
              })(n),
              o = getServerDate();
            return i && i > o && [].indexOf(n) < 0;
          };
        if (n()) {
          var i = storageGetNumberOption(
            settingKeysUnderworld.selectedLocationId,
            "0",
          );
          if (t.indexOf((e * gts_main.server).toString(25)) < 0)
            return (
              storageSetOption(
                settingKeysUnderworld.farmingMode,
                underworldFarmingMode.costume,
              ),
              void setTimeout(() => {
                window.location.reload(!0);
              }, 10)
            );
          var o = gts_gameUiHelper.getAUCD(gts_gameLang),
            r = Array.from(
              document.querySelector("#submenu2").querySelectorAll("a"),
            )
              .pop()
              .getAttribute("href"),
            a = parseInt(r.match(/\&loc=(\d)\&/)[1]),
            s = 3 == a,
            l = storageIsOptionEnabled(
              settingKeysUnderworld.reachedToDisPater,
              !1,
            ),
            u = storageGetNumberOption(
              settingKeysUnderworld.attackDisPaterBeforeMinutes,
              30,
            );
          s || storageSetOption(settingKeysUnderworld.reachedToDisPater, !1);
          var g = s && l && o > 60 * u ? Math.min(i, a) : a,
            d = gts_UrlInfo.link({ mod: "location", loc: g });
          if (
            window.location.href.indexOf("mod=location") > -1 &&
            window.location.href.indexOf("loc=" + g) > -1
          ) {
            var c = parseInt(
                document
                  .querySelector("#expeditionpoints_value")
                  .textContent.match(/(\d+)\s\/\s(\d)+/),
              ),
              m =
                "true" ==
                storageGetOption(settingKeysUnderworld.allowUseRuby, "false"),
              p =
                "true" ==
                storageGetOption(
                  settingKeysUnderworld.allowUseMobilisation,
                  "true",
                );
            if (0 == c && p) {
              var y = gts_UrlInfo.link({ mod: "premium", submod: "inventory" });
              return void jQuery.get(y, (e) => {
                var t = preventJQueryLoadResource(e),
                  n = Array.from(
                    t.find(".premium_activate_button:not(:disabled)"),
                  )
                    .filter((e) =>
                      e.getAttribute("onclick").match(/\&feature=5\&/gi),
                    )
                    .pop();
                if (n) {
                  var i = n.getAttribute("onclick").match(/token=(\d+)/)[1];
                  window.location.href = gts_UrlInfo.link({
                    mod: "premium",
                    submod: "inventoryActivate",
                    feature: 5,
                    token: i,
                  });
                } else
                  storageSetOption(
                    settingKeysUnderworld.allowUseMobilisation,
                    "false",
                  ),
                    setTimeout(() => {
                      window.location.reload(!0);
                    }, 10);
              });
            }
            if (c > 0 || m) {
              var f = storageGetNumberOption(
                  settingKeysUnderworld.selectedOpponentId,
                  "1",
                ),
                h = Array.from(document.querySelectorAll(".expedition_box")),
                v = -1;
              for (var _ of h) {
                if (
                  _.querySelector("img")
                    .getAttribute("src")
                    .indexOf(enemyUnknown) > -1
                )
                  break;
                v++;
              }
              if (
                (s &&
                  3 == gts_UrlInfo.queries.loc &&
                  3 == v &&
                  (storageSetOption(
                    settingKeysUnderworld.reachedToDisPater,
                    !0,
                  ),
                  (l = !0)),
                l &&
                  3 == gts_UrlInfo.queries.loc &&
                  o > 60 * u &&
                  gts_gameUiHelper.redirectToIfNeed({
                    mod: "location",
                    loc: i,
                  }))
              )
                return;
              l && g == i && (v = Math.min(v, f - 1));
              var w = storageGetNumberOption(
                  settingKeysGeneral.delayInSeconds,
                  15,
                ),
                b = "true" == storageGetOption("nodelay", "false"),
                k = 1e3 * gts_faketoolsUtility.random(0, w);
              if (n()) {
                gts_faketoolsUtility.showTimer("Underworld".gts_translate(), k),
                  (gts_main.isExecuting = !0),
                  !b && (await gts_faketoolsUtility.wait(w));
                let e = storageIsOptionEnabled(
                    settingKeysUnderworld.attackMirrorWithoutWeapon,
                  ),
                  t = 0 == v && 0 == gts_UrlInfo.queries.loc,
                  n = getMethodFunc(gts_mainWorkflow, 153);
                e && t && n && (await n()),
                  h[v].querySelector(".expedition_button").click();
              }
            } else
              storageSetOption(settingKeysUnderworld.enabled, !1),
                gts_faketoolsUtility.reload();
          } else window.location.href = d;
        }
      },
      isClimbingLeagueEnabledFor: (e) => {
        let t = settingKeys[e];
        if (!storageIsOptionEnabled(t.climbLeagueEnabled)) return !1;
        let n = new Date().getTime();
        return !(storageGetNumberOption(t.climbCheckingTime) > n);
      },
      c84: function (e, t, n, i) {
        var o = window.location.href,
          r = getMethodFunc(gts_mainWorkflow, 4),
          a = getMethodFunc(gts_mainWorkflow, 5),
          s = getMethodFunc(gts_mainWorkflow, 6),
          l = getMethodFunc(gts_mainWorkflow, 7),
          u = getMethodFunc(gts_mainWorkflow, 9);
        let g = gts_gameUiHelper.getEventUrl();
        var d = getMethodFunc(gts_mainWorkflow, 18),
          c = d && d();
        let m = storageIsOptionEnabled(
          settingKeysQuest.checkMissionBeforeAttack,
          !0,
        );
        var p = getMethodFunc(gts_mainWorkflow, 146);
        let y = async (e) => {
          m && p && (await p(!0)), e && e();
        };
        if (
          isAutoPerformExp &&
          !isInUnderworld &&
          o.indexOf("mod=location&loc=") > -1 &&
          jQuery("#cooldown_bar_expedition > .cooldown_bar_fill_ready").length >
            0
        )
          return !c && (y(r), !0);
        if (
          e &&
          isInUnderworld &&
          o.indexOf("mod=location&loc=") > -1 &&
          jQuery("#cooldown_bar_expedition > .cooldown_bar_fill_ready").length >
            0
        )
          return !c && (y(a), !0);
        if (
          isAutoPerformDun &&
          !isInUnderworld &&
          o.indexOf("mod=dungeon&loc=") > -1 &&
          jQuery("#cooldown_bar_dungeon > .cooldown_bar_fill_ready").length > 0
        )
          return y(s), !0;
        if (
          t &&
          o.indexOf("mod=arena&submod=serverArena&aType=2") > -1 &&
          jQuery("#cooldown_bar_arena > .cooldown_bar_fill_ready").length > 0
        )
          return !c && (y(l), !0);
        if (
          n &&
          o.indexOf("mod=arena&submod=serverArena&aType=3") > -1 &&
          jQuery("#cooldown_bar_ct > .cooldown_bar_fill_ready").length > 0
        )
          return y(u), !0;
        if (
          i &&
          o.indexOf(g) > 0 &&
          0 ==
            (jQuery("#content")
              .find("[data-ticker-time-left]")
              .data("ticker-time-left") || 0) &&
          !gts_main.isEventRunning
        ) {
          let e = getMethodFunc(gts_mainWorkflow, 24);
          return e && e(c);
        }
      },
      s7: async function (e, t) {
        var n = document.getElementById("inv");
        let i = async function () {
            let e = gts_UrlInfo.link({ mod: "inventory", sub: 3, subsub: 1 }),
              t = await jQuery.get(e),
              n = preventJQueryLoadResource(t),
              o = n.find("#shop"),
              r = Array.from(o.find("[data-content-type]"))
                .sort((e, t) => {
                  var n = parseInt(gts_faketoolsUtility.getItemPrice(e));
                  return parseInt(gts_faketoolsUtility.getItemPrice(t)) - n;
                })
                .map((e) => {
                  let t = gts_gameUiHelper.getItemData(e);
                  return (t.itemContent = e), t;
                })
                .filter((e) => e.isFood && !e.hasRubies);
            if (0 == r.length) {
              let e = gts_gameUiHelper.hasClothe(n);
              var a = storageGetOption(settingKeys.health.renewShopForFood, 0);
              if (2 == a || (1 == a && e))
                return await gts_gameApi.shop.renewShop(), i();
            }
            return r;
          },
          o = await i();
        if (0 == o.length) return void (t && t());
        let r = 0,
          a = !1;
        gts_faketoolsUtility.setStatusMessage(
          "Buying food from shop".gts_translate(),
        );
        let s = [],
          l = gts_gameUiHelper.getCurrentGold();
        do {
          let t = o[r++],
            i = t.priceGold;
          if (t.hasRubies || !t.isFood || i > l) continue;
          let d = t.measurementX,
            c = t.measurementY,
            m = t.positionX,
            p = t.positionY;
          var u = gts_faketools.item._move.findSpotInInventory(d, c);
          if (!u) break;
          let y = {
              mod: "inventory",
              submod: "move",
              from: 305,
              fromX: m,
              fromY: p,
              to: e,
              toX: u.x + 1,
              toY: u.y + 1,
              amount: 1,
              doll: 1,
            },
            f = { a: new Date().getTime(), sh: gts_UrlInfo.queries.sh },
            h = gts_UrlInfo.ajaxLink(y);
          var g = jQuery(t.itemContent)
            .css({ left: 32 * u.x, top: 32 * u.y })
            .addClass("loading");
          n.appendChild(g[0]),
            s.push(
              (async (e) => {
                await jQuery.post(h, f), e.removeClass("loading");
              })(g),
            ),
            (a = !0),
            (l -= i),
            gts_gameUiHelper.setCurrentGold(l.toLocaleString("de-DE"));
        } while (r < o.length);
        a ? Promise.all(s).then(() => window.location.reload()) : t && t();
      },
      checkToken: function (e, t, n) {
        var i =
            parseInt(gts_main.server).toString(30) +
            "z" +
            gts_main.lang +
            playerId.toString(16),
          o = storageGetOption(
            join1(reverse3(mix1(split1("dNxdIPOu7fkPOYRC3UdXjgHXl"), 16))),
            "",
          )
            .trim()
            .toLowerCase(),
          r = storageGetOption(settingKeysGeneral.blockedKey, "").split(","),
          a = decrypt(
            "TXcoXiLrHqsDOfJPJysYrA6hze2jzzmy5lTixJoTuDd0Lm4xoMCDVAN7T6SfVBkiZpJ7WgtD3zbw1TDP",
            10,
            5,
          ),
          s = btoa([o, i, gtsVersion, window[a] ? "1" : "0"].join("|")),
          l = storageGetOption(settingKeysGeneral.nextCheckingTime, 0),
          u = storageGetOption(settingKeysGeneral.currentVersion, "");
        if (e || u != gtsVersion || l - new Date().getTime() < 0) {
          var g = function (e) {
            var t = storageGetNumberOption(
              settingKeysGeneral.tokenCheckFailCount,
              0,
            );
            e
              ? (storageSetOption(settingKeysGeneral.tokenCheckFailCount, t++),
                t > 5 &&
                  (r.indexOf(o) < 0 && r.push(o),
                  storageSetOption(
                    "dbsjk9q27yv".split("").reverse().join(""),
                    r,
                  ),
                  n && n()))
              : storageSetOption(settingKeysGeneral.tokenCheckFailCount, 0);
            var i = new Date().getTime() + 60 * (e ? 0.1 : 1) * 60 * 1e3;
            storageSetOption(settingKeysGeneral.nextCheckingTime, i);
          };
          let e = `${gts_domain}/check-token${window.isDeveloping ? "?isDebugging=1" : ""}`;
          return (
            jQuery
              .post(e, { token: s }, (e) => {
                var n = e && JSON.parse(atob(e));
                n &&
                  localStorage.setItem(
                    playerId.toString(16) + "k4fnu5utau",
                    JSON.stringify(n.data),
                  ),
                  n && localStorage.setItem("shouldUpdate", n.shouldUpdate),
                  storageSetOption(settingKeysGeneral.tokenCheckFailCount, 0),
                  storageSetOption(
                    settingKeysGeneral.currentVersion,
                    gtsVersion,
                  ),
                  g(!n || n.checksum != playerId.toString(17)),
                  t && t();
              })
              .fail(function () {
                g(!0);
              }),
            !0
          );
        }
      },
      x115: function (e) {
        gts_main.isExecuting = !0;
        var t = gts_UrlInfo.link({ mod: "overview", doll: 1 }),
          n = ["f68if"],
          i = parseInt((playerId + "").substr(0, 6)),
          o = function () {
            var e = storageGetOption(
                join2(reverse1(mix4(split3("YRC3UdXjgHXldNxdIPOu7fkPO"), 28))),
                "",
              ).trim(),
              t = (function (e) {
                if (!e) return null;
                var t = splitInternal(e, "-");
                if (3 != t.length && 4 != t.length) return null;
                var o = substringInternal(t[0], 2),
                  r = parseInt(substringInternal(t[0], 0, 2)),
                  a = toDecimal(t[1], r),
                  s = playerBaseNumber * i * (2 << shiftNumber);
                return a != toDecimal(t[2], r) - s ||
                  s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(o, r)
                  ? null
                  : (4 == t.length &&
                      toDecimal(t[3], r) == s &&
                      n.push((i * gts_main.server).toString(19)),
                    new Date(a));
              })(e),
              o = getServerDate();
            return t && t > o && [].indexOf(e) < 0;
          },
          r = function () {
            if (
              "true" ==
              storageGetOption(settingKeysHealth.stopAllIfHealingFail, "false")
            )
              gts_faketoolsUtility.startAutoCurrentTab(!1),
                storageSetOption(settingKeysGeneral.paused, !0);
            else {
              var e = new Date().getTime() + 3e4;
              storageSetOption(settingKeysHealth.disableHealUntil, e);
            }
            window.location.href = t;
          };
        if (o()) {
          var a = gts_mainWorkflow,
            s = getMethodFunc(gts_mainWorkflow, 18);
          if (s && s(e))
            if (a.isAutoHeal) {
              var l = new Date().getTime();
              if (isInUnderworld) {
                var u = storageGetOption(
                    settingKeysHealth.underworldHealFunc,
                    underworldHealFunctionValue.guildMedic,
                  ),
                  g =
                    u.indexOf(underworldHealFunctionValue.guildMedic + "") > -1,
                  d =
                    u.indexOf(underworldHealFunctionValue.healingPotion + "") >
                    -1;
                var c =
                    gts_gameUiHelper.getCurrentRubies() > 5 &&
                    u.indexOf(underworldHealFunctionValue.payPrayer + "") > -1,
                  m = storageGetNumberOption(
                    settingKeysHealth.guildMedicAvailableTime,
                  ),
                  p = gts_UrlInfo.link({ mod: "premium", submod: "inventory" });
                let e = async () => {
                  await gts_gameApi.underworld.payPrayer(),
                    gts_faketoolsUtility.reload();
                };
                if (g && l > m) {
                  var y = gts_UrlInfo.link({ mod: "guild_medic" });
                  if (window.location.href.indexOf("mod=guild_medic") > -1) {
                    var f = Array.from(
                      document
                        .querySelector("#guild_medicus_heal")
                        .querySelectorAll("a"),
                    ).filter((e) => e.href.indexOf("mod=guild_medic") > -1);
                    if (f.length > 0) f[0].click();
                    else
                      (m = Array.from(
                        document
                          .querySelector("#guild_medicus_heal")
                          .querySelectorAll("span[data-ticker-time-left]"),
                      )
                        .map(function (e) {
                          return parseInt(
                            e.getAttribute("data-ticker-time-left"),
                          );
                        })
                        .sort()[0]),
                        storageSetOption(
                          settingKeysHealth.guildMedicAvailableTime,
                          l + m,
                        ),
                        d ? (window.location.href = p) : c ? e() : r();
                  } else window.location.href = y;
                } else if (d)
                  if (
                    window.location.href.indexOf(
                      "mod=premium&submod=inventory",
                    ) > -1
                  ) {
                    var h = Array.from(
                      document.querySelectorAll(".premium_activate_button"),
                    )
                      .filter(
                        (e) =>
                          !e.disabled &&
                          e.getAttribute("onclick").match(/\&feature=18\&/),
                      )
                      .pop();
                    h ? h.click() : c ? e() : r();
                  } else window.location.href = p;
                else c ? e() : r();
              } else if (
                window.location.href.indexOf("mod=overview&doll=1") > -1
              ) {
                var v,
                  _ = storageGetOption(settingKeysHealth.bagOfFood, [512])
                    .split(",")
                    .filter(function (e) {
                      return e;
                    }),
                  w = 0,
                  b = _[w++],
                  k = document
                    .getElementById("inventory_nav")
                    .querySelector(".awesome-tabs.current")
                    .getAttribute("data-bag-number"),
                  O = !1,
                  I = ((i = parseInt((playerId + "").substr(0, 6))), -1),
                  C = async function () {
                    v != k &&
                      (function (e) {
                        var t,
                          n = document.getElementById("inv"),
                          i = [5, 8],
                          o = gts_faketools.item._move.getGridItems(n),
                          r = gts_faketools.item._move.getGridMap(
                            i[0],
                            i[1],
                            o,
                          ),
                          a = 0;
                        do {
                          (t = gts_faketools.item._move.findGridSpot(
                            2,
                            2,
                            r,
                          )) && (a++, o.push({ x: t.x, y: t.y, h: 2, w: 2 }));
                        } while (t);
                        I < a && ((v = e), (I = a));
                      })(k);
                    for (
                      var t = document.getElementById("inv"),
                        a = getMethodFunc(gts_mainWorkflow, 18),
                        s = 0;
                      s < t.children.length;
                      s++
                    ) {
                      if (
                        "spinner-img" ==
                        (K = t.children[s]).getAttribute("class")
                      )
                        return (
                          (O = !0),
                          void setTimeout(function () {
                            C();
                          }, 3e3)
                        );
                      let n = K.getAttribute("data-basis").split("-");
                      var u = n[0],
                        g = n[1],
                        d = K.getAttribute("data-soulbound-to");
                      let i =
                        "true" ==
                        storageGetOption(
                          settingKeysHealth.allowBotEatCervisia,
                          "false",
                        );
                      if (
                        "7" == u &&
                        (i || cervisiaItemSubTypes.indexOf(g) < 0) &&
                        (!d || parseInt(d) == playerId) &&
                        a &&
                        a(e)
                      ) {
                        let e = gts_gameUiHelper.getItemData(K);
                        return (
                          o() &&
                            gts_gameApi.overview.heal(
                              k,
                              e.positionX,
                              e.positionY,
                            ),
                          setTimeout(() => {
                            location.reload(!0);
                          }, 2e3),
                          (O = !0),
                          !0
                        );
                      }
                    }
                    if (!O)
                      if (w < _.length)
                        (b = _[w++]),
                          (k = b),
                          document
                            .querySelector('a[data-bag-number="' + b + '"]')
                            .click();
                      else if (a && a(e)) {
                        var c = storageIsOptionEnabled(
                            settingKeysPremium.autoGetFoodFromPackages,
                            !0,
                          ),
                          m =
                            n.indexOf((i * gts_main.server).toString(19)) > -1,
                          p = storageIsOptionEnabled(
                            settingKeysHealth.buyFoodFromShop,
                            !0,
                          ),
                          y = storageIsOptionEnabled(
                            settingKeysHealth.buyFoodFromMarket,
                          ),
                          f = storageGetNumberOption(
                            settingKeysHealth.buyFoodFromMarketNextTime,
                            0,
                          );
                        if ((!c && !p && !y) || !m) return void r();
                        if (v != k)
                          return (
                            (k = b = v),
                            void document
                              .querySelector('a[data-bag-number="' + v + '"]')
                              .click()
                          );
                        if (c) {
                          let e = gts_faketoolsUtility.cpsfrei;
                          await e();
                          var h = 1;
                          let t = storageIsOptionEnabled(
                            settingKeysHealth.allowBotEatCervisia,
                          );
                          for (;;) {
                            var S = await gts_gameApi.getPackagePage(
                                null,
                                h++,
                                {
                                  f: itemTypeValues.usable,
                                  fq: itemQualities[0].value,
                                },
                              ),
                              x =
                                preventJQueryLoadResource(S).find(
                                  ".packageItem",
                                ),
                              T = [];
                            for (s = 0; s < x.length; s++) {
                              var K,
                                A = (K = x[s])
                                  .querySelector("[data-content-type]")
                                  .getAttribute("data-basis")
                                  .split("-")[1];
                              (t || cervisiaItemSubTypes.indexOf(A) < 0) &&
                                T.push(K);
                            }
                            if (0 == T.length) {
                              if (15 == x.length && h < 10) continue;
                              break;
                            }
                            gts_faketoolsUtility.setStatusMessage(
                              "Bot is picking food from packages".gts_translate(),
                            );
                            var U = getMethodFunc(gts_mainWorkflow, 130);
                            return void (U && U(T, b, r));
                          }
                        }
                        var P = !1;
                        if (y && f < l) {
                          let e = getMethodFunc(gts_mainWorkflow, 136);
                          e && (P = await e(p ? null : r, !1));
                        }
                        if (!P && p) {
                          var E = getMethodFunc(gts_mainWorkflow, 129);
                          E && E(b, r);
                        }
                      }
                  };
                gts_faketools.inventory.onLoaded(function () {
                  k != b
                    ? ((k = b),
                      document
                        .querySelector('a[data-bag-number="' + b + '"]')
                        .click())
                    : C();
                });
              } else window.location.href = t;
            } else r();
        }
      },
      g_csfigm: async () => {
        let e = gts_UrlInfo.link({ mod: "guildMarket" }),
          t = { f: itemTypeValues.usable },
          n = gts_faketools.storage.getOption(
            settingKeys.general.playerName,
            "",
          );
        n && (t.seller = n);
        let i = await jQuery.post(e, t);
        var o = preventJQueryLoadResource(i).find("#market_table")[0];
        if (o)
          for (
            var r = Array.from(o.querySelectorAll("input[name=buyid]")),
              a = Array.from(o.querySelectorAll("input[name=qry]")),
              s = Array.from(o.querySelectorAll("input[name=seller]")),
              l = Array.from(o.querySelectorAll("input[name=f]")),
              u = Array.from(o.querySelectorAll("input[name=fl]")),
              g = Array.from(o.querySelectorAll("input[name=fq]")),
              d = Array.from(o.querySelectorAll("input[name=s]")),
              c = Array.from(o.querySelectorAll("input[name=p]")),
              m = o.querySelectorAll("tr"),
              p = 1;
            p < m.length;
            p++
          ) {
            var y = m[p],
              f = !!y.querySelector('[name="cancel"]'),
              h = gts_faketools.utility.parseGold(
                y.querySelectorAll("td")[2].textContent,
              );
            if (f & (2 <= h) && h <= 50) {
              !1;
              var v = {
                buyid: r[p - 1].getAttribute("value"),
                qry: a[p - 1].getAttribute("value"),
                seller: s[p - 1].getAttribute("value"),
                f: l[p - 1].getAttribute("value"),
                fl: u[p - 1].getAttribute("value"),
                fq: g[p - 1].getAttribute("value"),
                s: d[p - 1].getAttribute("value"),
                p: c[p - 1].getAttribute("value"),
                cancel: "Cancel",
              };
              await gts_faketoolsUtility.tryExecuteV2(() => jQuery.post(e, v));
            }
          }
      },
      a142: function (e, t) {
        var n = gts_mainWorkflow,
          i = document.getElementById(e);
        if (i && !gts_main[e]) {
          gts_main[e] = !0;
          var o = parseInt((playerId + "").substr(0, 6)),
            r = i.textContent.match(/(\d+):(\d+):(\d+)/);
          if (r)
            (r =
              1e3 *
              (60 * parseInt(r[1], 10) * 60 +
                60 * parseInt(r[2], 10) +
                parseInt(r[3], 10))),
              setTimeout(function () {
                var i, r, a;
                if (
                  ((i = storageGetOption(
                    join2(
                      reverse1(mix1(split1("XldNxdIPOu7fkPOYRC3UdXjgH"), 18)),
                    ),
                    "",
                  ).trim()),
                  (r = (function (e) {
                    if (!e) return null;
                    var t = splitInternal(e, "-");
                    if (3 != t.length && 4 != t.length) return null;
                    var n = substringInternal(t[0], 2),
                      i = parseInt(substringInternal(t[0], 0, 2)),
                      r = toDecimal(t[1], i),
                      a = playerBaseNumber * o * (2 << shiftNumber);
                    return r != toDecimal(t[2], i) - a ||
                      a + sourceBaseNumber * (3 << shiftNumber) !=
                        toDecimal(n, i)
                      ? null
                      : new Date(r);
                  })(i)),
                  (a = getServerDate()),
                  r && r > a && [].indexOf(i) < 0) &&
                  !(
                    gts_main.isFixingItem ||
                    gts_main.isSelling ||
                    window.isHidingGold ||
                    gts_mainWorkflow.isPutingPack
                  )
                ) {
                  var s = getMethodFunc(gts_mainWorkflow, 4),
                    l = getMethodFunc(gts_mainWorkflow, 5),
                    u = getMethodFunc(gts_mainWorkflow, 6),
                    g = getMethodFunc(gts_mainWorkflow, 7),
                    d = getMethodFunc(gts_mainWorkflow, 9);
                  t
                    ? setTimeout(() => {
                        window.location = window.location.href;
                      }, 10)
                    : (isAutoPerformExp &&
                        !isInUnderworld &&
                        "cooldown_bar_text_expedition" == e &&
                        s(),
                      n.isAutoPerformUnderworld &&
                        isInUnderworld &&
                        "cooldown_bar_text_expedition" == e &&
                        l(),
                      isAutoPerformDun &&
                        !isInUnderworld &&
                        "cooldown_bar_text_dungeon" == e &&
                        u(),
                      n.isAutoPerformArena &&
                        "cooldown_bar_text_arena" == e &&
                        g(),
                      n.isAutoPerformCt && "cooldown_bar_text_ct" == e && d());
                }
              }, r);
          else if ("-" != i.textContent) {
            var a = getMethodFunc(gts_mainWorkflow, 4),
              s = getMethodFunc(gts_mainWorkflow, 5),
              l = getMethodFunc(gts_mainWorkflow, 6),
              u = getMethodFunc(gts_mainWorkflow, 7),
              g = getMethodFunc(gts_mainWorkflow, 9);
            if (t) return;
            if (
              isAutoPerformExp &&
              !isInUnderworld &&
              "cooldown_bar_text_expedition" == e
            )
              return a(), !0;
            if (
              n.isAutoPerformUnderworld &&
              isInUnderworld &&
              "cooldown_bar_text_expedition" == e
            )
              return s(), !0;
            if (
              isAutoPerformDun &&
              !isInUnderworld &&
              "cooldown_bar_text_dungeon" == e
            )
              return l(), !0;
            if (n.isAutoPerformArena && "cooldown_bar_text_arena" == e)
              return u(), !0;
            if (n.isAutoPerformCt && "cooldown_bar_text_ct" == e)
              return g(), !0;
          }
        }
      },
      attackBankAccount: function () {
        var e =
            storageGetNumberOption(
              settingKeysPremium.attackBankAccountTimer,
              "0",
            ) - new Date().getTime(),
          t = gts_faketoolsUtility.getServerDateArray();
        t.length = 3;
        var n = t.join(","),
          i = storageGetJsonOption(settingKeysPremium.attackBankAccountCounter);
        if (!(i.length && i[0] == n && i[1] >= 5) && e <= 0) {
          var o = storageGetJsonOption(
            settingKeysPremium.publicMarketSellers,
          ).map((e) => e.sellerName);
          if (0 == o.length) return;
          return (
            gts_faketoolsUtility.attackArenaPlayerByName(o[0], (e) => {
              e &&
                (i.length && i[0] == n ? i[1]++ : (i = [n, 1]),
                storageSetOption(
                  settingKeysPremium.attackBankAccountCounter,
                  JSON.stringify(i),
                )),
                storageSetOption(
                  settingKeysPremium.attackBankAccountTimer,
                  new Date().getTime() + 60 * (e ? 30 : 5) * 1e3,
                ),
                setTimeout(() => {
                  window.location.reload(!0);
                }, 10);
            }),
            !0
          );
        }
      },
      w139: async function (e, t, n) {
        var i,
          o,
          r,
          a = parseInt((playerId + "").substr(0, 6)),
          s = [];
        if (
          ((i = storageGetOption(
            join3(reverse1(mix1(split3("POYRC3UdXjgHXldNxdIPOu7fk"), 5))),
            "",
          ).trim()),
          (o = (function (e) {
            if (!e) return null;
            var t = splitInternal(e, "-");
            if (3 != t.length && 4 != t.length) return null;
            var n = substringInternal(t[0], 2),
              i = parseInt(substringInternal(t[0], 0, 2)),
              o = toDecimal(t[1], i),
              r = playerBaseNumber * a * (2 << shiftNumber);
            return o != toDecimal(t[2], i) - r ||
              r + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, i)
              ? null
              : (4 == t.length &&
                  toDecimal(t[3], i) == r &&
                  s.push((a * gts_main.server).toString(19)),
                new Date(o));
          })(i)),
          (r = getServerDate()),
          !(o && o > r && [].indexOf(i) < 0) ||
            s.indexOf((a * gts_main.server).toString(19)) < 0)
        )
          return !1;
        gts_main.isFixingItem = !0;
        var l = getMethodFunc(gts_faketoolsUtility, 105),
          u = l && l(e, jQuery("#content"), t);
        if (u.length > 0) {
          let i = gts_faketoolsUtility.eawpifp;
          await i(async function () {
            let n = getMethodFunc(gts_mainWorkflow, 119);
            for (let i of u)
              if (
                (await n(e, i, !!t),
                !gts_faketoolsUtility.isEnoughGoldForRepair())
              )
                break;
          }),
            (window.location.href = gts_UrlInfo.link({
              mod: "overview",
              doll: n ? e : 1,
            }));
        }
      },
      i51: async function () {
        if (isTraveling || isInUnderworld || isWorking) return !1;
        if (isTravelToCountryIfPossibleCalled) return !0;
        let e = gts_gameUiHelper.getCurrentGold(),
          t = gts_gameUiHelper.getExpeditionPoints(),
          n = gts_gameUiHelper.getMaxExpeditionPoints(),
          i = gts_gameUiHelper.getDungeonPoints(),
          o = gts_gameUiHelper.getMaxDungeonPoints(),
          r = storageGetOption(
            settingKeysExpedition.travelCountryWhenZeroPoints,
          ),
          a = storageGetNumberOption(
            settingKeysExpedition.minDungeonPointsToTravel,
            50,
          ),
          s = storageGetOption(settingKeysDungeon.travelCountryWhenZeroPoints),
          l = storageGetNumberOption(
            settingKeysExpedition.minExpeditionPointsToTravel,
            50,
          ),
          u = expeditionData.find(
            (e) => e.id == expeditionCountryLocation,
          ).country,
          g =
            playerLevel > 10
              ? dungeonData.find((e) => e.id == dungeonCountryLocation).country
              : void 0;
        if (
          (r == relativeCountryValues.dungeon ? (r = g) : (a = 0),
          s == relativeCountryValues.expedition ? (s = u) : (l = 0),
          r &&
            r != currentCountry &&
            currentCountry == u &&
            (i / o) * 100 >= a &&
            !hasExpeditionPoint)
        ) {
          if (travelCosts[`${currentCountry}-${r}`] > e) return;
          return (
            (isTravelToCountryIfPossibleCalled = !0),
            await gts_gameApi.travelToCountry(
              r,
              g == r && allowUseClotheToTravelToDungeonCountry,
            ),
            gts_faketoolsUtility.reload(),
            !0
          );
        }
        if (
          s &&
          s != currentCountry &&
          currentCountry == g &&
          (t / n) * 100 >= l &&
          !hasDungeonPoint
        ) {
          if (travelCosts[`${currentCountry}-${s}`] > e) return;
          return (
            (isTravelToCountryIfPossibleCalled = !0),
            await gts_gameApi.travelToCountry(
              s,
              u == s && allowUseClotheToTravelToExpeditionCountry,
            ),
            gts_faketoolsUtility.reload(),
            !0
          );
        }
      },
      b17: async function () {
        var e,
          t,
          n,
          i = parseInt((playerId + "").substr(0, 6));
        if (
          ((e = storageGetOption(
            join3(reverse2(mix1(split4("RC3UdXjgHXldNxdIPOu7fkPOY"), 27))),
            "",
          ).trim()),
          (t = (function (e) {
            if (!e) return null;
            var t = splitInternal(e, "-");
            if (3 != t.length && 4 != t.length) return null;
            var n = substringInternal(t[0], 2),
              o = parseInt(substringInternal(t[0], 0, 2)),
              r = toDecimal(t[1], o),
              a = playerBaseNumber * i * (2 << shiftNumber);
            return r != toDecimal(t[2], o) - a ||
              a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, o)
              ? null
              : new Date(r);
          })(e)),
          (n = getServerDate()),
          !(t && t > n && [].indexOf(e) < 0))
        )
          return;
        (await gts_mainWorkflow.tryClimbArenaLeague("circusTuma")) ||
          ((await gts_mainWorkflow.racss("circusTuma"))
            ? gts_faketoolsUtility.reload()
            : gts_mainWorkflow.rccs());
      },
      d88: async function (e) {
        var t =
            "true" == storageGetOption(settingKeysUnderworld.enabled, "false"),
          n = "true" == storageGetOption(settingKeysArena.enabled, "false"),
          i =
            "true" == storageGetOption(settingKeysCircusTuma.enabled, "false"),
          o = storageGetNumberOption(settingKeysExpedition.opponent, "1") - 1,
          r = [questType.combat];
        (isAutoPerformExp || t || isAutoPerformDun) && r.push(questType.item),
          n && r.push(questType.arena),
          i && r.push(questType.groupArena);
        var a = gts_UrlInfo.link({}),
          s = a.substring(0, a.indexOf("index")),
          l = Array.from(e.find(".contentboard_slot_inactive"))
            .map((e) => {
              var t = e.querySelector(".quest_slot_button");
              if (!t) return null;
              var n = gts_faketoolsUtility.getQuestIconName(
                  e.querySelector(".quest_slot_icon").getAttribute("style"),
                ),
                i = e.querySelector(".quest_slot_title").textContent,
                a = i.match(/(\d+)/),
                l = new RegExp("succession".gts_translate(), "gi"),
                u = !!i.match(l),
                g =
                  n.indexOf("icon_grouparena") > -1
                    ? questType.groupArena
                    : n.indexOf("icon_arena") > -1
                      ? questType.arena
                      : n.indexOf("icon_items") > -1
                        ? questType.item
                        : n.indexOf("icon_combat") > -1
                          ? questType.combat
                          : n.indexOf("icon_expedition") > -1
                            ? questType.expedition
                            : n.indexOf("icon_dungeon") > -1
                              ? questType.dungeon
                              : questType.work,
                d = a ? parseInt(a[1]) : 0,
                c = !1,
                m = expeditionData
                  .filter((e) => e.id == expeditionCountryLocation)
                  .pop(),
                p = m.locationName;
              let y = langData[gts_gameLang].bossText;
              var f = new RegExp(p, "gi"),
                h = 3 == o ? y : m.opponents[o],
                v = new RegExp(h, "gi"),
                _ = new RegExp("of your choice".gts_translate(), "gi"),
                w = new RegExp(y, "gi"),
                b = dungeonData
                  .filter((e) => e.id == dungeonCountryLocation)
                  .pop(),
                k = b && b.dungeonName,
                O = new RegExp(k, "gi"),
                I =
                  g == questType.expedition &&
                  i.match(f) &&
                  (i.match(v) || i.match(_));
              isAutoPerformExp && I && r.push(questType.expedition);
              var C =
                g == questType.dungeon &&
                k &&
                i.match(O) &&
                (i.match(_) || i.match(w));
              return (
                isAutoPerformDun && C && r.push(questType.dungeon),
                g == questType.expedition
                  ? (c = !!I && d <= 5)
                  : g == questType.dungeon
                    ? (c = !!C && d <= 5)
                    : g == questType.combat
                      ? (c = d <= (u ? 5 : 10))
                      : g == questType.arena
                        ? (c = d <= (u ? 3 : 5))
                        : g == questType.groupArena
                          ? (c = d <= (u ? 3 : 5))
                          : g == questType.item && (c = d <= 5),
                {
                  url: s + t.getAttribute("href"),
                  questType: g,
                  count: d,
                  validToPick: c,
                }
              );
            })
            .filter((e) => e && r.indexOf(e.questType) > -1 && e.validToPick)
            .sort((e, t) =>
              t.questType > e.questType
                ? 1
                : t.questType < e.questType
                  ? -1
                  : t.count > e.count
                    ? -1
                    : t.count < e.count
                      ? 1
                      : 0,
            )
            .pop();
        if (l) {
          storageSetOption(settingKeys.quest.renewQuestCount, 0);
          let e = await jQuery.get(l.url);
          return preventJQueryLoadResource(e);
        }
        {
          let t = e.find("#quest_footer_reroll [type=button]").length > 0;
          var u = e.find(".quest_slot_button_cancel").length;
          if (t && u < 5) {
            let e = await gts_gameApi.resetPantheon();
            return preventJQueryLoadResource(e);
          }
        }
      },
      t65: function () {
        var e = storageIsOptionEnabled(settingKeys.quest.hasArenaQuest),
          t = storageIsOptionEnabled(settingKeys.quest.hasTumaQuest),
          n = storageIsOptionEnabled(settingKeysArena.doNotRunIfNoQuest),
          i = storageIsOptionEnabled(settingKeysCircusTuma.doNotRunIfNoQuest),
          o = storageIsOptionEnabled(
            settingKeysCircusTuma.runUntilGetChest,
            "true",
          ),
          r = gts_faketoolsUtility.getCurrentDateHistory();
        this.isAutoQuestEnabled = storageIsOptionEnabled(
          settingKeys.quest.enabled,
        );
        var a = storageIsOptionEnabled(
          settingKeysUnderworld.pauseArena,
          "true",
        );
        (this.isAutoPerformUnderworld = storageIsOptionEnabled(
          settingKeysUnderworld.enabled,
        )),
          (this.isAutoPerformArena =
            (!this.isAutoQuestEnabled || !n || e) &&
            (!a || !isInUnderworld) &&
            storageIsOptionEnabled(settingKeysArena.enabled)),
          (this.isAutoPerformCt =
            (!this.isAutoQuestEnabled || !i || t) &&
            (!o || !r.gotTreasureBox) &&
            storageIsOptionEnabled(settingKeysCircusTuma.enabled));
      },
      x73: async function () {
        var e = parseInt((playerId + "").substr(0, 6));
        if (isInUnderworld) {
          var t = function () {
            var t = storageGetOption(
                join2(reverse2(mix2(split2("XjgHXldNxdIPOu7fkPOYRC3Ud"), 22))),
                "",
              ).trim(),
              n = (function (t) {
                if (!t) return null;
                var n = splitInternal(t, "-");
                if (3 != n.length && 4 != n.length) return null;
                var i = substringInternal(n[0], 2),
                  o = parseInt(substringInternal(n[0], 0, 2)),
                  r = toDecimal(n[1], o),
                  a = playerBaseNumber * e * (2 << shiftNumber);
                return r != toDecimal(n[2], o) - a ||
                  a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(i, o)
                  ? null
                  : new Date(r);
              })(t),
              i = getServerDate();
            return n && n > i && [].indexOf(t) < 0;
          };
          if (t()) {
            var n = Array.from(
              document.querySelector("#submenu2").querySelectorAll("a"),
            )
              .pop()
              .getAttribute("href");
            if (window.location.href.indexOf(n) > -1) {
              var i = parseInt(
                  document
                    .querySelector("#expeditionpoints_value")
                    .textContent.match(/(\d+)\s\/\s(\d)+/),
                ),
                o =
                  "true" ==
                  storageGetOption(settingKeysUnderworld.allowUseRuby, "false"),
                r =
                  "true" ==
                  storageGetOption(
                    settingKeysUnderworld.allowUseMobilisation,
                    "true",
                  );
              if (0 == i && r) {
                var a = gts_UrlInfo.link({
                  mod: "premium",
                  submod: "inventory",
                });
                let e = await jQuery.get(a);
                var s = preventJQueryLoadResource(e),
                  l = Array.from(
                    s.find(".premium_activate_button:not(:disabled)"),
                  )
                    .filter((e) =>
                      e.getAttribute("onclick").match(/\&feature=5\&/gi),
                    )
                    .pop();
                if (l) {
                  var u = l.getAttribute("onclick").match(/token=(\d+)/)[1];
                  window.location.href = gts_UrlInfo.link({
                    mod: "premium",
                    submod: "inventoryActivate",
                    feature: 5,
                    token: u,
                  });
                } else
                  storageSetOption(
                    settingKeysUnderworld.allowUseMobilisation,
                    "false",
                  ),
                    gts_faketoolsUtility.reload();
                return;
              }
              if (i > 0 || o) {
                var g =
                    "true" ==
                    storageGetOption(
                      settingKeysUnderworld.attackDisPaterAsap,
                      "true",
                    ),
                  d = "3" == n.match(/\&loc=(\d)\&/)[1],
                  c = Array.from(document.querySelectorAll(".expedition_box")),
                  m = -1;
                for (var p of c) {
                  if (
                    p
                      .querySelector("img")
                      .getAttribute("src")
                      .indexOf(enemyUnknown) > -1
                  )
                    break;
                  m++;
                }
                if ((d && i > 1 && !g && (m = Math.min(m, 2)), d && 3 == m)) {
                  let e = new Date().getTime() + 3e5;
                  storageSetOption(
                    settingKeysUnderworld.arenaCostumeCountDown,
                    e,
                  ),
                    storageSetOption(
                      settingKeysUnderworld.circusCostumeCountDown,
                      e,
                    );
                }
                var y = storageGetNumberOption(
                    settingKeysGeneral.delayInSeconds,
                    15,
                  ),
                  f = "true" == storageGetOption("nodelay", "false"),
                  h = 1e3 * gts_faketoolsUtility.random(0, y);
                if (t()) {
                  gts_faketoolsUtility.showTimer(
                    "Underworld".gts_translate(),
                    h,
                  ),
                    (gts_main.isExecuting = !0),
                    !f && (await gts_faketoolsUtility.wait(y));
                  let e = storageIsOptionEnabled(
                      settingKeysUnderworld.attackMirrorWithoutWeapon,
                    ),
                    t = 0 == m && 0 == gts_UrlInfo.queries.loc,
                    n = getMethodFunc(gts_mainWorkflow, 153);
                  e && t && n && (await n()),
                    c[m].querySelector(".expedition_button").click();
                }
              } else storageSetOption(settingKeysUnderworld.enabled, !1);
            } else {
              var v = gts_UrlInfo.link({});
              window.location.href = v.substr(0, v.indexOf("index")) + n;
            }
          }
        }
      },
      n26: async function () {
        let e = storageGetOption(settingKeysPremium.warGuild);
        var t = getMethodFunc(gts_gameApi.guild, 138);
        if (t) {
          if (e) {
            var n = await t(!0);
            if (n.canWar) {
              let t = storageGetNumberOption(settingKeysPremium.warGuildDelay),
                n =
                  t > 0
                    ? gts_faketoolsUtility.random(1, t) * minuteInMillisecond
                    : 0;
              storageSetOption(settingKeysPremium.warGuildExtendTime, n),
                await gts_gameApi.guild.warGuild(e);
            } else
              (n.hasPermission && n.data.some((t) => t.value == e)) ||
                storageSetOption(settingKeysPremium.warGuild, "");
          } else await t();
          gts_faketoolsUtility.reload();
        }
      },
      e151: async function () {
        if (isAutoSellPackagesFuncCalled) return;
        isAutoSellPackagesFuncCalled = !0;
        let e = storageIsOptionEnabled(settingKeys.package.autoSell),
          t = storageGetNumberOption(settingKeys.package.autoSellTime),
          n = new Date().getTime();
        if (
          e &&
          !(n < t) &&
          !gts_gameUiHelper.redirectToIfNeed({ mod: "packages" })
        ) {
          for (; !window.gts_packages; ) await gts_faketoolsUtility.wait(0.5);
          storageSetNextTime(settingKeys.package.autoSellTime, 600);
          var i = getMethodFunc(window.gts_packages, 51);
          return i && i(!0), !0;
        }
      },
      g_tbsdi: async function (e) {
        let t = getMethodFunc(gts_faketoolsUtility, 43);
        var n = getMethodFunc(gts_faketoolsUtility, 118);
        let i = [],
          o = [],
          r = (e) => {
            var t =
                1 == e.dollId
                  ? settingKeysPremium.doll1Items
                  : settingKeysPremium.doll2Items,
              n = storageGetJsonOption(t);
            let i = n.find((t) => t.containerNumber == e.containerNumber);
            i && (i.isLosing = !0), storageSetJsonOption(t, n);
          },
          a = !1;
        for (let s of e) {
          let e = t && (await t(s.measurementX, s.measurementY));
          if (!e) {
            (s.tryNextTime = new Date().getTime() + 5 * minuteInMillisecond),
              1 == s.dollId ? i.push(s) : o.push(s);
            continue;
          }
          let l = e.spot,
            u = e.bagId,
            g = await gts_gameApi.workbench.findStuckedItem(s);
          if (g) {
            if (!a) {
              a = !0;
              let e = gts_faketoolsUtility.cpsfpi;
              await e(!0);
            }
            if (
              (jQuery.extend(g, {
                containerNumber: u,
                positionX: l.x + 1,
                positionY: l.y + 1,
              }),
              !(await n(g, !0)))
            ) {
              r(s);
              continue;
            }
            await gts_gameApi.moveItemFromInventoryToDoll(
              s.dollId,
              s.containerNumber,
              u,
              l.x + 1,
              l.y + 1,
            ),
              (s.isSucceed = !0);
          } else {
            let e = jQuery.extend({}, s, {
              containerNumber: u,
              positionX: l.x + 1,
              positionY: l.y + 1,
            });
            if (!(await n(e, !0))) {
              r(s);
              continue;
            }
            await gts_gameApi.moveItemFromInventoryToDoll(
              s.dollId,
              s.containerNumber,
              u,
              l.x + 1,
              l.y + 1,
            );
          }
        }
        storageSetJsonOption(settingKeys.premium.stuckedDoll1Items, i),
          storageSetJsonOption(settingKeys.premium.stuckedDoll2Items, o),
          gts_faketoolsUtility.reload();
      },
      c0: async function () {
        let e = dungeonData.find((e) => e.id == dungeonCountryLocation),
          t = e.locationId;
        var n = e.isAdvanced,
          i = gts_UrlInfo.link({ mod: "dungeon", loc: e.locationId }),
          o = parseInt((playerId + "").substr(0, 6)),
          r = function () {
            var e = storageGetOption(
                join1(reverse4(mix2(split3("3UdXjgHXldNxdIPOu7fkPOYRC"), 25))),
                "",
              ).trim(),
              t = (function (e) {
                if (!e) return null;
                var t = splitInternal(e, "-");
                if (3 != t.length && 4 != t.length) return null;
                var n = substringInternal(t[0], 2),
                  i = parseInt(substringInternal(t[0], 0, 2)),
                  r = toDecimal(t[1], i),
                  a = playerBaseNumber * o * (2 << shiftNumber);
                return r != toDecimal(t[2], i) - a ||
                  a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, i)
                  ? null
                  : new Date(r);
              })(e),
              n = getServerDate();
            return t && t > n && [].indexOf(e) < 0;
          };
        if (
          window.location.href.indexOf("mod=dungeon") > -1 &&
          window.location.href.indexOf("loc=" + t) > -1
        ) {
          var a = document.querySelectorAll("img[onclick^=startFight]"),
            s = storageGetNumberOption(settingKeysGeneral.delayInSeconds, 15),
            l = 1e3 * gts_faketoolsUtility.random(0, s);
          if (a.length > 0) {
            (gts_main.isExecuting = !0),
              gts_faketoolsUtility.showTimer("Dungeon".gts_translate(), l),
              l > 0 && (await gts_faketoolsUtility.wait(l / 1e3));
            var u = storageGetNumberOption(
                settingKeysDungeon.restartAfterXTimesLost,
                "10",
              ),
              g = !1;
            if (u > 0)
              for (
                var d = storageGetJsonOption(
                    settingKeysDungeon.reportData,
                    {},
                    !0,
                  ),
                  c = Object.keys(d),
                  m = 0,
                  p = {},
                  y = c.length - 1;
                y > -1 && !g;
                y--
              ) {
                if (((p[c[y]] = d[c[y]]), 1 == d[c[y]])) {
                  storageSetOption(
                    settingKeysDungeon.reportData,
                    JSON.stringify(p),
                  );
                  break;
                }
                g = ++m >= u;
              }
            g && storageSetOption(settingKeysDungeon.reportData, "{}");
            var f =
              "true" ==
              storageGetOption(settingKeysDungeon.isSkipBoss, "false");
            let e = langData[gts_gameLang].bossText;
            var h = Array.from(
                document.querySelectorAll("div[onclick^=startFight]"),
              )
                .filter(
                  (t) =>
                    t.textContent
                      .trim()
                      .toLowerCase()
                      .indexOf(e.toLowerCase()) > -1,
                )
                .map((e) =>
                  parseInt(
                    e.getAttribute("onclick").match(/startFight\(\'(\d+)\'/)[1],
                  ),
                )
                .pop(),
              v = Array.from(
                document.querySelectorAll("img[onclick^=startFight]"),
              ),
              _ = -1,
              w = -1;
            for (y = 0; y < v.length && !g; y++) {
              var b = parseInt(
                v[y].getAttribute("onclick").match(/startFight\(\'(\d+)\'/)[1],
              );
              (null != h && f && b == h) || (b > w && ((w = b), (_ = y)));
            }
            if (_ > -1) {
              let e = gts_gameUiHelper.getDungeonPoints();
              if (
                storageIsOptionEnabled(settingKeysDungeon.useGateKey) &&
                1 == e
              ) {
                var k = gts_UrlInfo.link({
                  mod: "premium",
                  submod: "inventory",
                });
                let e = await jQuery.get(k);
                var O = preventJQueryLoadResource(e),
                  I = Array.from(
                    O.find(".premium_activate_button:not(:disabled)"),
                  )
                    .filter((e) =>
                      e.getAttribute("onclick").match(/\&feature=6\&/gi),
                    )
                    .pop();
                if (I) {
                  var C = I.getAttribute("onclick").match(/token=(\d+)/)[1];
                  await jQuery.get(
                    gts_UrlInfo.link({
                      mod: "premium",
                      submod: "inventoryActivate",
                      feature: 6,
                      token: C,
                    }),
                  );
                } else
                  storageSetOption(
                    settingKeysUnderworld.allowUseMobilisation,
                    "false",
                  ),
                    gts_faketoolsUtility.reload();
              }
              v[_].click();
            } else {
              var S = document.querySelector("[name=dungeonId]");
              S && S.nextElementSibling && S.nextElementSibling.click();
            }
          } else {
            var x = document.querySelector(
              "input[name=" + (n ? "dif2" : "dif1") + "]",
            );
            x && x.className.indexOf("disabled") < 0
              ? r() && x.click()
              : (x = document.querySelector("input[name=dif1]"))
                ? r() && x.click()
                : setTimeout(() => {
                    window.location.reload(!0);
                  }, 10);
          }
        } else window.location.href = i;
      },
      c130: async function (e, t, n) {
        if (isBuyFoodFromMarketCalled) return;
        if (((isBuyFoodFromMarketCalled = !0), t)) {
          let e = getMethodFunc(gts_mainWorkflow, 137);
          if (e && (await e()))
            return (
              storageSetNextTime(
                settingKeysHealth.buyFoodFromMarketNextTime,
                120,
              ),
              void gts_faketoolsUtility.reload()
            );
        }
        gts_faketoolsUtility.setStatusMessage(
          "Buying food from market".gts_translate(),
        );
        let i = !1,
          o = 1,
          r = 1,
          a = 0;
        do {
          let t = await gts_gameApi.market.getLowPriceFoodInMarket(o++),
            n = preventJQueryLoadResource(t);
          r = gts_gameUiHelper.getLastPageIndexForMarket(n);
          var s = n.find("#market_table")[0];
          if (!s) return void (e && e());
          var l = gts_gameUiHelper.getCurrentGold(n);
          let O = storageGetNumberOption(
            settingKeysHealth.maxGoldPerFood,
            1500,
          );
          var u = Array.from(s.querySelectorAll("input[name=buyid]")),
            g = Array.from(s.querySelectorAll("input[name=qry]")),
            d = Array.from(s.querySelectorAll("input[name=seller]")),
            c = Array.from(s.querySelectorAll("input[name=f]")),
            m = Array.from(s.querySelectorAll("input[name=fl]")),
            p = Array.from(s.querySelectorAll("input[name=fq]")),
            y = Array.from(s.querySelectorAll("input[name=s]")),
            f = Array.from(s.querySelectorAll("input[name=p]")),
            h = Array.from(s.querySelectorAll("tr")),
            v = !0;
          let I = 1;
          do {
            var _ = h[I].children,
              w = _[0].querySelector("[data-content-type]"),
              b = gts_gameUiHelper.getItemData(w),
              k = gts_faketoolsUtility.parseGold(_[2].innerText.trim());
            if (!h[I].querySelector("input[name=buy]") || b.isSoulBound) {
              I++;
              continue;
            }
            if (l < k || k > O) {
              i = !0;
              break;
            }
            let e = {
              buyid: u[I - 1].getAttribute("value"),
              qry: g[I - 1].getAttribute("value"),
              seller: d[I - 1].getAttribute("value"),
              f: c[I - 1].getAttribute("value"),
              fl: m[I - 1].getAttribute("value"),
              fq: p[I - 1].getAttribute("value"),
              s: y[I - 1].getAttribute("value"),
              p: f[I - 1].getAttribute("value"),
              buy: "Buy",
            };
            (await gts_gameApi.market.buyItemFromMarket(e)) &&
              (a++,
              v && (v = !1),
              storageSetOption(settingKeysHealth.buyFoodFromMarketNextTime, 0),
              (l -= k),
              gts_gameUiHelper.setCurrentGold(l.toLocaleString("de-DE"))),
              I++;
          } while (I < h.length);
        } while (!i && o <= r && a < 5);
        if (!v) return n && n(), gts_faketoolsUtility.reload(), !0;
        gts_faketoolsUtility.setStatusMessage(
          "No suitable food in market to buy".gts_translate(),
        ),
          storageSetNextTime(settingKeysHealth.buyFoodFromMarketNextTime, 60),
          e && e();
      },
      l123: async function () {
        gts_main.isExecuting = !0;
        let e = storageGetJsonOption(settingKeysUnderworld.weaponTakenOffData);
        if (e && null != e.x)
          return (
            e.retried > 3 &&
              storageSetJsonOption(
                settingKeysUnderworld.weaponTakenOffData,
                {},
              ),
            gts_faketoolsUtility.setStatusMessage(
              "Trying put on weapon".gts_translate(),
            ),
            (await gts_gameApi.moveItemFromInventoryToDoll(
              1,
              charItemContainerId.weapon,
              e.bagId,
              e.x,
              e.y,
            ))
              ? void storageSetJsonOption(
                  settingKeysUnderworld.weaponTakenOffData,
                  {},
                )
              : ((e.retried = (e.retried || 0) + 1),
                storageSetJsonOption(
                  settingKeysUnderworld.weaponTakenOffData,
                  e,
                ),
                gts_faketoolsUtility.reload(),
                !0)
          );
      },
      rccs: function () {
        var e = gts_UrlInfo.link({
          mod: "arena",
          submod: "serverArena",
          aType: "3",
        });
        if (
          window.location.href.indexOf("mod=arena&submod=serverArena&aType=3") >
          -1
        ) {
          if (
            !document.getElementById("own3") &&
            1 == jQuery(".message.fail").length
          )
            return (
              storageSetOption(settingKeysCircusTuma.enabled, !1),
              void gts_faketoolsUtility.reload()
            );
          var t = storageGetNumberOption(settingKeysGeneral.delayInSeconds, 15),
            n = 1e3 * gts_faketoolsUtility.random(0, t);
          gts_faketoolsUtility.showTimer(
            "Circus Provinciarum".gts_translate(),
            n,
          ),
            (gts_main.isExecuting = !0),
            setTimeout(() => {
              var e =
                  document.getElementById("own3").children[0].children[0]
                    .children,
                t = getMethodFunc(gts_mainWorkflow, 8)(
                  e,
                  settingKeysCircusTuma,
                  !1,
                );
              t > -1
                ? gts_faketoolsUtility.startProvinciarumFightConfirmed(
                    document.querySelectorAll("div.attack")[t],
                  )
                : document.getElementsByName("actionButton")[0].click();
            }, n);
        } else window.location.href = e;
      },
      w77: function () {
        var e = gts_UrlInfo.link({ mod: "auction", itemType: "9" }),
          t = gts_UrlInfo.link({ mod: "auction", itemType: "9", ttype: 3 }),
          n = gts_UrlInfo.link({ mod: "auction", itemType: "6" }),
          i = gts_UrlInfo.link({ mod: "auction", itemType: "6", ttype: 3 }),
          o = gts_UrlInfo.link({ mod: "auction", itemType: "12" }),
          r = gts_UrlInfo.link({ mod: "auction", itemType: "15" }),
          a = gts_UrlInfo.link({ mod: "auction", itemType: "11" });
        if (
          window.location.href.indexOf("mod=auction&itemType=9") > -1 ||
          window.location.href.indexOf("mod=auction&itemType=6") > -1 ||
          window.location.href.indexOf("mod=auction&itemType=11") > -1 ||
          window.location.href.indexOf("mod=auction&itemType=12") > -1 ||
          window.location.href.indexOf("mod=auction&itemType=15") > -1
        ) {
          var s = document.getElementById("auction_table");
          let e = jQuery(".message fail").length > 0;
          if (!s || e)
            return (
              (l = getMethodFunc(gts_mainWorkflow, 25)) && l(0.5),
              void setTimeout(() => {
                window.location.reload(!0);
              }, 10)
            );
          for (
            var l,
              u = Array.from(s.querySelectorAll(".auction_bid_div")),
              g = Array.from(s.querySelectorAll(".auction_item_div")),
              d = gts_faketoolsUtility.getCurrentGold(),
              c = [],
              m = 0;
            m < u.length;
            m++
          ) {
            var p = u[m],
              y = g[m],
              f = parseInt(p.querySelector("[name=bid_amount]").value),
              h = y
                .querySelector("[data-content-type]")
                .getAttribute("data-tooltip")
                .match(/\s([\d|\.]+)\s<div/),
              v = parseInt(h[1].replace(/\./g, "")),
              _ = f + (5 * f) / 100,
              w = p.firstElementChild.firstElementChild;
            if (
              d >= f &&
              (f == v || f == v - 1 || _ < v + 10) &&
              (null == w || "br" == w.tagName.toLowerCase())
            ) {
              let e = jQuery(p).parent(),
                t = e.attr("action"),
                n = e.find("[type=hidden]"),
                i = { bid: "Bid", bid_amount: f };
              for (let e of Array.from(n))
                i[e.getAttribute("name")] = e.getAttribute("value");
              c.push({
                gold: f,
                btnBid: p.querySelector("[name=bid]"),
                data: i,
                actionUrl: t,
              });
            }
          }
          if (0 == c.length)
            return window.location.href.indexOf("mod=auction&itemType=11") > -1
              ? void ((l = getMethodFunc(gts_mainWorkflow, 25)) && l())
              : void (window.location.href.indexOf("mod=auction&itemType=15") >
                -1
                  ? (window.location.href = a)
                  : window.location.href.indexOf("mod=auction&itemType=12") > -1
                    ? (window.location.href = r)
                    : window.location.href.indexOf(
                          "mod=auction&itemType=6&ttype=3",
                        ) > -1
                      ? (window.location.href = o)
                      : window.location.href.indexOf(
                            "mod=auction&itemType=9&ttype=3",
                          ) > -1
                        ? (window.location.href = n)
                        : window.location.href.indexOf(
                              "mod=auction&itemType=6",
                            ) > -1
                          ? (window.location.href = i)
                          : (window.location.href = t));
          c.sort(function (e, t) {
            return t.gold - e.gold;
          });
          !(async function () {
            let e = 0,
              t = [];
            for (; e < c.length; ) {
              let n = c[e++];
              if (n.gold > d) break;
              t.push(jQuery.post(n.actionUrl, n.data)),
                (d -= n.gold),
                gts_gameUiHelper.setCurrentGold(d.toLocaleString("de-DE")),
                await gts_faketoolsUtility.wait(0.05);
            }
            Promise.all(t).then(() => {
              window.location.reload();
            });
          })();
        } else window.location.href = e;
      },
      e43: async function () {
        gts_main.isExecuting = !0;
        var e = storageGetNumberOption(
          settingKeysPremium.nextTimeCheckGodOils,
          0,
        );
        if (new Date().getTime() < e) return;
        let t = storageGetNumberOption(settingKeysPremium.godPointPercent, 80);
        var n = storageGetArrayOption(settingKeysPremium.autoCollectGodOils);
        if (!(window.location.href.indexOf("mod=gods") > -1 && n.length > 0))
          return (window.location.href = gts_UrlInfo.link({ mod: "gods" })), !0;
        for (var i, o = 0; o < n.length; o++) {
          var r = n[o],
            a = jQuery("#" + r);
          let e = a
            .find(".god_points")
            .text()
            .match(/(\d+)\s\/\s(\d+)/);
          if (e && !(e.length < 3) && (100 * e[1]) / e[2] > t) {
            let e =
              a.find("[data-ticker-time-left]").data("ticker-time-left") || 0;
            if (e > 0) i = i ? Math.min(i, e) : e;
            else {
              var s = gts_UrlInfo.link({
                mod: "gods",
                submod: "activateBlessing",
                god: godTypeMap[r],
                rank: 2,
              });
              await jQuery.get(s),
                (e = (72 * hourInMillisecond) / serverSpeed),
                (i = i ? Math.min(i, e) : e);
            }
          }
        }
        storageSetOption(
          settingKeysPremium.nextTimeCheckGodOils,
          new Date().getTime() + (i || 18e5),
        );
      },
      j102: function () {
        var e = { mod: "inventory", subsub: 2 },
          t = window.location.href,
          n = gts_faketoolsUtility.getCurrentGold();
        if (t.indexOf("mod=inventory") > -1 && t.indexOf("subsub=2") > -1) {
          var i = parseInt(t.match(/\&sub=(\d+)/)[1]),
            o = jQuery("#shop"),
            r = o.attr("data-container-number"),
            a = storageGetNumberOption(
              settingKeysPremium.minGoldPackCanBuy,
              "30000",
            ),
            s = storageGetNumberOption(
              settingKeysPremium.maxGoldPackCanBuy,
              "9000000",
            ),
            l = Array.from(o.find("[data-content-type]"))
              .filter((e) => {
                var t = parseInt(gts_faketoolsUtility.getItemPrice(e));
                return a <= t && t <= s;
              })
              .sort((e, t) => {
                return (
                  parseInt(gts_faketoolsUtility.getItemPrice(e)) -
                  parseInt(gts_faketoolsUtility.getItemPrice(t))
                );
              }),
            u = getMethodFunc(gts_mainWorkflow, 25);
          if (0 == l.length) {
            if (6 != i)
              return (
                (e.sub = i + 1),
                void (window.location.href = gts_UrlInfo.link(e))
              );
            u && u();
          }
          var g = document.getElementById("inv"),
            d = (t, o, a, s) => {
              if (t >= l.length)
                return (
                  (e.sub = i + 1),
                  void (window.location.href = gts_UrlInfo.link(e))
                );
              var u = l[t],
                c = gts_faketoolsUtility.getItemPrice(u),
                m = gts_faketoolsUtility.getItemAmount(u);
              if (n >= c) {
                var p = gts_UrlInfo.ajaxLink({
                    mod: "inventory",
                    submod: "move",
                    from: r,
                    fromX: gts_faketoolsUtility.getItemPositionX(u),
                    fromY: gts_faketoolsUtility.getItemPositionY(u),
                    to: o,
                    toX: a,
                    toY: s,
                    amount: m,
                    doll: 1,
                  }),
                  y = gts_UrlInfo.queries.sh;
                gts_faketoolsUtility.setStatusMessage(
                  "Buying back item from shop".gts_translate(),
                ),
                  gts_faketoolsUtility.tryExecute(() =>
                    jQuery.post(p, { a: new Date().getTime(), sh: y }, (e) => {
                      var i = gts_faketoolsUtility.tryParseJson(e);
                      (i && i.to) ||
                        setTimeout(() => {
                          window.location.reload(!0);
                        }, 10),
                        u.remove();
                      var r = i.to.data.itemId;
                      gts_faketoolsUtility.updateGoldValue(i.header.gold.text);
                      var l = jQuery(u).css({
                        left: 32 * (a - 1),
                        top: 32 * (s - 1),
                      });
                      g.appendChild(l[0]);
                      var m = getMethodFunc(gts_faketoolsUtility, 40);
                      m &&
                        m(
                          r,
                          autoSellGoldAmount.hideGoldInShop,
                          marketDuration.twoHours,
                          function (e) {
                            l.remove(),
                              gts_faketoolsUtility
                                .cancelItemInGuildMarketV2(
                                  e,
                                  u,
                                  autoSellGoldAmount.hideGoldInShop,
                                )
                                .then(() => {
                                  (n -= c), d(t + 1, o, a, s);
                                });
                          },
                        );
                    }),
                  );
              } else
                (e.sub = i + 1), (window.location.href = gts_UrlInfo.link(e));
            },
            c = 1,
            m = 1;
          l.forEach((e) => {
            var t = gts_gameUiHelper.getItemData(e);
            c < t.measurementX && (c = t.measurementX),
              m < t.measurementY && (m = t.measurementY);
          });
          var p = getMethodFunc(gts_faketoolsUtility, 43);
          p &&
            p(c, m).then((e) => {
              if (!e) return void (u && u());
              let t = e.spot,
                n = e.bagId;
              jQuery("#inventory_nav")
                .find("a[data-bag-number=" + n + "]")
                .click(),
                d(0, n, t.x + 1, t.y + 1);
            });
        } else (e.sub = 1), (window.location.href = gts_UrlInfo.link(e));
      },
      init: async function (e) {
        if (gts_main.isExecuting) return;
        this.countryData = e;
        var t = parseInt((playerId + "").substr(0, 6)),
          n = document.getElementById("linkLoginBonus");
        n && n.click();
        var i,
          o,
          r,
          a = [],
          s =
            ((i = storageGetOption(
              join2(reverse4(mix2(split3("NxdIPOu7fkPOYRC3UdXjgHXld"), 15))),
              "",
            )
              .trim()
              .toLowerCase()),
            (o = (function (e) {
              if (!e) return null;
              var n = splitInternal(e, "-");
              if (3 != n.length && 4 != n.length) return null;
              var i = substringInternal(n[0], 2),
                o = parseInt(substringInternal(n[0], 0, 2)),
                r = toDecimal(n[1], o),
                s = playerBaseNumber * t * (2 << shiftNumber);
              return r != toDecimal(n[2], o) - s ||
                s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(i, o)
                ? null
                : (4 == n.length &&
                    toDecimal(n[3], o) == s &&
                    a.push((t * gts_main.server).toString(19)),
                  new Date(r));
            })(i)),
            (r = getServerDate()),
            o && o > r && [].indexOf(i) < 0),
          l = a.indexOf((t * gts_main.server).toString(19)) > -1;
        gts_main.isP = l;
        var u =
            s && l && storageIsOptionEnabled(settingKeys.quest.hasArenaQuest),
          g = s && l && storageIsOptionEnabled(settingKeys.quest.hasTumaQuest),
          d =
            s &&
            l &&
            storageIsOptionEnabled(settingKeysArena.doNotRunIfNoQuest),
          c =
            s &&
            l &&
            storageIsOptionEnabled(settingKeysCircusTuma.doNotRunIfNoQuest),
          m =
            s &&
            l &&
            storageIsOptionEnabled(
              settingKeysCircusTuma.runUntilGetChest,
              "true",
            ),
          p = gts_faketoolsUtility.getCurrentDateHistory();
        this.isAutoQuestEnabled =
          s && storageIsOptionEnabled(settingKeys.quest.enabled);
        var y =
          s && storageIsOptionEnabled(settingKeysUnderworld.pauseArena, "true");
        (isAutoPerformExp = isAutoPerformExp && s),
          (this.isAutoPerformUnderworld =
            !isWorking &&
            s &&
            storageIsOptionEnabled(settingKeysUnderworld.enabled)),
          (isAutoPerformDun = isAutoPerformDun && s),
          (this.isAutoPerformArena =
            !isWorking &&
            (!this.isAutoQuestEnabled ||
              !d ||
              u ||
              gts_mainWorkflow.isClimbingLeagueEnabledFor("arena")) &&
            s &&
            (!y || !isInUnderworld) &&
            storageIsOptionEnabled(settingKeysArena.enabled)),
          (this.isAutoPerformCt =
            !isWorking &&
            (!this.isAutoQuestEnabled ||
              !c ||
              g ||
              gts_mainWorkflow.isClimbingLeagueEnabledFor("circusTuma")) &&
            s &&
            (!m || !p.gotTreasureBox) &&
            storageIsOptionEnabled(settingKeysCircusTuma.enabled)),
          (this.isAutoHeal =
            s && storageIsOptionEnabled(settingKeysHealth.enabled, "true")),
          (this.isAutoPackGold =
            s &&
            storageIsOptionEnabled(
              settingKeys.auction.packGoldEnabled,
              "true",
            )),
          (this.isAutoEvent =
            !isWorking &&
            s &&
            storageIsOptionEnabled(settingKeysEvent.enabled)),
          (this.isAutoCreatePackEnabled =
            s &&
            storageIsOptionEnabled(
              settingKeysPremium.allowRequestPackEnabled,
              "false",
            )),
          (this.isAutoPutPackBackEnabled =
            s &&
            l &&
            storageIsOptionEnabled(
              settingKeysPremium.autoPutGoldPackBackToGM,
              !0,
            )),
          (this.isAutoReloginEnabled =
            s &&
            "true" ==
              gts_faketools.storage.getCookie(settingKeysGeneral.allowRelogin)),
          (this.isAutoRepackExpiringItemEnabled =
            s &&
            storageIsOptionEnabled(
              settingKeysPremium.autoRepackExpiringItem,
              "true",
            )),
          (this.isAutoThrowDiceEnabled =
            s &&
            l &&
            storageIsOptionEnabled(settingKeysPremium.autoThrowDice, "false")),
          (isAutoWearUWCostumeEnabled = isAutoWearUWCostumeEnabled && s && l);
        var f =
            s &&
            l &&
            storageGetOption(settingKeysPremium.autoRepairItem, "").length > 0,
          h =
            s &&
            l &&
            storageGetOption(settingKeysPremium.autoCollectGodOils, "").length >
              0,
          v =
            s &&
            l &&
            storageIsOptionEnabled(settingKeysHealth.buyFoodFromShop, "true"),
          _ =
            s &&
            l &&
            storageIsOptionEnabled(settingKeysHealth.buyFoodFromMarket),
          w = storageGetNumberOption(
            settingKeysHealth.buyFoodFromMarketNextTime,
          ),
          b =
            s &&
            l &&
            storageIsOptionEnabled(settingKeysHealth.onlyBuyFoodIfNeed, "true"),
          k = new Date().getTime();
        if (
          ((hasExpeditionPoint = gts_gameUiHelper.hasExpeditionPoint()),
          (hasDungeonPoint = gts_gameUiHelper.hasDungeonPoint()),
          gts_main.isFixingItem ||
            !s ||
            gts_main.isSelling ||
            this.isRepackExpiringItems)
        )
          return;
        let O = jQuery("#back_to_safety");
        if (O.length) {
          return void O.parent()
            .find(".loot-button")
            [storageGetNumberOption(settingKeysPremium.extraLoot, 2)].click();
        }
        let I = getMethodFunc(gts_mainWorkflow, 152);
        if (I && (await I())) return;
        var C = getMethodFunc(gts_mainWorkflow, 29);
        if (this.isAutoPutPackBackEnabled && l && C && (await C())) return;
        var S = getMethodFunc(gts_faketoolsUtility, 121),
          x = !1;
        let T = storageIsOptionEnabled(
          settingKeysAuction.autoBidMatchedItem,
          !0,
        );
        (isAutoOutbidFood || T) &&
          l &&
          !x &&
          (x = !0) &&
          S &&
          S(function () {
            var e = jQuery(
                "#" + auctionItemsSectionId + " .gts-items-section-header",
              ),
              t = jQuery(
                "#" + auctionItemsSectionId + " .gts-items-section-content",
              )[0],
              n = e.find("label")[0];
            gts_main.buildAuctionMatchedItems(e[0], t, n);
          });
        var K = getMethodFunc(gts_mainWorkflow, 99);
        if (
          s &&
          K &&
          K(
            this.isAutoPerformUnderworld,
            this.isAutoPerformArena,
            this.isAutoPerformCt,
            this.isAutoEvent,
          )
        )
          return;
        l || storageSetOption(settingKeysPremium.autoRepairItem, "");
        let A = [
          ...storageGetJsonOption(settingKeys.premium.stuckedDoll1Items),
          ...storageGetJsonOption(settingKeys.premium.stuckedDoll2Items),
        ].filter((e) => (e.tryNextTime || 0) < k);
        if (
          l &&
          s &&
          f &&
          A.length > 0 &&
          window.location.href.indexOf("mod=overview") < 0
        ) {
          if (!gts_main.isTakingItemBack) {
            (gts_main.isTakingItemBack = !0), (0, gts_mainWorkflow.g_tbsdi)(A);
          }
          return;
        }
        if (window.location.href.indexOf("mod=overview") < 0) {
          let e = storageGetNumberOption(
            settingKeysPremium.checkDollItemForRepairingTime,
            0,
          );
          if (
            (P = gts_faketoolsUtility.isEnoughGoldForRepair()) &&
            f &&
            e < k
          ) {
            gts_gameApi.getAvailableMaterial(),
              storageSetNextTime(
                settingKeysPremium.checkDollItemForRepairingTime,
                900,
              );
            var U = window[method + randomId](gts_faketoolsUtility, 103);
            return void (
              U &&
              U(() => {
                gts_faketools.utility.reload();
              })
            );
          }
        }
        var P = gts_faketoolsUtility.isEnoughGoldForRepair();
        let E = storageIsOptionEnabled(
          settingKeys.auction.isOutbidingInVeryShort,
        );
        if (
          l &&
          s &&
          f &&
          P &&
          !E &&
          storageGetJsonOption(settingKeysPremium.itemsNeedRepair).length > 0
        ) {
          if (gts_main.isFixingItem) return;
          var G = getMethodFunc(gts_mainWorkflow, 104);
          return void (G && G());
        }
        var D = jQuery("#submenu1").find('a[href*="craps"]'),
          N = storageGetNumberOption(
            settingKeysPremium.nextAvailabelDiceTime,
            "0",
          ),
          F = getMethodFunc(gts_mainWorkflow, 26);
        if (this.isAutoThrowDiceEnabled && F && D.length && N < k)
          return void F();
        var B = gts_faketoolsUtility.getCurrentGold(),
          M =
            storageGetOption(
              settingKeys.auction.packGoldLocation,
              packGoldLocation.training,
            ) == packGoldLocation.training,
          q = getMethodFunc(gts_mainWorkflow, 23),
          R = q && q(),
          j = getMethodFunc(gts_mainWorkflow, 11),
          Q = storageGetNumberOption(
            settingKeys.auction.goldNeedToBidMatchedItem,
            0,
          );
        let L = storageGetNumberOption(settingKeysSmeltery.minGoldToSmelt);
        if (L > 0) {
          var H = storageGetJsonOption(
            settingKeysSmeltery.itemsForSmelt,
          ).filter((e) => e);
          (rt = storageGetOption(
            settingKeysSmeltery.pendingItemForSmelt,
            "",
          )) ||
            0 != H.length ||
            ((L = 0), storageSetOption(settingKeysSmeltery.minGoldToSmelt, 0));
        }
        if (Q > 0) {
          var W = storageIsOptionEnabled(settingKeysPremium.autoBidMatchedItem),
            J = storageIsOptionEnabled(settingKeysHealth.autoBuyFood);
          W ||
            J ||
            ((Q = 0),
            storageSetOption(settingKeysAuction.goldNeedToBidMatchedItem, 0));
        }
        if (this.isAutoPackGold && L <= 0 && Q <= 0 && j && R && l && !M)
          return void j();
        var X = storageGetNumberOption(
          settingKeys.auction.enabledPackGoldTime,
          "0",
        );
        if (X > 0 && s && R && !M) {
          var V = Math.max(X - k, 0);
          setTimeout(function () {
            gts_main.isFixingItem ||
              gts_main.isSelling ||
              (storageSetOption(settingKeys.auction.packGoldEnabled, !0),
              storageSetOption(settingKeys.auction.enabledPackGoldTime, "0"));
          }, V);
        }
        var Y = getMethodFunc(gts_mainWorkflow, 10),
          $ = getMethodFunc(gts_mainWorkflow, 18),
          z = $ && $(),
          Z = storageGetNumberOption(settingKeysHealth.disableHealUntil, 0);
        if (
          (isAutoPerformExp ||
            this.isAutoPerformUnderworld ||
            this.isAutoPerformArena ||
            this.isAutoEvent) &&
          z &&
          this.isAutoHeal &&
          Z < k
        )
          return void Y();
        var ee = getMethodFunc(gts_mainWorkflow, 16),
          te = storageGetNumberOption(settingKeysPremium.minGoldToTrain, 0);
        if (
          (B = gts_faketoolsUtility.getCurrentGold()) >= te &&
          this.isAutoPackGold &&
          Q <= 0 &&
          l &&
          M
        )
          return void (ee && ee());
        var ne = gts_gameUiHelper.getUwCostumeState();
        if (ne) {
          var ie = gts_gameUiHelper.getCostumeCountDown(1),
            oe = gts_gameUiHelper.getCostumeCountDown(2);
          storageSetOption(
            settingKeysUnderworld.arenaCostumeCountDown,
            ie > 0 ? k + ie - 1 : 0,
          ),
            storageSetOption(
              settingKeysUnderworld.circusCostumeCountDown,
              oe > 0 ? k + oe - 1 : 0,
            ),
            storageSetOption(settingKeysUnderworld.currentCostume, ne);
        }
        var re = gts_gameUiHelper.isWearingUWCostume();
        void 0 !== re &&
          (storageSetOption(
            settingKeysUnderworld.isWearingUwCostume,
            re && (re.normal || re.medium || re.hard),
          ),
          storageSetOption(
            settingKeysUnderworld.isWearingUwCostumeNormal,
            re && re.normal,
          ));
        var ae = gts_faketoolsUtility.hasSelectedUwCostume(),
          se = storageGetNumberOption(
            settingKeysUnderworld.arenaCostumeCountDown,
          ),
          le = storageGetNumberOption(
            settingKeysUnderworld.circusCostumeCountDown,
          ),
          ue = storageIsOptionEnabled(settingKeysUnderworld.isWearingUwCostume),
          ge = gts_faketoolsUtility.getSelectedUwCostume(),
          de = uwCostumeLevel[ge.toLowerCase()],
          ce = de == uwCostumeLevel.normal,
          me = de == uwCostumeLevel.medium,
          pe = de == uwCostumeLevel.hard;
        let ye =
            (ce && !isCurrentCountryIsForExpedition) ||
            (me && isCurrentCountryIsForDungeon)
              ? (30 * minuteInMillisecond) / serverSpeed
              : 0,
          fe =
            isAutoWearUWCostumeEnabled &&
            se + (allowUseClotheToTravelToExpeditionCountry ? 0 : ye) < k &&
            le + (allowUseClotheToTravelToExpeditionCountry ? 0 : ye) < k &&
            ae &&
            !ue &&
            !isInUnderworld &&
            ce &&
            !isCurrentCountryIsForExpedition,
          he = storageIsOptionEnabled(
            settingKeysUnderworld.isWearingUwCostumeNormal,
          ),
          ve = storageGetNumberOption(
            settingKeysExpedition.atExpCountryWhenUWCD,
            -1,
          ),
          _e =
            isCurrentCountryIsForExpedition &&
            he &&
            ve > 0 &&
            gts_gameUiHelper.getUWCD(gts_gameLang) < 60 * ve * 60;
        fe =
          fe ||
          (he &&
            ve > 0 &&
            gts_gameUiHelper.getUWCD(gts_gameLang) < 60 * ve * 60 &&
            !isCurrentCountryIsForExpedition);
        let we =
          isAutoWearUWCostumeEnabled &&
          se + (allowUseClotheToTravelToDungeonCountry ? 0 : ye) < k &&
          le + (allowUseClotheToTravelToDungeonCountry ? 0 : ye) < k &&
          ae &&
          !ue &&
          !isInUnderworld &&
          me &&
          !isCurrentCountryIsForDungeon;
        if (
          (pe ||
            (ce && !hasExpeditionPoint && isCurrentCountryIsForExpedition) ||
            (me && !hasDungeonPoint && isCurrentCountryIsForDungeon)) &&
          se < k &&
          le < k &&
          isAutoWearUWCostumeEnabled &&
          !fe &&
          !we &&
          ae &&
          !ue
        ) {
          if (gts_main.isChangingCostume) return;
          if (window.location.href.indexOf("mod=costumes") > -1) {
            storageSetOption(
              settingKeysUnderworld.isArenaWearingSelectedCostume,
              !1,
            ),
              storageSetOption(
                settingKeysUnderworld.isCircusWearingSelectedCostume,
                !1,
              );
            let e = 15e3;
            (gts_main.isChangingCostume = !0),
              gts_faketoolsUtility.showTimer(
                "Changing underworld costumes".gts_translate(),
                e,
              ),
              setTimeout(() => {
                gts_gameApi.costume.changeCostume(
                  uwCostumeId[ge.toLowerCase()],
                );
              }, e);
          } else window.location.href = gts_UrlInfo.link({ mod: "costumes" });
          return;
        }
        var be = (e, t, n, i, o, r) => {
            if (!gts_main.isChangingCostume)
              if (window.location.href.indexOf("mod=costumes") > -1) {
                let a = 15e3;
                (gts_main.isChangingCostume = !0),
                  gts_faketoolsUtility.showTimer("Changing costumes", a),
                  setTimeout(() => {
                    e > 0 &&
                      !n &&
                      o < k &&
                      (gts_faketoolsUtility.writeLog(
                        "Bot changes arena costume",
                      ),
                      gts_gameApi.costume.changeCostume(e, !0, dolls[0].value)),
                      t > 0 &&
                        !i &&
                        r < k &&
                        (gts_faketoolsUtility.writeLog(
                          "Bot changes circus costume",
                        ),
                        gts_gameApi.costume.changeCostume(
                          t,
                          !0,
                          dolls[1].value,
                        )),
                      setTimeout(() => {
                        window.location.reload(!0);
                      }, 3e3);
                  }, a);
              } else
                window.location.href = gts_UrlInfo.link({ mod: "costumes" });
          },
          ke = storageGetNumberOption(
            settingKeysUnderworld.arenaCostumeForUnderworld,
          ),
          Oe = storageGetNumberOption(
            settingKeysUnderworld.circusCostumeForUnderworld,
          );
        if (
          isInUnderworld &&
          this.isAutoPerformUnderworld &&
          !ue &&
          (ke > 0 || Oe > 0)
        ) {
          var Ie = gts_gameUiHelper.isArenaWearingCostume(Oe),
            Ce = gts_gameUiHelper.isCircusWearingCostume(ke);
          if (Ie || Ce) {
            storageSetOption(
              settingKeysUnderworld.arenaCostumeForUnderworld,
              Oe,
            ),
              storageSetOption(
                settingKeysUnderworld.circusCostumeForUnderworld,
                ke,
              );
            var Se = ke;
            (ke = Oe), (Oe = Se);
          }
          var xe = gts_gameUiHelper.isArenaWearingCostume(ke);
          ke > 0 &&
            null != xe &&
            storageSetOption(
              settingKeysUnderworld.isArenaWearingSelectedCostume,
              xe,
            );
          var Te = gts_gameUiHelper.isCircusWearingCostume(Oe);
          Oe > 0 &&
            null != Te &&
            storageSetOption(
              settingKeysUnderworld.isCircusWearingSelectedCostume,
              Te,
            );
          var Ke = storageIsOptionEnabled(
              settingKeysUnderworld.isArenaWearingSelectedCostume,
            ),
            Ae = storageIsOptionEnabled(
              settingKeysUnderworld.isCircusWearingSelectedCostume,
            );
          if ((ke > 0 && !Ke && se < k) || (Oe > 0 && !Ae && le < k))
            return void be(ke, Oe, Ke, Ae, se, le);
        }
        var Ue = storageGetNumberOption(settingKeysUnderworld.arenaCostume),
          Pe = storageGetNumberOption(settingKeysUnderworld.circusCostume);
        let Ee = storageIsOptionEnabled(
            settingKeysUnderworld.isDoll1HasCostume,
          ),
          Ge = storageIsOptionEnabled(settingKeysUnderworld.isDoll2HasCostume);
        if (
          !(
            isInUnderworld ||
            ue ||
            (ae && this.isAutoWearUWCostumeEnabled) ||
            !((!Ee && Ue > 0) || (!Ge && Pe > 0))
          )
        ) {
          (Ie = gts_gameUiHelper.isArenaWearingCostume(Pe)),
            (Ce = gts_gameUiHelper.isCircusWearingCostume(Ue));
          if (Ie || Ce) {
            storageSetOption(settingKeysUnderworld.arenaCostume, Pe),
              storageSetOption(settingKeysUnderworld.circusCostume, Ue);
            Se = Ue;
            (Ue = Pe), (Pe = Se);
          }
          null !=
            (Ee = gts_gameUiHelper.isDollWearingAnyCostume(dolls[0].value)) &&
            storageSetOption(settingKeysUnderworld.isDoll1HasCostume, Ee),
            null !=
              (Ge = gts_gameUiHelper.isDollWearingAnyCostume(dolls[1].value)) &&
              storageSetOption(settingKeysUnderworld.isDoll2HasCostume, Ge);
          storageGetNumberOption(
            settingKeysUnderworld.lastTimeWearingUWCostume,
          );
          if (
            (!storageIsOptionEnabled(
              settingKeysUnderworld.canEnterUnderworld,
            ) ||
              ae ||
              (ke < 0 && Oe < 0)) &&
            ((Ue > 0 && !Ee && se < k) || (Pe > 0 && !Ge && le < k)) &&
            this.isAutoPerformUnderworld
          )
            return void be(Ue, Pe, Ee, Ge, se, le);
        }
        var De = storageGetArrayNumberOption(
            settingKeysPremium.autoUseBoostItems,
          ),
          Ne = De.includes(boostItemTypeValues.damage),
          Fe = storageGetNumberOption(
            settingKeysPremium.smallGrindstoneExpiredTime,
            0,
          ),
          Be = storageGetArrayOption(
            settingKeysPremium.selectedUsingBoostConditions,
          ).map((e) => parseInt(e)),
          Me = Be.includes(usingBoostConditionValues.anytime),
          qe = Be.includes(usingBoostConditionValues.inUnderworld),
          Re = Be.includes(usingBoostConditionValues.wearingUwCostume);
        let je =
          Me || (qe && isInUnderworld) || (Re && ue && hasExpeditionPoint);
        if (
          ((je =
            je &&
            !z &&
            !isWorking &&
            (isAutoPerformExp ||
              this.isAutoPerformArena ||
              (this.isAutoPerformUnderworld && isInUnderworld))),
          Ne && Fe < k && l && je)
        ) {
          var Qe = getMethodFunc(gts_mainWorkflow, 154);
          return void (Qe && Qe());
        }
        var Le = De.includes(boostItemTypeValues.healPoint);
        let He = getMethodFunc(gts_mainWorkflow, 155);
        He && He(De);
        let We = storageGetJsonOption(
          settingKeysPremium.healPointBoostExpiredTime,
          defaultHealPointBoostExpiredTime,
        );
        if (
          Le &&
          ((We.hpBoost8hTimer || 0) < k ||
            (We.hpBoost4hTimer || 0) < k ||
            (We.hpBoost2hTimer || 0) < k) &&
          l &&
          je
        ) {
          let e = getMethodFunc(gts_mainWorkflow, 156);
          return void (e && e());
        }
        for (let e of statisticNames) {
          let t = De.includes(boostItemTypeValues[e]),
            n = getMethodFunc(gts_mainWorkflow, 157);
          n && n(e, De);
          let i = storageGetJsonOption(
            settingKeysPremium[`${e}BoostExpiredTime`],
            defaultStatisticBoostExpiredTime,
          );
          if (
            t &&
            ((i.boost8hTimer || 0) < k ||
              (i.boost4hTimer || 0) < k ||
              (i.boost2hTimer || 0) < k ||
              (i.boost1hTimer || 0) < k) &&
            l &&
            je
          ) {
            let t = getMethodFunc(gts_mainWorkflow, 158);
            return void (t && t(e));
          }
        }
        let Je = storageGetNumberOption(
            settingKeysPremium.jewelleryOilBoost,
            0,
          ),
          Xe = jewelleryBoostOilOptions.find((e) => e.value == Je),
          Ve = storageGetArrayOption(settingKeysPremium.jewelleryOilLookupBag, [
            512,
          ]);
        if (Je > 0 && Xe && l && je && Ve.length > 0) {
          gts_mainWorkflow.setJewelleryBoostTimers();
          let e = Xe.data,
            t = storageGetJsonOption(
              settingKeysPremium.jewelleryOilBoostExpiredTime,
              defaultJewelleryBoostExpiredTime,
            );
          if (
            (((t.amulet || 0) < k && (e.damage > 0 || e.armour > 2)) ||
              ((t.ring1 || 0) < k && (e.damage > 1 || e.armour > 1)) ||
              ((t.ring2 || 0) < k && (e.damage > 2 || e.armour > 0))) &&
            (await gts_mainWorkflow.tryBoostingJewelleries())
          )
            return;
        }
        let Ye = getMethodFunc(gts_mainWorkflow, 160);
        if (je && Ye && (await Ye())) return;
        getMethodFunc(gts_mainWorkflow, 0);
        var $e = getMethodFunc(gts_mainWorkflow, 3),
          ze = getMethodFunc(gts_mainWorkflow, 24);
        let Ze = [
            () => $e && $e("cooldown_bar_text_arena", z),
            () =>
              (a.indexOf("1hbcf6") > -1 || a.indexOf("34i54") > -1) &&
              this.attackBankAccount(),
            () => $e && $e("cooldown_bar_text_ct"),
          ],
          et = [() => ze && ze(z)],
          tt = !1,
          nt = (e) => {
            e = gts_faketools.array.shuffle(e);
            for (let t = 0; t < e.length && !tt; t++) {
              let n = e[t];
              tt = n();
            }
          };
        nt([
          () => $e && $e("cooldown_bar_text_expedition", z),
          () => !isInUnderworld && $e && $e("cooldown_bar_text_dungeon"),
        ]),
          nt(Ze),
          nt([]),
          nt(et);
        var it = getMethodFunc(gts_mainWorkflow, 19);
        if (!tt) {
          var ot = storageGetNumberOption(
              settingKeysSmeltery.nextTryForSmelt,
              "0",
            ),
            rt =
              ((H = storageGetJsonOption(
                settingKeysSmeltery.itemsForSmelt,
              ).filter((e) => e)),
              gts_faketoolsUtility.tryParseJson(
                storageGetOption(settingKeysSmeltery.pendingItemForSmelt, ""),
              ));
          let e = storageGetNumberOption(settingKeysSmeltery.minGoldToSmelt),
            t = storageGetOption(settingKeysPremium.inventoriesForAutoSmelting);
          if (B > e && ot < k && (H.length > 0 || rt || t.length > 0))
            return void (it && l && s && it());
        }
        let at = getMethodFunc(gts_mainWorkflow, 141);
        if (!tt && h && at && (await at())) return;
        let st = storageGetOption(settingKeysPremium.warGuild),
          lt = storageGetNumberOption(settingKeysPremium.warGuildExtendTime),
          ut =
            !!st &&
            storageGetNumberOption(settingKeysPremium.warGuildTime) + lt < k;
        var gt = getMethodFunc(gts_mainWorkflow, 139);
        if ((!tt && ut && (tt = !0) && gt && gt(), !tt && _ && !b && w < k)) {
          tt = !0;
          let e = getMethodFunc(gts_mainWorkflow, 136);
          e &&
            e(
              () => gts_faketoolsUtility.reload(),
              !0,
              () => {
                storageSetNextTime(
                  settingKeysHealth.buyFoodFromMarketNextTime,
                  60,
                );
              },
            );
        }
        let dt =
            storageGetNumberOption(
              settingKeysHealth.nextTimeForCheckingFood,
              0,
            ) < k,
          ct = storageGetNumberOption(settingKeysHealth.minGoldToBuyFood, 0),
          mt =
            storageGetNumberOption(
              settingKeysHealth.buyFoodFromShopNextTime,
              0,
            ) > k;
        if (!tt && v && !b && dt && ct < B && !mt) {
          tt = !0;
          let e = getMethodFunc(gts_mainWorkflow, 131);
          e && e();
        }
        !tt &&
          l &&
          !x &&
          (x = !0) &&
          S &&
          S(function () {
            var e = jQuery(
                "#" + auctionItemsSectionId + " .gts-items-section-header",
              ),
              t = jQuery(
                "#" + auctionItemsSectionId + " .gts-items-section-content",
              )[0],
              n = e.find("label")[0];
            gts_main.buildAuctionMatchedItems(e[0], t, n);
          });
        var pt = getMethodFunc(gts_faketoolsUtility, 122),
          yt = !1;
        if (
          (!tt &&
            l &&
            !yt &&
            (yt = !0) &&
            pt &&
            pt(function (e) {
              storageSetJsonOption(settingKeysPremium.shopHighQualityItems, e),
                gts_main.buildHighQualityItemsInShop(
                  jQuery(
                    "#" + shopItemsSectionId + " .gts-items-section-content",
                  )[0],
                  e,
                );
            }),
          !tt && l && !isInUnderworld)
        ) {
          var ft = getMethodFunc(gts_mainWorkflow, 123);
          if (gts_gameUiHelper.hasLessThanHalfExpeditionPoint() && ft) {
            if (null == (tt = await ft()) || tt) return;
          } else {
            var ht = window[method + randomId](gts_faketools.utility, 127);
            if (ht) {
              let e = await ht();
              storageSetOption(settingKeysUnderworld.canEnterUnderworld, e);
            }
          }
        }
        var vt = getMethodFunc(gts_mainWorkflow, 28);
        if (
          !tt &&
          this.isAutoRepackExpiringItemEnabled &&
          l &&
          !gts_main.isOutbiddingVeryShort &&
          storageGetNumberOption(
            settingKeysPremium.timeToTriggerAutoRepack,
            "0",
          ) < k
        )
          return void (
            l &&
            s &&
            (this.isRepackExpiringItems = !0) &&
            vt &&
            vt()
          );
        var _t = getMethodFunc(gts_mainWorkflow, 146);
        if (
          (this.isAutoQuestEnabled && _t && (await _t()),
          !tt && !gts_main.isOutbiddingVeryShort && !_e)
        ) {
          let e = !1,
            t = getMethodFunc(gts_mainWorkflow, 143),
            n = getMethodFunc(gts_mainWorkflow, 144),
            i = getMethodFunc(gts_mainWorkflow, 145);
          if (
            (fe && t && (e = await t(fe)),
            we && n && (e = await n()),
            (e = t && (await t())))
          )
            return;
          if ((e = i && (await i()))) return;
        }
        let wt = getMethodFunc(gts_mainWorkflow, 142);
        !tt && !ue && wt && (tt = await wt());
        let bt = getMethodFunc(gts_mainWorkflow, 151);
        !tt && bt && !gts_main.isOutbiddingVeryShort && (tt = await bt());
        var kt = getMethodFunc(gts_mainWorkflow, 134);
        !tt && kt && kt(),
          !tt && this.checkToken(),
          z &&
            !tt &&
            gts_faketoolsUtility.setStatusMessage(
              "Bot are waiting for life points to recovers in order to continue attacking expedition, arena or underworld.".gts_translate(),
            );
      },
      l53: async function (e, t, n, i, o) {
        let r = getMethodFunc(gts_faketoolsUtility, 100);
        if (!r || !r(e, n)) return !1;
        if (!gts_faketoolsUtility.isEnoughGoldForRepair()) return !1;
        let a = await gts_gameApi.getWorkbenchPreview(t, e.itemId);
        if (!a) return !1;
        var s = getMethodFunc(gts_faketoolsUtility, 120);
        let l = [],
          u = !1;
        if ((gts_main.isP && s && s(a)) || n) {
          var g = getMethodFunc(gts_faketoolsUtility, 113);
          let t = await g(a, n);
          if (!t || 0 == Object.keys(t).length)
            return (
              o && o(e.itemId, autoRepairErrorCode.notEnoughMaterial, a), !1
            );
          (u = !1), (l = t);
        } else {
          var d = getMethodFunc(gts_faketoolsUtility, 114);
          let t = await d(a);
          if (!t || 0 == t.length)
            return (
              o && o(e.itemId, autoRepairErrorCode.notEnoughMaterial, a), !1
            );
          (u = !0), (l = t);
        }
        if (
          (gts_faketoolsUtility.setStatusMessage(
            "Renting workbench slot".gts_translate(),
          ),
          !(await gts_gameApi.rentWorkbenchSlot(t, e.itemId)))
        )
          return !1;
        if ((i && i(e, autoRepairItemState.inWorkbench), u))
          for (let e of l) await gts_gameApi.storageToWarehouse(t, e);
        else {
          var c = getMethodFunc(gts_faketoolsUtility, 115);
          for (let n of l)
            await c(
              n.material,
              n.quality,
              n.amount,
              t,
              e.positionX,
              e.positionY,
              e.containerNumber,
            );
        }
        gts_faketoolsUtility.setStatusMessage("Start repair".gts_translate()),
          await gts_gameApi.startForge(t),
          i && i(e, autoRepairItemState.isRepairing);
        let m = await gts_gameApi.getWorkbenchWaitingTime(t);
        await ((e) =>
          new Promise((t) => {
            setInterval(() => {
              e >= 0
                ? (gts_faketoolsUtility.setStatusMessage(
                    "Waiting for repairing item ({time})".gts_translate({
                      time: e,
                    }),
                  ),
                  gts_faketoolsUtility.keepAlive(),
                  e--)
                : t();
            }, 1e3);
          }))(m),
          gts_faketoolsUtility.setStatusMessage(
            "Send item to package".gts_translate(),
          ),
          await gts_gameApi.workbench.checkSlotFinishAndSendToPackage(t),
          i && i(e, autoRepairItemState.inPackage);
        var p = getMethodFunc(gts_faketoolsUtility, 118);
        return (
          ((e = await p(e)).isFinished = !0),
          i && i(e, autoRepairItemState.packageToInventoy),
          e
        );
      },
      k20: async function (e) {
        var t = storageIsOptionEnabled(settingKeysUnderworld.enabled),
          n = storageIsOptionEnabled(settingKeysArena.enabled),
          i = storageIsOptionEnabled(settingKeysCircusTuma.enabled),
          o = storageIsOptionEnabled(settingKeysUnderworld.pauseArena),
          r = [questType.any, questType.combat];
        (isAutoPerformExp || t || isAutoPerformDun) && r.push(questType.item),
          (isAutoPerformExp || t) && r.push(questType.expedition),
          isAutoPerformDun && r.push(questType.dungeon),
          n && (!o || !isInUnderworld) && r.push(questType.arena),
          i && r.push(questType.groupArena);
        var a = storageGetJsonOption(settingKeys.quest.pickingRules);
        a = a.filter((e) => e);
        var s = Array.from(e.find(".contentboard_slot_active")).map((e) => {
            var t = gts_faketoolsUtility.getQuestIconName(
              e.querySelector(".quest_slot_icon").getAttribute("style"),
            );
            return t.indexOf("icon_grouparena") > -1
              ? questType.groupArena
              : t.indexOf("icon_arena") > -1
                ? questType.arena
                : null;
          }),
          l = s.indexOf(questType.arena) > -1,
          u = s.indexOf(questType.groupArena) > -1;
        storageSetOption(settingKeys.quest.hasArenaQuest, l),
          storageSetOption(settingKeys.quest.hasTumaQuest, u);
        var g = gts_UrlInfo.link({}),
          d = g.substring(0, g.indexOf("index")),
          c = Array.from(e.find(".contentboard_slot_inactive"))
            .map((e) => {
              var t = e.querySelector(".quest_slot_button");
              if (!t) return null;
              var n = gts_faketoolsUtility.getQuestIconName(
                  e.querySelector(".quest_slot_icon").getAttribute("style"),
                ),
                i = e
                  .querySelector(".quest_slot_title")
                  .textContent.toLowerCase(),
                o = e.querySelector(".quest_slot_reward_item > img"),
                r = null,
                s = !1;
              if (o)
                try {
                  var l = JSON.parse(jQuery(o).attr("data-tooltip"))[0];
                  r = l[0][0];
                  s = 250 == l[l.length - 1][2];
                } catch {}
              var u = i.match(/(\d+)/),
                g =
                  n.indexOf("icon_grouparena") > -1
                    ? questType.groupArena
                    : n.indexOf("icon_arena") > -1
                      ? questType.arena
                      : n.indexOf("icon_items") > -1
                        ? questType.item
                        : n.indexOf("icon_combat") > -1
                          ? questType.combat
                          : n.indexOf("icon_expedition") > -1
                            ? questType.expedition
                            : n.indexOf("icon_dungeon") > -1
                              ? questType.dungeon
                              : questType.work,
                c = u ? parseInt(u[1]) : 0,
                m = null == e.querySelector(".quest_slot_time"),
                p = null != e.querySelector(".quest_slot_reward_xp"),
                y = e.querySelectorAll(".quest_slot_reward_god"),
                f = {};
              for (var h of y) {
                var v = h.querySelector("[src]").getAttribute("src"),
                  _ = parseInt(
                    h
                      .querySelector("[data-tooltip]")
                      .getAttribute("data-tooltip")
                      .match(/\d+/)[0],
                  ),
                  w = godImageMaps[v.match(/\/(\w+)\.png/)[1]];
                f[w] = _;
              }
              for (
                var b = a.filter((e) => e.type == g || e.type == questType.any),
                  k = !1,
                  O = 999,
                  I = null,
                  C = 0;
                C < b.length && !k;
                C++
              ) {
                var S = b[C];
                (k =
                  !S.conditions.length ||
                  S.conditions.every((e) => {
                    if (e.operator == filterOperators.contains) {
                      var t = new RegExp(e.value.trim(), "gi");
                      return !!i.match(t);
                    }
                    if (e.operator == filterOperators.notContains) {
                      t = new RegExp(e.value.trim(), "gi");
                      return !i.match(t);
                    }
                    if (e.operator == filterOperators.numberAttackLessThan)
                      return c < e.value;
                    if (e.operator == filterOperators.hasNoTimer) return m;
                    if (e.operator == filterOperators.itemContains && r && !s) {
                      t = new RegExp(e.value.trim(), "gi");
                      return !!r.match(t);
                    }
                    if (
                      e.operator == filterOperators.itemNotContains &&
                      r &&
                      !s
                    ) {
                      t = new RegExp(e.value.trim(), "gi");
                      return !r.match(t);
                    }
                    return e.operator == filterOperators.rewardIsFood
                      ? s
                      : e.operator == filterOperators.hasExperience
                        ? p
                        : e.operator == filterOperators.hasApollo
                          ? f.apollo > 0
                          : e.operator == filterOperators.hasVulcan
                            ? f.vulcan > 0
                            : e.operator == filterOperators.hasMars
                              ? f.mars > 0
                              : e.operator == filterOperators.hasMercury
                                ? f.mercury > 0
                                : e.operator == filterOperators.hasDiana
                                  ? f.diana > 0
                                  : e.operator == filterOperators.hasMinerva &&
                                    f.minerva > 0;
                  })) && (I = S.type),
                  (O = a.indexOf(S));
              }
              return {
                url: d + t.getAttribute("href"),
                questType: I,
                count: c,
                title: i,
                validToPick: k,
                order: O,
              };
            })
            .filter((e) => e && r.indexOf(e.questType) > -1 && e.validToPick)
            .sort((e, t) =>
              t.order > e.order
                ? 1
                : t.order < e.order
                  ? -1
                  : t.count > e.count
                    ? -1
                    : t.count < e.count
                      ? 1
                      : 0,
            )
            .pop();
        if (c) {
          storageSetOption(settingKeys.quest.renewQuestCount, 0);
          let e = await jQuery.get(c.url);
          return preventJQueryLoadResource(e);
        }
        {
          let t = e.find("#quest_footer_reroll [type=button]").length > 0;
          var m = e.find(".quest_slot_button_cancel").length;
          if (t && m < 5) {
            let e = await gts_gameApi.resetPantheon();
            return preventJQueryLoadResource(e);
          }
        }
      },
      tryBoostingJewelleries: async function () {
        gts_main.isExecuting = !0;
        var e = gts_UrlInfo.link({ mod: "overview", doll: 1 }),
          t = /data-ticker-time-left=\\\"(\d+)\\\"/,
          n = (e) => {
            var n = e.match(t);
            return null != n ? parseInt(n[1]) : 0;
          };
        let i = (e) => new Date().getTime() + e;
        if (!(window.location.href.indexOf("mod=overview") > -1 && 1 == dollId))
          return (window.location.href = e), !0;
        {
          let e = new Date().getTime(),
            t = storageGetArrayOption(
              settingKeysPremium.jewelleryOilLookupBag,
              [512],
            ),
            r = storageGetNumberOption(settingKeysPremium.jewelleryOilBoost, 0),
            a = jewelleryBoostOilOptions.find((e) => e.value == r).data,
            s = storageGetJsonOption(
              settingKeysPremium.jewelleryOilBoostExpiredTime,
              defaultJewelleryBoostExpiredTime,
            ),
            l = getMethodFunc(gts_faketoolsUtility, 159),
            u = !1;
          if ((s.amulet || 0) < e && (a.damage > 0 || a.armour > 2)) {
            u = !0;
            let e =
                a.damage > 0
                  ? itemSubTypeValues.damageOil
                  : itemSubTypeValues.armourOil,
              r = l && (await l(e, t));
            if (r)
              if (
                (r = await gts_gameApi.moveItemFromInventoryToDollEquipment(
                  dollId,
                  r.containerNumber,
                  r.positionX,
                  r.positionY,
                  charItemContainerId.amulet,
                ))
              )
                (o = n(JSON.stringify(r.tooltip))) > 0 && (s.amulet = i(o));
              else s.amulet = i(5 * minuteInMillisecond);
            else s.amulet = i(30 * minuteInMillisecond);
          }
          if ((s.ring1 || 0) < e && (a.damage > 1 || a.armour > 1)) {
            u = !0;
            let e =
                a.damage > 1
                  ? itemSubTypeValues.damageOil
                  : itemSubTypeValues.armourOil,
              r = l && (await l(e, t));
            if (r)
              if (
                (r = await gts_gameApi.moveItemFromInventoryToDollEquipment(
                  dollId,
                  r.containerNumber,
                  r.positionX,
                  r.positionY,
                  charItemContainerId.ring1,
                ))
              )
                (o = n(JSON.stringify(r.tooltip))) > 0 && (s.ring1 = i(o));
              else s.ring1 = i(5 * minuteInMillisecond);
            else s.ring1 = i(30 * minuteInMillisecond);
          }
          if ((s.ring2 || 0) < e && (a.damage > 2 || a.armour > 0)) {
            u = !0;
            let e =
                a.damage > 2
                  ? itemSubTypeValues.damageOil
                  : itemSubTypeValues.armourOil,
              r = l && (await l(e, t));
            var o;
            if (r)
              if (
                (r = await gts_gameApi.moveItemFromInventoryToDollEquipment(
                  dollId,
                  r.containerNumber,
                  r.positionX,
                  r.positionY,
                  charItemContainerId.ring2,
                ))
              )
                (o = n(JSON.stringify(r.tooltip))) > 0 && (s.ring2 = i(o));
              else s.ring2 = i(5 * minuteInMillisecond);
            else s.ring2 = i(30 * minuteInMillisecond);
          }
          if (u)
            return (
              storageSetJsonOption(
                settingKeysPremium.jewelleryOilBoostExpiredTime,
                s,
              ),
              gts_faketoolsUtility.reload(),
              !0
            );
        }
      },
      f155: async function () {
        if (isTraveling || isInUnderworld || isWorking || playerLevel < 10)
          return !1;
        if (isTravelToSelectDungeonCountryCalled) return !0;
        let e = dungeonData.find((e) => e.id == dungeonCountryLocation).country,
          t = travelCosts[`${currentCountry}-${e}`],
          n = gts_gameUiHelper.getCurrentGold();
        return (
          e != currentCountry &&
          t < n &&
          !isInUnderworld &&
          ((isTravelToSelectDungeonCountryCalled = !0),
          await gts_gameApi.travelToCountry(
            e,
            allowUseClotheToTravelToDungeonCountry,
          ),
          gts_faketoolsUtility.reload(),
          !0)
        );
      },
      t127: function () {
        var e,
          t = storageGetJsonOption(settingKeysPremium.publicMarketSellers).map(
            (e) => e.sellerName,
          )[0],
          n = gts_UrlInfo.link({
            mod: "market",
            fl: 0,
            fq: -1,
            f: 0,
            qry: "",
            seller: t,
            s: "d",
            p: 1,
          });
        if (window.location.href.indexOf("mod=market") > -1) {
          var i = document.getElementById("market_table"),
            o = getMethodFunc(gts_mainWorkflow, 25);
          if (!i) return void (o && o());
          for (
            var r = gts_faketoolsUtility.getCurrentGold(),
              a = Array.from(i.querySelectorAll("input[name=buyid]")),
              s = Array.from(i.querySelectorAll("input[name=qry]")),
              l = Array.from(i.querySelectorAll("input[name=seller]")),
              u = Array.from(i.querySelectorAll("input[name=f]")),
              g = Array.from(i.querySelectorAll("input[name=fl]")),
              d = Array.from(i.querySelectorAll("input[name=fq]")),
              c = Array.from(i.querySelectorAll("input[name=s]")),
              m = Array.from(i.querySelectorAll("input[name=p]")),
              p = Array.from(i.querySelectorAll("tr")),
              y = !0,
              f = [],
              h =
                (storageGetJsonOption(settingKeysPremium.boughtGoldPacks),
                storageGetJsonOption(
                  settingKeysPremium.publicMarketSellers,
                ).map((e) => e.sellerId)),
              v = 1;
            v < p.length;
            v++
          ) {
            var _ = p[v].children,
              w = gts_faketoolsUtility.parseGold(_[2].innerText.trim()),
              b = p[v].querySelector("input[name=buy]"),
              k = p[v].querySelector("a").href.match(/\&p=(\d+)\&/)[1];
            if (!(!b || b.disabled || r < w || h.indexOf(k) < 0)) {
              var O = _[1].innerText.trim(),
                I = _[0].querySelector("[data-content-type]");
              gts_faketoolsUtility.randomId(),
                gts_faketoolsUtility.getItemName(I),
                gts_faketoolsUtility.getItemContentType(I),
                gts_faketoolsUtility.getItemBasis(I),
                gts_faketoolsUtility.getItemQuality(I),
                gts_faketoolsUtility.getItemAmount(I),
                gts_faketoolsUtility.getItemLevel(I),
                gts_faketoolsUtility.getItemMeasurementX(I),
                gts_faketoolsUtility.getItemMeasurementY(I),
                gts_faketoolsUtility.getServerDateString();
              (y = !1), (r -= w);
              var C = {
                buyid: a[v - 1].getAttribute("value"),
                qry: s[v - 1].getAttribute("value"),
                seller: l[v - 1].getAttribute("value"),
                f: u[v - 1].getAttribute("value"),
                fl: g[v - 1].getAttribute("value"),
                fq: d[v - 1].getAttribute("value"),
                s: c[v - 1].getAttribute("value"),
                p: m[v - 1].getAttribute("value"),
                buy: "Buy",
              };
              f.push(1),
                (e = C),
                jQuery
                  .post(n, e, function () {
                    f.pop();
                  })
                  .fail(function () {
                    f.pop();
                  });
            }
          }
          var S = function () {
            f.length > 0
              ? setTimeout(() => {
                  S();
                }, 300)
              : setTimeout(() => {
                  window.location.reload(!0);
                }, 1e3);
          };
          S(), y && o && o();
        } else window.location.href = n;
      },
      q82: function () {
        if (window.isHidingGold || gts_mainWorkflow.isPutingPack) return;
        window.isHidingGold = !0;
        var e = {
            mod: "guildMarket",
            fl: 0,
            fq: -1,
            f: 0,
            qry: "",
            seller: "",
            s: storageGetOption(
              settingKeysPremium.guildPackSorting,
              guildPackSorting[2].value,
            ),
            p: 1,
          },
          t = gts_UrlInfo.link(e);
        if (window.location.href.indexOf("mod=guildMarket") > -1) {
          var n = 1;
          setInterval(() => {
            let e = ".".repeat((n % 3) + 1);
            gts_faketoolsUtility.setStatusMessage(
              e + "Hiding gold in Guild Market".gts_translate() + e,
            ),
              n++,
              storageSetOption(settingKeysPremium.isInventoryUsing, "true");
          }, 1e3),
            (async function () {
              var t = document.getElementById("market_table"),
                n = getMethodFunc(gts_mainWorkflow, 25);
              if (!t) return void (n && n());
              var i = gts_faketoolsUtility.getCurrentGold(),
                o = Array.from(t.querySelectorAll("input[name=buyid]")),
                r = Array.from(t.querySelectorAll("input[name=qry]")),
                a = Array.from(t.querySelectorAll("input[name=seller]")),
                s = Array.from(t.querySelectorAll("input[name=f]")),
                l = Array.from(t.querySelectorAll("input[name=fl]")),
                u = Array.from(t.querySelectorAll("input[name=fq]")),
                g = Array.from(t.querySelectorAll("input[name=s]")),
                d = Array.from(t.querySelectorAll("input[name=p]")),
                c = Array.from(t.querySelectorAll("tr")),
                m = !0,
                p = storageGetNumberOption(
                  settingKeysPremium.minGoldPackCanBuy,
                  "30000",
                ),
                y = storageGetNumberOption(
                  settingKeysPremium.maxGoldPackCanBuy,
                  "9000000",
                ),
                f = storageGetNumberOption(
                  settingKeysPremium.packDuration,
                  marketDuration.twoHours,
                ),
                h = storageGetNumberOption(
                  settingKeysAuction.packGoldAmount,
                  "30000",
                );
              let v = 1,
                _ = !1,
                w = (e) => {
                  var t = storageGetJsonOption(
                    settingKeysPremium.boughtGoldPacks,
                  );
                  (t = t.filter(
                    (t) => t.id != e.id && (1 == t.version || !t.isError),
                  )).push(e),
                    storageSetJsonOption(settingKeysPremium.boughtGoldPacks, t);
                },
                b = (e) => {
                  var t = storageGetJsonOption(
                    settingKeysPremium.boughtGoldPacks,
                  );
                  (t = t.filter((t) => t.id != e)),
                    storageSetJsonOption(settingKeysPremium.boughtGoldPacks, t);
                };
              do {
                var k = c[v].children,
                  O = gts_faketoolsUtility.parseGold(k[2].innerText.trim()),
                  I = c[v].querySelector("input[name=buy]");
                if (!I || I.disabled || i < O || O < p || O > y) {
                  v++;
                  continue;
                }
                var C = k[1].innerText.trim(),
                  S = k[0].querySelector("[data-content-type]"),
                  x = gts_gameUiHelper.getItemData(S);
                delete x.tooltip,
                  jQuery.extend(!0, x, {
                    id: gts_faketoolsUtility.randomId(),
                    seller: C,
                    packAmount: O,
                    time: gts_faketoolsUtility.getServerDateString(),
                    triedCount: 0,
                    version: 1,
                  });
                let e = {
                    buyid: o[v - 1].getAttribute("value"),
                    qry: r[v - 1].getAttribute("value"),
                    seller: a[v - 1].getAttribute("value"),
                    f: s[v - 1].getAttribute("value"),
                    fl: l[v - 1].getAttribute("value"),
                    fq: u[v - 1].getAttribute("value"),
                    s: g[v - 1].getAttribute("value"),
                    p: d[v - 1].getAttribute("value"),
                    buy: "Buy",
                  },
                  t = await gts_gameApi.market.buyItem(e);
                if (t < i - O + 0.01 * i) {
                  if (((m = !1), w(x), (i = t), !_)) {
                    let e = gts_faketoolsUtility.cpsfpi;
                    await e(!0), (_ = !0);
                  }
                  var T = gts_faketoolsUtility.t_ficnip,
                    K = 0;
                  do {
                    (x.containerNumber = await T(x)),
                      K++,
                      0 == x.containerNumber && (await gts_gameApi.delay(1e3));
                  } while (K < 3 && 0 == x.containerNumber);
                  if (
                    (0 == x.containerNumber &&
                      (x.containerNumber = await T(x, !0)),
                    w(x),
                    0 != x.containerNumber &&
                      gts_mainWorkflow.isAutoPutPackBackEnabled &&
                      i >= (O * (f + 1)) / 100)
                  ) {
                    var A = getMethodFunc(gts_faketoolsUtility, 43);
                    let e = gts_gameUiHelper.canSellItemToGM();
                    if (
                      (storageSetNextTime(
                        settingKeys.guildMarket.guildMarketFullTime,
                        e ? 0 : 30,
                      ),
                      !e)
                    )
                      continue;
                    let t = await A(x.measurementX, x.measurementY);
                    if (!t) continue;
                    let n = await gts_gameApi.moveItemFromPackageToInventory(
                      x.containerNumber,
                      t.bagId,
                      t.spot.x + 1,
                      t.spot.y + 1,
                      x.amount,
                    );
                    if (n) {
                      let e = (O * (f + 1)) / 100;
                      if ((i = gts_faketoolsUtility.getCurrentGold()) >= e) {
                        let t = await gts_gameApi.market.sellItem(
                            n.itemId,
                            x.packAmount,
                            f,
                          ),
                          o = preventJQueryLoadResource(t),
                          r = gts_gameUiHelper.getCurrentGold(o);
                        r < i - e / 2 + 0.05 * e && b(x.id), (i = r);
                      }
                    }
                  }
                } else i = t;
                v++;
              } while (v < c.length);
              if (m && i > h) {
                var U = window.location.href.match(/\&p=(\d)/),
                  P = U ? parseInt(U[1]) : 1,
                  E = jQuery("#market_table").next(),
                  G = 1;
                E && (G = E.find("a").length),
                  P < G
                    ? ((e.p = P + 1),
                      (window.location.href = gts_UrlInfo.link(e)))
                    : n && n();
              } else gts_faketoolsUtility.reload();
            })();
        } else window.location.href = t;
      },
      g137: function (e) {
        var t = settingKeys.quest.cooldown;
        if (
          "true" == storageGetOption(settingKeys.quest.enabled, "false") &&
          !gts_main.isQuestChecked
        ) {
          if (
            ((gts_main.isQuestChecked = !0),
            window.location.href.indexOf("mod=quests") > -1)
          ) {
            var n =
              jQuery("#quest_header_cooldown [data-ticker-type]").data(
                "ticker-time-left",
              ) || 0;
            storageSetOption(t, new Date().getTime() + n);
          }
          var i = storageGetOption(t, "0"),
            o = new Date(parseInt(i)) - new Date();
          o > 0 && (n = o);
          var r = storageGetJsonOption(settingKeys.quest.pickingRules),
            a = gts_mainWorkflow,
            s = getMethodFunc(a, 1),
            l = getMethodFunc(a, 2);
          if (!n) return e && r.length > 0 ? l() : s(), !0;
          setTimeout(function () {
            gts_main.isFixingItem ||
              gts_main.isSelling ||
              (e && r.length > 0 ? l() : s());
          }, n);
        }
      },
      e68: async function () {
        let e = await gts_gameApi.getPackagePageForFood(),
          t = preventJQueryLoadResource(e).find(".paging_numbers"),
          n = t.length ? Array.from(t[0].children).pop() : null;
        return (
          (n ? parseInt(n.textContent) : 1) >
          storageGetNumberOption(settingKeysHealth.maxPageOfFoodInPackage, 5)
        );
      },
      d78: function (e, t, n) {
        gts_faketools.storage.migrateOldDataArrayToJson(t.players);
        var i = storageGetJsonOption(t.players)
          .filter((e) => !!e)
          .map((e) => e.trim().toLowerCase());
        gts_faketools.storage.migrateOldDataArrayToJson(t.ignorePlayers);
        var o = storageGetJsonOption(t.ignorePlayers)
          .filter((e) => !!e)
          .map((e) => e.trim().toLowerCase());
        gts_faketools.storage.migrateOldDataArrayToJson(t.servers);
        var r = storageGetJsonOption(t.servers)
          .filter((e) => !!e)
          .map((e) => e.trim().toLowerCase());
        gts_faketools.storage.migrateOldDataArrayToJson(t.ignoreServers);
        var a = storageGetJsonOption(t.ignoreServers)
            .filter((e) => !!e)
            .map((e) => e.trim().toLowerCase()),
          s = "true" == storageGetOption(t.attackFiveTimesEnabled, !0),
          l = storageGetJsonOption(
            settingKeysPremium.attackedDailyHistories,
            {},
            !0,
          ),
          u = gts_faketoolsUtility.getServerDateFormated(),
          g = l[u];
        g || ((l = {})[u] = g = {});
        for (
          var d = n ? "arena" : "circus",
            c = [],
            m = [],
            p = [],
            y = [],
            f = gts_faketoolsUtility.getPlayerLevel(),
            h = [],
            v = 1;
          v < e.length;
          v++
        ) {
          var _ = e[v].children,
            w = _[0].innerText.trim().toLowerCase();
          c.push(w),
            m.push(_[1].innerText),
            p.push(_[2].innerText),
            y.push(_[0].querySelector("a").href.match(/\&p=(\d+)/)[1]);
          var b = _[0].querySelector("span");
          ((b ? b.getAttribute("style") : "") || "").indexOf("color:green") >
            -1 &&
            i.indexOf(w) < 0 &&
            o.push(w);
        }
        var k = void 0;
        for (v = 0; v < e.length; v++) {
          w = c[v];
          var O = (K = g[(T = (I = p[v]) + "_" + (A = y[v]))]) && K[d];
          if (o.indexOf(w) > -1 || a.indexOf(I) > -1 || (s && O >= 5))
            h.push(v);
          else if (parseInt(m[v]) <= f + 10 && i.indexOf(w) > -1) {
            k = v;
            break;
          }
        }
        if (void 0 === k)
          for (v = 0; v < e.length; v++) {
            var I = p[v];
            if (
              parseInt(m[v]) <= f + 10 &&
              h.indexOf(v) < 0 &&
              r.indexOf(I) > -1
            ) {
              k = v;
              break;
            }
          }
        if (void 0 === k) {
          var C = void 0,
            S = parseInt(m[0]);
          for (v = 0; v < m.length; v++) {
            var x = parseInt(m[v]);
            x <= f + 10 && h.indexOf(v) < 0 && x <= S && ((C = v), (S = x));
          }
          k = C;
        }
        if (null != k) {
          var T,
            K,
            A = y[k];
          (K = g[(T = (I = p[k]) + "_" + A)] || { arena: 0, circus: 0 })[d]++,
            (g[T] = K),
            storageSetOption(
              settingKeysPremium.attackedDailyHistories,
              JSON.stringify(l),
            );
        }
        return null != k ? k : -1;
      },
      j62: async () => {
        gts_main.isExecuting = !0;
        var e = gts_UrlInfo.link({ mod: "overview", doll: 1 }),
          t = /data-ticker-time-left=\\\"(\d+)\\\"/,
          n = (e) => {
            var n = e.match(t);
            return null != n ? parseInt(n[1]) : 0;
          },
          i = (e) => {
            var t = new Date().getTime();
            storageSetOption(
              settingKeysPremium.smallGrindstoneExpiredTime,
              t + (e || 3e5),
            ),
              gts_faketoolsUtility.reload();
          };
        if (window.location.href.indexOf("mod=overview") > -1 && 1 == dollId)
          if (
            (s = n(
              jQuery("[data-container-number=3][data-tooltip]").attr(
                "data-tooltip",
              ),
            )) > 0
          )
            i(s);
          else {
            var o = getMethodFunc(gts_faketoolsUtility, 43);
            let e = await o(1, 1);
            if (!e) return void i();
            let t = e.spot,
              g = e.bagId,
              d = gts_faketoolsUtility.cpsfrei;
            await d(!0);
            let c = langData[gts_gameLang].smallGrindstone.split(" ")[0];
            var r = await gts_gameApi.getPackagePage({}, 1, {
                qry: c,
                f: itemTypeValues.upgrades,
              }),
              a = Array.from(preventJQueryLoadResource(r).find(".packageItem"));
            if (0 == a.length) return void i(36e5);
            var s,
              l = a[0].querySelector("input").getAttribute("value"),
              u = await gts_gameApi.moveItemFromPackageToInventory(
                l,
                g,
                t.x + 1,
                t.y + 1,
                1,
              );
            if (u)
              if (
                (u = await gts_gameApi.moveItemFromInventoryToDollEquipment(
                  dollId,
                  g,
                  t.x + 1,
                  t.y + 1,
                  charItemContainerId.weapon,
                ))
              )
                if ((s = n(JSON.stringify(u.tooltip))) > 0) return void i(s);
            i();
          }
        else window.location.href = e;
      },
      m24: function (e, t) {
        if (
          !t.includes(boostItemTypeValues[e]) ||
          window.location.href.indexOf("mod=overview") < 0 ||
          1 != dollId
        )
          return;
        var n = gts_gameUiHelper.getBoostTimer(boostIconMap[e].bottle),
          i = gts_gameUiHelper.getBoostTimer(boostIconMap[e].flacon),
          o = gts_gameUiHelper.getBoostTimer(boostIconMap[e].ampulla),
          r = gts_gameUiHelper.getBoostTimer(boostIconMap[e].flask);
        let a = new Date().getTime(),
          s = settingKeysPremium[`${e}BoostExpiredTime`],
          l = storageGetJsonOption(s, defaultStatisticBoostExpiredTime);
        n > 0 && (l.boost8hTimer = a + n),
          i > 0 && (l.boost4hTimer = a + i),
          o > 0 && (l.boost2hTimer = a + o),
          r > 0 && (l.boost1hTimer = a + r),
          storageSetJsonOption(s, l);
      },
      q8: function () {
        var e = storageGetJsonOption(settingKeysPremium.requestingPacks),
          t = gts_faketoolsUtility.getCurrentGold();
        if (0 != e.length) {
          var n = e
            .sort(function (e, t) {
              return e.packAmount - t.packAmount;
            })
            .pop();
          if (!(t < (3 * n.packAmount) / 100)) {
            var i = gts_UrlInfo.link({ mod: "guildMarket" });
            if (window.location.href.indexOf("mod=guildMarket") > -1) {
              var o = storageGetOption(settingKeysPremium.resourceBag, "512"),
                r = document
                  .querySelector("#inventory_nav")
                  .querySelector(".awesome-tabs.current")
                  .getAttribute("data-bag-number"),
                a = function () {
                  for (
                    var t = document.getElementById("inv"), i = 0;
                    i < t.children.length;
                    i++
                  ) {
                    var o = t.children[i];
                    if ("spinner-img" == o.getAttribute("class")) {
                      (isHealthed = !0),
                        setTimeout(function () {
                          a();
                        }, 5e3);
                      break;
                    }
                    var s = o.getAttribute("data-basis").split("-")[0],
                      l = o.getAttribute("data-item-id"),
                      u = parseInt(o.getAttribute("data-amount")),
                      g = o.getAttribute("data-position-x"),
                      d = o.getAttribute("data-position-y"),
                      c = gts_faketoolsUtility.getItemQuality(o);
                    if ("18" == s && c <= 1) {
                      var m = function (t) {
                        var i = gts_UrlInfo.link({ mod: "guildMarket" });
                        jQuery.post(
                          i,
                          {
                            sellid: t,
                            preis: n.packAmount,
                            dauer: 1,
                            sell_mode: 0,
                            anbieten: "Offer",
                          },
                          function () {
                            e = e.filter((e) => e.messageId != n.messageId);
                            var t = storageGetJsonOption(
                              settingKeysPremium.processedPacks,
                            );
                            t.push(n),
                              storageSetOption(
                                settingKeysPremium.processedPacks,
                                JSON.stringify(t),
                              ),
                              storageSetOption(
                                settingKeysPremium.requestingPacks,
                                JSON.stringify(e),
                              ),
                              setTimeout(() => {
                                window.location.reload(!0);
                              }, 1e3);
                          },
                        );
                      };
                      if (u > 1) {
                        var p = gts_faketools.item._move.findSpotInInventory(
                          1,
                          1,
                        );
                        p ||
                          (storageSetOption(
                            settingKeysPremium.allowRequestPackEnabled,
                            "false",
                          ),
                          setTimeout(() => {
                            window.location.reload(!0);
                          }, 10));
                        var y = gts_UrlInfo.ajaxLink({
                          mod: "inventory",
                          submod: "move",
                          from: r,
                          fromX: g,
                          fromY: d,
                          to: r,
                          toX: p.x + 1,
                          toY: p.y + 1,
                          amount: 1,
                          a: new Date().getTime(),
                        });
                        jQuery.post(y, {}, function (e) {
                          var t = JSON.parse(e);
                          m(t.to.data.itemId);
                        });
                      } else m(l);
                      return;
                    }
                  }
                };
              return (
                r != o
                  ? (gts_faketools.inventory.onLoaded(function () {
                      a();
                    }),
                    document
                      .querySelector('a[data-bag-number="' + o + '"]')
                      .click())
                  : a(),
                !0
              );
            }
            window.location.href = i;
          }
        }
      },
      r87: async function () {
        var e = storageGetNumberOption(
            settingKeysPremium.nextTimeCheckItemForSmelting,
          ),
          t = new Date().getTime();
        if (e > t) return;
        storageSetOption(
          settingKeysPremium.nextTimeCheckItemForSmelting,
          t + 5 * minuteInMillisecond,
        );
        let n = await gts_gameApi.forge.getLearnedScroll(),
          i = ruleEvaluator.getMappedSmeltingRules();
        if (0 == i.length) return;
        gts_main.isFixingItem = !0;
        let o = gts_faketoolsUtility.eawsei;
        var r = window[method + randomId](ruleEvaluator, 135);
        o(async () => {
          let e = storageGetJsonOption(settingKeys.smeltery.itemsForSmelt),
            t = [
              ...storageGetJsonOption(settingKeys.premium.doll1Items),
              ...storageGetJsonOption(settingKeys.premium.doll2Items),
            ],
            o = storageGetNumberOption(
              settingKeysPremium.processingPackagePage,
              1,
            ),
            a = { fq: i.minQuality };
          await gts_faketoolsUtility.runActionOnPackagePages(
            a,
            o,
            40,
            (a) => {
              gts_faketoolsUtility.setStatusMessage(
                "Finding item for smelting (page {pageIndex})".gts_translate({
                  pageIndex: o,
                }),
              );
              let s = a.reduce((o, a) => {
                let s = r && r(a, i, e, t, n);
                return s && o.push(s), o;
              }, []);
              s.length &&
                (e.push(...s),
                storageSetJsonOption(settingKeys.smeltery.itemsForSmelt, e)),
                storageSetOption(settingKeysPremium.processingPackagePage, ++o),
                storageSetOption(settingKeysSmeltery.nextTryForSmelt, 0);
            },
            () => {
              storageSetOption(settingKeysPremium.processingPackagePage, 1),
                storageSetOption(
                  settingKeysPremium.nextTimeCheckItemForSmelting,
                  new Date().getTime() + 30 * minuteInMillisecond,
                );
            },
          );
          let s = e.length > 10 ? 15 : e.length > 50 ? 50 : 5;
          storageSetOption(
            settingKeysPremium.nextTimeCheckItemForSmelting,
            new Date().getTime() + s * minuteInMillisecond,
          ),
            gts_faketoolsUtility.reload();
        }, !0);
      },
      b58: async function (e, t, n) {
        let i = 0,
          o = [];
        for (var r = document.getElementById("inv"); i < e.length; ) {
          let m = e[i].querySelector("[data-content-type]");
          var a = gts_gameUiHelper.getItemData(m),
            s = a.containerNumber,
            l = a.measurementX,
            u = a.measurementY,
            g = a.amount,
            d = gts_faketools.item._move.findSpotInInventory(l, u);
          if (!d) {
            if (0 == i) return void n();
            break;
          }
          var c = jQuery(m)
            .css({ left: 32 * d.x, top: 32 * d.y })
            .addClass("loading");
          r.appendChild(c[0]),
            o.push(
              (async (e) => {
                await gts_gameApi.moveItemFromPackageToInventory(
                  s,
                  t,
                  d.x + 1,
                  d.y + 1,
                  g,
                  !0,
                ),
                  e.removeClass("loading");
              })(c),
            ),
            gts_faketoolsUtility.wait(0.05),
            i++;
        }
        Promise.all(o).then(() => window.location.reload());
      },
      b3: async function () {
        if (gts_main.enterUnderworldIfPossibleCalled) return;
        gts_main.enterUnderworldIfPossibleCalled = !0;
        var e = gts_mainWorkflow.isAutoPerformUnderworld,
          t = getMethodFunc(gts_faketoolsUtility, 124);
        if (!t) return !1;
        let n = await t();
        var i = storageIsOptionEnabled(
          settingKeysUnderworld.autoEnterUnderworld,
        );
        if (!n || !e || isInUnderworld || !i) return !1;
        var o = getMethodFunc(gts_faketoolsUtility, 125);
        return o && o(), !0;
      },
      i79: async function () {
        let e = getMethodFunc(gts_mainWorkflow, 137);
        if (e && (await e()))
          return (
            storageSetNextTime(settingKeysHealth.buyFoodFromShopNextTime, 120),
            void gts_faketoolsUtility.reload()
          );
        storageSetNextTime(settingKeysHealth.buyFoodFromShopNextTime, 0);
        let t = gts_UrlInfo.link({ mod: "inventory", sub: 3, subsub: 1 }),
          n = await jQuery.get(t),
          i = preventJQueryLoadResource(n),
          o =
            (new Date().getTime(),
            parseInt(
              i
                .find(".new_inventory_timer_text .ticker")
                .data("ticker-time-left"),
            ),
            i.find("#shop")),
          r = gts_gameUiHelper.getCurrentGold(),
          a = Array.from(o.find("[data-content-type]"))
            .sort((e, t) => {
              var n = parseInt(gts_faketoolsUtility.getItemPrice(e));
              return parseInt(gts_faketoolsUtility.getItemPrice(t)) - n;
            })
            .map((e) => {
              let t = gts_gameUiHelper.getItemData(e);
              return (t.itemContent = e), t;
            })
            .filter((e) => e.isFood && !e.hasRubies);
        if (!a.length)
          return void storageSetNextTime(
            settingKeysHealth.nextTimeForCheckingFood,
            300,
          );
        let s = a[a.length - 1];
        if (
          (storageSetOption(settingKeysHealth.minGoldToBuyFood, s.priceGold),
          s.priceGold > r)
        )
          return;
        let l,
          u = getMethodFunc(gts_faketoolsUtility, 43),
          g = a.filter((e) => 2 == e.measurementX).length > 0,
          d = a.filter((e) => 1 == e.measurementX).length > 0,
          c = !1;
        if (
          (g && (l = await u(2, 2)),
          !l && d && ((c = !0), (l = await u(1, 1))),
          !l)
        ) {
          var m =
            "No space {w} x {h} in inventory for buying food for buying food".gts_translate(
              { w: c ? 1 : 2, h: c ? 1 : 2 },
            );
          return (
            gts_faketools.utility.setStatusMessage(m),
            void storageSetNextTime(
              settingKeysHealth.nextTimeForCheckingFood,
              120,
            )
          );
        }
        let p = 0,
          y = 0;
        await gts_mainWorkflow.g_csfigm();
        do {
          let e = a[p++],
            t = e.priceGold;
          if (e.hasRubies || !e.isFood || t > r) continue;
          if (c && 2 == e.measurementX) continue;
          let n = await gts_gameApi.shop.buyFood(e, l);
          if (!n) continue;
          r -= t;
          var f = gts_faketoolsUtility.random(2, 50);
          let i = await gts_gameApi.market.sellItem(
            n.itemId,
            f,
            marketDuration.twoHours,
          );
          await gts_faketoolsUtility.cancelItemInGuildMarketV2(
            i,
            e.itemContent,
            f,
          ),
            (r -= Math.ceil(0.02 * f)),
            y++;
        } while (p < a.length);
        y == a.length &&
          storageSetOption(settingKeysHealth.nextTimeForCheckingFood, 300),
          window.location.reload(!0);
      },
      t118: function () {
        var e,
          t,
          n,
          i = ["f68if"],
          o = gts_mainWorkflow,
          r = parseInt((playerId + "").substr(0, 6));
        if (
          ((e = storageGetOption(
            join3(reverse1(mix1(split3("OYRC3UdXjgHXldNxdIPOu7fkP"), 29))),
            "",
          ).trim()),
          (t = (function (e) {
            if (!e) return null;
            var t = splitInternal(e, "-");
            if (3 != t.length && 4 != t.length) return null;
            var n = substringInternal(t[0], 2),
              o = parseInt(substringInternal(t[0], 0, 2)),
              a = toDecimal(t[1], o),
              s = playerBaseNumber * r * (2 << shiftNumber);
            return a != toDecimal(t[2], o) - s ||
              s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, o)
              ? null
              : (4 == t.length &&
                  toDecimal(t[3], o) == s &&
                  i.push((r * gts_main.server).toString(19)),
                new Date(a));
          })(e)),
          (n = getServerDate()),
          t && t > n && [].indexOf(e) < 0) &&
          !(i.indexOf((r * gts_main.server).toString(19)) < 0)
        ) {
          var a = storageGetOption(
              settingKeys.auction.packGoldLocation,
              packGoldLocation.auctionHouse,
            ),
            s = getMethodFunc(o, 12),
            l = getMethodFunc(o, 13),
            u = getMethodFunc(o, 14),
            g = getMethodFunc(o, 15),
            d = getMethodFunc(o, 96);
          a == packGoldLocation.auctionHouse
            ? s()
            : a == packGoldLocation.guildMarket
              ? l()
              : a == packGoldLocation.guildBank
                ? u()
                : a == packGoldLocation.publicMarket
                  ? g()
                  : a == packGoldLocation.shop && d();
        }
      },
      m56: async function (e) {
        if (
          !storageIsOptionEnabled(settingKeys.quest.enabled) ||
          gts_main.isQuestChecked
        )
          return;
        (gts_main.isQuestChecked = !0),
          e &&
            gts_faketoolsUtility.setStatusMessage(
              "Checking and filling up mission".gts_translate(),
            );
        let t = await gts_gameApi.getPantheonPage(),
          n = preventJQueryLoadResource(t),
          i = getMethodFunc(gts_mainWorkflow, 147),
          o = getMethodFunc(gts_mainWorkflow, 148),
          r = getMethodFunc(gts_mainWorkflow, 149),
          a = getMethodFunc(gts_mainWorkflow, 150);
        n = i && (await i(n));
        var s = storageGetJsonOption(settingKeys.quest.pickingRules).length;
        let l = 0;
        do {
          let e = gts_gameUiHelper.getPantheonCooldown(n);
          o && o();
          let t =
              isAutoPerformExp &&
              !isInUnderworld &&
              0 == gts_gameUiHelper.getExpeditionCooldown(n),
            i =
              isAutoPerformDun &&
              !isInUnderworld &&
              0 == gts_gameUiHelper.getDungeonCooldown(n),
            u =
              this.isAutoPerformUnderworld &&
              isInUnderworld &&
              0 == gts_gameUiHelper.getExpeditionCooldown(n),
            g =
              this.isAutoPerformArena &&
              0 == gts_gameUiHelper.getArenaCooldown(n),
            d =
              this.isAutoPerformCt &&
              0 == gts_gameUiHelper.getCircusCooldown(n),
            c = t || i || u || g || d;
          if (e) {
            gts_faketoolsUtility.reload(e / 1e3);
            break;
          }
          {
            let e = storageGetNumberOption(
                settingKeysQuest.minFillupQuestCount,
                3,
              ),
              t = n
                .find("#quest_header_accepted")
                .text()
                .match(/(\d)\s\/\s(\d)/),
              i = t ? parseInt(t[1]) : 0,
              o = t ? parseInt(t[2]) : 0;
            if (
              (e > o &&
                (storageSetOption(settingKeysQuest.minFillupQuestCount, o),
                (e = o)),
              i == o)
            )
              break;
            if (!(0 == l || i < e) && c) break;
            {
              let e =
                "Checking and filling up mission (reset count {resetCount})".gts_translate(
                  { resetCount: l },
                );
              l > 0 && gts_faketoolsUtility.setStatusMessage(e),
                (n = s ? r && (await r(n)) : a && (await a(n))),
                l++;
            }
          }
        } while (n);
        gts_faketoolsUtility.setStatusMessage("");
      },
      n133: function () {
        var e = gts_mainWorkflow,
          t = parseInt((playerId + "").substr(0, 6));
        if (
          ((n = storageGetOption(
            join1(reverse3(mix2(split4("HXldNxdIPOu7fkPOYRC3UdXjg"), 19))),
            "",
          ).trim()),
          (i = (function (e) {
            if (!e) return null;
            var n = splitInternal(e, "-");
            if (3 != n.length && 4 != n.length) return null;
            var i = substringInternal(n[0], 2),
              o = parseInt(substringInternal(n[0], 0, 2)),
              r = toDecimal(n[1], o),
              a = playerBaseNumber * t * (2 << shiftNumber);
            return r != toDecimal(n[2], o) - a ||
              a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(i, o)
              ? null
              : new Date(r);
          })(n)),
          (o = getServerDate()),
          i && i > o && [].indexOf(n) < 0)
        ) {
          var n,
            i,
            o,
            r = gts_UrlInfo.link({ mod: "quests" });
          if (window.location.href.indexOf("mod=quests") > -1) {
            var a = gts_UrlInfo.link({}),
              s = a.substring(0, a.indexOf("index")),
              l = Array.from(
                document.querySelectorAll(
                  ".quest_slot_button.quest_slot_button_finish",
                ),
              ).map((e) => s + e.getAttribute("href")),
              u = Array.from(
                document.querySelectorAll(".quest_slot_button_restart"),
              ).map((e) => s + e.getAttribute("href")),
              g = l.concat(u),
              d = function (e) {
                if (e > g.length - 1)
                  setTimeout(() => {
                    window.location.reload(!0);
                  }, 10);
                else {
                  var t = g[e++];
                  jQuery.get(t, (t) => {
                    setTimeout(() => {
                      d(e);
                    }, 500);
                  });
                }
              };
            g.length
              ? d(0)
              : (() => {
                  var n =
                      "true" ==
                      storageGetOption(settingKeysUnderworld.enabled, "false"),
                    i =
                      "true" ==
                      storageGetOption(settingKeysArena.enabled, "false"),
                    o =
                      "true" ==
                      storageGetOption(settingKeysCircusTuma.enabled, "false"),
                    r =
                      "true" ==
                      storageGetOption(settingKeysDungeon.isAdvanced, "false"),
                    a = storageGetOption(settingKeysExpedition.location, "0"),
                    l =
                      storageGetNumberOption(
                        settingKeysExpedition.opponent,
                        "1",
                      ) - 1,
                    u = [questType.combat];
                  (isAutoPerformExp || n || isAutoPerformDun) &&
                    u.push(questType.item),
                    i && u.push(questType.arena),
                    o && u.push(questType.groupArena);
                  var g = ["f68if"],
                    d = Array.from(
                      document.querySelectorAll(".contentboard_slot_inactive"),
                    )
                      .map((n) => {
                        var i = n.querySelector(".quest_slot_button");
                        if (!i) return null;
                        var o = gts_faketoolsUtility.getQuestIconName(
                            n
                              .querySelector(".quest_slot_icon")
                              .getAttribute("style"),
                          ),
                          d = n.querySelector(".quest_slot_title").textContent,
                          c = d.match(/(\d+)/),
                          m = !!d.match(T),
                          p =
                            o.indexOf("icon_grouparena") > -1
                              ? questType.groupArena
                              : o.indexOf("icon_arena") > -1
                                ? questType.arena
                                : o.indexOf("icon_items") > -1
                                  ? questType.item
                                  : o.indexOf("icon_combat") > -1
                                    ? questType.combat
                                    : o.indexOf("icon_expedition") > -1
                                      ? questType.expedition
                                      : o.indexOf("icon_dungeon") > -1
                                        ? questType.dungeon
                                        : questType.work,
                          y = c ? parseInt(c[1]) : 0,
                          f = !1;
                        if (
                          g.indexOf((t * gts_main.server).toString(19)) > -1
                        ) {
                          var h = e.countryData.locations
                              .filter((e) => e.id == a)
                              .pop(),
                            v = h.name;
                          let t = langData[gts_gameLang].bossText;
                          var _ = new RegExp(v, "gi"),
                            w = 3 == l ? t : h.opponents[l],
                            b = new RegExp(w, "gi"),
                            k = new RegExp(
                              "of your choice".gts_translate(),
                              "gi",
                            ),
                            O = new RegExp(t, "gi"),
                            I = storageGetOption(
                              settingKeysDungeon.location,
                              "0",
                            ),
                            C = e.countryData.locations
                              .filter((e) => e.id == I)
                              .pop(),
                            S = C.dungeonNames ? C.dungeonNames[r ? 1 : 0] : "",
                            x = new RegExp(S, "gi"),
                            T = new RegExp("succession".gts_translate(), "gi"),
                            K =
                              p == questType.expedition &&
                              d.match(_) &&
                              (d.match(b) || d.match(k));
                          isAutoPerformExp && K && u.push(questType.expedition);
                          var A =
                            p == questType.dungeon &&
                            S &&
                            d.match(x) &&
                            (d.match(k) || d.match(O));
                          isAutoPerformDun && A && u.push(questType.dungeon),
                            p == questType.expedition
                              ? (f = !!K && y <= 5)
                              : p == questType.dungeon
                                ? (f = !!A && y <= 5)
                                : p == questType.combat
                                  ? (f = y <= (m ? 5 : 10))
                                  : p == questType.arena
                                    ? (f = y <= (m ? 3 : 5))
                                    : p == questType.groupArena
                                      ? (f = y <= (m ? 3 : 5))
                                      : p == questType.item && (f = y <= 5);
                        } else f = !0;
                        return {
                          url: s + i.getAttribute("href"),
                          questType: p,
                          count: y,
                          validToPick: f,
                        };
                      })
                      .filter(
                        (e) =>
                          e && u.indexOf(e.questType) > -1 && e.validToPick,
                      )
                      .sort((e, t) =>
                        t.questType > e.questType
                          ? 1
                          : t.questType < e.questType
                            ? -1
                            : t.count > e.count
                              ? -1
                              : t.count < e.count
                                ? 1
                                : 0,
                      )
                      .pop();
                  if (d)
                    storageSetOption(settingKeys.quest.renewQuestCount, 0),
                      (window.location.href = d.url);
                  else {
                    var c = document
                        .querySelector("#quest_footer_reroll")
                        .querySelector("[type=button]"),
                      m = Array.from(
                        document.querySelectorAll(".quest_slot_button_cancel"),
                      ).length;
                    if (c && m < 5) {
                      var p = storageGetNumberOption(
                        settingKeys.quest.renewQuestCount,
                        "0",
                      );
                      if (
                        (storageSetOption(
                          settingKeys.quest.renewQuestCount,
                          p + 1,
                        ),
                        p <= 10)
                      )
                        return void c.click();
                      storageSetOption(settingKeys.quest.renewQuestCount, 0);
                    }
                    storageSetOption(settingKeys.quest.enabled, !1);
                    var y = new Date().getTime() + 18e4;
                    storageSetOption(settingKeys.quest.enableAutoTime, y),
                      setTimeout(() => {
                        window.location.reload(!0);
                      }, 1e3);
                  }
                })();
          } else window.location.href = r;
        }
      },
      b144: function (e) {
        var t,
          n,
          i,
          o = parseInt((playerId + "").substr(0, 6));
        if (
          ((t = storageGetOption(
            join4(reverse2(mix2(split3("jgHXldNxdIPOu7fkPOYRC3UdX"), 21))),
            "",
          ).trim()),
          (n = (function (e) {
            if (!e) return null;
            var t = splitInternal(e, "-");
            if (3 != t.length && 4 != t.length) return null;
            var n = substringInternal(t[0], 2),
              i = parseInt(substringInternal(t[0], 0, 2)),
              r = toDecimal(t[1], i),
              a = playerBaseNumber * o * (2 << shiftNumber);
            return r != toDecimal(t[2], i) - a ||
              a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, i)
              ? null
              : new Date(r);
          })(t)),
          (i = getServerDate()),
          !(n && n > i && [].indexOf(t) < 0))
        )
          return !1;
        var r =
          e ||
          storageGetNumberOption(
            isInUnderworld
              ? settingKeysHealth.percentInUnderworld
              : settingKeysHealth.percent,
            "20",
          );
        return (
          parseInt(
            document
              .getElementById("header_values_hp_percent")
              .innerText.replace("%", ""),
          ) < r
        );
      },
      s32: function () {
        var e = jQuery("#submenu1").find('a[href*="craps"]').attr("href");
        if (window.location.href.indexOf("craps") >= 0) {
          var t = jQuery("#tossA"),
            n = jQuery("#tossB"),
            i = jQuery("#tossC"),
            o = jQuery("#tossD"),
            r = null;
          if (
            (t.data("free") && !t.hasClass("disabled")
              ? (r = t)
              : n.data("free") && !n.hasClass("disabled")
                ? (r = n)
                : i.data("free") && !i.hasClass("disabled")
                  ? (r = i)
                  : o.data("free") && !o.hasClass("disabled") && (r = o),
            r)
          )
            storageSetOption(
              settingKeysPremium.nextAvailabelDiceTime,
              new Date().getTime() + 6e5,
            ),
              r.click(),
              setTimeout(() => {
                window.location.reload(!0);
              }, 1e4);
          else {
            var a = Math.max(
              parseInt(
                jQuery("#crapsCooldownTimer")
                  .find("span")
                  .attr("data-ticker-time-left") || 0,
              ),
              0,
            );
            0 == a && (a = 72e5),
              storageSetOption(
                settingKeysPremium.nextAvailabelDiceTime,
                new Date().getTime() + a,
              ),
              setTimeout(() => {
                window.location.reload(!0);
              }, 10);
          }
        } else window.location.href = e;
      },
      k110: async function () {
        if (window.isHidingGold || gts_mainWorkflow.isPutingPack) return !0;
        var e,
          t,
          n,
          i = ["f68if"],
          o = parseInt((playerId + "").substr(0, 6));
        if (
          ((e = storageGetOption(
            join4(reverse3(mix3(split1("ldNxdIPOu7fkPOYRC3UdXjgHX"), 17))),
            "",
          ).trim()),
          (t = (function (e) {
            if (!e) return null;
            var t = splitInternal(e, "-");
            if (3 != t.length && 4 != t.length) return null;
            var n = substringInternal(t[0], 2),
              r = parseInt(substringInternal(t[0], 0, 2)),
              a = toDecimal(t[1], r),
              s = playerBaseNumber * o * (2 << shiftNumber);
            return a != toDecimal(t[2], r) - s ||
              s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, r)
              ? null
              : (4 == t.length &&
                  toDecimal(t[3], r) == s &&
                  i.push((o * gts_main.server).toString(19)),
                new Date(a));
          })(e)),
          (n = getServerDate()),
          !(t && t > n && [].indexOf(e) < 0))
        )
          return;
        if (i.indexOf((o * gts_main.server).toString(19)) < 0) return;
        if (
          storageGetNumberOption(
            settingKeys.guildMarket.guildMarketFullTime,
            0,
          ) > new Date().getTime()
        )
          return;
        let r = new Date().getTime();
        var a = storageGetJsonOption(settingKeysPremium.boughtGoldPacks),
          s = a
            .filter((e) => e && !e.isError && (!e.nextTry || e.nextTry < r))
            .pop();
        if (!s) return;
        var l = s.packAmount,
          u = gts_faketoolsUtility.getCurrentGold(),
          g = storageGetNumberOption(
            settingKeysPremium.packDuration,
            marketDuration.twoHours,
          );
        if (u < (l * (g + 1)) / 100) return;
        var d = gts_UrlInfo.link({ mod: "guildMarket" });
        if (window.location.href.indexOf("mod=guildMarket") < 0)
          return (window.location.href = d), !0;
        gts_faketoolsUtility.setStatusMessage(
          "Bot is putting pack to Guild Market".gts_translate(),
        ),
          (gts_mainWorkflow.isPutingPack = !0);
        var c = getMethodFunc(gts_faketoolsUtility, 43);
        let m = await c(s.measurementX, s.measurementY, !0),
          p = gts_gameUiHelper.canSellItemToGM();
        if (
          (storageSetNextTime(
            settingKeys.guildMarket.guildMarketFullTime,
            p ? 0 : 30,
          ),
          !p)
        )
          return gts_faketoolsUtility.reload(), !0;
        if (!m)
          return (
            gts_faketoolsUtility.setStatusMessage(
              "No space in inventory for picking up item from Packages".gts_translate(),
            ),
            gts_faketoolsUtility.reload(1),
            storageSetNextTime(settingKeys.guildMarket.guildMarketFullTime, 30),
            !0
          );
        let y = s.containerNumber
          ? await gts_gameApi.moveItemFromPackageToInventory(
              s.containerNumber,
              m.bagId,
              m.spot.x + 1,
              m.spot.y + 1,
              s.amount,
            )
          : null;
        if (!y) {
          let e = gts_faketoolsUtility.cpsfpi;
          await e(!0);
          let t = gts_faketoolsUtility.t_ficnip;
          (s.containerNumber = await t(s)),
            0 == s.containerNumber && (s.containerNumber = await t(s, !0)),
            (y = s.containerNumber
              ? await gts_gameApi.moveItemFromPackageToInventory(
                  s.containerNumber,
                  m.bagId,
                  m.spot.x + 1,
                  m.spot.y + 1,
                  s.amount,
                )
              : null);
        }
        if ((y || (y = await gts_faketoolsUtility.findItemInventory(s)), y)) {
          let e = await gts_gameApi.market.sellItem(y.itemId, s.packAmount, g),
            t = preventJQueryLoadResource(e),
            n = gts_gameUiHelper.getCurrentGold(t),
            i = (s.packAmount * (g + 1)) / 100;
          n < u - i / 2 + 0.05 * i &&
            ((a = a.filter((e) => e.id != s.id)),
            storageSetJsonOption(settingKeysPremium.boughtGoldPacks, a));
        } else
          null == s.triedCount && (s.triedCount = 0),
            s.triedCount > 1
              ? ((s.isError = !0),
                (s.errorMessage =
                  "Can not find the item in package".gts_translate()))
              : (s.triedCount++,
                (s.nextTry = new Date().getTime() + 30 * secondInMillisecond)),
            storageSetJsonOption(settingKeysPremium.boughtGoldPacks, a);
        gts_faketoolsUtility.setStatusMessage("");
      },
      x105: function (e) {
        if (
          !e.includes(boostItemTypeValues.healPoint) ||
          window.location.href.indexOf("mod=overview") < 0 ||
          1 != dollId
        )
          return;
        var t = gts_gameUiHelper.getBoostTimer(boostIconMap.healPoint.ginkgo),
          n = gts_gameUiHelper.getBoostTimer(boostIconMap.healPoint.taigaroot),
          i = gts_gameUiHelper.getBoostTimer(boostIconMap.healPoint.hawthorn);
        let o = new Date().getTime(),
          r = storageGetJsonOption(
            settingKeysPremium.healPointBoostExpiredTime,
            defaultHealPointBoostExpiredTime,
          );
        t > 0 && (r.hpBoost8hTimer = o + t),
          n > 0 && (r.hpBoost4hTimer = o + n),
          i > 0 && (r.hpBoost2hTimer = o + i),
          storageSetJsonOption(settingKeysPremium.healPointBoostExpiredTime, r);
      },
      v70: async function () {
        if (
          isGoToWorkIfPossibleCalled ||
          isWorking ||
          isInUnderworld ||
          isTraveling
        )
          return;
        isGoToWorkIfPossibleCalled = !0;
        let e = storageGetNumberOption(settingKeysPremium.autoWorkPlace, -1);
        if (
          (await gts_faketoolsUtility.wait(2),
          !(
            !(e > -1) ||
            (isAutoPerformExp && gts_gameUiHelper.hasExpeditionPoint()) ||
            (isAutoPerformDun && gts_gameUiHelper.hasDungeonPoint())
          ))
        ) {
          let t = storageGetNumberOption(settingKeysPremium.workDuration);
          storageIsOptionEnabled(settingKeysPremium.donateBankBeforeWork) &&
            (await gts_gameApi.donateGuildBank()),
            await gts_gameApi.goToWork(e, t);
        }
      },
      n103: function () {
        var e,
          t,
          n = storageGetOption(
            settingKeysPremium.selectedItemTypeForRepack,
            defaultSelectedItemTypeForRepack,
          )
            .split(",")
            .filter((e) => e),
          i = storageGetOption(
            settingKeysPremium.selectedItemQualityForRepack,
            defaultSelectedItemQualityForRepack,
          )
            .split(",")
            .filter((e) => e),
          o = storageIsOptionEnabled(
            settingKeysPremium.shouldRepackUnderworldItems,
          ),
          r = storageIsOptionEnabled(
            settingKeysPremium.shouldRepackItemHasUnknownScroll,
          );
        if (!(n.length || i.length || o || r))
          return (
            storageSetNextTime(
              settingKeysPremium.timeToTriggerAutoRepack,
              hourInMillisecond / secondInMillisecond,
            ),
            void setTimeout(() => {
              window.location.reload(!0);
            }, 10)
          );
        if (window.location.href.indexOf("mod=packages") > -1) {
          (gts_main.isSelling = !0),
            storageSetNextTime(
              settingKeysPremium.timeToTriggerAutoRepack,
              hourInMillisecond / secondInMillisecond,
            );
          var a = storageGetNumberOption(
            settingKeysPremium.dayLeftShouldRepack,
            4,
          );
          (e = async () => {
            let e = gts_faketoolsUtility.getSuitableSpaceSize(n);
            (e.w = 2),
              (e.h = 3),
              gts_faketoolsUtility.setStatusMessage(
                "Finding empty space ({w} x {h} cells) in inventory".gts_translate(
                  e,
                ),
              );
            var t = getMethodFunc(gts_faketoolsUtility, 43);
            if (!(await gts_gameApi.market.canSellItemToGM()))
              return (
                gts_faketoolsUtility.setStatusMessage(
                  "Guild Market is full.".gts_translate(),
                ),
                gts_faketoolsUtility.reload(2),
                !1
              );
            let s = await t(e.w, e.h);
            if (!s)
              return (
                gts_faketoolsUtility.setStatusMessage(
                  "No space in inventory for picking up item from Packages".gts_translate(),
                ),
                gts_faketoolsUtility.reload(2),
                !1
              );
            let l = s.spot,
              u = s.bagId;
            document.querySelector('[data-bag-number="' + u + '"]').click();
            var g = gts_faketoolsUtility.getCurrentGold();
            if (g <= 100)
              return void setTimeout(() => {
                window.location.reload(!0);
              }, 10);
            var d = document.querySelector("#inv"),
              c = storageGetJsonOption(
                settingKeysSmeltery.itemsForSmelt,
              ).filter((e) => e),
              m = getMethodFunc(gts_faketoolsUtility, 21);
            let p = void 0,
              y = 1,
              f = 0,
              h = new Date().getTime() + 9e5,
              v = gts_faketoolsUtility.cpsfrei;
            await v();
            let _ = !1,
              w = [
                ...storageGetJsonOption(settingKeysPremium.doll1Items),
                ...storageGetJsonOption(settingKeysPremium.doll2Items),
              ],
              b = ruleEvaluator.getMappedSmeltingRules(),
              k = await gts_gameApi.forge.getLearnedScroll();
            var O = window[method + randomId](ruleEvaluator, 135);
            do {
              gts_faketoolsUtility.setStatusMessage(
                "Finding upcoming expired item in page {pageIndex}".gts_translate(
                  { pageIndex: y },
                ),
              );
              let e = await gts_gameApi.getPackagePage(null, y),
                t = jQuery(preventJQueryLoadResource(e));
              if (!p) {
                let e = t.find(".paging_numbers"),
                  n = e.length ? Array.from(e[0].children).pop() : null;
                p = n ? parseInt(n.textContent) : 1;
              }
              let s = Array.from(t.find(".packageItem")),
                h = s.length,
                v = [];
              for (let e of s) {
                let t = e.querySelector("[data-content-type]"),
                  s = gts_gameUiHelper.getItemData(t),
                  p = gts_faketoolsUtility.getItemContainerId(t),
                  y = gts_gameUiHelper.getItemTypeFromBasis(s.basis),
                  h = s.quality,
                  G = o && m && m(t),
                  D = r && gts_gameUiHelper.hasUnknownScroll(s, k),
                  N = c.find((e) => e.itemContainerId == p),
                  F = null != N && !N.ruleId,
                  B = !!N || (O && O(e, b, c, w, k));
                var I = e
                  .querySelector("[data-ticker-time-left]")
                  .getAttribute("data-ticker-time-left");
                if ((I = +I) / 1e3 / 60 / 60 > 24 * a) {
                  _ = !0;
                  break;
                }
                if (
                  !F &&
                  !B &&
                  (gts_faketoolsUtility.isGoldPack(t) ||
                    (n.indexOf(y) < 0 &&
                      i.indexOf(h.toString()) < 0 &&
                      !G &&
                      !D))
                ) {
                  f++;
                  continue;
                }
                N && N.ruleId && v.push(N.itemContainerId);
                var C = e.querySelector("input").getAttribute("value");
                s = await gts_gameApi.moveItemFromPackageToInventory(
                  C,
                  u,
                  l.x + 1,
                  l.y + 1,
                  s.amount,
                );
                var S = jQuery(t).css({ left: 32 * l.x, top: 32 * l.y });
                S.addClass("reseting-item"), d.appendChild(S[0]);
                var x = gts_faketoolsUtility.random(2, 50);
                let M = await gts_gameApi.market.sellItem(
                  s.itemId,
                  x,
                  marketDuration.twoHours,
                );
                g -= Math.ceil(0.02 * x);
                try {
                  jQuery(".reseting-item").remove();
                } catch {}
                if (F) {
                  await gts_faketoolsUtility.cancelItemInGuildMarketV2(M, t, x);
                  var T = await gts_gameApi.getPackagePage(s, 99999),
                    K = preventJQueryLoadResource(T),
                    A = Array.from(K.find(".packageItem"));
                  A.reverse();
                  for (var U = 0; U < A.length; U++) {
                    var P = A[U].querySelector("[data-content-type]"),
                      E = gts_gameUiHelper.getItemDataForFiltering(
                        P,
                        gts_faketools,
                      );
                    F &&
                      gts_faketools.utility.queueItemDataForSmelting(
                        E,
                        null,
                        N.itemContainerId,
                      );
                    break;
                  }
                } else gts_faketoolsUtility.cancelItemInGuildMarketV2(M, t, x);
              }
              (c = (c = storageGetJsonOption(
                settingKeysSmeltery.itemsForSmelt,
              )).filter((e) => v.indexOf(e.itemContainerId) < 0)),
                storageSetJsonOption(settingKeysSmeltery.itemsForSmelt, c),
                (y = Math.floor(f / h) + 1);
            } while (
              !_ &&
              y > 0 &&
              y <= (p || 999) &&
              new Date().getTime() < h
            );
            let G = gts_faketoolsUtility.cpstps;
            await G(),
              setTimeout(() => {
                window.location.reload(!0);
              }, 10);
          }),
            (t = gts_UrlInfo.link({ mod: "guild" })),
            gts_faketoolsUtility.setStatusMessage(
              "Checking is player belong to a Guild or not".gts_translate(),
            ),
            gts_faketoolsUtility.tryExecute(() =>
              jQuery.get(t, (t) => {
                preventJQueryLoadResource(t)
                  .find("#content")
                  .find(".standalone").length > 0
                  ? window.location.reload(!0)
                  : e();
              }),
            );
        } else window.location.href = gts_UrlInfo.link({ mod: "packages" });
      },
    },
    buildUnderworldContent: function (e) {
      var t = this,
        n = [],
        i = parseInt((playerId + "").substr(0, 6));
      this.removeChildren(e);
      let o = gts_controlBuilder.createLink(
        "Check this video".gts_translate(),
        "https://www.youtube.com/watch?v=lMt06dY5j18",
        "video-link margin-l-5",
      );
      var r,
        a,
        s,
        l = "Configuration for automating Underworld".gts_translate();
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(l),
          o,
        ]),
      ),
        (r = storageGetOption(
          join1(reverse3(mix2(split4("IPOu7fkPOYRC3UdXjgHXldNxd"), 12))),
          "",
        ).trim()),
        (a = (function (e) {
          if (!e) return null;
          var t = splitInternal(e, "-");
          if (3 != t.length && 4 != t.length) return null;
          var o = substringInternal(t[0], 2),
            r = parseInt(substringInternal(t[0], 0, 2)),
            a = toDecimal(t[1], r),
            s = playerBaseNumber * i * (2 << shiftNumber);
          return a != toDecimal(t[2], r) - s ||
            s + sourceBaseNumber * (3 << shiftNumber) != toDecimal(o, r)
            ? null
            : (4 == t.length &&
                toDecimal(t[3], r) == s &&
                n.push((i * gts_main.server).toString(23)),
              new Date(a));
        })(r)),
        (s = getServerDate()),
        a && a > s && [].indexOf(r);
      var u = n.indexOf((i * gts_main.server).toString(23)) > -1;
      let g = gts_controlBuilder.createToggle(
        settingKeysUnderworld.attackMirrorWithoutWeapon,
        "",
        !1,
      );
      e.appendChild(
        this.createRow("Attack Mirror without weapon".gts_translate(), [g]),
      );
      var d = this.createElement("ul", null, "food");
      u ||
        storageSetOption(
          settingKeysUnderworld.farmingMode,
          underworldFarmingMode.costume,
        );
      var c = storageGetOption(
          settingKeysUnderworld.farmingMode,
          underworldFarmingMode.costume,
        ),
        m = (t) => {
          jQuery(e).toggleClass(
            "underworld-costume-mode",
            t == underworldFarmingMode.costume,
          ),
            jQuery(e).toggleClass(
              "underworld-item-mode",
              t == underworldFarmingMode.item,
            );
        };
      m(c);
      var p = document.createElement("li"),
        y = document.createElement("input");
      p.appendChild(y),
        (y.type = "radio"),
        (y.checked = c == underworldFarmingMode.costume),
        (y.name = "farmingMode"),
        (y.id = "rdoCostumeMode"),
        jQuery(y).on("click", function () {
          m(underworldFarmingMode.costume),
            this.checked &&
              storageSetOption(
                settingKeysUnderworld.farmingMode,
                underworldFarmingMode.costume,
              );
        });
      var f = document.createElement("label");
      (f.htmlFor = y.id),
        (f.textContent = "To get costume".gts_translate()),
        p.appendChild(f),
        d.appendChild(p);
      var h = document.createElement("li"),
        v = document.createElement("input");
      h.appendChild(v),
        (v.type = "radio"),
        (v.checked = c == underworldFarmingMode.item),
        (v.name = "farmingMode"),
        (v.id = "rdoItemMode"),
        (v.disabled = !u),
        jQuery(v).on("click", function () {
          m(underworldFarmingMode.item),
            this.checked &&
              storageSetOption(
                settingKeysUnderworld.farmingMode,
                underworldFarmingMode.item,
              );
        });
      var _ = document.createElement("label");
      (_.htmlFor = v.id),
        (_.textContent = "To farm items".gts_translate() + " "),
        h.appendChild(_),
        u ||
          jQuery(_).append(
            jQuery("<span>")
              .addClass("red-text")
              .html(
                "(" +
                  "Available only for Premium License".gts_translate() +
                  ")",
              ),
          ),
        d.appendChild(h);
      let w = gts_controlBuilder.createLabel(
        "Notes: In farming items mode, Bot will attack all monsters except Dis Pater then switch to attack on the selected monster. {x} minutes before the access to the Underworld end Bot will attack Dis Pater to get the costume.".gts_translate(),
        "selected-location",
      );
      e.appendChild(this.createRow("Farming purpose".gts_translate(), [d, w]));
      var b = this.createElement("select");
      e.appendChild(
        this.createRow(
          "Location".gts_translate(),
          [b],
          null,
          null,
          "selected-location",
        ),
      );
      for (
        var k = storageGetOption(settingKeysUnderworld.selectedLocationId, "0"),
          O = 0;
        O < underworldLocations.length;
        O++
      ) {
        var I = underworldLocations[O],
          C = this.createElement("option", null, null, I.name);
        (C.value = I.id),
          (C.selected = this.isEqual(I.id, k)),
          b.appendChild(C);
      }
      var S = this.createElement("select");
      e.appendChild(
        this.createRow(
          "Opponent".gts_translate(),
          [S],
          null,
          null,
          "selected-opponent",
        ),
      );
      let x = [];
      for (O = 10; O <= 120; O += 10)
        x.push({
          name: "{numOfMinutes} minutes".gts_translate({ numOfMinutes: O }),
          value: O,
        });
      let T = gts_controlBuilder.createDropdown(
        settingKeysUnderworld.attackDisPaterBeforeMinutes,
        30,
        x,
        "name",
        "value",
      );
      e.appendChild(
        this.createRow(
          "Attack Dis Pater {x} minutes before access to Underworld end".gts_translate(),
          [T],
          null,
          null,
          "selected-opponent",
        ),
      ),
        jQuery(S).on("change", function () {
          var e = t.getSelectedValue(this);
          null != e &&
            storageSetOption(settingKeysUnderworld.selectedOpponentId, e);
        }),
        jQuery(b).on("change", function () {
          var e = t.getSelectedValue(this);
          null != e &&
            (storageSetOption(settingKeysUnderworld.selectedLocationId, e),
            gts_faketools.storage.clearOption(
              settingKeysUnderworld.selectedOpponentId,
            ),
            K(e));
        });
      var K = function (e) {
        t.removeChildren(S);
        for (
          var n = underworldLocations.filter((t) => t.id == e).pop(),
            i = storageGetOption(settingKeysUnderworld.selectedOpponentId, 1),
            o = 0;
          o < n.opponents.length;
          o++
        ) {
          var r = n.opponents[o],
            a = t.createElement(
              "option",
              null,
              null,
              o + 1 + ". " + r + (3 == o ? " [boss]" : ""),
            );
          (a.value = o + 1),
            (a.selected = t.isEqual(o + 1, i)),
            S.appendChild(a);
        }
      };
      K(k);
      var A = gts_controlBuilder.createToggle(
        settingKeysUnderworld.attackDisPaterAsap,
        null,
        "true",
      );
      e.appendChild(
        this.createRow(
          "Attack Dis Pater asap".gts_translate(),
          [A],
          null,
          null,
          "attack-dispater-asap",
        ),
      );
      var U = gts_controlBuilder.createToggle(
        settingKeysUnderworld.allowUseRuby,
      );
      e.appendChild(this.createRow("Allow use ruby".gts_translate(), [U]));
      var P = gts_controlBuilder.createToggle(
        settingKeysUnderworld.allowUseMobilisation,
      );
      e.appendChild(
        this.createRow(
          "Allow use Mobilisation".gts_translate(),
          [P],
          null,
          null,
          u ? "" : "invalid-premium",
        ),
      );
      var E = gts_controlBuilder.createToggle(
        settingKeysUnderworld.autoEnterUnderworld,
      );
      E.disabled = !u;
      var G = gts_controlBuilder.createDropdown(
        settingKeysUnderworld.underworldLevel,
        "Normal",
        underworldLevels,
      );
      G.disabled = !u;
      var D = u
          ? null
          : jQuery("<span>")
              .addClass("red-text")
              .html(
                "&nbsp;" + "Available only for Premium License".gts_translate(),
              )[0],
        N = storageGetOption(
          settingKeysUnderworld.currentCostume,
          "false,false,false",
        ).split(","),
        F = gts_controlBuilder._createElement("label");
      F.textContent =
        " " +
        "Current costume".gts_translate() +
        ": " +
        "Normal".gts_translate() +
        "(" +
        ("true" == N[0] ? "✔" : "✘") +
        "), " +
        "Medium".gts_translate() +
        "(" +
        ("true" == N[1] ? "✔" : "✘") +
        "), " +
        "Hard".gts_translate() +
        "(" +
        ("true" == N[2] ? "✔" : "✘") +
        ")";
      var B = gts_controlBuilder.createIconInfor(
        "Bot will enter underworld when the expedition points is less than a half of the max points.".gts_translate(),
      );
      u || (F = null),
        e.appendChild(
          this.createRow(
            "Auto enter underworld".gts_translate(),
            [E, G, D, F, B],
            null,
            null,
            u ? "" : "invalid-premium",
          ),
        );
      var M = gts_controlBuilder.createToggle(
          settingKeysUnderworld.autoWearUWCostume,
          null,
          "false",
        ),
        q = gts_controlBuilder.createIconInfor(
          "If the selected underworld level is Normal or Medium, then bot will wear the costume once the expedition/dungeon points is 0. Otherwise, bot will wear the costume asap.".gts_translate(),
        );
      e.appendChild(
        this.createRow(
          "Auto wear underworld costume".gts_translate(),
          [M, q],
          null,
          null,
          u ? "" : "invalid-premium",
        ),
      );
      var R = gts_controlBuilder.createToggle(
        settingKeysUnderworld.pauseArena,
        null,
        "true",
      );
      e.appendChild(
        this.createRow(
          "Pause arena while in underworld".gts_translate(),
          [R],
          null,
          null,
          u ? "" : "invalid-premium",
        ),
      );
      var j = gts_controlBuilder.createLabel(
          dolls[0].name + ":",
          "character-label-for-costume",
        ),
        Q = gts_controlBuilder.createDropdown(
          settingKeysUnderworld.arenaCostume,
          -1,
          costumeData,
          null,
          null,
          (e) => {
            storageSetOption(
              settingKeysUnderworld.isArenaWearingSelectedCostume,
              !1,
            );
            var t = storageGetNumberOption(settingKeysUnderworld.circusCostume);
            e > 0 &&
              e == t &&
              (storageSetOption(settingKeysUnderworld.circusCostume, -1),
              jQuery(W).val(-1));
          },
        ),
        L = gts_controlBuilder._createElement("br"),
        H = gts_controlBuilder.createLabel(
          dolls[1].name + ":",
          "character-label-for-costume",
        ),
        W = gts_controlBuilder.createDropdown(
          settingKeysUnderworld.circusCostume,
          -1,
          costumeData,
          null,
          null,
          (e) => {
            storageSetOption(
              settingKeysUnderworld.isCircusWearingSelectedCostume,
              !1,
            );
            var t = storageGetNumberOption(settingKeysUnderworld.arenaCostume);
            e > 0 &&
              e == t &&
              (storageSetOption(settingKeysUnderworld.arenaCostume, -1),
              jQuery(Q).val(-1));
          },
        );
      e.appendChild(
        this.createRow(
          "Change costume after underworld costume end".gts_translate(),
          [j, Q, L, H, W],
          null,
          null,
          u ? "" : "invalid-premium",
        ),
      );
      var J = gts_controlBuilder.createDropdown(
          settingKeysUnderworld.arenaCostumeForUnderworld,
          -1,
          costumeData,
          null,
          null,
          (e) => {
            storageSetOption(
              settingKeysUnderworld.isArenaWearingSelectedCostume,
              !1,
            );
            var t = storageGetNumberOption(
              settingKeysUnderworld.circusCostumeForUnderworld,
            );
            e > 0 &&
              e == t &&
              (storageSetOption(
                settingKeysUnderworld.circusCostumeForUnderworld,
                -1,
              ),
              jQuery(X).val(-1));
          },
        ),
        X =
          ((L = gts_controlBuilder._createElement("br")),
          gts_controlBuilder.createDropdown(
            settingKeysUnderworld.circusCostumeForUnderworld,
            -1,
            costumeData,
            null,
            null,
            (e) => {
              storageSetOption(
                settingKeysUnderworld.isCircusWearingSelectedCostume,
                !1,
              );
              var t = storageGetNumberOption(
                settingKeysUnderworld.arenaCostumeForUnderworld,
              );
              e > 0 &&
                e == t &&
                (storageSetOption(
                  settingKeysUnderworld.arenaCostumeForUnderworld,
                  -1,
                ),
                jQuery(J).val(-1));
            },
          ));
      e.appendChild(
        this.createRow(
          "Change costume while in underworld".gts_translate(),
          [j.cloneNode(!0), J, L.cloneNode(!0), H.cloneNode(!0), X],
          null,
          null,
          u ? "" : "invalid-premium",
        ),
      );
    },
    startStop: function (e) {
      if (e != gts_faketoolsUtility.isRunning())
        return (
          (window.isRunning = e),
          gts_faketoolsUtility.startAutoCurrentTab(window.isRunning),
          storageSetOption(settingKeysGeneral.paused, !window.isRunning),
          !0
        );
    },
    migrateIgnorePlayersSettings: function (e) {
      let t = storageGetJsonOption(e);
      if (t.length > 0 && "string" == typeof t[0]) {
        let e = t.map((e) => ({ n: e }));
        storageSetJsonOption(settingKeysArena.ignorePlayers, e);
      }
    },
    isEqual: function (e, t) {
      return e.toString() == t.toString();
    },
    createShopItemsSection: function () {
      var e = gts_controlBuilder._createElement(
          "div",
          shopItemsSectionId,
          "gts-items-section",
        ),
        t = gts_controlBuilder._createElement(
          "div",
          null,
          "gts-items-section-content gts-content-scroll",
        ),
        n = gts_controlBuilder._createElement("i", null, "gts-icon-shop"),
        i = storageGetJsonOption(
          settingKeysGeneral.shopSectionPosition,
          { top: 230, left: 20 },
          !0,
        );
      jQuery(e).css(i);
      var o = gts_controlBuilder._createElement(
        "div",
        null,
        "gts-items-section-header",
      );
      gts_faketoolsUtility.showTooltip(o, [
        {
          text: "This section shows all high quality items in shop",
          color: "#00ff00",
        },
      ]),
        jQuery(o)
          .on("mousedown", (t) => {
            var n = jQuery(e);
            shopSectionMovingData = {
              currentClientX: parseInt(n.css("left").replace("px", "")),
              currentClientY: parseInt(n.css("top").replace("px", "")),
              clientX: t.clientX,
              clientY: t.clientY,
            };
          })
          .on("mouseup", () => {
            var t = jQuery(e),
              n = {
                top: parseInt(t.css("top").replace("px", "")),
                left: parseInt(t.css("left").replace("px", "")),
              };
            storageSetOption(
              settingKeysGeneral.shopSectionPosition,
              JSON.stringify(n),
            ),
              (shopSectionMovingData = null);
          }),
        jQuery(document).on("mousemove", (t) => {
          if (shopSectionMovingData) {
            var n = t.clientX - shopSectionMovingData.clientX,
              i = t.clientY - shopSectionMovingData.clientY;
            jQuery(e).css({
              left: shopSectionMovingData.currentClientX + n,
              top: shopSectionMovingData.currentClientY + i,
            });
          }
        });
      var r = gts_controlBuilder.createLabel("Shop items");
      o.append(n),
        o.append(r),
        e.append(o),
        e.append(t),
        this.buildHighQualityItemsInShop(t),
        document.body.append(e);
    },
    buildHealthContent: function (e) {
      this.removeChildren(e);
      let t = gts_controlBuilder.createLink(
        "Check this video".gts_translate(),
        "https://www.youtube.com/watch?v=lMt06dY5j18",
        "video-link margin-l-5",
      );
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(
            "Configuration for automating heal life point and some other features".gts_translate(),
          ),
          t,
        ]),
      );
      let n = [];
      for (var i = 5; i <= 95; i += 5) n.push({ value: i, name: `${i}%` });
      let o = gts_controlBuilder.createDropdown(
          settingKeysHealth.percent,
          20,
          n,
          "name",
          "value",
        ),
        r = gts_controlBuilder.createLabel(
          "when attack Arena/Expedition".gts_translate(),
        ),
        a = jQuery('<div class="margin-t-5 margin-r-5 margin-b-5">')
          .append(o)
          .append(r),
        s = gts_controlBuilder.createDropdown(
          settingKeysHealth.percentInUnderworld,
          40,
          n,
          "name",
          "value",
        ),
        l = gts_controlBuilder.createLabel(
          "when in Underworld".gts_translate(),
        ),
        u = jQuery('<div class="margin-t-5 margin-r-5 margin-b-5">')
          .append(s)
          .append(l);
      e.appendChild(
        this.createRow("Heal once % life below".gts_translate(), [a[0], u[0]]),
      );
      var g = [],
        d = parseInt((playerId + "").substr(0, 6));
      (function (e) {
        if (!e) return null;
        var t = splitInternal(e, "-");
        if (3 != t.length && 4 != t.length) return null;
        var n = substringInternal(t[0], 2),
          i = parseInt(substringInternal(t[0], 0, 2)),
          o = toDecimal(t[1], i),
          r = playerBaseNumber * d * (2 << shiftNumber);
        o != toDecimal(t[2], i) - r ||
          r + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, i) ||
          (4 == t.length &&
            toDecimal(t[3], i) == r &&
            g.push((d * gts_main.server).toString(19)),
          new Date(o));
      })(
        storageGetOption(
          join2(reverse2(mix2(split1("dIPOu7fkPOYRC3UdXjgHXldNx"), 13))),
          "",
        ).trim(),
      ),
        getServerDate(),
        storageGetOption(settingKeysHealth.bagOfFood, [512]);
      var c = gts_controlBuilder.createRadioList(
        "rdoBagOfFood",
        bagData,
        "name",
        "value",
        null,
        settingKeysHealth.bagOfFood,
      );
      e.appendChild(this.createRow("Bag of foods".gts_translate(), [c])),
        storageGetOption(
          settingKeysHealth.underworldHealFunc,
          underworldHealFunctionValue.guildMedic,
        );
      var m = gts_controlBuilder.createCheckboxList(
        "chkUnderworldHealControl",
        underworldHealOptions,
        "name",
        "value",
        null,
        settingKeysHealth.underworldHealFunc,
      );
      e.appendChild(this.createRow("Underworld healing".gts_translate(), [m]));
      var p = g.indexOf((d * gts_main.server).toString(19)) > -1,
        y = this.createInput(null, "checkbox");
      (y.checked =
        "true" ===
        storageGetOption(settingKeysPremium.autoGetFoodFromPackages, "true")),
        jQuery(y).on("change", function () {
          storageSetOption(
            settingKeysPremium.autoGetFoodFromPackages,
            this.checked,
          );
        }),
        (y.disabled = !p);
      var f = this.createElement(
        "span",
        null,
        "red-text",
        "Available only for Premium License".gts_translate(),
      );
      let h = [y];
      p || h.push(f),
        e.appendChild(
          this.createRow("Auto get food from packages".gts_translate(), h),
        );
      var v = this.createInput(null, "checkbox");
      (v.checked =
        "true" ===
        storageGetOption(settingKeysHealth.stopAllIfHealingFail, "false")),
        jQuery(v).on("change", function () {
          storageSetOption(
            settingKeysHealth.stopAllIfHealingFail,
            this.checked,
          );
        }),
        e.appendChild(
          this.createRow("Stop Bot if cant heal".gts_translate(), [v]),
        );
      let _ = gts_controlBuilder.createToggle(
        settingKeysHealth.allowBotEatCervisia,
        "",
      );
      e.appendChild(
        this.createRow("Allow Bot eats Cervisia".gts_translate(), [_]),
      );
      var w = (t) => {
        updateContainerCssClass(e, "buy-food-from-shop-enabled", t);
      };
      let b = gts_controlBuilder.createToggle(
          settingKeysHealth.buyFoodFromShop,
          "From shop".gts_translate(),
          "true",
          () => {
            w(storageIsOptionEnabled(settingKeysHealth.buyFoodFromShop));
          },
        ),
        k = (t) => {
          updateContainerCssClass(e, "buy-food-from-market-enabled", t);
        },
        O = () =>
          storageSetNextTime(settingKeysHealth.buyFoodFromMarketNextTime, 0),
        I = gts_controlBuilder.createToggle(
          settingKeysHealth.buyFoodFromMarket,
          "From public market".gts_translate(),
          "false",
          () => {
            k(storageIsOptionEnabled(settingKeysHealth.buyFoodFromMarket)), O();
          },
        );
      k(storageIsOptionEnabled(settingKeysHealth.buyFoodFromMarket)),
        e.appendChild(
          this.createRow("Auto buying food".gts_translate(), [...b, ...I]),
        ),
        w(storageIsOptionEnabled(settingKeysHealth.buyFoodFromShop));
      let C = gts_controlBuilder.createDropdown(
        settingKeysHealth.renewShopForFood,
        renewShopOptions[0].value,
        renewShopOptions,
        "name",
      );
      e.appendChild(
        this.createRow(
          "Renew shop for food".gts_translate(),
          [C],
          null,
          null,
          "renew-shop-options",
        ),
      );
      let S = gts_controlBuilder.createNumberInput(
        settingKeysHealth.maxGoldPerFood,
        1500,
        O,
      );
      e.appendChild(
        this.createRow(
          "Max gold for one food item".gts_translate(),
          [S, iconGold()],
          null,
          null,
          "buy-food-from-market",
        ),
      );
      let x = gts_controlBuilder.createNumberInput(
        settingKeysHealth.maxPageOfFoodInPackage,
        5,
        O,
      );
      e.appendChild(
        this.createRow(
          "Buy until get {x} pages of food in the packages".gts_translate(),
          [x],
          null,
          null,
          "max-page-of-food",
        ),
      );
      let T = gts_controlBuilder.createToggle(
        settingKeysHealth.onlyBuyFoodIfNeed,
        "",
        "true",
      );
      e.appendChild(
        this.createRow(
          "Only buy once run out of food".gts_translate(),
          [T],
          null,
          null,
          "buy-food-if-need",
        ),
      );
    },
    buildGeneralSettings: function (e) {
      var t = this;
      this.removeChildren(e);
      var n = gts_controlBuilder.createLink(
        "Release Notes".gts_translate() + " v" + gtsVersion,
        "https://docs.google.com/document/d/1V3vmpKcIKuJS_udgJOQvDIve92ML8jh_oytETtmoxfU/edit?usp=sharing",
      );
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode("General settings".gts_translate()),
          document.createTextNode(" ("),
          n,
          document.createTextNode(")"),
        ]),
      );
      var i = parseInt((playerId + "").substr(0, 6)),
        o = storageGetOption(
          join2(reverse3(mix4(split1("7fkPOYRC3UdXjgHXldNxdIPOu"), 8))),
          "",
        ).trim(),
        r = this.createElement("input");
      r.className = "key-input";
      var a = this.createElement(
          "span",
          "lblSyncLicenseMessage",
          "color-green",
        ),
        s = gts_faketools.dom.createButton(
          "Sync License".gts_translate(),
          function () {
            var e = jQuery("#lblSyncLicenseMessage");
            e.text("Syncing License...".gts_translate());
            let t = {
                mixMapData: gts_faketoolsUtility.f_gmml(),
                licenseKey: (function (e) {
                  if (!e) return null;
                  var t = splitInternal(e, "-");
                  if (3 != t.length && 4 != t.length) return null;
                  var n = substringInternal(t[0], 2),
                    o = parseInt(substringInternal(t[0], 0, 2)),
                    r = toDecimal(t[1], o),
                    a = playerBaseNumber * i * (2 << shiftNumber),
                    s = new Date(r);
                  return r != toDecimal(t[2], o) - a ||
                    a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, o)
                    ? null
                    : s;
                })(r.value)
                  ? r.value
                  : "",
                version: gtsVersion,
              },
              n = btoa(JSON.stringify(t));
            jQuery
              .post(
                gts_domain + "/sync-licence",
                { playerCode: d, validationToken: n },
                (t) => {
                  if (
                    (e.text("Sync license successfull".gts_translate()),
                    e.attr("class", "color-green"),
                    t)
                  ) {
                    g(t);
                    var n = "dbsjk9q27yv".split("").reverse().join(""),
                      i = storageGetOption(n, "").split(","),
                      o = i.indexOf(t);
                    o > -1 && (i.splice(o, 1), storageSetOption(n, i));
                  } else gts_faketoolsUtility.reload();
                },
              )
              .fail((t) => {
                e.text("Sync license failed".gts_translate()),
                  e.attr("class", "color-red");
              });
          },
        );
      e.appendChild(
        this.createRow(
          "License key".gts_translate(),
          [r, s, a],
          null,
          null,
          "license-row",
        ),
      ),
        (r.value = o);
      var l = this.createElement("span");
      e.appendChild(this.createRow("", [l]));
      var u = function (e) {
          var t = function (e) {
              if (!e) return null;
              var t = splitInternal(e, "-");
              if (3 != t.length && 4 != t.length) return null;
              var n = substringInternal(t[0], 2),
                o = parseInt(substringInternal(t[0], 0, 2)),
                r = toDecimal(t[1], o),
                a = playerBaseNumber * i * (2 << shiftNumber);
              return r != toDecimal(t[2], o) - a ||
                a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, o)
                ? null
                : new Date(r);
            },
            n = (function () {
              var e = storageGetOption(
                  join3(reverse4(mix1(split2("u7fkPOYRC3UdXjgHXldNxdIPO"), 9))),
                  "",
                ).trim(),
                n = t(e),
                i = getServerDate();
              return n && n > i && [].indexOf(e) < 0;
            })(),
            o = t(e),
            r = o && n ? "valid" : "expired";
          (l.textContent =
            o && n
              ? "Valid until".gts_translate() +
                " " +
                o.toDateString() +
                " 23:59 (" +
                "Server time".gts_translate() +
                ")"
              : e
                ? o < getServerDate()
                  ? "Key Expired".gts_translate()
                  : "Invalid key".gts_translate()
                : ""),
            (l.className = r);
        },
        g = (e) => {
          storageSetOption(
            join4(reverse1(mix2(split3("Ou7fkPOYRC3UdXjgHXldNxdIP"), 10))),
            e,
          ),
            storageSetOption("T03UPXTGeMyAS1xzGx0sUBgy7", e);
          var n = decrypt(
            "OWeMff_33NAGe3C7AXxDmkcvtXeE4Ce7oTr7nwIcEZsNF9Uriep6h6o2oSt9nZTUvp_uBccaawMYkWEiRT1gD6dgZD8DewMn",
            11,
            6,
          );
          storageSetOption(
            "x4v26xopzeI7XWgjnFI6" +
              join1(reverse2(split3(n))) +
              gtsExtensionId.substr(0, 10),
            1,
          ),
            t.workflow.checkToken(!0, function () {
              u(e), gts_faketoolsUtility.reload();
            }),
            u(e);
        };
      jQuery(r).on("change", function () {
        var e = this.value.trim();
        g(e);
      }),
        u(o);
      var d =
          parseInt(this.server).toString(30) +
          "z" +
          this.lang +
          playerId.toString(16),
        c = this.createElement("a");
      (c.href = gts_domain + "/templates/request-trial.html?code=" + d),
        (c.target = "_blank"),
        (c.textContent = "Free 3 days trial".gts_translate());
      var m = this.createElement("span");
      m.textContent = " | ";
      var p = gts_domain + "/templates/payment-form.html?code=" + d;
      this.createElement("span").textContent = " | ";
      var y = this.createElement("a");
      (y.href = p + "&packageName=monthly-pro"),
        (y.target = "_blank"),
        (y.textContent = "{numberOfDay} days".gts_translate({
          numberOfDay: 30,
        }));
      var f = this.createElement("span");
      f.textContent = " | ";
      var h = this.createElement("a");
      (h.href = p + "&packageName=yearly-pro"),
        (h.target = "_blank"),
        (h.textContent = "1 year".gts_translate()),
        !window.isBeta &&
          e.appendChild(
            this.createRow("Upgrade Premium".gts_translate(), [c, m, y, f, h]),
          );
      var v = this.createElement("span");
      let _ = `<b style="color:red;text-transform: uppercase;">${d}</b>`;
      (v.innerHTML = "Your profile code is {profileCode}".gts_translate({
        profileCode: _,
      })),
        e.appendChild(this.createRow("", [v]));
      var w = this.createElement("a");
      (w.textContent = "gladiatustimesaver@gmail.com"),
        (w.href = "mailto:" + w.textContent),
        e.appendChild(this.createRow("Contact".gts_translate(), [w]));
      for (
        var b = this.createElement("select"),
          k = supportedLanguages.find((e) => e.value == gts_main.lang),
          O = storageGetOption(
            settingKeysGeneral.language,
            null != k ? k.value : "en",
          ),
          I = 0;
        I < supportedLanguages.length;
        I++
      ) {
        var C = supportedLanguages[I];
        ((K = t.createElement("option", null, null, C.text)).value = C.value),
          (K.selected = t.isEqual(C.value, O)),
          b.appendChild(K);
      }
      jQuery(b).on("change", function () {
        var e = t.getSelectedValue(this);
        null != e && storageSetOption(settingKeysGeneral.language, e);
      }),
        e.appendChild(this.createRow("Language".gts_translate(), [b]));
      var S = this.createElement("select");
      e.appendChild(
        this.createRow("Random delay".gts_translate(), [
          document.createTextNode(
            "Auto will be delayed a random second from 0 to".gts_translate(),
          ),
          S,
        ]),
      );
      var x = storageGetOption(settingKeysGeneral.delayInSeconds, 15),
        T = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 90, 120];
      for (I = 0; I < T.length; I++) {
        var K,
          A = T[I];
        ((K = t.createElement(
          "option",
          null,
          null,
          1 == A
            ? "1 second".gts_translate()
            : "{second} seconds".gts_translate({ second: A }),
        )).value = A),
          (K.selected = t.isEqual(A, x)),
          S.appendChild(K);
      }
      jQuery(S).on("change", function () {
        var e = t.getSelectedValue(this);
        null != e && storageSetOption(settingKeysGeneral.delayInSeconds, e);
      });
      var U = gts_controlBuilder.createToggle(
        settingKeysGeneral.allowRelogin,
        "",
      );
      e.appendChild(this.createRow("Allow relogin".gts_translate(), [U]));
      var P = gts_controlBuilder.createToggle(
        settingKeysGeneral.individualTabRunning,
        "",
      );
      e.appendChild(
        this.createRow("Individual tab running".gts_translate(), [P]),
      );
      var E = gts_controlBuilder.createDropdown(
        settingKeysGeneral.menuPosition,
        "bottom",
        menuPositions,
        "name",
        "value",
        () => {
          window.location.reload(!1);
        },
      );
      e.appendChild(this.createRow("Menu position".gts_translate(), [E]));
      var G = gts_controlBuilder.createToggle(
        settingKeysGeneral.animateItemColor,
        null,
        !0,
      );
      e.appendChild(this.createRow("Animate item color".gts_translate(), [G]));
      var D = gts_controlBuilder.createToggle(
        settingKeysGeneral.debugMode,
        null,
        !1,
      );
      e.appendChild(
        this.createRow(
          "Debug mode".gts_translate(),
          [D],
          null,
          null,
          null,
          "This option is used only for debugging purpose, please don't turn it on.".gts_translate(),
        ),
      );
      var N = gts_faketools.dom.createButton(
          "Reset default settings".gts_translate(),
          () => {
            for (var e in ((N.disabled = !0), settingKeys))
              for (var t in settingKeys[e])
                ignoreResetingProperties.hasOwnProperty(e + "." + t) ||
                  gts_faketools.storage.clearOption(settingKeys[e][t]);
            this.getCurrentCountry(() => {
              setTimeout(() => {
                window.location.reload(!0);
              }, 1e3);
            });
          },
        ),
        F = gts_controlBuilder.createButton(
          "Export Settings".gts_translate(),
          function () {
            var e = {};
            for (var t in settingKeys)
              for (var n in (e[t] || (e[t] = {}), settingKeys[t]))
                !ignoreExportProperties.hasOwnProperty(t + "." + n) &&
                  (e[t][n] = storageGetOption(settingKeys[t][n]));
            (M.textContent = JSON.stringify(e)),
              (q.textContent = "Export successful.".gts_translate()),
              (q.className = "color-green");
          },
        ),
        B = gts_controlBuilder.createButton(
          "Import Settings".gts_translate(),
          function () {
            try {
              var e = JSON.parse(M.value);
              for (var t in e)
                for (var n in e[t])
                  storageSetOption(settingKeys[t][n], e[t][n]);
              (q.textContent = "Import successful.".gts_translate()),
                (q.className = "color-green");
            } catch {
              (q.textContent = "Invalid settings data.".gts_translate()),
                (q.className = "color-red");
            }
          },
        ),
        M = gts_controlBuilder.createTextArea("setting-data-input"),
        q = gts_controlBuilder.createLabel("");
      e.appendChild(this.createRow("", [F, B, N, q, M]));
    },
    addMoreQuickActions: function () {
      var e = [
          {
            name: "Gladiator Amulets",
            icon: "item-i-9-9",
            url: gts_UrlInfo.link({ mod: "auction", itemType: "9" }),
          },
          {
            name: "Mercenaries Amulets",
            icon: "item-i-9-4",
            url: gts_UrlInfo.link({
              mod: "auction",
              itemType: "9",
              ttype: "3",
            }),
          },
        ],
        t = document.getElementById("gca_shortcuts_bar");
      if (t)
        for (var n of e)
          (button = document.createElement("div")),
            (button.className = "icon-out"),
            (link = document.createElement("a")),
            (link.className = "icon " + n.icon),
            (link.href = n.url),
            (link.title = n.name),
            button.appendChild(link),
            t.appendChild(button);
    },
    gameModeResolve: function () {
      (this.isLoggedIn = !0),
        (isTraveling = !1),
        (isInUnderworld = !1),
        (isOnVacation = !1),
        (isWorking = !1);
      let e = location.href.match(
        /https?:\/\/s(\d+)-(\w+)\.gladiatus\.gameforge\.com\/game\/(?:index|main).php\?(.*)/i,
      );
      if (e)
        if (
          ((this.server = e[1]),
          (this.lang = e[2]),
          document.getElementById("container_infobox") ||
            document.getElementById("login"))
        )
          this.isLoggedIn = !1;
        else if (
          (null == document.getElementById("submenu1")
            ? (isTraveling = !0)
            : "underworld" ==
                document.getElementById("wrapper_game").className &&
              (isInUnderworld = gts_main.isInUnderworld = !0),
          document.getElementById("cancelVacationForm"))
        )
          isOnVacation = !0;
        else if (
          ((isWorking =
            "-" == jQuery("#cooldown_bar_text_expedition").text() ||
            "-" == jQuery("#cooldown_bar_text_dungeon").text() ||
            "-" == jQuery("#cooldown_bar_text_arena").text() ||
            "-" == jQuery("#cooldown_bar_text_ct").text()),
          !isTraveling)
        ) {
          this.level = parseInt(
            document.getElementById("header_values_level").textContent,
          );
          var t = storageGetOption(settingKeysGeneral.materialNames, "");
          this.level > 4 &&
            !t &&
            jQuery.get(
              gts_UrlInfo.link({ mod: "forge", submod: "storage" }),
              (e) => {
                for (
                  var t = {},
                    n = preventJQueryLoadResource(e)
                      .find("#change-resource-type")[0]
                      .querySelectorAll("option[value]"),
                    i = 0;
                  i < n.length;
                  i++
                ) {
                  var o = n[i].getAttribute("value"),
                    r = n[i].innerText.trim();
                  t[o] = r;
                }
                storageSetOption(
                  settingKeysGeneral.materialNames,
                  JSON.stringify(t),
                );
              },
            );
        }
    },
    createInput: function (e, t, n) {
      var i = this.createElement("input", e);
      return (i.type = t), n && (i.className = n), i;
    },
    start: function () {
      var e = parseInt((playerId + "").substr(0, 6));
      if (
        (this.gameModeResolve(),
        this.initSettings(),
        (this.countryData = autoSettingsData[currentCountry]),
        this.isLoggedIn)
      ) {
        var t,
          n,
          i = document.getElementById("icon_expeditionpoints"),
          o = document.getElementById("icon_dungeonpoints"),
          r = document.getElementById("icon_arena"),
          a = document.getElementById("icon_grouparena"),
          s =
            isBotRunning &&
            storageIsOptionEnabled(settingKeysUnderworld.enabled),
          l = isBotRunning && storageIsOptionEnabled(settingKeysArena.enabled),
          u =
            isBotRunning &&
            storageIsOptionEnabled(settingKeysCircusTuma.enabled);
        this.init(),
          isBotRunning &&
            (k(),
            storageSetOption(settingKeysPremium.isInventoryUsing, "false"),
            setTimeout(() => {
              let e =
                "true" ==
                storageGetOption(settingKeysPremium.isInventoryUsing, "false");
              if (
                gts_main.isFixingItem ||
                gts_main.isSelling ||
                this.isRepackExpiringItems
              )
                return;
              let t = gts_faketoolsUtility.cpstps;
              !e &&
                !gts_main.isFixingItem &&
                !gts_main.isSelling &&
                !this.isRepackExpiringItems &&
                t &&
                t();
            }, 4e3)),
          !isTraveling && !isInUnderworld && this.validateAutoSettings();
        var g = this,
          d = !1,
          c = [],
          m = storageGetJsonOption(settingKeysGeneral.mapData),
          p = storageGetOption(settingKeysGeneral.currentVersion, "");
        if (m && m.length && p == gtsVersion) {
          if (
            ((h = storageGetOption(
              join2(reverse3(mix2(split1("kPOYRC3UdXjgHXldNxdIPOu7f"), 6))),
              "",
            ).trim()),
            (v = (function (t) {
              if (!t) return null;
              var n = splitInternal(t, "-");
              if (3 != n.length && 4 != n.length) return null;
              var i = substringInternal(n[0], 2),
                o = parseInt(substringInternal(n[0], 0, 2)),
                r = toDecimal(n[1], o),
                a = playerBaseNumber * e * (2 << shiftNumber);
              return r != toDecimal(n[2], o) - a ||
                a + sourceBaseNumber * (3 << shiftNumber) != toDecimal(i, o)
                ? null
                : (4 == n.length &&
                    toDecimal(n[3], o) == a &&
                    c.push((e * gts_main.server).toString(19)),
                  new Date(r));
            })(h)),
            (_ = getServerDate()),
            v && v > _ && [].indexOf(h) < 0)
          )
            (gts_main.isP = c.indexOf((e * gts_main.server).toString(19)) > -1),
              storageSetOption(settingKeysGeneral.invalidKeyCount, 0);
          else {
            var y = storageGetNumberOption(
              settingKeysGeneral.invalidKeyCount,
              "0",
            );
            y > 2
              ? (storageSetOption(settingKeysGeneral.paused, !0),
                gts_faketoolsUtility.startAutoCurrentTab(!1))
              : storageSetOption(settingKeysGeneral.invalidKeyCount, ++y);
            var f = document.querySelector(".gts-pause");
            (f.className += " disabled"),
              (f.isPremium = !1),
              gts_faketoolsUtility.showTooltip(f, [
                { text: "Buy Premium", color: "#ff0000" },
              ]);
          }
          var h,
            v,
            _,
            w = 0,
            b = function () {
              (d = !0),
                w < new Date().getTime() &&
                  (gts_faketoolsUtility.keepAlive(),
                  (w = new Date().getTime() + 5e3)),
                clearTimeout(n),
                (n = setTimeout(function () {
                  (d = !1),
                    storageSetOption(settingKeysHealth.disableHealUntil, 0);
                  let e = gts_faketoolsUtility.isRunning();
                  !isTraveling &&
                    !isOnVacation &&
                    e &&
                    g.workflow.init(g.countryData);
                }, 2e3));
            };
          (document.onmousemove = b),
            (document.onkeypress = b),
            setTimeout(function () {
              let e = gts_faketoolsUtility.isRunning();
              !isTraveling &&
                !isOnVacation &&
                !d &&
                e &&
                g.workflow.init(g.countryData);
            }, 10);
        } else
          g.workflow.checkToken(!1, () => {
            storageSetOption(settingKeysGeneral.paused, !0),
              gts_faketools.utility.reload();
          });
      }
      function k() {
        (t = Date.now()), O(0), requestAnimationFrame(I);
      }
      function O(e) {
        (isAutoPerformExp || s) && (i.style.transform = "scale(" + e + ")"),
          isAutoPerformDun && (o.style.transform = "scale(" + e + ")"),
          l && (r.style.transform = "scale(" + e + ")"),
          u && (a.style.transform = "scale(" + e + ")");
      }
      function I() {
        let e = (Date.now() - t) / 3e3;
        O(e), e > 0 && e < 1 ? requestAnimationFrame(I) : setTimeout(k, 300);
      }
    },
    createElement: function (e, t, n, i, o) {
      var r = document.createElement(e);
      return (
        n && (r.className = n),
        i && (r.textContent = i),
        o && (r.innerHTML = o),
        t && (r.id = t),
        r
      );
    },
    buildDungeonContent: function (e) {
      this.removeChildren(e);
      let t = gts_controlBuilder.createLink(
        "Check this video".gts_translate(),
        "https://www.youtube.com/watch?v=lMt06dY5j18",
        "video-link margin-l-5",
      );
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(
            "Configuration for automating Dungeon".gts_translate(),
          ),
          t,
        ]),
      );
      let n = gts_controlBuilder.createDropdown(
        settingKeysDungeon.countryLocation,
        defaultDungeonLocation,
        dungeonData,
        "name",
        "id",
        () => {
          gts_main.initSettings();
        },
      );
      e.appendChild(this.createRow("Location".gts_translate(), [n]));
      var i = this.createInput(null, "checkbox");
      (i.checked =
        "true" === storageGetOption(settingKeysDungeon.isSkipBoss, "false")),
        jQuery(i).on("change", function () {
          storageSetOption(settingKeysDungeon.isSkipBoss, this.checked);
        });
      var o = this.createElement(
        "label",
        null,
        null,
        "(If you can not defeat boss, turn on this option to skip boss and restart dungeon)".gts_translate(),
      );
      e.appendChild(this.createRow("Skip boss".gts_translate(), [i, o]));
      var r = gts_controlBuilder.createNumberInput(
        settingKeysDungeon.restartAfterXTimesLost,
        10,
      );
      e.appendChild(
        this.createRow(
          "Restart after x times lost".gts_translate(),
          [r],
          null,
          null,
        ),
      );
      let a = gts_controlBuilder.createToggle(
        settingKeysDungeon.useGateKey,
        "Use Gate Key to restore Dungeon points".gts_translate(),
      );
      e.appendChild(this.createRow("Dungeon points".gts_translate(), [...a])),
        e.appendChild(this.createRowHeader("Auto travelling".gts_translate()));
      let s = (e) => {
          let t = e == relativeCountryValues.expedition;
          jQuery(u).toggle(t), jQuery(g).toggle(t);
        },
        l = gts_controlBuilder.createDropdown(
          settingKeysDungeon.travelCountryWhenZeroPoints,
          "",
          countries.filter((e) => e.value != relativeCountryValues.dungeon),
          "name",
          "value",
          s,
        ),
        u = gts_controlBuilder.createLabel(
          "Requires Expedition points is restored".gts_translate(),
          "margin-r-5",
        ),
        g = gts_controlBuilder.createDropdown(
          settingKeysExpedition.minExpeditionPointsToTravel,
          50,
          pointPercents.filter((e) => e.value > 0),
          "name",
          "value",
        );
      e.appendChild(
        this.createRow(
          "When the dungeon point is 0 then travel to".gts_translate(),
          [l, u, g],
        ),
      ),
        s(storageGetOption(settingKeysDungeon.travelCountryWhenZeroPoints));
      let d = gts_controlBuilder.createToggle(
        settingKeysDungeon.useClotheToTravel,
        "Use Working Clothe to reduce time when travel to Dungeon country".gts_translate(),
      );
      e.appendChild(
        this.createRow("Reduce travel time".gts_translate(), [...d]),
      );
    },
    buildMenu: function (e) {
      var t = document.createElement("ul");
      t.className = "tabs";
      var n = gts_controlBuilder._createElement("li", null, "center no-hover"),
        i = document.createElement("span");
      n.appendChild(i);
      var o = document.createElement("h4");
      (o.textContent = `GTS ${gtsVersion}`),
        (o.className = "collapsed"),
        n.appendChild(o),
        t.appendChild(n);
      var r = gts_controlBuilder._createElement("li", null, "center no-hover"),
        a = gts_controlBuilder._createElement("span", null, "gts-pause");
      r.appendChild(a),
        t.appendChild(r),
        gts_faketoolsUtility.isRunning() && (a.className += " pause");
      var s = void 0;
      jQuery(a).on("click", () => {
        if (!1 === a.isPremium) return void (s && s.click());
        let e = gts_faketoolsUtility.isRunning();
        (window.isRunning = !e),
          gts_faketoolsUtility.startAutoCurrentTab(window.isRunning),
          storageSetOption(settingKeysGeneral.paused, !window.isRunning),
          $(a).toggleClass("pause", window.isRunning);
      });
      var l = this.createElement("span", null, "button");
      a.appendChild(l);
      for (
        var u,
          g,
          d,
          c = parseInt((playerId + "").substr(0, 6)),
          m = [],
          p =
            ((u = storageGetOption(
              join1(reverse2(mix3(split4("fkPOYRC3UdXjgHXldNxdIPOu7"), 7))),
              "",
            )
              .trim()
              .toLowerCase()),
            (g = (function (e) {
              if (((m = []), !e)) return null;
              var t = splitInternal(e, "-");
              if (3 != t.length && 4 != t.length) return null;
              var n = substringInternal(t[0], 2),
                i = parseInt(substringInternal(t[0], 0, 2)),
                o = toDecimal(t[1], i),
                r = playerBaseNumber * c * (2 << shiftNumber);
              return o != toDecimal(t[2], i) - r ||
                r + sourceBaseNumber * (3 << shiftNumber) != toDecimal(n, i)
                ? null
                : (4 == t.length &&
                    toDecimal(t[3], i) == r &&
                    m.push((c * gts_main.server).toString(19)),
                  new Date(o));
            })(u)),
            (d = getServerDate()),
            g && g > d && [].indexOf(u) < 0),
          y = m.indexOf((c * gts_main.server).toString(19)) >= 0,
          f = function (t) {
            if (!p || (t && !y)) {
              var n = h.createElement("div");
              (n.className = "invalid-license"),
                (n.textContent =
                  p && t
                    ? "Invalid Premium License".gts_translate()
                    : "Invalid License".gts_translate()),
                e.appendChild(n);
            }
          },
          h = this,
          v = [
            {
              id: settingKeysExpedition.enabled,
              name: "Expedition".gts_translate(),
              onclick: function () {
                h.buildExpeditionContent(e), f();
              },
            },
            {
              id: settingKeysUnderworld.enabled,
              name: "Underworld".gts_translate(),
              onclick: function () {
                h.buildUnderworldContent(e), f();
              },
            },
            {
              id: settingKeysEvent.enabled,
              name: "Event".gts_translate(),
              onclick: function () {
                h.buildEventContent(e), f();
              },
            },
            {
              id: settingKeysDungeon.enabled,
              name: "Dungeon".gts_translate(),
              onclick: function () {
                h.buildDungeonContent(e), f();
              },
            },
            {
              id: settingKeysArena.enabled,
              name: "Arena".gts_translate(),
              onclick: function () {
                h.buildArenaContent(e, y), f();
              },
            },
            {
              id: settingKeysCircusTuma.enabled,
              name: "Circus".gts_translate(),
              onclick: function () {
                h.buildCircusTumaContent(e, y), f();
              },
            },
            {
              id: settingKeysHealth.enabled,
              name: "Heal".gts_translate(),
              onclick: function () {
                h.buildHealthContent(e), f();
              },
            },
            {
              id: settingKeys.quest.enabled,
              name: "Pantheon".gts_translate(),
              onclick: function () {
                h.buildQuestProContent(e, y), f();
              },
            },
            {
              name: "Premium".gts_translate(),
              onclick: function () {
                h.buildPremiumContent(e), f(!0);
              },
            },
            {
              name: "General".gts_translate(),
              onclick: function () {
                h.buildGeneralSettings(e);
              },
            },
          ],
          _ = 0;
        _ < v.length;
        _++
      ) {
        var w = v[_];
        if (!(this.level < 10 && w.name == "Dungeon".gts_translate())) {
          var b = this.createMenuItem(w.id, w.name, w.onclick, e);
          !w.id && (b.className = "center"),
            _ == v.length - 1 && (s = b),
            t.appendChild(b);
        }
      }
      return t;
    },
    buildMultipleSelectionControl: function (e, t, n, i) {
      var o = this,
        r = this.createElement("div");
      r.setAttribute("contenteditable", "");
      var a = this.createElement("ul");
      (a.className = "arena"), t.appendChild(a);
      var s = this.createElement("li");
      a.appendChild(s),
        s.appendChild(r),
        (a.onclick = function () {
          r.focus();
        }),
        jQuery(r).on("keypress", function (t) {
          var i = (function (e) {
            var t = [],
              n = "",
              i = !1;
            for (var o of e)
              if ('"' != o)
                "," != o || i ? (n += o) : n && (t.push(n), (n = ""));
              else {
                if (i) {
                  t.push(n), (n = ""), (i = !1);
                  continue;
                }
                i = !0;
              }
            return n && t.push(n), t;
          })(r.innerText.trim())
            .map((e) => e.trim())
            .filter((e) => e);
          if ((n && (i = n(i)), 13 == t.keyCode && i)) {
            var s = storageGetJsonOption(e);
            (i = i.filter(function (e) {
              return -1 == s.indexOf(e);
            })),
              (s = (s = s.concat(i)).filter(function (e, t) {
                return e && s.indexOf(e) == t;
              })),
              storageSetJsonOption(
                e,
                s.filter((e) => e),
              ),
              setTimeout(() => {
                o.removeChildren(r);
              }),
              o.buildPlayerList(e, i, a);
          }
        }),
        jQuery(r).on("keydown", function (e) {
          var t = r.innerText.trim();
          8 != e.keyCode || t || jQuery(r).parent().prev().focus();
        }),
        gts_faketools.storage.migrateOldDataArrayToJson(e);
      var l = storageGetJsonOption(e);
      this.buildPlayerList(e, l, a);
    },
    validServerFilter: function (e) {
      return e.filter(function (e) {
        return parseInt(e) > 0;
      });
    },
    createRow: function (e, t, n, i, o, r) {
      var a = this.createElement("div", null, ["row", o].join(" ")),
        s = this.createElement("div", null, "field-label");
      s.appendChild(this.createElement("label", null, n, e)),
        r && s.appendChild(gts_controlBuilder.createIconInfor(r)),
        a.appendChild(s),
        a.appendChild(this.createElement("div", null, "border"));
      var l = this.createElement("div", null, "field-content");
      for (var u of t) u && l.appendChild(u);
      for (var u of (a.appendChild(l), (i = i || []))) u && a.appendChild(u);
      var g = this.createElement("div", null, "row-wrapper");
      return g.appendChild(a), g;
    },
    createMenuItem: function (e, t, n, i) {
      var o = document.createElement("li");
      if (e) {
        var r = this.createInput(e, "checkbox"),
          a = e == settingKeys.quest.enabled;
        (r.checked = "true" == storageGetOption(e, !0)),
          a &&
            storageGetNumberOption(settingKeys.quest.enableAutoTime, "0") > 0 &&
            (r.checked = !0),
          jQuery(r).on("change", function () {
            storageSetOption(e, this.checked),
              a && storageSetOption(settingKeys.quest.enableAutoTime, -1),
              e == settingKeysHealth.enabled &&
                storageSetOption(settingKeysHealth.disableHealUntil, 0);
          }),
          o.appendChild(r);
      }
      var s = this.createElement("label", null, null, t);
      return (
        o.appendChild(s),
        (o.onclick = function () {
          if (-1 == this.className.indexOf("active")) {
            var e = this.parentElement.querySelector(".active");
            e && e.classList.remove("active"),
              (this.className += " active"),
              n();
          }
          i.className = i.className.replace("close", "open");
        }),
        o
      );
    },
    buildArenaContent: function (e, t) {
      this.removeChildren(e);
      let n = gts_controlBuilder.createLink(
        "Check this video".gts_translate(),
        "https://www.youtube.com/watch?v=lMt06dY5j18",
        "video-link margin-l-5",
      );
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(
            "Configuration for automating Provinciarum Arena".gts_translate(),
          ),
          n,
        ]),
      );
      var i = this.createElement("div");
      this.buildMultipleSelectionControl(settingKeysArena.players, i);
      var o = this.createElement("span", null, "icon-copy", "❏");
      (o.title = "Copy to clipboard".gts_translate()),
        jQuery(o).on("click", () => {
          gts_faketools.storage.copyOptionToClipboard(settingKeysArena.players);
        }),
        e.appendChild(
          this.createRow(
            "Attack players cross server".gts_translate(),
            [i],
            "label-for-list",
            [o],
          ),
        );
      let r = gts_controlBuilder.createToggle(
        settingKeysArena.attackSameServerEnabled,
        "Enable attacking same server".gts_translate(),
      );
      var a = this.createElement("div");
      this.buildMultipleSelectionControl(settingKeysArena.sameServerPlayers, a);
      var s = this.createElement("span", null, "icon-copy", "❏");
      (s.title = "Copy to clipboard".gts_translate()),
        jQuery(s).on("click", () => {
          gts_faketools.storage.copyOptionToClipboard(
            settingKeysArena.sameServerPlayers,
          );
        }),
        e.appendChild(
          this.createRow(
            "Same server attack list".gts_translate(),
            [...r, a],
            "label-for-list",
            [s],
          ),
        );
      var l = this.createInput(null, "textbox");
      l.className = "input-gold";
      var u = parseInt(
        document.getElementById("header_values_level").textContent,
      );
      (l.value = storageGetOption(settingKeysArena.goldRaided, 500 * u)),
        jQuery(l).on("change", function () {
          storageSetOption(settingKeysArena.goldRaided, this.value);
        });
      var g = this.createRow("Attack if raid over".gts_translate(), [
        l,
        iconGold(),
      ]);
      (g.className += " gold-raided"), e.appendChild(g);
      var d = this.createInput(null, "checkbox");
      (d.checked =
        "true" ===
        storageGetOption(settingKeysArena.autoIgnorePlayer, "false")),
        jQuery(d).on("change", function () {
          storageSetOption(settingKeysArena.autoIgnorePlayer, this.checked);
        }),
        e.appendChild(
          this.createRow("Auto ignore player if lose".gts_translate(), [d]),
        );
      var c = this.createInput(null, "checkbox");
      (c.checked =
        "true" ===
        storageGetOption(settingKeysArena.attackFiveTimesEnabled, "true")),
        jQuery(c).on("change", function () {
          storageSetOption(
            settingKeysArena.attackFiveTimesEnabled,
            this.checked,
          );
        }),
        e.appendChild(
          this.createRow("Limit 5 attacks per day".gts_translate(), [c]),
        ),
        t ||
          ((c.disabled = !0),
          storageSetOption(settingKeysArena.attackFiveTimesEnabled, !1),
          jQuery(c).after(
            jQuery("<span>")
              .addClass("red-text")
              .html("Available only for Premium License".gts_translate()),
          ));
      var m = this.createInput(null, "checkbox");
      (m.checked =
        "true" ===
        storageGetOption(settingKeysArena.doNotRunIfNoQuest, "false")),
        jQuery(m).on("change", function () {
          storageSetOption(settingKeysArena.doNotRunIfNoQuest, this.checked);
        }),
        e.appendChild(
          this.createRow("Pause if no suiable quest".gts_translate(), [m]),
        ),
        t ||
          ((m.disabled = !0),
          storageSetOption(settingKeysArena.doNotRunIfNoQuest, !1),
          jQuery(m).after(
            jQuery("<span>")
              .addClass("red-text")
              .html("Available only for Premium License".gts_translate()),
          ));
      var p = this.createElement("div");
      this.buildMultipleSelectionControl(settingKeysArena.ignorePlayers, p);
      var y = this.createElement("span", null, "icon-copy", "❏");
      (y.title = "Copy to clipboard".gts_translate()),
        jQuery(y).on("click", () => {
          gts_faketools.storage.copyOptionToClipboard(
            settingKeysArena.ignorePlayers,
          );
        }),
        e.appendChild(
          this.createRow(
            "Ignore players".gts_translate(),
            [p],
            "label-for-list",
            [y],
          ),
        );
      var f = this.createElement("div");
      this.buildMultipleSelectionControl(
        settingKeysArena.servers,
        f,
        this.validServerFilter,
      ),
        e.appendChild(
          this.createRow(
            "Attack servers".gts_translate(),
            [f],
            "label-for-list",
          ),
        );
      var h = this.createElement("div");
      this.buildMultipleSelectionControl(
        settingKeysArena.ignoreServers,
        h,
        this.validServerFilter,
      ),
        e.appendChild(
          this.createRow(
            "Ignore servers".gts_translate(),
            [h],
            "label-for-list",
          ),
        ),
        e.appendChild(this.createRowHeader("Climbing League".gts_translate()));
      let v = gts_controlBuilder.createToggle(
        settingKeysArena.climbLeagueEnabled,
        null,
        !1,
        () => {
          storageSetOption(settingKeysArena.climbCheckingTime, 0);
        },
      );
      e.appendChild(this.createRow("Auto climb league".gts_translate(), [v]));
      let _ = gts_controlBuilder.createToggle(
        settingKeysArena.allowAttackAlly,
        null,
        !1,
        () => {
          storageSetOption(settingKeysArena.climbCheckingTime, 0);
        },
      );
      e.appendChild(this.createRow("Allow attack ally".gts_translate(), [_]));
      let w = gts_controlBuilder.createDropdown(
        settingKeysArena.lostTimesForIgnore,
        3,
        ignoreAfterLostTimes,
        "name",
        "value",
        (e) => {
          storageSetOption(settingKeysArena.climbCheckingTime, 0);
        },
      );
      e.appendChild(
        this.createRow(
          "Ignore player if today attack lost - win >= x times".gts_translate(),
          [w],
        ),
      );
    },
    validateAutoSettings: function () {},
    buildExpeditionContent: function (e) {
      var t = this;
      this.removeChildren(e);
      let n = gts_controlBuilder.createLink(
        "Check this video".gts_translate().gts_translate(),
        "https://www.youtube.com/watch?v=lMt06dY5j18",
        "video-link margin-l-5",
      );
      var i = "Configuration for automating Expedition".gts_translate();
      e.appendChild(
        this.createRow("Description".gts_translate(), [
          document.createTextNode(i),
          n,
        ]),
      );
      let o = gts_controlBuilder.createDropdown(
        settingKeysExpedition.countryLocation,
        defaultExpeditionLocation,
        expeditionData,
        "name",
        "id",
        (e) => {
          gts_faketools.storage.clearOption(settingKeysExpedition.opponent),
            gts_main.initSettings(),
            a(e);
        },
      );
      e.appendChild(this.createRow("Location".gts_translate(), [o]));
      var r = this.createElement("select");
      e.appendChild(this.createRow("Opponent".gts_translate(), [r])),
        jQuery(r).on("change", function () {
          var e = t.getSelectedValue(this);
          null != e && storageSetOption(settingKeysExpedition.opponent, e);
        });
      var a = function (e) {
        t.removeChildren(r);
        for (
          var n = expeditionData.filter((t) => t.id == e).pop(),
            i = storageGetOption(settingKeysExpedition.opponent, 1),
            o = 0;
          o < n.opponents.length;
          o++
        ) {
          var a = n.opponents[o],
            s = t.createElement(
              "option",
              null,
              null,
              o +
                1 +
                ". " +
                a +
                (3 == o ? ` [${langData[gts_gameLang].bossText}]` : ""),
            );
          (s.value = o + 1),
            (s.selected = t.isEqual(o + 1, i)),
            r.appendChild(s);
        }
      };
      a(expeditionCountryLocation);
      var s = gts_controlBuilder.createToggle(
        settingKeysExpedition.attackEarly2Level,
      );
      e.appendChild(
        this.createRow("Allow expedition early 2 levels".gts_translate(), [s]),
      );
      var l = gts_controlBuilder.createToggle(
        settingKeysExpedition.autoCollectAllBonuses,
      );
      e.appendChild(
        this.createRow("Auto collect all bonuses".gts_translate(), [l]),
      );
      let u = (t) => {
          let n = t == relativeCountryValues.dungeon;
          jQuery(c).toggle(n),
            jQuery(m).toggle(n),
            jQuery(e).toggleClass("auto-travelling-on", !!t);
        },
        g = storageGetOption(settingKeysExpedition.travelCountryWhenZeroPoints),
        d = gts_controlBuilder.createDropdown(
          settingKeysExpedition.travelCountryWhenZeroPoints,
          "",
          countries.filter((e) => e.value != relativeCountryValues.expedition),
          "name",
          "value",
          (e) => {
            u(e),
              e ||
                (storageSetOption(
                  settingKeysExpedition.travelAtRestoredPointsForNonUwWearing,
                  pointPercents[0].value,
                ),
                storageSetOption(
                  settingKeysExpedition.travelAtRestoredPointsForUwWearing,
                  pointPercents[0].value,
                ),
                storageSetOption(
                  settingKeysExpedition.atExpCountryWhenUWCD,
                  -1,
                ),
                jQuery(y).val(-1),
                jQuery(v).val(-1),
                jQuery(k).val(-1));
          },
        ),
        c = gts_controlBuilder.createLabel(
          "Requires Dungeon points is restored".gts_translate(),
          "margin-r-5",
        ),
        m = gts_controlBuilder.createDropdown(
          settingKeysExpedition.minDungeonPointsToTravel,
          50,
          pointPercents.filter((e) => e.value > 0),
          "name",
          "value",
        );
      e.appendChild(this.createRowHeader("Auto travelling".gts_translate())),
        e.appendChild(
          this.createRow(
            "When the expedition point is 0 then travel to".gts_translate(),
            [d, c, m],
          ),
        ),
        u(g);
      let p = jQuery('<div class="margin-t-5 margin-r-5 margin-b-5">'),
        y = gts_controlBuilder.createDropdown(
          settingKeysExpedition.travelAtRestoredPointsForNonUwWearing,
          30,
          pointPercents,
          "name",
          "value",
        ),
        f = gts_controlBuilder.createLabel(
          "when wearing normal costume".gts_translate(),
        );
      p.append(y).append(f);
      let h = jQuery('<div class="margin-t-5 margin-r-5 margin-b-5">'),
        v = gts_controlBuilder.createDropdown(
          settingKeysExpedition.travelAtRestoredPointsForUwWearing,
          20,
          pointPercents,
          "name",
          "value",
        ),
        _ = gts_controlBuilder.createLabel(
          "when wearing underworld costume".gts_translate(),
        );
      h.append(v).append(_),
        e.appendChild(
          this.createRow(
            "Travel to Expedition country when the point is restored x%".gts_translate(),
            [p[0], h[0]],
            null,
            null,
            "auto-travelling hide",
          ),
        );
      let w = gts_controlBuilder.createToggle(
        settingKeysExpedition.useClotheToTravel,
        "Use Working Clothe to reduce time when travel to Expedition country".gts_translate(),
      );
      e.appendChild(
        this.createRow(
          "Reduce travel time".gts_translate(),
          [...w],
          null,
          null,
          "auto-travelling hide",
        ),
      );
      let b = [...Array(8).keys()]
        .map((e) => e + 1)
        .map((e) => ({
          name:
            1 == e
              ? "1 hour".gts_translate()
              : "{numberOfHours} hours".gts_translate({ numberOfHours: e }),
          value: e,
        }));
      b.splice(0, 0, {
        name: `---${"No actions".gts_translate()}---`,
        value: -1,
      });
      let k = gts_controlBuilder.createDropdown(
        settingKeysExpedition.atExpCountryWhenUWCD,
        -1,
        b,
        "name",
        "value",
      );
      e.appendChild(
        this.createRow(
          "Stay at Expedition country if underworld costume cooldown less than".gts_translate(),
          [k],
          null,
          null,
          "auto-travelling hide",
        ),
      );
    },
    d30: function () {
      if (
        (startStopTimeout && clearTimeout(startStopTimeout),
        !(
          "true" ==
          storageGetOption(settingKeysPremium.autoStartStopEnabled, "false")
        ))
      )
        return;
      let e = storageGetJsonOption(settingKeysPremium.autoStartStopSettings);
      if (0 == e.length) return;
      let t = ((e) => {
          let t = [];
          for (let n of e) {
            if (n.start.indexOf(":") < 0 || n.stop.indexOf(":") < 0) continue;
            let e = n.start.split(":"),
              i = n.stop.split(":"),
              o = parseInt(e[0]),
              r = parseInt(e[1]);
            t.push({
              action: "start",
              time: o * hourInMillisecond + r * minuteInMillisecond,
            });
            let a = parseInt(i[0]),
              s = parseInt(i[1]);
            t.push({
              action: "stop",
              time: a * hourInMillisecond + s * minuteInMillisecond,
            });
          }
          return t.sort((e, t) => e.time - t.time), t;
        })(e),
        n = gts_gameUiHelper.getServerDateArray(),
        i =
          n[3] * hourInMillisecond +
          n[4] * minuteInMillisecond +
          n[5] * secondInMillisecond,
        o = !1;
      var r = (e, t) => {
        let o = new Date(n[0], n[1] - 1, n[2]);
        e.time < i && o.setDate(o.getDate() + 1);
        var r = new Date(o.getTime() + e.time);
        let a = "start" == e.action,
          s = r.toLocaleString(navigator.language, {
            dateStyle: "medium",
            timeStyle: "short",
          }),
          l = a
            ? "Bot will start at {date} (server time)".gts_translate({
                date: s,
              })
            : "Bot will stop at {date} (server time)".gts_translate({
                date: s,
              });
        gts_faketoolsUtility.writeLog(l),
          setTimeout(() => {
            gts_faketoolsUtility.setStatusMessage(l, !0);
          }, 5e3),
          (startStopTimeout = setTimeout(async () => {
            let e = storageIsOptionEnabled(
              settingKeysPremium.donateGuildBankBeforeStop,
            );
            !a && e && (await gts_gameApi.donateGuildBank()),
              gts_main.startStop(a) && gts_faketoolsUtility.reload();
          }, t));
      };
      let a = gts_faketoolsUtility.isRunning();
      for (let e of t) {
        let t = e.time,
          n = "start" == e.action;
        if (t < i && t + 10 * secondInMillisecond > i) {
          let e = gts_main.startStop(n);
          if ((e && gts_faketoolsUtility.reload(), (o = !0), !e)) continue;
          break;
        }
        if (t > i && a != n) {
          (o = !0), r(e, e.time - i);
          break;
        }
      }
      if (!o) {
        let e = t[a == ("start" == t[0].action) ? 1 : 0];
        r(e, e.time + 24 * hourInMillisecond - i);
      }
    },
  };
  (gts_mainWorkflow = gts_main.workflow),
    gts_main.wait(),
    (window.gts_main = gts_main);
})(
  (e) => e.split(""),
  (e) => e.reverse(),
  (e) => e.join(""),
  (e, t) => {
    for (let n = 0; n < t; n++) {
      let t = e.shift();
      e.push(t);
    }
    return e;
  },
  this,
  localStorage,
  (e) => e.split(""),
  (e) => e.reverse(),
  (e) => e.join(""),
  (e, t) => {
    for (let n = 0; n < t; n++) {
      let t = e.shift();
      e.push(t);
    }
    return e;
  },
  (e, t) => {
    for (var n = 0, i = e.length, o = 0, r = ""; (r = e.charAt(o)), o < i; o++)
      n += allChars.indexOf(r) * Math.pow(t, i - 1 - o);
    return n;
  },
  (e, t) => {
    for (
      var n = [], i = e.length, o = "", r = 0, a = "";
      (a = e.charAt(r)), r < i;
      r++
    )
      a != t ? (o += a) : (n.push(o), (o = ""));
    return o && n.push(o), n;
  },
  (e, t, n) => {
    for (
      var i = "", o = n ? n + t : e.length, r = t, a = "";
      (a = e.charAt(r)), r < Math.min(o, e.length);
      r++
    )
      i += a;
    return i;
  },
  (e) => e.split(""),
  (e) => e.reverse(),
  (e) => e.join(""),
  (e, t) => {
    for (let n = 0; n < t; n++) {
      let t = e.shift();
      e.push(t);
    }
    return e;
  },
  this.parseInt,
  jQuery,
  document,
  (e) => e.split(""),
  (e) => e.reverse(),
  (e) => e.join(""),
  (e, t) => {
    for (let n = 0; n < t; n++) {
      let t = e.shift();
      e.push(t);
    }
    return e;
  },
  () => {
    var e = document
        .getElementById("server-time")
        .getAttribute("data-start-time"),
      t = JSON.parse(e);
    return t ? new Date(t[0], t[1] - 1, t[2]) : new Date();
  },
  this.sbaseNumber,
  this.pBaseNumber,
  this.stNumber,
  (e, t, n) => {
    var i = [];
    for (let o = 0; o < t; o++) i.push(e[(o + 1) * n]);
    return i.join("");
  },
);
